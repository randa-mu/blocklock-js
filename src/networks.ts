import {ethers} from "ethers"
import {keccak_256} from "@noble/hashes/sha3"
import {IbeOpts} from "./crypto/ibe-bn254"
import {BLOCKLOCK_MAINNET_PUBLIC_KEY, BLOCKLOCK_TESTNET_PUBLIC_KEY, BlocklockPublicKey} from "./keys"
import {encodeBytes} from "./utils"

export type NetworkConfig = {
    name: string
    chainId: bigint
    contractAddress: `0x${string}`
    publicKey: BlocklockPublicKey
    ibeOpts: IbeOpts,
    gasLimit: number
    maxFeePerGas: bigint
    maxPriorityFeePerGas: bigint
    // e.g. 100% = 2x total
    gasBufferPercent: bigint
    callbackGasLimitDefault: bigint
    gasMultiplierDefault: bigint
}

export const FILECOIN_CALIBNET: NetworkConfig = {
    name: "filecoin_calibnet",
    chainId: 314159n,
    contractAddress: "0xF00aB3B64c81b6Ce51f8220EB2bFaa2D469cf702",
    publicKey: BLOCKLOCK_TESTNET_PUBLIC_KEY,
    ibeOpts: {
        hash: keccak_256,
        k: 128,
        expand_fn: "xmd",
        dsts: {
            H1_G1: encodeBytes(`BLOCKLOCK_BN254G1_XMD:KECCAK-256_SVDW_RO_H1_0x000000000000000000000000000000000000000000000000000000000004cb2f_`),
            H2: encodeBytes(`BLOCKLOCK_BN254_XMD:KECCAK-256_H2_0x000000000000000000000000000000000000000000000000000000000004cb2f_`),
            H3: encodeBytes(`BLOCKLOCK_BN254_XMD:KECCAK-256_H3_0x000000000000000000000000000000000000000000000000000000000004cb2f_`),
            H4: encodeBytes(`BLOCKLOCK_BN254_XMD:KECCAK-256_H4_0x000000000000000000000000000000000000000000000000000000000004cb2f_`),
        }
    },
    gasLimit: 5_000_000,
    maxFeePerGas: ethers.parseUnits("0.2", "gwei"),
    maxPriorityFeePerGas: ethers.parseUnits("0.2", "gwei"),
    gasBufferPercent: 400n,
    callbackGasLimitDefault: 444_000_000n,
    gasMultiplierDefault: 50n,
}

export const FILECOIN_MAINNET: NetworkConfig = {
    name: "filecoin_mainnet",
    chainId: 314n,
    contractAddress: "0x34092470CC59A097d770523931E3bC179370B44b",
    publicKey: BLOCKLOCK_MAINNET_PUBLIC_KEY,
    ibeOpts: {
        hash: keccak_256,
        k: 128,
        expand_fn: "xmd",
        dsts: {
            H1_G1: encodeBytes(`BLOCKLOCK_BN254G1_XMD:KECCAK-256_SVDW_RO_H1_0x000000000000000000000000000000000000000000000000000000000000013a_`),
            H2: encodeBytes(`BLOCKLOCK_BN254_XMD:KECCAK-256_H2_0x000000000000000000000000000000000000000000000000000000000000013a_`),
            H3: encodeBytes(`BLOCKLOCK_BN254_XMD:KECCAK-256_H3_0x000000000000000000000000000000000000000000000000000000000000013a_`),
            H4: encodeBytes(`BLOCKLOCK_BN254_XMD:KECCAK-256_H4_0x000000000000000000000000000000000000000000000000000000000000013a_`),
        }
    },
    gasLimit: 5_000_000,
    maxFeePerGas: ethers.parseUnits("0.2", "gwei"),
    maxPriorityFeePerGas: ethers.parseUnits("0.2", "gwei"),
    gasBufferPercent: 400n,
    callbackGasLimitDefault: 444_000_000n,
    gasMultiplierDefault: 50n,
}

export const BASE_SEPOLIA: NetworkConfig = {
    name: "base_sepolia",
    chainId: 84532n,
    contractAddress: "0x82Fed730CbdeC5A2D8724F2e3b316a70A565e27e",
    publicKey: BLOCKLOCK_TESTNET_PUBLIC_KEY,
    ibeOpts: {
        hash: keccak_256,
        k: 128,
        expand_fn: "xmd",
        dsts: {
            H1_G1: encodeBytes(`BLOCKLOCK_BN254G1_XMD:KECCAK-256_SVDW_RO_H1_0x0000000000000000000000000000000000000000000000000000000000014a34_`),
            H2: encodeBytes(`BLOCKLOCK_BN254_XMD:KECCAK-256_H2_0x0000000000000000000000000000000000000000000000000000000000014a34_`),
            H3: encodeBytes(`BLOCKLOCK_BN254_XMD:KECCAK-256_H3_0x0000000000000000000000000000000000000000000000000000000000014a34_`),
            H4: encodeBytes(`BLOCKLOCK_BN254_XMD:KECCAK-256_H4_0x0000000000000000000000000000000000000000000000000000000000014a34_`),
        }
    },
    gasLimit: 100_000,
    maxFeePerGas: ethers.parseUnits("0.2", "gwei"),
    maxPriorityFeePerGas: ethers.parseUnits("0.2", "gwei"),
    gasBufferPercent: 100n,
    callbackGasLimitDefault: 1_000_000n,
    gasMultiplierDefault: 10n,
}

