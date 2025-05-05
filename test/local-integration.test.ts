import { describe, it, expect, beforeAll, afterAll } from "@jest/globals"
import { bn254 } from "@kevincharm/noble-bn254-drand"
import { BlsBn254, serialiseG2Point } from "../src/crypto/bls-bn254";
import { keccak_256 } from "@noble/hashes/sha3"
import dotenv from "dotenv"
import { ZeroAddress, ethers, getBytes, isHexString, toUtf8Bytes, AbiCoder } from "ethers"

import {
    MockBlocklockReceiver__factory,
    BlocklockSender__factory,
    BlocklockSignatureScheme__factory,
    DecryptionSender__factory,
    SignatureSchemeAddressProvider__factory,
    UUPSProxy__factory
} from "../src/generated"
import {
    SolidityEncoder,
    Blocklock,
    extractSingleLog, encodeCiphertextToSolidity, parseSolidityCiphertextString,
    encodeCondition
} from "../src"
import { IbeOpts, preprocess_decryption_key_g1 } from "../src/crypto/ibe-bn254"

dotenv.config()

const blocklock_default_pk = {
    x: {
        c0: BigInt("0x2691d39ecc380bfa873911a0b848c77556ee948fb8ab649137d3d3e78153f6ca"),
        c1: BigInt("0x2863e20a5125b098108a5061b31f405e16a069e9ebff60022f57f4c4fd0237bf"),
    },
    y: {
        c0: BigInt("0x193513dbe180d700b189c529754f650b7b7882122c8a1e242a938d23ea9f765c"),
        c1: BigInt("0x11c939ea560caf31f552c9c4879b15865d38ba1dfb0f7a7d2ac46a4f0cae25ba"),
    },
};
const BLOCKLOCK_IBE_OPTS: IbeOpts = {
    hash: keccak_256,
    k: 128,
    expand_fn: "xmd",
    dsts: {
        H1_G1: Buffer.from(
            "BLOCKLOCK_BN254G1_XMD:KECCAK-256_SVDW_RO_H1_0x0000000000000000000000000000000000000000000000000000000000007a69_",
        ),
        H2: Buffer.from(
            "BLOCKLOCK_BN254_XMD:KECCAK-256_H2_0x0000000000000000000000000000000000000000000000000000000000007a69_",
        ),
        H3: Buffer.from(
            "BLOCKLOCK_BN254_XMD:KECCAK-256_H3_0x0000000000000000000000000000000000000000000000000000000000007a69_",
        ),
        H4: Buffer.from(
            "BLOCKLOCK_BN254_XMD:KECCAK-256_H4_0x0000000000000000000000000000000000000000000000000000000000007a69_",
        ),
    },
};

const blsKey = process.env.BLS_KEY ?? ""
const SCHEME_ID = "BN254-BLS-BLOCKLOCK"

// let server: any
let provider: ethers.JsonRpcProvider
let wallet: ethers.Signer
let accounts: ethers.Signer[]

