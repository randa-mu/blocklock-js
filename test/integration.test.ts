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

    it("should return non-zero request price to cover BLS operations when callbackGasLimit is zero", async () => {
        const rpc = createProvider(process.env.FILECOIN_MAINNET_RPC_URL || "")
        const wallet = new NonceManager(new Wallet(process.env.FILECOIN_MAINNET_PRIVATE_KEY || "", rpc))
        const blocklock = Blocklock.createFilecoinMainnet(wallet)
        const callbackGasLimit = 0n;
        const [estimatedRequestPrice, ] = await blocklock.calculateRequestPriceNative(callbackGasLimit);
        expect(estimatedRequestPrice).toBeGreaterThan(0n);
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

    it.skip("should encrypt and decrypt for filecoin mainnet", async () => {
        const rpc = createProvider(process.env.FILECOIN_MAINNET_RPC_URL || "")
        const wallet = new NonceManager(new Wallet(process.env.FILECOIN_MAINNET_PRIVATE_KEY || "", rpc))
        const blocklock = Blocklock.createFilecoinMainnet(wallet)
        await runEncryptionTest(rpc, blocklock)
    }, FILECOIN_TIMEOUT)

    // filecoin calibnet is very slow
    // the test can take up to 260s
    it.skip("should encrypt and decrypt for filecoin calibnet", async () => {
        const rpc = createProvider(process.env.FILECOIN_RPC_URL || "")
        const wallet = new NonceManager(new Wallet(process.env.FILECOIN_PRIVATE_KEY || "", rpc))
        const blocklock = Blocklock.createFilecoinCalibnet(wallet)
        await runEncryptionTest(rpc, blocklock)
    }, FILECOIN_TIMEOUT)

    // skipped because costs money
    it.skip("should encrypt and decrypt for avalanche c chain", async () => {
        const rpc = createProvider(process.env.AVALANCHE_C_CHAIN_RPC_URL || "")
        const wallet = new NonceManager(new Wallet(process.env.AVALANCHE_C_CHAIN_PRIVATE_KEY || "", rpc))
        const blocklock = Blocklock.createAvalancheCChain(wallet)
        await runEncryptionTest(rpc, blocklock)
    }, TIMEOUT)

    it("should encrypt and decrypt for optimism sepolia", async () => {
        const rpc = createProvider(process.env.OPTIMISM_SEPOLIA_RPC_URL || "")
        const wallet = new NonceManager(new Wallet(process.env.OPTIMISM_SEPOLIA_PRIVATE_KEY || "", rpc))
        const blocklock = Blocklock.createOptimismSepolia(wallet)
        await runEncryptionTest(rpc, blocklock)
    }, TIMEOUT)

    it("should encrypt and decrypt for arbitrum sepolia", async () => {
        const rpc = createProvider(process.env.ARBITRUM_SEPOLIA_RPC_URL || "")
        const wallet = new NonceManager(new Wallet(process.env.ARBITRUM_SEPOLIA_PRIVATE_KEY || "", rpc))
        const blocklock = Blocklock.createArbitrumSepolia(wallet)
        await runEncryptionTest(rpc, blocklock)
    }, TIMEOUT)

    // skipping temporarily because there's some weirdness with their RPC
    it.skip("should encrypt and decrypt for sei testnet", async () => {
        const rpc = createProvider(process.env.SEI_TESTNET_RPC_URL || "")
        const wallet = new NonceManager(new Wallet(process.env.SEI_TESTNET_PRIVATE_KEY || "", rpc))
        const blocklock = Blocklock.createSeiTestnet(wallet)
        await runEncryptionTest(rpc, blocklock)
    }, TIMEOUT)
})

async function runEncryptionTest(rpc: Provider, blocklock: Blocklock) {
    const plaintext = Buffer.from("hello world!")
    const currentBlock = await rpc.getBlockNumber()
    const targetBlock = BigInt(currentBlock + 5)
    const {id} = await blocklock.encryptAndRegister(plaintext, targetBlock)

    let result = new Uint8Array(0)
    while (result.length === 0) {
        await sleep(1000)
        result = await blocklock.decryptWithId(id)
    }

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