export const POLYGON_POS: NetworkConfig = {
    name: "polygon_pos",
    chainId: 137n,
    contractAddress: "0x82Fed730CbdeC5A2D8724F2e3b316a70A565e27e",
    publicKey: BLOCKLOCK_TESTNET_PUBLIC_KEY,
    ibeOpts: {
        hash: keccak_256,
        k: 128,
        expand_fn: "xmd",
        dsts: {
            H1_G1: encodeBytes(`BLOCKLOCK_BN254G1_XMD:KECCAK-256_SVDW_RO_H1_0x0000000000000000000000000000000000000000000000000000000000000089_`),
            H2: encodeBytes(`BLOCKLOCK_BN254_XMD:KECCAK-256_H2_0x0000000000000000000000000000000000000000000000000000000000000089_`),
            H3: encodeBytes(`BLOCKLOCK_BN254_XMD:KECCAK-256_H3_0x0000000000000000000000000000000000000000000000000000000000000089_`),
            H4: encodeBytes(`BLOCKLOCK_BN254_XMD:KECCAK-256_H4_0x0000000000000000000000000000000000000000000000000000000000000089_`),
        }
    },
    gasLimit: 100_000,
    maxFeePerGas: ethers.parseUnits("0.2", "gwei"),
    maxPriorityFeePerGas: ethers.parseUnits("0.2", "gwei"),
    gasBufferPercent: 100n,
    callbackGasLimitDefault: 1_000_000n,
    gasMultiplierDefault: 10n,
}

export const FURNACE: NetworkConfig = {
    name: "furnace",
    chainId: 64630n,
    contractAddress: "0xEd925F96790F11678972b0F2c250498D782DDec9",
    publicKey: BLOCKLOCK_TESTNET_PUBLIC_KEY,
    ibeOpts: {
        hash: keccak_256,
        k: 128,
        expand_fn: "xmd",
        dsts: {
            H1_G1: encodeBytes(`BLOCKLOCK_BN254G1_XMD:KECCAK-256_SVDW_RO_H1_0x000000000000000000000000000000000000000000000000000000000000fc76_`),
            H2: encodeBytes(`BLOCKLOCK_BN254_XMD:KECCAK-256_H2_0x000000000000000000000000000000000000000000000000000000000000fc76_`),
            H3: encodeBytes(`BLOCKLOCK_BN254_XMD:KECCAK-256_H3_0x000000000000000000000000000000000000000000000000000000000000fc76_`),
            H4: encodeBytes(`BLOCKLOCK_BN254_XMD:KECCAK-256_H4_0x000000000000000000000000000000000000000000000000000000000000fc76_`),
        }
    },
    gasLimit: 1_000_000,
    maxFeePerGas: ethers.parseUnits("0.2", "gwei"),
    maxPriorityFeePerGas: ethers.parseUnits("0.2", "gwei"),
    gasBufferPercent: 100n,
    callbackGasLimitDefault: 1_000_000n,
    gasMultiplierDefault: 10n,
}

export const AVALANCHE_C_CHAIN: NetworkConfig = {
    name: "avalanche_c_chain",
    chainId: 43114n,
    contractAddress: "0xd22302849a87d5B00f13e504581BC086300DA080",
    publicKey: BLOCKLOCK_MAINNET_PUBLIC_KEY,
    ibeOpts: {
        hash: keccak_256,
        k: 128,
        expand_fn: "xmd",
        dsts: {
            H1_G1: encodeBytes(`BLOCKLOCK_BN254G1_XMD:KECCAK-256_SVDW_RO_H1_0x000000000000000000000000000000000000000000000000000000000000a86a_`),
            H2: encodeBytes(`BLOCKLOCK_BN254_XMD:KECCAK-256_H2_0x000000000000000000000000000000000000000000000000000000000000a86a_`),
            H3: encodeBytes(`BLOCKLOCK_BN254_XMD:KECCAK-256_H3_0x000000000000000000000000000000000000000000000000000000000000a86a_`),
            H4: encodeBytes(`BLOCKLOCK_BN254_XMD:KECCAK-256_H4_0x000000000000000000000000000000000000000000000000000000000000a86a_`),
        }
    },
    gasLimit: 100_000,
    maxFeePerGas: ethers.parseUnits("0.2", "gwei"),
    maxPriorityFeePerGas: ethers.parseUnits("0.2", "gwei"),
    gasBufferPercent: 100n,
    callbackGasLimitDefault: 1_000_000n,
    gasMultiplierDefault: 10n,
}

