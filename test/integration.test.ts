import {describe, it, expect, beforeAll} from "@jest/globals"
import {equalBytes} from "@noble/curves/abstract/utils"
import dotenv from "dotenv"
import {JsonRpcProvider, NonceManager, Provider, Wallet, WebSocketProvider} from "ethers"

import {Blocklock} from "../src"

const TIMEOUT = 60_000
const FILECOIN_TIMEOUT = 300_000

describe("Blocklock integration tests with supported networks", () => {
    beforeAll(() => {
        dotenv.config()
    })

    it("should encrypt and decrypt for furnace testnet", async () => {
        const rpc = createProvider(process.env.FURNACE_RPC_URL || "")
        const wallet = new NonceManager(new Wallet(process.env.FURNACE_PRIVATE_KEY || "", rpc))
        const blocklock = Blocklock.createFurnace(wallet)
        await runEncryptionTest(rpc, blocklock)
    }, TIMEOUT)

    // filecoin calibnet is very slow
    // the test can take up to 260s
    it("should encrypt and decrypt for filecoin calibnet", async () => {
        const rpc = createProvider(process.env.FILECOIN_RPC_URL || "")
        const wallet = new NonceManager(new Wallet(process.env.FILECOIN_PRIVATE_KEY || "", rpc))
        const blocklock = Blocklock.createFilecoinCalibnet(wallet)
        await runEncryptionTest(rpc, blocklock)
    }, FILECOIN_TIMEOUT)

    it("should encrypt and decrypt for polygon pos", async () => {
        const rpc = createProvider(process.env.POLYGON_RPC_URL || "")
        const wallet = new NonceManager(new Wallet(process.env.POLYGON_PRIVATE_KEY || "", rpc))
        const blocklock = Blocklock.createPolygonPos(wallet)
        await runEncryptionTest(rpc, blocklock)
    }, TIMEOUT)

    it("should encrypt and decrypt for base sepolia", async () => {
        const rpc = createProvider(process.env.BASE_RPC_URL || "")
        const wallet = new NonceManager(new Wallet(process.env.BASE_PRIVATE_KEY || "", rpc))
        const blocklock = Blocklock.createBaseSepolia(wallet)
        await runEncryptionTest(rpc, blocklock)
    }, TIMEOUT)
})

async function runEncryptionTest(rpc: Provider, blocklock: Blocklock) {
    const plaintext = Buffer.from("hello world!")
    const currentBlock = await rpc.getBlockNumber()
    const targetBlock = BigInt(currentBlock + 5)
    console.log(`before encrypt: ${currentBlock} and target: ${targetBlock}`)
    const {id} = await blocklock.encryptAndRegister(plaintext, targetBlock)
    console.log("after encrypt")

    let result = new Uint8Array(0)
    while (result.length === 0) {
        console.log("decryption key not set yet")
        await sleep(1000)
        result = await blocklock.decryptWithId(id)
    }

    console.log(result)
    expect(equalBytes(result, plaintext)).toBeTruthy()
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

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
}