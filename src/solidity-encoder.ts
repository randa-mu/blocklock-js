import { AbiCoder, BigNumberish } from "ethers";

export class SolidityEncoder {
  private abiCoder: AbiCoder;

  constructor() {
    this.abiCoder = AbiCoder.defaultAbiCoder();
  }

  // ------------------- ENCODERS -------------------

  encodeUint256(value: number | string | BigNumberish): string {
    return this.abiCoder.encode(["uint256"], [value]);
  }

  encodeInt256(value: number | string | BigNumberish): string {
    return this.abiCoder.encode(["int256"], [value]);
  }

  encodeAddress(address: string): string {
    return this.abiCoder.encode(["address"], [address]);
  }

  encodeString(value: string): string {
    return this.abiCoder.encode(["string"], [value]);
  }

  encodeBool(value: boolean): string {
    return this.abiCoder.encode(["bool"], [value]);
  }

  encodeBytes32(value: string): string {
    if (!/^0x[0-9a-fA-F]{64}$/.test(value)) {
      throw new Error("Invalid bytes32 format. Must be a 32-byte hex string.");
    }
    return this.abiCoder.encode(["bytes32"], [value]);
  }

  encodeBytes(value: Uint8Array | string): string {
    return this.abiCoder.encode(["bytes"], [value]);
  }

  encodeUint256Array(values: (number | string | BigNumberish)[]): string {
    return this.abiCoder.encode(["uint256[]"], [values]);
  }

  encodeAddressArray(addresses: string[]): string {
    return this.abiCoder.encode(["address[]"], [addresses]);
  }

  encodeTuple(types: string[], values: any[]): string {
    return this.abiCoder.encode([`tuple(${types.join(",")})`], [values]);
  }

  encodeStruct(structDefinition: string[], structValues: any[]): string {
    return this.encodeTuple(structDefinition, structValues);
  }
}
