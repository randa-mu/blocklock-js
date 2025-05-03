import { describe, it, expect, beforeAll, afterAll } from "@jest/globals"
import { bn254 } from "@kevincharm/noble-bn254-drand"
import { keccak_256 } from "@noble/hashes/sha3"
import dotenv from "dotenv"
import { ZeroAddress, ethers, getBytes, isHexString, toUtf8Bytes } from "ethers"
// import Ganache from "ganache"

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
    extractSingleLog, encodeCiphertextToSolidity, parseSolidityCiphertextString
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
}

const BLOCKLOCK_IBE_OPTS: IbeOpts = {
    hash: keccak_256,
    k: 128,
    expand_fn: "xmd",
    dsts: {
        H1_G1: Buffer.from("BLOCKLOCK_BN254G1_XMD:KECCAK-256_SVDW_RO_H1_"),
        H2: Buffer.from("BLOCKLOCK_BN254_XMD:KECCAK-256_H2_"),
        H3: Buffer.from("BLOCKLOCK_BN254_XMD:KECCAK-256_H3_"),
        H4: Buffer.from("BLOCKLOCK_BN254_XMD:KECCAK-256_H4_"),
    },
}

const blsKey = process.env.BLS_KEY ?? ""
const SCHEME_ID = "BN254-BLS-BLOCKLOCK"

// let server: any
let provider: ethers.JsonRpcProvider
let wallet: ethers.Signer
let accounts: ethers.Signer[]

