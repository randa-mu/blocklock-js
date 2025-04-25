// returns a new array with the xor of a ^ b
export function xor(a: Uint8Array, b: Uint8Array): Uint8Array {
    if (a.length != b.length) {
        throw new Error("Error: incompatible sizes")
    }

    const ret = new Uint8Array(a.length)

    for (let i = 0; i < a.length; i++) {
        ret[i] = a[i] ^ b[i]
    }

    return ret
}

export function toBigEndianBytes(n: bigint) {
    const buffer = new ArrayBuffer(32)
    const dataView = new DataView(buffer)
    dataView.setBigUint64(0, (n >> 192n) & 0xffff_ffff_ffff_ffffn)
    dataView.setBigUint64(8, (n >> 128n) & 0xffff_ffff_ffff_ffffn)
    dataView.setBigUint64(16, (n >> 64n) & 0xffff_ffff_ffff_ffffn)
    dataView.setBigUint64(24, n & 0xffff_ffff_ffff_ffffn)

    return new Uint8Array(buffer)
}
