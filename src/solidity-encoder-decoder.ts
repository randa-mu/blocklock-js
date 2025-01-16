import { AbiCoder } from "ethers";

export class SolidityEncoderDecoder {
  private abiCoder: AbiCoder;

  constructor() {
    this.abiCoder = AbiCoder.defaultAbiCoder();
  }

  // ------------------- ENCODERS -------------------

  encodeUint256(value: number | string | bigint): string {
    return this.abiCoder.encode(["uint256"], [value]);
  }

  encodeInt256(value: number | string | bigint): string {
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

  encodeUint256Array(values: (number | string | bigint)[]): string {
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

  // ------------------- DECODERS -------------------

  decodeUint256(data: string): bigint {
    return this.abiCoder.decode(["uint256"], data)[0];
  }

  decodeInt256(data: string): bigint {
    return this.abiCoder.decode(["int256"], data)[0];
  }

  decodeAddress(data: string): string {
    return this.abiCoder.decode(["address"], data)[0];
  }

  decodeString(data: string): string {
    return this.abiCoder.decode(["string"], data)[0];
  }

  decodeBool(data: string): boolean {
    return this.abiCoder.decode(["bool"], data)[0];
  }

  decodeBytes32(data: string): string {
    return this.abiCoder.decode(["bytes32"], data)[0];
  }

  decodeBytes(data: string): string {
    return this.abiCoder.decode(["bytes"], data)[0];
  }

  decodeUint256Array(data: string): bigint[] {
    return this.abiCoder.decode(["uint256[]"], data)[0];
  }

  decodeAddressArray(data: string): string[] {
    return this.abiCoder.decode(["address[]"], data)[0];
  }

  decodeTuple(types: string[], data: string): any[] {
    return this.abiCoder.decode([`tuple(${types.join(",")})`], data)[0];
  }

  decodeStruct(structDefinition: string[], data: string): any[] {
    return this.decodeTuple(structDefinition, data);
  }
}
