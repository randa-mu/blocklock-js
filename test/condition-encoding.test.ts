import { encodeCondition, decodeCondition } from "../src"
import { ethers } from "ethers"
import { describe, it, expect } from "@jest/globals"

describe("Block Height Condition Encoding/Decoding", () => {
    it("should encode a block height with the 0x42 prefix", () => {
        const blockHeight = 123456789n
        const encoded = encodeCondition(blockHeight)

        expect(encoded[0]).toBe(0x42) // prefix check

        // Manually decode to verify content
        const decoded = decodeCondition(encoded)
        expect(decoded).toBe(blockHeight)
    })

    it("should decode back to the original block height", () => {
        const originalBlockHeight = 987654321n
        const encoded = encodeCondition(originalBlockHeight)
        const decoded = decodeCondition(encoded)

        expect(decoded).toBe(originalBlockHeight)
    })

    it("should throw an error if the prefix is incorrect", () => {
        const fakeBytes = new Uint8Array([0x41, ...ethers.AbiCoder.defaultAbiCoder().encode(["uint256"], [123n]).slice(2).match(/.{1,2}/g)!.map(hex => parseInt(hex, 16))])

        expect(() => decodeCondition(fakeBytes)).toThrowError("unexpected condition tag: expected `b` for blocklock!")
    })

    it("should handle large block heights", () => {
        const largeBlockHeight = BigInt("123456789012345678901234567890")
        const encoded = encodeCondition(largeBlockHeight)
        const decoded = decodeCondition(encoded)

        expect(decoded).toBe(largeBlockHeight)
    })
})