describe.skip("Blocklock blockchain integration tests with Anvil", () => {
    beforeAll(async () => {
        console.log('Starting Anvil...')
        await startAnvil()

        console.log('Anvil is running. We can now connect via ethersjs.')

        // Connect to Ganache with Ethers.js
        provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545")

        // Get the list of accounts from Ganache
        accounts = await provider.listAccounts()

        // Create a wallet using the first account
        wallet = accounts[0]
    })

    afterAll(async () => {
        console.log('Stopping Anvil...')
        await stopAnvil()
    })

    it("should get network information from ganache", async () => {
        const network = await provider.getNetwork()
        expect(network.chainId).toBe(31337n) // Default Ganache chainId
    })

    it("should get valid address for signer", async () => {
        expect(await wallet.getAddress()).not.toBe(ZeroAddress)
    })

    it("can request blocklock decryption from user contract with direct funding and on-chain decryption", async () => {
        /** Smart Contract Deployments */

        // deploy signature scheme address provider
        const SignatureSchemeAddressProvider = new ethers.ContractFactory(
            SignatureSchemeAddressProvider__factory.abi,
            SignatureSchemeAddressProvider__factory.bytecode,
            wallet,
        )
        const signatureSchemeAddressProvider = await SignatureSchemeAddressProvider.deploy(
            await wallet.getAddress()
        )
        await signatureSchemeAddressProvider.waitForDeployment()
        const schemeProviderAddr = await signatureSchemeAddressProvider.getAddress()
        console.log(schemeProviderAddr)
        // deploy blocklock scheme
        const BlocklockScheme = new ethers.ContractFactory(
            BlocklockSignatureScheme__factory.abi,
            BlocklockSignatureScheme__factory.bytecode,
            wallet,
        )
        const blocklockScheme = await BlocklockScheme.deploy(
            [blocklock_default_pk.x.c0, blocklock_default_pk.x.c1],
            [blocklock_default_pk.y.c0, blocklock_default_pk.y.c1]
        )
        await blocklockScheme.waitForDeployment()
        const scheme = BlocklockSignatureScheme__factory.connect(await blocklockScheme.getAddress(), wallet)

        const dst = 'BLOCKLOCK_BN254G1_XMD:KECCAK-256_SVDW_RO_H1_0x0000000000000000000000000000000000000000000000000000000000007a69_'
        const dstHex = toHexString(dst)
        expect(await scheme.DST()).toBe(dstHex)
        expect(await scheme.DST()).toBe(uint8ArrayToHexString(BLOCKLOCK_IBE_OPTS.dsts.H1_G1))

        const schemeProviderContract = SignatureSchemeAddressProvider__factory.connect(schemeProviderAddr, wallet)
        await schemeProviderContract.updateSignatureScheme(SCHEME_ID, await blocklockScheme.getAddress())

        // deploy decryption sender
        const DecryptionSender = new ethers.ContractFactory(
            DecryptionSender__factory.abi,
            DecryptionSender__factory.bytecode,
            wallet,
        )
        const decryptionSenderImplementation = await DecryptionSender.deploy()
        await decryptionSenderImplementation.waitForDeployment()

        const UUPSProxy = new ethers.ContractFactory(
            UUPSProxy__factory.abi,
            UUPSProxy__factory.bytecode,
            wallet
        )
        const decryptionSenderProxy = await UUPSProxy.deploy(
            await decryptionSenderImplementation.getAddress(),
            DecryptionSender.interface.encodeFunctionData("initialize", [
                await wallet.getAddress(),
                schemeProviderAddr
            ]),
        )
        await decryptionSenderProxy.waitForDeployment()
        const decryptionSender = DecryptionSender.attach(await decryptionSenderProxy.getAddress())
        const decryptionSenderInstance = DecryptionSender__factory.connect(await decryptionSender.getAddress(), wallet)

        // deploy blocklock sender
        const BlocklockSender = new ethers.ContractFactory(
            BlocklockSender__factory.abi,
            BlocklockSender__factory.bytecode,
            wallet,
        )
        const blocklockSenderImplementation = await BlocklockSender.deploy()
        await blocklockSenderImplementation.waitForDeployment()

        const blocklockSenderProxy = await UUPSProxy.deploy(
            await blocklockSenderImplementation.getAddress(),
            BlocklockSender.interface.encodeFunctionData("initialize", [
                await wallet.getAddress(),
                await decryptionSender.getAddress(),
            ]),
        )
        await blocklockSenderProxy.waitForDeployment()
        const blocklockSender = BlocklockSender__factory.connect(await blocklockSenderProxy.getAddress(), wallet)

        // configure request fees parameters
        const maxGasLimit = 500_000;
        const gasAfterPaymentCalculation = 400_000;
        const fulfillmentFlatFeeNativePPM = 1_000_000;
        const weiPerUnitGas = 3_000_000;
        const blsPairingCheckOverhead = 800_000;
        const nativePremiumPercentage = 10;
        const gasForCallExactCheck = 5_000;

        await blocklockSender
            .setConfig(
                maxGasLimit,
                gasAfterPaymentCalculation,
                fulfillmentFlatFeeNativePPM,
                weiPerUnitGas,
                blsPairingCheckOverhead,
                nativePremiumPercentage,
                gasForCallExactCheck,
            )

        // deploy user mock decryption receiver contract
        const MockBlocklockReceiver = new ethers.ContractFactory(
            MockBlocklockReceiver__factory.abi,
            MockBlocklockReceiver__factory.bytecode,
            wallet
        )
        const mockBlocklockReceiver = await MockBlocklockReceiver.deploy(
            await blocklockSender.getAddress()
        )
        await mockBlocklockReceiver.waitForDeployment()


        /** Blocklock js Integration */

        // User or client side
        const blocklockjs = new Blocklock(wallet, await blocklockSender.getAddress(), 31337n)
        const mockBlocklockReceiverInstance = MockBlocklockReceiver__factory.connect(await mockBlocklockReceiver.getAddress(), wallet)

        expect(await mockBlocklockReceiverInstance.plainTextValue()).toBe(BigInt(0))
        expect(await mockBlocklockReceiverInstance.blocklock()).toBe(await blocklockSender.getAddress())

        const blockHeight = BigInt(await provider.getBlockNumber() + 2)
        const msg = ethers.parseEther("4")
        const encoder = new SolidityEncoder()
        const msgBytes = encoder.encodeUint256(msg)
        const encodedMessage = getBytes(msgBytes)

        const encodedCondition = encodeCondition(blockHeight)
        const ct = blocklockjs.encrypt(encodedMessage, blockHeight, blocklock_default_pk)

        // fund contract
        await mockBlocklockReceiverInstance.connect(wallet).fundContractNative({ value: ethers.parseEther("3") })
        // make direct funding request with enough callbackGasLimit to cover BLS operations in call to decrypt() function
        // in receiver contract
        const callbackGasLimit = 400_000;

        let tx = await mockBlocklockReceiverInstance
            .connect(wallet)
            .createTimelockRequestWithDirectFunding(callbackGasLimit, encodedCondition, encodeCiphertextToSolidity(ct))

        const receipt = await tx.wait(1)
        if (!receipt) {
            throw new Error("transaction has not been mined")
        }

        // Blocklock agent or server side
        let blocklockRequestStatus = await blocklockSender.getRequest(1n)
        console.log(blocklockRequestStatus!.condition)
        expect(blocklockRequestStatus!.condition).toBe(uint8ArrayToHexString(encodedCondition))
        expect(blocklockRequestStatus?.decryptionKey.length).toBe(2)

        const decryptionSenderIface = DecryptionSender__factory.createInterface()
        const [requestID, callback, schemeID, condition, ciphertext] = extractSingleLog(
            decryptionSenderIface,
            receipt,
            await decryptionSender.getAddress(),
            decryptionSenderIface.getEvent("DecryptionRequested"),
        )
        console.log(`received decryption request id ${requestID}`)
        console.log(`blocklock request id ${blocklockRequestStatus?.decryptionRequestID}`)
        console.log(`callback address ${callback}, scheme id ${schemeID}`)

        // THIS APPROACH TO SINGING SEEMS BUGGY SOMEWHERE AND FAILS SIGNATURE VERIFICATION ON-CHAIN with Signature verification failed
        // const formattedKey = blsKey.startsWith("0x") ? blsKey.slice(2) : blsKey
        // const secretKey = bn254.fields.Fr.fromBytes(Buffer.from(formattedKey, "hex"))
        // const conditionBytes = isHexString(condition) ? getBytes(condition) : toUtf8Bytes(condition)
        // const parsedCiphertext = parseSolidityCiphertextString(ciphertext)
        // const sigBytes = bn254.signShortSignature(conditionBytes, secretKey, { DST: BLOCKLOCK_IBE_OPTS.dsts.H1_G1 })
        // const sigPoint = bn254.G1.ProjectivePoint.fromHex(sigBytes)
        // const decryption_key = preprocess_decryption_key_g1(parsedCiphertext, sigPoint, BLOCKLOCK_IBE_OPTS)

        const bls = await BlsBn254.create()
        const { pubKey, secretKey } = bls.createKeyPair(blsKey as `0x${string}`)
        const conditionBytes = isHexString(condition) ? getBytes(condition) : toUtf8Bytes(condition)

        const m = bls.hashToPoint(BLOCKLOCK_IBE_OPTS.dsts.H1_G1, conditionBytes)
        const parsedCiphertext = parseSolidityCiphertextString(ciphertext)
        const signature = bls.sign(m, secretKey).signature
        const sig = bls.serialiseG1Point(signature)
        const sigBytes = AbiCoder.defaultAbiCoder().encode(["uint256", "uint256"], [sig[0], sig[1]])
        const decryption_key = preprocess_decryption_key_g1(parsedCiphertext, { x: sig[0], y: sig[1] }, BLOCKLOCK_IBE_OPTS)

        // fulfill the conditional encryption request if profitable
        const estimatedGas = await decryptionSenderInstance
            .connect(wallet)
            .fulfillDecryptionRequest.estimateGas(requestID, decryption_key, sigBytes)

        const estimatedGasWithCallbackGasLimit = BigInt(estimatedGas) + BigInt(callbackGasLimit)

        // Fetch current gas pricing (EIP-1559 compatible)
        const feeData = await provider.getFeeData()
        const maxFeePerGas = feeData.maxFeePerGas!;
        const maxPriorityFeePerGas = feeData.maxPriorityFeePerGas!;
        const userPayment = blocklockRequestStatus.directFundingFeePaid;

        const baseFeePerGas = (await provider.getBlock("latest"))?.baseFeePerGas!;
        const effectiveGasPrice =
            maxFeePerGas < baseFeePerGas + maxPriorityFeePerGas ? maxFeePerGas : baseFeePerGas + maxPriorityFeePerGas;

        // It is best to calculate if it's profitable to execute with buffer
        // as the transaction could fail without adding the buffer if the actual gas used is 
        // higher than the estimatedGasWithCallbackGasLimit.
        // It is also safer to add a buffer to the estimatedGasWithCallbackGasLimit, not just estimatedGas
        const gasBuffer = estimatedGasWithCallbackGasLimit * 120n / 100n; // 20% buffer
        const expectedTxCost = gasBuffer * effectiveGasPrice;
        const profitAfterTx = BigInt(userPayment) - BigInt(expectedTxCost)

        // Set required profit threshold (e.g., 10%)
        const profitThresholdPercent = 10n;

        // Calculate actual profit percentage
        const profitPercent = (profitAfterTx * 100n) / BigInt(userPayment);

        // assertion to ensure profit percentage is above threshold
        expect(profitPercent).toBeGreaterThanOrEqual(profitThresholdPercent);

        console.log("Profit after tx in eth", ethers.formatEther(profitAfterTx.toString()))
        console.log("Expected tx cost in eth", ethers.formatEther(expectedTxCost.toString()))
        
        // transaction passes if we add buffer to the gas limit
        tx = await decryptionSenderInstance.connect(wallet).fulfillDecryptionRequest(requestID, decryption_key, sigBytes, {
            gasLimit: gasBuffer,
            maxFeePerGas,
            maxPriorityFeePerGas,
        })
        const [success, txReceipt] = await checkTxMined(tx.hash, provider);
        expect(success).toBe(true)

        console.log("Estimated gas:", estimatedGas.toString())
        console.log("Callback gas limit:", callbackGasLimit.toString())
        console.log("Estimated gas + Callback gas limit:", estimatedGasWithCallbackGasLimit.toString())
        console.log("Actual gas used:", txReceipt!.gasUsed.toString())
        
        // The actual gas used is always higher than estimated gas
        // while in hardhat tests, the estimated gas is equal to the actual gas used
        // increasing the callback gas limit increases the estimated gas slightly with a chance that the
        // estimated gas plus callback gas limit could be higher than actual gas used.
        // Also, depending on what the callback gas limit is set to, the actual gas used could be higher than 
        // estimated gas plus callback gas limit.
        expect(txReceipt!.gasUsed).toBeGreaterThan(estimatedGas)
        expect(estimatedGas).toBeGreaterThan(callbackGasLimit)
        expect(txReceipt!.gasUsed).toBeLessThan(estimatedGasWithCallbackGasLimit)

        // Verify logs and request results
        const iface = BlocklockSender__factory.createInterface()
        const [, , ,] = extractSingleLog(
            iface,
            txReceipt!,
            await blocklockSender.getAddress(),
            iface.getEvent("BlocklockCallbackSuccess"),
        )

        blocklockRequestStatus = await blocklockSender.getRequest(1n)
        expect(blocklockRequestStatus!.condition).toBe(uint8ArrayToHexString(encodedCondition))
        expect(blocklockRequestStatus?.decryptionKey).toBeTruthy;
        expect(blocklockRequestStatus?.decryptionKey.length).toBe(66)
        expect(await mockBlocklockReceiverInstance.plainTextValue()).toBe(BigInt(msg))
    })

    it("can request blocklock decryption from user contract with subscription funding and on-chain decryption", async () => {
        /** Smart Contract Deployments */

        // deploy signature scheme address provider
        const SignatureSchemeAddressProvider = new ethers.ContractFactory(
            SignatureSchemeAddressProvider__factory.abi,
            SignatureSchemeAddressProvider__factory.bytecode,
            wallet,
        )
        const signatureSchemeAddressProvider = await SignatureSchemeAddressProvider.deploy(
            await wallet.getAddress()
        )
        await signatureSchemeAddressProvider.waitForDeployment()
        const schemeProviderAddr = await signatureSchemeAddressProvider.getAddress()
        console.log(schemeProviderAddr)
        // deploy blocklock scheme
        const BlocklockScheme = new ethers.ContractFactory(
            BlocklockSignatureScheme__factory.abi,
            BlocklockSignatureScheme__factory.bytecode,
            wallet,
        )
        const blocklockScheme = await BlocklockScheme.deploy(
            [blocklock_default_pk.x.c0, blocklock_default_pk.x.c1],
            [blocklock_default_pk.y.c0, blocklock_default_pk.y.c1]
        )
        await blocklockScheme.waitForDeployment()
        const scheme = BlocklockSignatureScheme__factory.connect(await blocklockScheme.getAddress(), wallet)

        const dst = 'BLOCKLOCK_BN254G1_XMD:KECCAK-256_SVDW_RO_H1_0x0000000000000000000000000000000000000000000000000000000000007a69_'
        const dstHex = toHexString(dst)
        expect(await scheme.DST()).toBe(dstHex)
        expect(dstHex).toBe(uint8ArrayToHexString(BLOCKLOCK_IBE_OPTS.dsts.H1_G1))

        const schemeProviderContract = SignatureSchemeAddressProvider__factory.connect(schemeProviderAddr, wallet)
        await schemeProviderContract.updateSignatureScheme(SCHEME_ID, await blocklockScheme.getAddress())

        // deploy decryption sender
        const DecryptionSender = new ethers.ContractFactory(
            DecryptionSender__factory.abi,
            DecryptionSender__factory.bytecode,
            wallet,
        )
        const decryptionSenderImplementation = await DecryptionSender.deploy()
        await decryptionSenderImplementation.waitForDeployment()

        const UUPSProxy = new ethers.ContractFactory(
            UUPSProxy__factory.abi,
            UUPSProxy__factory.bytecode,
            wallet
        )
        const decryptionSenderProxy = await UUPSProxy.deploy(
            await decryptionSenderImplementation.getAddress(),
            DecryptionSender.interface.encodeFunctionData("initialize", [
                await wallet.getAddress(),
                schemeProviderAddr
            ]),
        )
        await decryptionSenderProxy.waitForDeployment()
        const decryptionSender = DecryptionSender.attach(await decryptionSenderProxy.getAddress())
        const decryptionSenderInstance = DecryptionSender__factory.connect(await decryptionSender.getAddress(), wallet)

        // deploy blocklock sender
        const BlocklockSender = new ethers.ContractFactory(
            BlocklockSender__factory.abi,
            BlocklockSender__factory.bytecode,
            wallet,
        )
        const blocklockSenderImplementation = await BlocklockSender.deploy()
        await blocklockSenderImplementation.waitForDeployment()

        const blocklockSenderProxy = await UUPSProxy.deploy(
            await blocklockSenderImplementation.getAddress(),
            BlocklockSender.interface.encodeFunctionData("initialize", [
                await wallet.getAddress(),
                await decryptionSender.getAddress(),
            ]),
        )
        await blocklockSenderProxy.waitForDeployment()
        const blocklockSender = BlocklockSender__factory.connect(await blocklockSenderProxy.getAddress(), wallet)

        // configure request fees parameters
        const maxGasLimit = 500_000;
        const gasAfterPaymentCalculation = 400_000;
        const fulfillmentFlatFeeNativePPM = 1_000_000;
        const weiPerUnitGas = 3_000_000;
        const blsPairingCheckOverhead = 800_000;
        const nativePremiumPercentage = 10;
        const gasForCallExactCheck = 5_000;

        await blocklockSender
            .setConfig(
                maxGasLimit,
                gasAfterPaymentCalculation,
                fulfillmentFlatFeeNativePPM,
                weiPerUnitGas,
                blsPairingCheckOverhead,
                nativePremiumPercentage,
                gasForCallExactCheck,
            )

        // deploy user mock decryption receiver contract
        const MockBlocklockReceiver = new ethers.ContractFactory(
            MockBlocklockReceiver__factory.abi,
            MockBlocklockReceiver__factory.bytecode,
            wallet
        )
        const mockBlocklockReceiver = await MockBlocklockReceiver.deploy(
            await blocklockSender.getAddress()
        )
        await mockBlocklockReceiver.waitForDeployment()


        /** Blocklock js Integration */

        // User or client side
        const blocklockjs = new Blocklock(wallet, await blocklockSender.getAddress(), 31337n)
        const mockBlocklockReceiverInstance = MockBlocklockReceiver__factory.connect(await mockBlocklockReceiver.getAddress(), wallet)

        expect(await mockBlocklockReceiverInstance.plainTextValue()).toBe(BigInt(0))
        expect(await mockBlocklockReceiverInstance.blocklock()).toBe(await blocklockSender.getAddress())

        const blockHeight = BigInt(await provider.getBlockNumber() + 2)
        const msg = ethers.parseEther("4")
        const encoder = new SolidityEncoder()
        const msgBytes = encoder.encodeUint256(msg)
        const encodedMessage = getBytes(msgBytes)

        const encodedCondition = encodeCondition(blockHeight)
        const ct = blocklockjs.encrypt(encodedMessage, blockHeight, blocklock_default_pk)

        // create and fund subscription
        await mockBlocklockReceiverInstance.connect(wallet).createSubscriptionAndFundNative({ value: ethers.parseEther("3") })

        // make direct funding request with enough callbackGasLimit to cover BLS operations in call to decrypt() function
        // in receiver contract
        const callbackGasLimit = 400_000;

        let tx = await mockBlocklockReceiverInstance
            .connect(wallet)
            .createTimelockRequestWithSubscription(callbackGasLimit, encodedCondition, encodeCiphertextToSolidity(ct))

        const receipt = await tx.wait(1)
        if (!receipt) {
            throw new Error("transaction has not been mined")
        }

        // Blocklock agent or server side
        let blocklockRequestStatus = await blocklockSender.getRequest(1n)
        console.log(blocklockRequestStatus!.condition)
        expect(blocklockRequestStatus!.condition).toBe(uint8ArrayToHexString(encodedCondition))
        expect(blocklockRequestStatus?.decryptionKey.length).toBe(2)

        const decryptionSenderIface = DecryptionSender__factory.createInterface()
        const [requestID, callback, schemeID, condition, ciphertext] = extractSingleLog(
            decryptionSenderIface,
            receipt,
            await decryptionSender.getAddress(),
            decryptionSenderIface.getEvent("DecryptionRequested"),
        )
        console.log(`received decryption request id ${requestID}`)
        console.log(`blocklock request id ${blocklockRequestStatus?.decryptionRequestID}`)
        console.log(`callback address ${callback}, scheme id ${schemeID}`)

        // THIS APPROACH TO SINGING SEEMS BUGGY SOMEWHERE AND FAILS SIGNATURE VERIFICATION ON-CHAIN with Signature verification failed
        // const formattedKey = blsKey.startsWith("0x") ? blsKey.slice(2) : blsKey
        // const secretKey = bn254.fields.Fr.fromBytes(Buffer.from(formattedKey, "hex"))
        // const conditionBytes = isHexString(condition) ? getBytes(condition) : toUtf8Bytes(condition)
        // const parsedCiphertext = parseSolidityCiphertextString(ciphertext)
        // const sigBytes = bn254.signShortSignature(conditionBytes, secretKey, { DST: BLOCKLOCK_IBE_OPTS.dsts.H1_G1 })
        // const sigPoint = bn254.G1.ProjectivePoint.fromHex(sigBytes)
        // const decryption_key = preprocess_decryption_key_g1(parsedCiphertext, sigPoint, BLOCKLOCK_IBE_OPTS)

        const bls = await BlsBn254.create()
        const { pubKey, secretKey } = bls.createKeyPair(blsKey as `0x${string}`)
        const conditionBytes = isHexString(condition) ? getBytes(condition) : toUtf8Bytes(condition)

        const m = bls.hashToPoint(BLOCKLOCK_IBE_OPTS.dsts.H1_G1, conditionBytes)
        const parsedCiphertext = parseSolidityCiphertextString(ciphertext)
        const signature = bls.sign(m, secretKey).signature
        const sig = bls.serialiseG1Point(signature)
        const sigBytes = AbiCoder.defaultAbiCoder().encode(["uint256", "uint256"], [sig[0], sig[1]])
        const decryption_key = preprocess_decryption_key_g1(parsedCiphertext, { x: sig[0], y: sig[1] }, BLOCKLOCK_IBE_OPTS)

        // fulfill the conditional encryption request if profitable
        const estimatedGas = await decryptionSenderInstance
            .connect(wallet)
            .fulfillDecryptionRequest.estimateGas(requestID, decryption_key, sigBytes)

        const estimatedGasWithCallbackGasLimit = BigInt(estimatedGas) + BigInt(callbackGasLimit)

        // Fetch current gas pricing (EIP-1559 compatible)
        const feeData = await provider.getFeeData()
        const maxFeePerGas = feeData.maxFeePerGas!
        const maxPriorityFeePerGas = feeData.maxPriorityFeePerGas!

        const subscriptionId = await mockBlocklockReceiverInstance.subscriptionId()
        const [nativeBalance,,,] = await blocklockSender.getSubscription(subscriptionId)
        const userPayment = nativeBalance // for subscription, we check the subscription balance using the subscription id

        const baseFeePerGas = (await provider.getBlock("latest"))?.baseFeePerGas!
        const effectiveGasPrice =
            maxFeePerGas < baseFeePerGas + maxPriorityFeePerGas ? maxFeePerGas : baseFeePerGas + maxPriorityFeePerGas

        // It is best to calculate if it's profitable to execute with buffer
        // as the transaction could fail without adding the buffer if the actual gas used is 
        // higher than the estimatedGasWithCallbackGasLimit.
        // It is also safer to add a buffer to the estimatedGasWithCallbackGasLimit, not just estimatedGas
        const gasBuffer = estimatedGasWithCallbackGasLimit * 120n / 100n; // 20% buffer
        const expectedTxCost = gasBuffer * effectiveGasPrice;
        const profitAfterTx = BigInt(userPayment) - BigInt(expectedTxCost) // checking user subscription balance can cover the expected transaction cost

        // Set required profit threshold (e.g., 10%)
        const profitThresholdPercent = 10n;

        // Calculate actual profit percentage
        const profitPercent = (profitAfterTx * 100n) / BigInt(userPayment);

        // assertion to ensure profit percentage is above threshold
        expect(profitPercent).toBeGreaterThanOrEqual(profitThresholdPercent);

        console.log("Profit after tx in eth", ethers.formatEther(profitAfterTx.toString()))
        console.log("Expected tx cost in eth", ethers.formatEther(expectedTxCost.toString()))
        console.log("Native balance before tx:", ethers.formatEther(nativeBalance.toString()))

        // transaction passes if we add buffer to the gas limit
        tx = await decryptionSenderInstance.connect(wallet).fulfillDecryptionRequest(requestID, decryption_key, sigBytes, {
            gasLimit: gasBuffer,
            maxFeePerGas,
            maxPriorityFeePerGas,
        })
        const [success, txReceipt] = await checkTxMined(tx.hash, provider)
        expect(success).toBe(true)

        const [nativeBalanceAfterTx,,,] = await blocklockSender.getSubscription(subscriptionId)
        console.log("Native balance after tx:", ethers.formatEther(nativeBalanceAfterTx.toString()))
        console.log("Actual amount paid for tx:", ethers.formatEther(nativeBalance - nativeBalanceAfterTx))

        // amount deducted from subscription should be higher than actual gas used * gas price
        expect(nativeBalance - nativeBalanceAfterTx).toBeGreaterThan(txReceipt!.gasUsed * effectiveGasPrice) 

        console.log("Estimated gas:", estimatedGas.toString())
        console.log("Callback gas limit:", callbackGasLimit.toString())
        console.log("Estimated gas + Callback gas limit:", estimatedGasWithCallbackGasLimit.toString())
        console.log("Actual gas used:", txReceipt!.gasUsed.toString())
        
        // The actual gas used is always higher than estimated gas
        // while in hardhat tests, the estimated gas is equal to the actual gas used
        // increasing the callback gas limit increases the estimated gas slightly with a chance that the
        // estimated gas plus callback gas limit could be higher than actual gas used.
        // Also, depending on what the callback gas limit is set to, the actual gas used could be higher than 
        // estimated gas plus callback gas limit.
        expect(txReceipt!.gasUsed).toBeGreaterThan(estimatedGas)
        expect(estimatedGas).toBeGreaterThan(callbackGasLimit)
        expect(txReceipt!.gasUsed).toBeLessThan(estimatedGasWithCallbackGasLimit)

        // Verify logs and request results
        const iface = BlocklockSender__factory.createInterface()
        const [, , ,] = extractSingleLog(
            iface,
            txReceipt!,
            await blocklockSender.getAddress(),
            iface.getEvent("BlocklockCallbackSuccess"),
        )

        blocklockRequestStatus = await blocklockSender.getRequest(1n)
        expect(blocklockRequestStatus!.condition).toBe(uint8ArrayToHexString(encodedCondition))
        expect(blocklockRequestStatus?.decryptionKey).toBeTruthy;
        expect(blocklockRequestStatus?.decryptionKey.length).toBe(66)
        expect(await mockBlocklockReceiverInstance.plainTextValue()).toBe(BigInt(msg))
    })
})