describe("Blocklock blockchain integration tests with Ganache", () => {
    beforeAll(async () => {
        // // Start Ganache server with a mnemonic
        // server = Ganache.server({
        //     wallet: {
        //         totalAccounts: 10,
        //         mnemonic: "test test test test test test test test test test test junk",
        //     },
        //     chain: {
        //         chainId: 1337,
        //     },
        // })

        // await server.listen(8545)

        console.log('Starting Anvil...');
        await startAnvil();

        // Do your Viem tests or local interactions here...
        console.log('Anvil is running. You can now connect via Anvil.');

        // Connect to Ganache with Ethers.js
        provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545")

        // Get the list of accounts from Ganache
        accounts = await provider.listAccounts()

        // Create a wallet using the first account
        wallet = accounts[0]
    })

    afterAll(async () => {
        // // Ensure the Ganache server is stopped after all tests
        // await server.close()

        console.log('Stopping Anvil...');
        await stopAnvil();
    })

    it("should get network information from ganache", async () => {
        const network = await provider.getNetwork()
        expect(network.chainId).toBe(31337n) // Default Ganache chainId
    })

    it("should get valid address for signer", async () => {
        expect(await wallet.getAddress()).not.toBe(ZeroAddress)
    })

    it("can request blocklock decryption from user contract with on-chain decryption", async () => {
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
        
        const dst = 'BLOCKLOCK_BN254G1_XMD:KECCAK-256_SVDW_RO_H1_0x0000000000000000000000000000000000000000000000000000000000007a69_';
        const dstHex = toHex(dst);
        expect(await scheme.DST()).toBe(dstHex);

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

        let UUPSProxy = new ethers.ContractFactory(
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
        const blocklockSender = BlocklockSender.attach(await blocklockSenderProxy.getAddress())

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


        // /** Blocklock js Integration */

        // User or client side
        // const blocklockjs = new Blocklock(wallet, await blocklockSender.getAddress(), 31337n)
        // const mockBlocklockReceiverInstance = MockBlocklockReceiver__factory.connect(await mockBlocklockReceiver.getAddress(), wallet)

        // expect(await mockBlocklockReceiverInstance.plainTextValue()).toBe(BigInt(0))

        // const blockHeight = BigInt(await provider.getBlockNumber() + 2)
        // const msg = ethers.parseEther("4")
        // const encoder = new SolidityEncoder()
        // const msgBytes = encoder.encodeUint256(msg)
        // const encodedMessage = getBytes(msgBytes)

        // const ct = blocklockjs.encrypt(encodedMessage, blockHeight, blocklock_default_pk)

        // let tx = await mockBlocklockReceiverInstance.connect(wallet).createTimelockRequestWithDirectFunding(blockHeight, encodeCiphertextToSolidity(ct))
        // let receipt = await tx.wait(1)
        // if (!receipt) {
        //     throw new Error("transaction has not been mined")
        // }

        // // Blocklock agent or server side
        // const blockRequest = await blocklockjs.fetchBlocklockRequest(1n)
        // expect(blockRequest!.blockHeight).toBe(BigInt(blockHeight))

        // let blocklockRequestStatus = await blocklockjs.fetchBlocklockStatus(1n)
        // expect(blocklockRequestStatus!.blockHeight).toBe(BigInt(blockHeight))
        // expect(blocklockRequestStatus?.decryptionKey.length).toBe(0)

        // const decryptionSenderIface = DecryptionSender__factory.createInterface()
        // const [requestID, callback, schemeID, condition, ciphertext] = extractSingleLog(
        //     decryptionSenderIface,
        //     receipt,
        //     await decryptionSender.getAddress(),
        //     decryptionSenderIface.getEvent("DecryptionRequested"),
        // )
        // console.log(`received decryption request id ${requestID}`)
        // console.log(`blocklock request id ${blockRequest?.id}`)
        // console.log(`callback address ${callback}, scheme id ${schemeID}`)

        // const formattedKey = blsKey.startsWith("0x") ? blsKey.slice(2) : blsKey
        // const secretKey = bn254.fields.Fr.fromBytes(Buffer.from(formattedKey, "hex"))
        // const conditionBytes = isHexString(condition) ? getBytes(condition) : toUtf8Bytes(condition)
        // const parsedCiphertext = parseSolidityCiphertextString(ciphertext)
        // const sigBytes = bn254.signShortSignature(conditionBytes, secretKey, {DST: BLOCKLOCK_IBE_OPTS.dsts.H1_G1})
        // const sigPoint = bn254.G1.ProjectivePoint.fromHex(sigBytes)
        // const decryption_key = preprocess_decryption_key_g1(parsedCiphertext, sigPoint, BLOCKLOCK_IBE_OPTS)

        // tx = await decryptionSenderInstance.connect(wallet).fulfillDecryptionRequest(requestID, decryption_key, sigBytes)
        // receipt = await tx.wait(1)
        // if (!receipt) {
        //     throw new Error("transaction has not been mined")
        // }

        // const iface = BlocklockSender__factory.createInterface()
        // const [, , ,] = extractSingleLog(
        //     iface,
        //     receipt,
        //     await blocklockSender.getAddress(),
        //     iface.getEvent("BlocklockCallbackSuccess"),
        // )

        // blocklockRequestStatus = await blocklockjs.fetchBlocklockStatus(1n)
        // expect(blocklockRequestStatus!.blockHeight).toBe(blockHeight)
        // expect(blocklockRequestStatus?.decryptionKey).not.toBe(undefined)

        // expect(await mockBlocklockReceiverInstance.plainTextValue()).toBe(BigInt(msg))
    })
})

function toHex(str: string): string {
    return '0x' + Buffer.from(str, 'utf8').toString('hex');
}

import { spawn, ChildProcessWithoutNullStreams } from 'child_process';
import { hexlify } from "ethers"

let anvilProcess: ChildProcessWithoutNullStreams;

export async function startAnvil(): Promise<void> {
    return new Promise((resolve, reject) => {
        anvilProcess = spawn('anvil', [], { stdio: 'pipe' });

        anvilProcess.stdout.on('data', (data) => {
            const output = data.toString();
            console.log('[anvil]', output);
            if (output.includes('Listening on')) {
                resolve();
            }
        });

        anvilProcess.stderr.on('data', (data) => {
            console.error('[anvil error]', data.toString());
        });

        anvilProcess.on('error', (err) => {
            reject(err);
        });
    });
}

export async function stopAnvil(): Promise<void> {
    return new Promise((resolve, reject) => {
        if (!anvilProcess) return resolve();

        anvilProcess.once('close', (code) => {
            console.log(`[anvil] exited with code ${code}`);
            resolve();
        });

        anvilProcess.kill('SIGINT');
    });
}