export const OPTIMISM_SEPOLIA: NetworkConfig = {
    name: "optimism_sepolia",
    chainId: 11155420n,
    contractAddress: "0xd22302849a87d5B00f13e504581BC086300DA080",
    publicKey: BLOCKLOCK_MAINNET_PUBLIC_KEY,
    ibeOpts: {
        hash: keccak_256,
        k: 128,
        expand_fn: "xmd",
        dsts: {
            H1_G1: encodeBytes(`BLOCKLOCK_BN254G1_XMD:KECCAK-256_SVDW_RO_H1_0x0000000000000000000000000000000000000000000000000000000000aa37dc_`),
            H2: encodeBytes(`BLOCKLOCK_BN254_XMD:KECCAK-256_H2_0x0000000000000000000000000000000000000000000000000000000000aa37dc_`),
            H3: encodeBytes(`BLOCKLOCK_BN254_XMD:KECCAK-256_H3_0x0000000000000000000000000000000000000000000000000000000000aa37dc_`),
            H4: encodeBytes(`BLOCKLOCK_BN254_XMD:KECCAK-256_H4_0x0000000000000000000000000000000000000000000000000000000000aa37dc_`),
        }
    },
    gasLimit: 100_000,
    maxFeePerGas: ethers.parseUnits("0.2", "gwei"),
    maxPriorityFeePerGas: ethers.parseUnits("0.2", "gwei"),
    gasBufferPercent: 100n,
    callbackGasLimitDefault: 1_000_000n,
    gasMultiplierDefault: 10n,
}

export const ARBITRUM_SEPOLIA: NetworkConfig = {
    name: "arbitrum_sepolia",
    chainId: 421614n,
    contractAddress: "0xd22302849a87d5B00f13e504581BC086300DA080",
    publicKey: BLOCKLOCK_MAINNET_PUBLIC_KEY,
    ibeOpts: {
        hash: keccak_256,
        k: 128,
        expand_fn: "xmd",
        dsts: {
            H1_G1: encodeBytes(`BLOCKLOCK_BN254G1_XMD:KECCAK-256_SVDW_RO_H1_0x0000000000000000000000000000000000000000000000000000000000066eee_`),
            H2: encodeBytes(`BLOCKLOCK_BN254_XMD:KECCAK-256_H2_0x0000000000000000000000000000000000000000000000000000000000066eee_`),
            H3: encodeBytes(`BLOCKLOCK_BN254_XMD:KECCAK-256_H3_0x0000000000000000000000000000000000000000000000000000000000066eee_`),
            H4: encodeBytes(`BLOCKLOCK_BN254_XMD:KECCAK-256_H4_0x0000000000000000000000000000000000000000000000000000000000066eee_`),
        }
    },
    gasLimit: 100_000,
    maxFeePerGas: ethers.parseUnits("0.2", "gwei"),
    maxPriorityFeePerGas: ethers.parseUnits("0.2", "gwei"),
    gasBufferPercent: 100n,
    callbackGasLimitDefault: 1_000_000n,
    gasMultiplierDefault: 10n,
}

export const SEI_TESTNET: NetworkConfig = {
    name: "sei_testnet",
    chainId: 1328n,
    contractAddress: "0xd22302849a87d5B00f13e504581BC086300DA080",
    publicKey: BLOCKLOCK_MAINNET_PUBLIC_KEY,
    ibeOpts: {
        hash: keccak_256,
        k: 128,
        expand_fn: "xmd",
        dsts: {
            H1_G1: encodeBytes(`BLOCKLOCK_BN254G1_XMD:KECCAK-256_SVDW_RO_H1_0x0000000000000000000000000000000000000000000000000000000000000530_`),
            H2: encodeBytes(`BLOCKLOCK_BN254_XMD:KECCAK-256_H2_0x0000000000000000000000000000000000000000000000000000000000000530_`),
            H3: encodeBytes(`BLOCKLOCK_BN254_XMD:KECCAK-256_H3_0x0000000000000000000000000000000000000000000000000000000000000530_`),
            H4: encodeBytes(`BLOCKLOCK_BN254_XMD:KECCAK-256_H4_0x0000000000000000000000000000000000000000000000000000000000000530_`),
        }
    },
    gasLimit: 100_000,
    maxFeePerGas: ethers.parseUnits("0.2", "gwei"),
    maxPriorityFeePerGas: ethers.parseUnits("0.2", "gwei"),
    gasBufferPercent: 100n,
    callbackGasLimitDefault: 1_000_000n,
    gasMultiplierDefault: 10n,
}

export const SUPPORTED_TESTNETS = [FILECOIN_CALIBNET, BASE_SEPOLIA, FURNACE, AVALANCHE_C_CHAIN, OPTIMISM_SEPOLIA, ARBITRUM_SEPOLIA, SEI_TESTNET]
export const SUPPORTED_MAINNETS = [FILECOIN_MAINNET, POLYGON_POS]

export function configForChainId(chainId: bigint | number | string): NetworkConfig {
    chainId = BigInt(chainId)

    for (const chain of [...SUPPORTED_MAINNETS, ...SUPPORTED_TESTNETS]) {
        if (chain.chainId === chainId) {
            return chain
        }
    }
    throw new Error(`no chain config found for chainId: ${chainId}`)
}
