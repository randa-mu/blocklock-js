/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../common";
import type { BLS, BLSInterface } from "../BLS";

const _abi = [
  {
    type: "error",
    name: "BNAddFailed",
    inputs: [
      {
        name: "input",
        type: "uint256[4]",
        internalType: "uint256[4]",
      },
    ],
  },
  {
    type: "error",
    name: "InvalidDSTLength",
    inputs: [
      {
        name: "dst",
        type: "bytes",
        internalType: "bytes",
      },
    ],
  },
  {
    type: "error",
    name: "InvalidFieldElement",
    inputs: [
      {
        name: "x",
        type: "uint256",
        internalType: "uint256",
      },
    ],
  },
  {
    type: "error",
    name: "MapToPointFailed",
    inputs: [
      {
        name: "noSqrt",
        type: "uint256",
        internalType: "uint256",
      },
    ],
  },
  {
    type: "error",
    name: "ModExpFailed",
    inputs: [
      {
        name: "base",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "exponent",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "modulus",
        type: "uint256",
        internalType: "uint256",
      },
    ],
  },
] as const;

const _bytecode =
  "0x60556032600b8282823980515f1a607314602657634e487b7160e01b5f525f60045260245ffd5b305f52607381538281f3fe730000000000000000000000000000000000000000301460806040525f80fdfea26469706673582212204cd4b18a89eb831367a637922142482ad4d3ea31aafcf841374c063ad53c613664736f6c63430008180033";

type BLSConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: BLSConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class BLS__factory extends ContractFactory {
  constructor(...args: BLSConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(overrides || {});
  }
  override deploy(overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(overrides || {}) as Promise<
      BLS & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): BLS__factory {
    return super.connect(runner) as BLS__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): BLSInterface {
    return new Interface(_abi) as BLSInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): BLS {
    return new Contract(address, _abi, runner) as unknown as BLS;
  }
}
