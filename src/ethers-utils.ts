// extracts an event log of a given type from a transaction receipt that matches the address provided
import {
    AbiCoder,
    BytesLike, ethers,
    EthersError,
    EventFragment,
    getBytes,
    Interface,
    ParamType,
    Result,
    TransactionReceipt
} from "ethers"
import {Ciphertext} from "./crypto/ibe-bn254"
import {TypesLib} from "./generated/BlocklockSender"

export function extractLogs<T extends Interface, E extends EventFragment>(iface: T, receipt: TransactionReceipt, contractAddress: string, event: E): Array<Result> {
    return receipt.logs
        .filter(log => log.address.toLowerCase() === contractAddress.toLowerCase())
        .map(log => iface.decodeEventLog(event, log.data, log.topics))
}

// returns the first instance of an event log from a transaction receipt that matches the address provided
export function extractSingleLog<T extends Interface, E extends EventFragment>(iface: T, receipt: TransactionReceipt, contractAddress: string, event: E): Result {
    const events = extractLogs(iface, receipt, contractAddress, event)
    if (events.length === 0) {
        throw Error(`contract at ${contractAddress} didn't emit the ${event.name} event`)
    }
    return events[0]
}

// returns a useful error message from common errors that come out of ethers
export function extractErrorMessage(err: EthersError, iface: Interface): string {
    switch (err.code) {
        case "CALL_EXCEPTION": {
            const e = err as any
            if (e.data) {
                const parsedError = iface.parseError(e.data)
                if (!parsedError) {
                    return `unknown error: ${e.message}`
                } else {
                    return parsedError.args[0]
                }
            }
            return `unknown call exception: ${err.message}`
        }
        case "INSUFFICIENT_FUNDS":
            return "insufficient funds"
        case "NONCE_EXPIRED":
            return "your nonce expired - did you resend the tx?"
        default:
            return `unknown error: ${err.message}`
    }
}

export function isEthersError(error: unknown): error is EthersError {
    return (error as EthersError)?.code !== undefined;
}

// any because that's how naughty ethers wants it
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const encodeParams = (dataTypes: readonly ParamType[] | readonly string[], data: readonly any[]): string => {
    const abiCoder = AbiCoder.defaultAbiCoder()
    return abiCoder.encode(dataTypes, data)
}

export const decodeParams= (dataTypes: readonly ParamType[] | readonly string[], data: BytesLike): Result => {
    const abiCoder = AbiCoder.defaultAbiCoder()
    return abiCoder.decode(dataTypes, data)
}

export function parseSolidityCiphertextString(ciphertext: string): Ciphertext {
    const ctBytes = getBytes(ciphertext);
    const ct: TypesLib.CiphertextStructOutput = decodeParams(
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


export function parseSolidityCiphertext(ciphertext: TypesLib.CiphertextStructOutput): Ciphertext {
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


export function encodeCiphertextToSolidity(ciphertext: Ciphertext): TypesLib.CiphertextStruct {
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