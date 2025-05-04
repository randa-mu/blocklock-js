import { getBytes, ethers, Signer, Provider, BigNumberish, BytesLike } from "ethers"
import { keccak_256 } from "@noble/hashes/sha3"
import {
    encodeCiphertextToSolidity,
    encodeParams,
    extractSingleLog, parseSolidityCiphertext,
} from "./ethers-utils"
import { Ciphertext, decrypt_g1_with_preprocess, encrypt_towards_identity_g1, G2, IbeOpts } from "./crypto/ibe-bn254"
import { BlocklockSender, BlocklockSender__factory } from "./generated"
import { TypesLib } from "./generated/BlocklockSender"

export type BigIntPair = {
    c0: bigint;
    c1: bigint;
};

export type BlockLockPublicKey = {
    x: BigIntPair;
    y: BigIntPair;
};

const BLOCKLOCK_MAX_MSG_LEN: number = 256

const createBlocklockIbeOpts = (chainId: bigint): IbeOpts => ({
    hash: keccak_256,
    k: 128,
    expand_fn: "xmd",
    dsts: {
        H1_G1: Buffer.from(`BLOCKLOCK_BN254G1_XMD:KECCAK-256_SVDW_RO_H1_${encodeParams(["uint256"], [chainId])}_`),
        H2: Buffer.from(`BLOCKLOCK_BN254_XMD:KECCAK-256_H2_${encodeParams(["uint256"], [chainId])}_`),
        H3: Buffer.from(`BLOCKLOCK_BN254_XMD:KECCAK-256_H3_${encodeParams(["uint256"], [chainId])}_`),
        H4: Buffer.from(`BLOCKLOCK_BN254_XMD:KECCAK-256_H4_${encodeParams(["uint256"], [chainId])}_`),
    },
})

export const BLOCKLOCK_DEFAULT_PUBLIC_KEY: BlockLockPublicKey = {
    x: {
        c0: BigInt("0x2691d39ecc380bfa873911a0b848c77556ee948fb8ab649137d3d3e78153f6ca"),
        c1: BigInt("0x2863e20a5125b098108a5061b31f405e16a069e9ebff60022f57f4c4fd0237bf"),
    },
    y: {
        c0: BigInt("0x193513dbe180d700b189c529754f650b7b7882122c8a1e242a938d23ea9f765c"),
        c1: BigInt("0x11c939ea560caf31f552c9c4879b15865d38ba1dfb0f7a7d2ac46a4f0cae25ba"),
    },
};

type GasParams = {
    gasLimit: number
    maxFeePerGas: bigint
    maxPriorityFeePerGas: bigint
}

const defaultGasParams: GasParams = {
    gasLimit: 400_000,
    maxFeePerGas: ethers.parseUnits("0.2", "gwei"),
    maxPriorityFeePerGas: ethers.parseUnits("0.2", "gwei"),
}

const filecoinGasParams: GasParams = {
    gasLimit: defaultGasParams.gasLimit * 500,
    maxFeePerGas: ethers.parseUnits("0.2", "gwei"),
    maxPriorityFeePerGas: ethers.parseUnits("0.2", "gwei"),
}

/* addresses of the deployed blocklockSender contracts */
export const FURNACE_TESTNET_CONTRACT_ADDRESS = "0x241B6D7A4c4fb592e796094bf31A41c12b61d7fe"
export const FILECOIN_CALIBNET_CONTRACT_ADDRESS = "0xF00aB3B64c81b6Ce51f8220EB2bFaa2D469cf702"
export const BASE_SEPOLIA_CONTRACT_ADDRESS = "0x82Fed730CbdeC5A2D8724F2e3b316a70A565e27e"
export const POLYGON_POS_CONTRACT_ADDRESS = "0x82Fed730CbdeC5A2D8724F2e3b316a70A565e27e"

const iface = BlocklockSender__factory.createInterface()

export class Blocklock {
    private blocklockSender: BlocklockSender
    private blocklockPublicKey: BlockLockPublicKey
    private ibeOpts: IbeOpts
    private gasParams: GasParams
    private signer: Signer | Provider

