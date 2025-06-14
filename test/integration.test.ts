import {describe, it, expect, beforeAll} from "@jest/globals"
import {equalBytes} from "@noble/curves/abstract/utils"
import dotenv from "dotenv"
import {JsonRpcProvider, NonceManager, Provider, Wallet, WebSocketProvider} from "ethers"
import {BlocklockSender__factory} from "../src/generated"

import {Blocklock, FILECOIN_CALIBNET_CONTRACT_ADDRESS} from "../src"

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

    it("should return request price estimate with current chain gas price and multiplier or buffer for filecoin calibnet", async () => {
        const rpc = createProvider(process.env.FILECOIN_RPC_URL || "")
        const wallet = new NonceManager(new Wallet(process.env.FILECOIN_PRIVATE_KEY || "", rpc))
        const blocklock = Blocklock.createFilecoinCalibnet(wallet)
        const callbackGasLimit = 100000n
        const gasPriceMultiplier = 50n;
        const blocklockSender = BlocklockSender__factory.connect(FILECOIN_CALIBNET_CONTRACT_ADDRESS, wallet)
        const estimatedPrice = await blocklockSender.calculateRequestPriceNative(callbackGasLimit)
        const estimatedRequestPriceWithBuffer = await blocklock.getRequestPriceEstimateWithCurrentChainGasPrice(callbackGasLimit, gasPriceMultiplier)
        expect(estimatedRequestPriceWithBuffer).toBeGreaterThan(estimatedPrice)
    })

    it("should encrypt and decrypt for filecoin mainnet", async () => {
        const rpc = createProvider(process.env.FILECOIN_MAINNET_RPC_URL || "")
        const wallet = new NonceManager(new Wallet(process.env.FILECOIN_MAINNET_PRIVATE_KEY || "", rpc))
        const blocklock = Blocklock.createFilecoinMainnet(wallet)
        await runEncryptionTest(rpc, blocklock)
    }, FILECOIN_TIMEOUT)

    it("should return non-zero request price to cover BLS operations when callbackGasLimit is zero", async () => {
        const rpc = createProvider(process.env.FILECOIN_MAINNET_RPC_URL || "")
        const wallet = new NonceManager(new Wallet(process.env.FILECOIN_MAINNET_PRIVATE_KEY || "", rpc))
        const blocklock = Blocklock.createFilecoinMainnet(wallet)
        const callbackGasLimit = 0n;
        const estimatedRequestPrice = await blocklock.calculateRequestPriceNative(callbackGasLimit);
        expect(estimatedRequestPrice).toBeGreaterThan(0n);
    }, FILECOIN_TIMEOUT)

    it("should return higher request price for non-zero callbackGasLimit", async () => {
        const rpc = createProvider(process.env.FILECOIN_MAINNET_RPC_URL || "")
        const wallet = new NonceManager(new Wallet(process.env.FILECOIN_MAINNET_PRIVATE_KEY || "", rpc))
        const blocklock = Blocklock.createFilecoinMainnet(wallet)
        let callbackGasLimit = 0n;
        const estimatedRequestPriceForZeroCallback = await blocklock.calculateRequestPriceNative(callbackGasLimit);
        callbackGasLimit = 500_000n;
        const estimatedRequestPriceForNonZeroCallback = await blocklock.calculateRequestPriceNative(callbackGasLimit);
        expect(estimatedRequestPriceForNonZeroCallback).toBeGreaterThan(estimatedRequestPriceForZeroCallback);
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