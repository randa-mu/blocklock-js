/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedListener,
  TypedContractMethod,
} from "./common";

export declare namespace BLS {
  export type PointG2Struct = {
    x: [BigNumberish, BigNumberish];
    y: [BigNumberish, BigNumberish];
  };

  export type PointG2StructOutput = [
    x: [bigint, bigint],
    y: [bigint, bigint]
  ] & { x: [bigint, bigint]; y: [bigint, bigint] };
}

export declare namespace TypesLib {
  export type CiphertextStruct = {
    u: BLS.PointG2Struct;
    v: BytesLike;
    w: BytesLike;
  };

  export type CiphertextStructOutput = [
    u: BLS.PointG2StructOutput,
    v: string,
    w: string
  ] & { u: BLS.PointG2StructOutput; v: string; w: string };

  export type BlocklockRequestStruct = {
    decryptionRequestID: BigNumberish;
    blockHeight: BigNumberish;
    ciphertext: TypesLib.CiphertextStruct;
    signature: BytesLike;
    decryptionKey: BytesLike;
    callback: AddressLike;
  };

  export type BlocklockRequestStructOutput = [
    decryptionRequestID: bigint,
    blockHeight: bigint,
    ciphertext: TypesLib.CiphertextStructOutput,
    signature: string,
    decryptionKey: string,
    callback: string
  ] & {
    decryptionRequestID: bigint;
    blockHeight: bigint;
    ciphertext: TypesLib.CiphertextStructOutput;
    signature: string;
    decryptionKey: string;
    callback: string;
  };
}

export interface IBlocklockSenderInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "decrypt"
      | "getRequest"
      | "requestBlocklock"
      | "setDecryptionSender"
      | "version"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "decrypt",
    values: [TypesLib.CiphertextStruct, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getRequest",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "requestBlocklock",
    values: [BigNumberish, TypesLib.CiphertextStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "setDecryptionSender",
    values: [AddressLike]
  ): string;
  encodeFunctionData(functionFragment: "version", values?: undefined): string;

  decodeFunctionResult(functionFragment: "decrypt", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getRequest", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "requestBlocklock",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setDecryptionSender",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "version", data: BytesLike): Result;
}

export interface IBlocklockSender extends BaseContract {
  connect(runner?: ContractRunner | null): IBlocklockSender;
  waitForDeployment(): Promise<this>;

  interface: IBlocklockSenderInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  decrypt: TypedContractMethod<
    [ciphertext: TypesLib.CiphertextStruct, decryptionKey: BytesLike],
    [string],
    "view"
  >;

  getRequest: TypedContractMethod<
    [requestId: BigNumberish],
    [TypesLib.BlocklockRequestStructOutput],
    "view"
  >;

  requestBlocklock: TypedContractMethod<
    [blockHeight: BigNumberish, ciphertext: TypesLib.CiphertextStruct],
    [bigint],
    "nonpayable"
  >;

  setDecryptionSender: TypedContractMethod<
    [newDecryptionSender: AddressLike],
    [void],
    "nonpayable"
  >;

  version: TypedContractMethod<[], [string], "view">;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "decrypt"
  ): TypedContractMethod<
    [ciphertext: TypesLib.CiphertextStruct, decryptionKey: BytesLike],
    [string],
    "view"
  >;
  getFunction(
    nameOrSignature: "getRequest"
  ): TypedContractMethod<
    [requestId: BigNumberish],
    [TypesLib.BlocklockRequestStructOutput],
    "view"
  >;
  getFunction(
    nameOrSignature: "requestBlocklock"
  ): TypedContractMethod<
    [blockHeight: BigNumberish, ciphertext: TypesLib.CiphertextStruct],
    [bigint],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "setDecryptionSender"
  ): TypedContractMethod<
    [newDecryptionSender: AddressLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "version"
  ): TypedContractMethod<[], [string], "view">;

  filters: {};
}