    constructor(
        signer: Signer | Provider,
        private readonly blocklockSenderContractAddress: string,
        chainId: bigint,
        gasParams: GasParams = defaultGasParams,
        blocklockPublicKey: BlockLockPublicKey = BLOCKLOCK_DEFAULT_PUBLIC_KEY,
    ) {
        this.blocklockSender = BlocklockSender__factory.connect(blocklockSenderContractAddress, signer)
        this.blocklockPublicKey = blocklockPublicKey
        this.gasParams = gasParams
        this.ibeOpts = createBlocklockIbeOpts(chainId)
        this.signer = signer
    }

    static createFilecoinCalibnet(rpc: Signer | Provider): Blocklock {
        return new Blocklock(rpc, FILECOIN_CALIBNET_CONTRACT_ADDRESS, 314159n, filecoinGasParams)
    }

    static createFurnace(rpc: Signer | Provider): Blocklock {
        return new Blocklock(rpc, FURNACE_TESTNET_CONTRACT_ADDRESS, 64630n)
    }

    static createBaseSepolia(rpc: Signer | Provider): Blocklock {
        return new Blocklock(rpc, BASE_SEPOLIA_CONTRACT_ADDRESS, 84532n)
    }

    static createPolygonPos(rpc: Signer | Provider): Blocklock {
        return new Blocklock(rpc, POLYGON_POS_CONTRACT_ADDRESS, 137n)
    }

    static createFromChainId(rpc: Signer | Provider, chainId: BigNumberish): Blocklock {
        switch (chainId.toString().toLowerCase()) {
            case "314159":
            case "314159n":
            case "0x4cb2f":
                return Blocklock.createFilecoinCalibnet(rpc)

            case "64630":
            case "64630n":
            case "0xfc76":
                return Blocklock.createFurnace(rpc)

            case "84532":
            case "84532n":
            case "0x14a34":
                return Blocklock.createBaseSepolia(rpc)

            case "137":
            case "137n":
            case "0x89":
                return Blocklock.createPolygonPos(rpc)

            default:
                throw new Error("unsupported chainId :(")
        }
    }

