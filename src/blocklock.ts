import {getBytes, ethers, Signer, Provider, BigNumberish, BytesLike} from "ethers"
import {
    decodeCondition,
    encodeCiphertextToSolidity, encodeCondition,
    encodeParams,
    extractSingleLog, parseSolidityCiphertext,
} from "./ethers-utils"
import {Ciphertext, decrypt_g1_with_preprocess, encrypt_towards_identity_g1, G2, IbeOpts} from "./crypto/ibe-bn254"
import {BlocklockSender, BlocklockSender__factory} from "./generated"
import {TypesLib} from "./generated/BlocklockSender"
import {
    ARBITRUM_SEPOLIA,
    AVALANCHE_C_CHAIN,
    BASE_SEPOLIA,
    configForChainId,
    FILECOIN_CALIBNET,
    FILECOIN_MAINNET,
    FURNACE,
    NetworkConfig, OPTIMISM_SEPOLIA,
    POLYGON_POS, SEI_TESTNET
} from "./networks"


const BLOCKLOCK_MAX_MSG_LEN: number = 256

const iface = BlocklockSender__factory.createInterface()

export class Blocklock {
    private blocklockSender: BlocklockSender
    private signer: Signer | Provider

    constructor(signer: Signer | Provider, private networkConfig: NetworkConfig) {
        this.blocklockSender = BlocklockSender__factory.connect(networkConfig.contractAddress, signer)
        this.signer = signer
    }

    static createFromChainId(rpc: Signer | Provider, chainId: BigNumberish): Blocklock {
        return new Blocklock(rpc, configForChainId(chainId))
    }

    /**
     * Request a blocklock decryption at block number blockHeight.
     * @param blockHeight time at which the decryption should key should be released
     * @param ciphertext encrypted message to store on chain
     * @returns blocklock request id as a string
     */
    async requestBlocklock(blockHeight: bigint, ciphertext: TypesLib.CiphertextStruct): Promise<bigint> {
        if (this.signer.provider == null) {
            throw new Error("you must configure an RPC provider")
        }
        const conditionBytes = encodeCondition(blockHeight);

        // 1. Get chain ID and fee data
        const feeData = await this.signer.provider.getFeeData()

        // feeData.gasPrice: Legacy flat gas price (used on non-EIP-1559 chains like Filecoin or older EVMs)
        // const gasPrice = feeData.gasPrice!;

        // feeData.maxFeePerGas: Max total gas price we're willing to pay (base + priority), used in EIP-1559
        const maxFeePerGas = feeData.maxFeePerGas ?? 0n;

        // feeData.maxPriorityFeePerGas: Tip to incentivize validators (goes directly to them)
        const maxPriorityFeePerGas = feeData.maxPriorityFeePerGas ?? 0n;

        // 2. Determine whether to use legacy or EIP-1559 pricing
        let txGasPrice = (maxFeePerGas + maxPriorityFeePerGas) * 10n;

        // 3. Estimate request price using the selected txGasPrice
        const requestPrice = await this.blocklockSender.estimateRequestPriceNative(
            this.networkConfig.gasLimit,
            txGasPrice
        );

        // 4. Apply buffer e.g. 100% = 2x total
        const valueToSend = requestPrice + (requestPrice * this.networkConfig.gasBufferPercent) / 100n;

        // 5. Estimate gas
        const estimatedGas = await this.blocklockSender.requestBlocklock.estimateGas(
            this.networkConfig.gasLimit,
            conditionBytes,
            ciphertext,
            {
                value: valueToSend,
                maxFeePerGas,
                maxPriorityFeePerGas,
            }
        );

        // 6. Send transaction
        const tx = await this.blocklockSender.requestBlocklock(
            this.networkConfig.gasLimit,
            conditionBytes,
            ciphertext,
            {
                value: valueToSend,
                gasLimit: estimatedGas,
                maxFeePerGas,
                maxPriorityFeePerGas,
            }
        );

        const receipt = await tx.wait();
        if (!receipt) {
            throw new Error("Transaction was not mined");
        }

        // 7. Extract request ID from log
        const [requestID] = extractSingleLog(
            iface,
            receipt,
            this.networkConfig.contractAddress,
            iface.getEvent("BlocklockRequested")
        );

        return requestID;
    }

