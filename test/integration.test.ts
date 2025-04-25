import {describe, it, expect} from "@jest/globals"

import {Blocklock} from "../src"
import {JsonRpcProvider, NonceManager, Provider, Wallet, WebSocketProvider} from "ethers"
import {bytesEqual} from "../blocklock-solidity/scripts/crypto"

const TIMEOUT = 20_000
const FILECOIN_TIMEOUT = 200_000

describe("blocklock", () => {
    it("should encrypt and decrypt for furnace testnet", async () => {
        const rpc = createProvider(process.env.FURNACE_RPC_URL || "")
        const wallet = new NonceManager(new Wallet(process.env.FURNACE_PRIVATE_KEY || "", rpc))
        const blocklock = Blocklock.createFurnace(wallet)
        await runEncryptionTest(rpc, blocklock)
    }, TIMEOUT)

    it("should encrypt and decrypt for filecoin calibnet", async () => {
        const rpc = createProvider(process.env.FILECOIN_RPC_URL || "")
        const wallet = new NonceManager(new Wallet(process.env.FILECOIN_PRIVATE_KEY || "", rpc))
        const blocklock = Blocklock.createFilecoinCalibnet(wallet)
        await runEncryptionTest(rpc, blocklock)
    }, FILECOIN_TIMEOUT)


})

async function runEncryptionTest(rpc: Provider, blocklock: Blocklock) {
    const plaintext = Buffer.from("hello world!")
    const currentBlock = await rpc.getBlockNumber()
    const targetBlock = BigInt(currentBlock + 2)
    const {id} = await blocklock.encryptAndRegister(plaintext, targetBlock)

    while (await rpc.getBlockNumber() < targetBlock) {
        // wait
    }

    const result = await blocklock.decryptWithId(id)
    expect(bytesEqual(result, plaintext)).toBeTruthy()
}

function createProvider(url: string): JsonRpcProvider | WebSocketProvider {
    if (url.startsWith("http")) {
        return new JsonRpcProvider(url, undefined, {pollingInterval: 1000})
    }
    if (url.startsWith("ws")) {
        return new WebSocketProvider(url)
    }
    throw new Error(`provider cannot be created for the protocol in ${url}`)
}
