import {getBytes, AbiCoder, ethers, AbstractSigner} from "ethers"
import {keccak_256} from "@noble/hashes/sha3"
import {BlocklockSender, BlocklockSender__factory} from "./generated"
import {TypesLib as BlocklockTypes} from "./generated/BlocklockSender"
import {extractSingleLog} from "./ethers-utils"
import {Ciphertext, decrypt_g1_with_preprocess, encrypt_towards_identity_g1, G2, IbeOpts} from "./crypto/ibe-bn254"

export type BigIntPair = {
    c0: bigint;
    c1: bigint;
};

export type BlockLockPublicKey = {
    x: BigIntPair;
    y: BigIntPair;
};

const BLOCKLOCK_MAX_MSG_LEN: number = 256

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
};

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

const filecoinGasParams: GasParams = {
    gasLimit: 3_000_000_000,
    maxFeePerGas: ethers.parseUnits("0.2", "gwei"),
    maxPriorityFeePerGas: ethers.parseUnits("0.2", "gwei"),
}

const iface = BlocklockSender__factory.createInterface()

export class Blocklock {
    private blocklockSender: BlocklockSender
    private blocklockPublicKey: any
    private gasParams: GasParams

    constructor(signer: AbstractSigner, private readonly blocklockSenderContractAddress: string, blocklockPublicKey: BlockLockPublicKey = BLOCKLOCK_DEFAULT_PUBLIC_KEY, gasParams: GasParams = filecoinGasParams) {
        this.blocklockSender = BlocklockSender__factory.connect(blocklockSenderContractAddress, signer)
        this.blocklockPublicKey = blocklockPublicKey
        this.gasParams = gasParams
    }

    /**
     * Request a blocklock decryption at block number blockHeight.
     * @param blockHeight time at which the decryption should key should be released
     * @param ciphertext encrypted message to store on chain
     * @returns blocklock request id as a string
     */
    async requestBlocklock(blockHeight: bigint, ciphertext: BlocklockTypes.CiphertextStruct): Promise<bigint> {
        await this.blocklockSender.requestBlocklock.staticCall(blockHeight, ciphertext)
        const tx = await this.blocklockSender.requestBlocklock(blockHeight, ciphertext, this.gasParams)
        const receipt = await tx.wait()
        if (!receipt) {
            throw new Error("transaction was not mined")
        }

        const [requestID] = extractSingleLog(iface, receipt, this.blocklockSenderContractAddress, iface.getEvent("BlocklockRequested"))
        return requestID
    }

    /**
     * Fetch the details of a blocklock request, decryption key / signature excluded.
     * This function should be called to fetch pending blocklock requests.
     * @param requestId blocklock request id
     * @returns details of the blocklock request, undefined if not found
     */
    async fetchBlocklockRequest(requestId: bigint): Promise<BlocklockRequest | undefined> {
        const request = await this.blocklockSender.getRequest.staticCall(requestId)
        return {
            id: request.decryptionRequestID,
            blockHeight: request.blockHeight,
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
                const requestID = event.args.requestID

                return [requestID, {
                    id: requestID,
                    blockHeight: event.args.blockHeight,
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
        const {blockHeight, ciphertext, decryptionKey} = await this.blocklockSender.getRequest.staticCall(requestId)

        return {
            id: requestId,
            blockHeight,
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
        const identity = blockHeightToBEBytes(blockHeight)
        return encrypt_towards_identity_g1(message, identity, pk, BLOCKLOCK_IBE_OPTS)
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
        return decrypt_g1_with_preprocess(ciphertext, key, BLOCKLOCK_IBE_OPTS)
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
}

export type BlocklockRequest = {
    id: bigint,
    blockHeight: bigint,
    ciphertext: Ciphertext,
}

export type BlocklockStatus = BlocklockRequest & {
    decryptionKey: Uint8Array,
}

export function parseSolidityCiphertext(ciphertext: BlocklockTypes.CiphertextStructOutput): Ciphertext {
    const uX0 = ciphertext.u.x[0]
    const uX1 = ciphertext.u.x[1]
    const uY0 = ciphertext.u.y[0]
    const uY1 = ciphertext.u.y[1]
    return {
        U: {x: {c0: uX0, c1: uX1}, y: {c0: uY0, c1: uY1}},
        V: getBytes(ciphertext.v),
        W: getBytes(ciphertext.w),
    }
}

export function parseSolidityCiphertextString(ciphertext: string): Ciphertext {
    const ctBytes = getBytes(ciphertext);
    const ct: BlocklockTypes.CiphertextStructOutput = AbiCoder.defaultAbiCoder().decode(
        ["tuple(tuple(uint256[2] x, uint256[2] y) u, bytes v, bytes w)"],
        ctBytes,
    )[0];

    const uX0 = ct.u.x[0];
    const uX1 = ct.u.x[1];
    const uY0 = ct.u.y[0];
    const uY1 = ct.u.y[1];
    return {
        U: {x: {c0: uX0, c1: uX1}, y: {c0: uY0, c1: uY1}},
        V: getBytes(ct.v),
        W: getBytes(ct.w),
    };
}

export function encodeCiphertextToSolidity(ciphertext: Ciphertext): BlocklockTypes.CiphertextStruct {
    const u: { x: [bigint, bigint], y: [bigint, bigint] } = {
        x: [ciphertext.U.x.c0, ciphertext.U.x.c1],
        y: [ciphertext.U.y.c0, ciphertext.U.y.c1]
    }

    return {
        u,
        v: ciphertext.V,
        w: ciphertext.W,
    }
}

function blockHeightToBEBytes(blockHeight: bigint) {
    const buffer = new ArrayBuffer(32)
    const dataView = new DataView(buffer)
    dataView.setBigUint64(0, (blockHeight >> 192n) & 0xffff_ffff_ffff_ffffn)
    dataView.setBigUint64(8, (blockHeight >> 128n) & 0xffff_ffff_ffff_ffffn)
    dataView.setBigUint64(16, (blockHeight >> 64n) & 0xffff_ffff_ffff_ffffn)
    dataView.setBigUint64(24, blockHeight & 0xffff_ffff_ffff_ffffn)

    return new Uint8Array(buffer)
}
