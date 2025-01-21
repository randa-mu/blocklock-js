import {describe, it, expect} from "@jest/globals"
import {Wallet} from "ethers"
import {Blocklock} from "../src"

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

describe("Blocklock", () => {
    it("class can be constructed", () => {
        const wallet = new Wallet("0x5cb3c5ba25c91d84ef5dabf4152e909795074f9958b091b010644cb9c30e3203")
        const blocklockContractAddress = "0xfd1bf3fcbf2e250abff4a61670dfa3ce740453e5"
        const blocklockjs = new Blocklock(wallet, blocklockContractAddress)
        expect(blocklockjs).not.toEqual(null)
    })
})