    /**
     * Fetch the details of a blocklock request, decryption key / signature excluded.
     * This function should be called to fetch pending blocklock requests.
     * @param requestId blocklock request id
     * @returns details of the blocklock request, undefined if not found
     */
    async fetchBlocklockRequest(requestId: bigint): Promise<BlocklockRequest | undefined> {
        const request = await this.blocklockSender.getRequest.staticCall(requestId)
        const blockHeight = decodeCondition(request.condition)
        return {
            id: request.decryptionRequestID,
            blockHeight: blockHeight,
            ciphertext: parseSolidityCiphertext(request.ciphertext)
        }
    }

    /**
     * Fetch all blocklock requests, decryption keys / signatures excluded.
     * @returns a map with the details of each blocklock request
     */
    async fetchAllBlocklockRequests(): Promise<Map<bigint, BlocklockRequest>> {
        const requestFilter = this.blocklockSender.filters.BlocklockRequested()
        const requests = await this.blocklockSender.queryFilter(requestFilter)

        return new Map(Array.from(
            requests.map((event) => {
                const id = event.args.requestID
                const blockHeight = decodeCondition(event.args.condition)

                return [id, {
                    id,
                    blockHeight,
                    ciphertext: parseSolidityCiphertext(event.args.ciphertext),
                }]
            })
        ))
    }

    /**
     * Fetch the status of a blocklock request, including the decryption key / signature if available.
     * This function should be called to fetch blocklock requests that have been fulfilled, or to check
     * whether it has been fulfilled or not.
     * @param requestId blocklock request id
     * @returns details of the blocklock request, undefined if not found
     */
    async fetchBlocklockStatus(requestId: bigint): Promise<BlocklockStatus> {
        const {condition, ciphertext, decryptionKey} = await this.blocklockSender.getRequest.staticCall(requestId)

        return {
            id: requestId,
            blockHeight: decodeCondition(condition),
            decryptionKey: getBytes(decryptionKey),
            ciphertext: parseSolidityCiphertext(ciphertext),
        }
    }

    async getRequestPriceEstimateWithCurrentChainGasPrice(callbackGasLimit: bigint, gasPriceMultiplier: bigint): Promise<bigint> {
        if (this.signer.provider == null) {
            throw new Error("you must configure an RPC provider")
        }
        // 1. Get fee data
        const feeData = await this.signer.provider.getFeeData();

        // feeData.maxFeePerGas: Max total gas price we're willing to pay (base + priority), used in EIP-1559
        const maxFeePerGas = feeData.maxFeePerGas!;

        // feeData.maxPriorityFeePerGas: Tip to incentivize validators (goes directly to them)
        const maxPriorityFeePerGas = feeData.maxPriorityFeePerGas!;

        // 2. Determine whether to use legacy or EIP-1559 pricing
        let txGasPrice = (maxFeePerGas + maxPriorityFeePerGas) * gasPriceMultiplier;

        // 3. Estimate request price using the selected txGasPrice
        return await this.blocklockSender.estimateRequestPriceNative(
            callbackGasLimit,
            txGasPrice
        );
    }

    /**
     * Encrypt a message that can be decrypted once a certain blockHeight is reached.
     * @param message plaintext to encrypt
     * @param blockHeight time at which the decryption key should be released
     * @param pk public key of the scheme
     * @returns encrypted message
     */
    encrypt(message: Uint8Array, blockHeight: bigint, pk: G2 = this.networkConfig.publicKey): Ciphertext {
        if (message.length > BLOCKLOCK_MAX_MSG_LEN) {
            throw new Error(`cannot encrypt messages larger than ${BLOCKLOCK_MAX_MSG_LEN} bytes.`)
        }
        const identity = encodeCondition(blockHeight)
        return encrypt_towards_identity_g1(message, identity, pk, this.networkConfig.ibeOpts)
    }

