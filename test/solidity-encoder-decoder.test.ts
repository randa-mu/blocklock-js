import {describe, it, expect, beforeAll} from "@jest/globals"
import { ethers } from "ethers";
import { SolidityEncoderDecoder } from "../src";

describe("SolidityEncoderDecoder", () => {
  let encoderDecoder: SolidityEncoderDecoder;

  beforeAll(() => {
    encoderDecoder = new SolidityEncoderDecoder();
  });

  // ------------------- Uint256 -------------------
  it("should encode and decode uint256", () => {
    const value = 12345;
    const encoded = encoderDecoder.encodeUint256(value);
    const decoded = encoderDecoder.decodeUint256(encoded);
    expect(decoded).toBe(BigInt(value));
  });

  // ------------------- Int256 -------------------
  it("should encode and decode int256", () => {
    const value = -12345;
    const encoded = encoderDecoder.encodeInt256(value);
    const decoded = encoderDecoder.decodeInt256(encoded);
    expect(decoded).toBe(BigInt(value));
  });

  // ------------------- Address -------------------
  it("should encode and decode address", () => {
    const address = "0x1234567890AbcdEF1234567890aBcdef12345678";
    const encoded = encoderDecoder.encodeAddress(address);
    const decoded = encoderDecoder.decodeAddress(encoded);
    expect(decoded).toBe(address);
  });

  // ------------------- String -------------------
  it("should encode and decode string", () => {
    const value = "Hello, Ethereum!";
    const encoded = encoderDecoder.encodeString(value);
    const decoded = encoderDecoder.decodeString(encoded);
    expect(decoded).toBe(value);
  });

  // ------------------- Bool -------------------
  it("should encode and decode boolean", () => {
    const value = true;
    const encoded = encoderDecoder.encodeBool(value);
    const decoded = encoderDecoder.decodeBool(encoded);
    expect(decoded).toBe(value);
  });

  // ------------------- Bytes32 -------------------
  it("should encode and decode bytes32", () => {
    const value = "0x" + "12".repeat(32);
    const encoded = encoderDecoder.encodeBytes32(value);
    const decoded = encoderDecoder.decodeBytes32(encoded);
    expect(decoded).toBe(value);
  });

  // ------------------- Bytes -------------------
  it("should encode and decode bytes", () => {
    const value = "0x12345678";
    const encoded = encoderDecoder.encodeBytes(value);
    const decoded = encoderDecoder.decodeBytes(encoded);
    expect(decoded).toBe(value);
  });

  // ------------------- Uint256 Array -------------------
  it("should encode and decode uint256[]", () => {
    const values = [1, 2, 3, 4, 5];
    const encoded = encoderDecoder.encodeUint256Array(values);
    const decoded = encoderDecoder.decodeUint256Array(encoded);
    expect(decoded).toEqual(values.map(BigInt));
  });

  // ------------------- Address Array -------------------
  it("should encode and decode address[]", () => {
    const addresses = [
      "0x1234567890abcdef1234567890abcdef12345678",
      "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd",
    ];
    const encoded = encoderDecoder.encodeAddressArray(addresses);
    const decoded = encoderDecoder.decodeAddressArray(encoded);
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
    const encoded = encoderDecoder.encodeStruct(structDefinition, structValues);
    const decoded = encoderDecoder.decodeStruct(structDefinition, encoded);
    expect(decoded[0]).toEqual(BigInt(structValues[0]));

    const checksumAddress = ethers.getAddress("0x1234567890abcdef1234567890abcdef12345678");
    expect(decoded[1]).toEqual(checksumAddress);
    expect(decoded[2]).toEqual(structValues[2]);
  });
});
