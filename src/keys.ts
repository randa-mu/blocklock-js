export type BigIntPair = {
    c0: bigint
    c1: bigint
}

export type BlocklockPublicKey = {
    x: BigIntPair
    y: BigIntPair
}

export const BLOCKLOCK_TESTNET_PUBLIC_KEY: BlocklockPublicKey = {
    x: {
        c0: BigInt("0x2691d39ecc380bfa873911a0b848c77556ee948fb8ab649137d3d3e78153f6ca"),
        c1: BigInt("0x2863e20a5125b098108a5061b31f405e16a069e9ebff60022f57f4c4fd0237bf"),
    },
    y: {
        c0: BigInt("0x193513dbe180d700b189c529754f650b7b7882122c8a1e242a938d23ea9f765c"),
        c1: BigInt("0x11c939ea560caf31f552c9c4879b15865d38ba1dfb0f7a7d2ac46a4f0cae25ba"),
    },
}

export const BLOCKLOCK_MAINNET_PUBLIC_KEY: BlocklockPublicKey = {
    x: {
        c0: BigInt("0x2b0985484a2503404d6c2b183d8be1e38aeb548f0435a935e4058499980c22a4"),
        c1: BigInt("0x2eb81c7b1bb618894ad337b68d7ddf1d19f9b786d20b9de7735da410a98e458c"),
    },
    y: {
        c0: BigInt("0x10c1587f14b640331d0dfd0edf9817e2c650c15e70c7bf408124d58e24b0ff3c"),
        c1: BigInt("0xbd0526dce7136f54cf574cfd26e8d2d8c61c5218afb9d4466f9177674f436f4"),
    },
}
