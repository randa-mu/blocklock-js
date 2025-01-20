import { AbiCoder } from "ethers";

export class SolidityDecoder {
  private abiCoder: AbiCoder;

  constructor() {
    this.abiCoder = AbiCoder.defaultAbiCoder();
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
