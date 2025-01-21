/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from "ethers";
import type {
  ISignatureScheme,
  ISignatureSchemeInterface,
} from "../ISignatureScheme";

const _abi = [
  {
    type: "function",
    name: "SCHEME_ID",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "string",
        internalType: "string",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "hashToBytes",
    inputs: [
      {
        name: "message",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "hashToPoint",
    inputs: [
      {
        name: "message",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "verifySignature",
    inputs: [
      {
        name: "message",
        type: "bytes",
        internalType: "bytes",
      },
      {
        name: "signature",
        type: "bytes",
        internalType: "bytes",
      },
      {
        name: "publicKey",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [
      {
        name: "isValid",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
] as const;

export class ISignatureScheme__factory {
  static readonly abi = _abi;
  static createInterface(): ISignatureSchemeInterface {
    return new Interface(_abi) as ISignatureSchemeInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): ISignatureScheme {
    return new Contract(address, _abi, runner) as unknown as ISignatureScheme;
  }
}
