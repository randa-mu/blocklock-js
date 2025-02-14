// extracts an event log of a given type from a transaction receipt that matches the address provided
import {EthersError, EventFragment, Interface, Result, TransactionReceipt} from "ethers"

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