    /**
     * Decrypt a ciphertext using a decryption key.
     * @param ciphertext the ciphertext to decrypt
     * @param key decryption key
     * @returns plaintext
     */
    decrypt(ciphertext: Ciphertext, key: Uint8Array): Uint8Array {
        if (ciphertext.W.length > BLOCKLOCK_MAX_MSG_LEN) {
            throw new Error(`cannot decrypt messages larger than ${BLOCKLOCK_MAX_MSG_LEN} bytes.`)
        }
        return decrypt_g1_with_preprocess(ciphertext, key, this.networkConfig.ibeOpts)
    }

    /**
     * Encrypt a message that can be decrypted once a certain blockHeight is reached.
     * @param message plaintext to encrypt
     * @param blockHeight time at which the decryption key should be released
     * @param pk public key of the scheme
     * @returns the identifier of the blocklock request, and the ciphertext
     */
    async encryptAndRegister(message: Uint8Array, blockHeight: bigint, pk: G2 = this.networkConfig.publicKey): Promise<{
        id: bigint,
        ciphertext: Ciphertext
    }> {
        const ciphertext = this.encrypt(message, blockHeight, pk)
        const id = await this.requestBlocklock(blockHeight, encodeCiphertextToSolidity(ciphertext))
        return {id, ciphertext}
    }

    /**
     * Try to decrypt a ciphertext with a specific blocklock id.
     * @param requestId blocklock id of the ciphertext to decrypt
     * @returns the plaintext if the decryption key is available, undefined otherwise
     */
    async decryptWithId(requestId: bigint): Promise<Uint8Array> {
        const status = await this.fetchBlocklockStatus(requestId)
        if (!status) {
            throw new Error("cannot find a request with this identifier")
        }

        // Decryption key has not been delivered yet, return
        if (status.decryptionKey.length === 0) {
            return new Uint8Array(0)
        }

        return this.decrypt(status.ciphertext, status.decryptionKey)
    }

    static createFilecoinMainnet(rpc: Signer | Provider): Blocklock {
        return new Blocklock(rpc, FILECOIN_MAINNET)
    }

    static createFilecoinCalibnet(rpc: Signer | Provider): Blocklock {
        return new Blocklock(rpc, FILECOIN_CALIBNET)
    }

    static createFurnace(rpc: Signer | Provider): Blocklock {
        return new Blocklock(rpc, FURNACE)
    }

    static createBaseSepolia(rpc: Signer | Provider): Blocklock {
        return new Blocklock(rpc, BASE_SEPOLIA)
    }

    static createPolygonPos(rpc: Signer | Provider): Blocklock {
        return new Blocklock(rpc, POLYGON_POS)
    }

    static createAvalancheCChain(rpc: Signer | Provider): Blocklock {
        return new Blocklock(rpc, AVALANCHE_C_CHAIN)
    }

    static createOptimismSepolia(rpc: Signer | Provider): Blocklock {
        return new Blocklock(rpc, OPTIMISM_SEPOLIA)
    }

    static createArbitrumSepolia(rpc: Signer | Provider): Blocklock {
        return new Blocklock(rpc, ARBITRUM_SEPOLIA)
    }

    static createSeiTestnet(rpc: Signer | Provider): Blocklock {
        return new Blocklock(rpc, SEI_TESTNET)
    }
}

export type BlocklockRequest = {
    id: bigint,
    blockHeight: bigint,
    ciphertext: Ciphertext,
}

export type BlocklockStatus = BlocklockRequest & {
    decryptionKey: Uint8Array,
}