    /**
     * Request a blocklock decryption at block number blockHeight.
     * @param blockHeight time at which the decryption should key should be released
     * @param ciphertext encrypted message to store on chain
     * @returns blocklock request id as a string
     */
    async requestBlocklock(blockHeight: bigint, ciphertext: TypesLib.CiphertextStruct): Promise<bigint> {
        const conditionBytes = encodeCondition(blockHeight);

        // // Get request price (native token)
        // const requestPriceNative = await this.blocklockSender.calculateRequestPriceNative.staticCall(this.gasParams.gasLimit);
        // const cost = requestPriceNative // * 2n;
        // console.log("request price", cost)

        // // Estimate gas usage for the request
        // const estimatedGas = await this.blocklockSender.requestBlocklock.estimateGas(
        //     this.gasParams.gasLimit,
        //     conditionBytes,
        //     ciphertext,
        //     { value: cost }
        // );

        // // Add a buffer to the gas estimate
        // const gasBuffer = estimatedGas;// * 200n / 100n;

        // // Send transaction with buffered gas limit
        // const tx = await this.blocklockSender.requestBlocklock(
        //     this.gasParams.gasLimit,
        //     conditionBytes,
        //     ciphertext,
        //     {
        //         value: cost,
        //         gasLimit: gasBuffer,
        //     }
        // );

        // 1. Get EIP-1559 fee data
        const feeData = await this.signer.provider?.getFeeData();
        const maxFeePerGas = feeData?.maxFeePerGas!;
        const maxPriorityFeePerGas = feeData?.maxPriorityFeePerGas!;

        const latestBlock = await this.signer.provider?.getBlock("latest");
        const baseFeePerGas = latestBlock?.baseFeePerGas!;

        // 2. Compute effective gas price (min of maxFeePerGas and base + priority)
        // maxFeePerGas is the maximum total fee per unit of gas that a user is willing to pay.
        // Also set by the user.
        // Ensures users do not overpay during spikes in baseFeePerGas.
        // Must satisfy: maxFeePerGas >= baseFeePerGas + maxPriorityFeePerGas
        // where, maxPriorityFeePerGas is a tip for validators, and 
        // baseFeePerGas is set by the network and represents the minimum gas price required to include a transaction in a block.
        // It is burned, not paid to miners/validators. 
        // Adjusts up or down depending on block congestion (target = 50% full).
        const effectiveGasPrice =
            maxFeePerGas < baseFeePerGas + maxPriorityFeePerGas ? maxFeePerGas : baseFeePerGas + maxPriorityFeePerGas;


        // 3. Calculate the request price using the callback gas limit and the current network gas price
        // at the time of the request, to avoid price changes at request time 
        // if network gas price fluctuates quickly
        // Request price estimation uses gas price or fallback gas price setting in blocklockSender fee configuration.
        const requestPrice = await this.blocklockSender.estimateRequestPriceNative(
            this.gasParams.gasLimit,
            effectiveGasPrice
        );

        const valueToSend = requestPrice;

        // 4. Estimate the gas cost of the request
        const estimatedGas = await this.blocklockSender.requestBlocklock.estimateGas(
            this.gasParams.gasLimit,
            conditionBytes,
            ciphertext,
            {
                value: valueToSend,
                maxFeePerGas,
                maxPriorityFeePerGas,
            }
        );

        // 5. Send the request
        const tx = await this.blocklockSender.requestBlocklock(
            this.gasParams.gasLimit,
            conditionBytes,
            ciphertext,
            {
                value: valueToSend,
                maxFeePerGas,
                maxPriorityFeePerGas,
                gasLimit: estimatedGas
            }
        );
        const receipt = await tx.wait();
        if (!receipt) {
            throw new Error("Transaction was not mined");
        }

        const [requestID] = extractSingleLog(
            iface,
            receipt,
            this.blocklockSenderContractAddress,
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
        const { condition, ciphertext, decryptionKey } = await this.blocklockSender.getRequest.staticCall(requestId)

        return {
            id: requestId,
            blockHeight: decodeCondition(condition),
            decryptionKey: getBytes(decryptionKey),
            ciphertext: parseSolidityCiphertext(ciphertext),
        }
    }

    /**
     * Encrypt a message that can be decrypted once a certain blockHeight is reached.
     * @param message plaintext to encrypt
     * @param blockHeight time at which the decryption key should be released
     * @param pk public key of the scheme
     * @returns encrypted message
     */
    encrypt(message: Uint8Array, blockHeight: bigint, pk: G2 = this.blocklockPublicKey): Ciphertext {
        if (message.length > BLOCKLOCK_MAX_MSG_LEN) {
            throw new Error(`cannot encrypt messages larger than ${BLOCKLOCK_MAX_MSG_LEN} bytes.`)
        }
        const identity = encodeCondition(blockHeight)
        return encrypt_towards_identity_g1(message, identity, pk, this.ibeOpts)
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
        return decrypt_g1_with_preprocess(ciphertext, key, this.ibeOpts)
    }

    /**
     * Encrypt a message that can be decrypted once a certain blockHeight is reached.
     * @param message plaintext to encrypt
     * @param blockHeight time at which the decryption key should be released
     * @param pk public key of the scheme
     * @returns the identifier of the blocklock request, and the ciphertext
     */
    async encryptAndRegister(message: Uint8Array, blockHeight: bigint, pk: G2 = this.blocklockPublicKey): Promise<{
        id: bigint,
        ciphertext: Ciphertext
    }> {
        const ciphertext = this.encrypt(message, blockHeight, pk)
        const id = await this.requestBlocklock(blockHeight, encodeCiphertextToSolidity(ciphertext))
        return { id, ciphertext }
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
}

export type BlocklockRequest = {
    id: bigint,
    blockHeight: bigint,
    ciphertext: Ciphertext,
}

export type BlocklockStatus = BlocklockRequest & {
    decryptionKey: Uint8Array,
}

// encodes a block height condition with the correct prefix
export function encodeCondition(blockHeight: bigint): Uint8Array {
    const blockHeightBytes = getBytes(encodeParams(["uint256"], [blockHeight]))
    // 0x42 is the magic 'B' tag for the `blockHeight` condition
    return new Uint8Array([0x42, ...blockHeightBytes])
}

export function decodeCondition(bytes: BytesLike): bigint {
    const b = getBytes(bytes)
    if (b[0] !== 0x42) {
        throw new Error("unexpected condition tag: expected `b` for blocklock!")
    }
    const [round] = ethers.AbiCoder.defaultAbiCoder().decode(["uint256"], b.slice(1))
    return round
}
