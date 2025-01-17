import {describe, it, expect} from "@jest/globals"
import {Wallet} from "ethers"
import {Blocklock} from "../src"

describe("encryption", () => {
    it("class can be constructed", () => {
        const wallet = new Wallet("0x5cb3c5ba25c91d84ef5dabf4152e909795074f9958b091b010644cb9c30e3203")
        const blocklockContractAddress = "0xfd1bf3fcbf2e250abff4a61670dfa3ce740453e5"
        const blocklockjs = new Blocklock(wallet, blocklockContractAddress)
        expect(blocklockjs).not.toEqual(null)
    })
})