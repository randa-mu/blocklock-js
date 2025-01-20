import {describe, it, expect, beforeAll} from "@jest/globals"
import { ethers } from "ethers";
import { SolidityEncoder, SolidityDecoder} from "../src";

describe("Solidityencoder", () => {
  let encoder: SolidityEncoder;
  let decoder: SolidityDecoder;

  beforeAll(() => {
    encoder = new SolidityEncoder();
    decoder = new SolidityDecoder();
  });

  // ------------------- Uint256 -------------------
  it("should encode and decode uint256", () => {
    const value = 12345;
    const encoded = encoder.encodeUint256(value);
    const decoded = decoder.decodeUint256(encoded);
    expect(decoded).toBe(BigInt(value));
  });

  // ------------------- Int256 -------------------
  it("should encode and decode int256", () => {
    const value = -12345;
    const encoded = encoder.encodeInt256(value);
    const decoded = decoder.decodeInt256(encoded);
    expect(decoded).toBe(BigInt(value));
  });

  // ------------------- Address -------------------
  it("should encode and decode address", () => {
    const address = "0x1234567890AbcdEF1234567890aBcdef12345678";
    const encoded = encoder.encodeAddress(address);
    const decoded = decoder.decodeAddress(encoded);
    expect(decoded).toBe(address);
  });

  // ------------------- String -------------------
  it("should encode and decode string", () => {
    const value = "Hello, Ethereum!";
    const encoded = encoder.encodeString(value);
    const decoded = decoder.decodeString(encoded);
    expect(decoded).toBe(value);
  });

  // ------------------- Bool -------------------
  it("should encode and decode boolean", () => {
    const value = true;
    const encoded = encoder.encodeBool(value);
    const decoded = decoder.decodeBool(encoded);
    expect(decoded).toBe(value);
  });

  // ------------------- Bytes32 -------------------
  it("should encode and decode bytes32", () => {
    const value = "0x" + "12".repeat(32);
    const encoded = encoder.encodeBytes32(value);
    const decoded = decoder.decodeBytes32(encoded);
    expect(decoded).toBe(value);
  });

  // ------------------- Bytes -------------------
  it("should encode and decode bytes", () => {
    const value = "0x12345678";
    const encoded = encoder.encodeBytes(value);
    const decoded = decoder.decodeBytes(encoded);
    expect(decoded).toBe(value);
  });

  // ------------------- Uint256 Array -------------------
  it("should encode and decode uint256[]", () => {
    const values = [1, 2, 3, 4, 5];
    const encoded = encoder.encodeUint256Array(values);
    const decoded = decoder.decodeUint256Array(encoded);
    expect(decoded).toEqual(values.map(BigInt));
  });

  // ------------------- Address Array -------------------
  it("should encode and decode address[]", () => {
    const addresses = [
      "0x1234567890abcdef1234567890abcdef12345678",
      "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd",
    ];
    const encoded = encoder.encodeAddressArray(addresses);
    const decoded = decoder.decodeAddressArray(encoded);
    expect(decoded[0].toLowerCase()).toEqual(addresses[0].toLowerCase());
    expect(decoded[1].toLowerCase()).toEqual(addresses[1].toLowerCase());
  });

  // ------------------- Struct (Tuple) -------------------
  it("should encode and decode struct (tuple)", () => {
    const structDefinition = ["uint256", "address", "string"];
    const structValues = [
      42,
      "0x1234567890abcdef1234567890abcdef12345678",
      "Hello Struct",
    ];
    const encoded = encoder.encodeStruct(structDefinition, structValues);
    const decoded = decoder.decodeStruct(structDefinition, encoded);
    expect(decoded[0]).toEqual(BigInt(structValues[0]));

    const checksumAddress = ethers.getAddress("0x1234567890abcdef1234567890abcdef12345678");
    expect(decoded[1]).toEqual(checksumAddress);
    expect(decoded[2]).toEqual(structValues[2]);
  });
});