// Helper functions
async function checkTxMined(txHash: string, provider: ethers.Provider): Promise<[boolean, ethers.TransactionReceipt | null]> {
    const receipt = await provider.getTransactionReceipt(txHash)

    if (!receipt) {
        console.log('Transaction not mined yet.')
        return [false, null]
    }

    if (receipt.status === 1) {
        console.log('Transaction mined and succeeded.')
        return [true, receipt]
    } else {
        console.log('Transaction mined but failed.')
        return [false, receipt]
    }
}

function uint8ArrayToHexString(uint8: Uint8Array): string {
    return '0x' + Array.from(uint8)
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('')
}

function toHexString(str: string): string {
    return '0x' + Buffer.from(str, 'utf8').toString('hex')
}



// Anvil 
import { spawn, ChildProcessWithoutNullStreams } from 'child_process';

let anvilProcess: ChildProcessWithoutNullStreams

export async function startAnvil(): Promise<void> {
    return new Promise((resolve, reject) => {
        anvilProcess = spawn('anvil', [], { stdio: 'pipe' })

        anvilProcess.stdout.on('data', (data) => {
            const output = data.toString()
            console.log('[anvil]', output)
            if (output.includes('Listening on')) {
                resolve()
            }
        })

        anvilProcess.stderr.on('data', (data) => {
            console.error('[anvil error]', data.toString())
        })

        anvilProcess.on('error', (err) => {
            reject(err)
        })
    })
}

export async function stopAnvil(): Promise<void> {
    return new Promise((resolve, reject) => {
        if (!anvilProcess) return resolve()

        anvilProcess.once('close', (code) => {
            console.log(`[anvil] exited with code ${code}`)
            resolve()
        })

        anvilProcess.kill('SIGINT')
    })
}
