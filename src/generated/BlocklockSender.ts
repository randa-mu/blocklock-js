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
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
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
    callback: AddressLike;
  };

  export type BlocklockRequestStructOutput = [
    decryptionRequestID: bigint,
    blockHeight: bigint,
    ciphertext: TypesLib.CiphertextStructOutput,
    signature: string,
    callback: string
  ] & {
    decryptionRequestID: bigint;
    blockHeight: bigint;
    ciphertext: TypesLib.CiphertextStructOutput;
    signature: string;
    callback: string;
  };
}

export interface BlocklockSenderInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "DST_H1_G1"
      | "DST_H2"
      | "DST_H3"
      | "DST_H4"
      | "SCHEME_ID"
      | "blocklockRequests"
      | "decrypt"
      | "decryptionSender"
      | "getRequest"
      | "isInFlight"
      | "receiveDecryptionData"
      | "requestBlocklock"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic: "BlocklockCallbackSuccess" | "BlocklockRequested"
  ): EventFragment;

  encodeFunctionData(functionFragment: "DST_H1_G1", values?: undefined): string;
  encodeFunctionData(functionFragment: "DST_H2", values?: undefined): string;
  encodeFunctionData(functionFragment: "DST_H3", values?: undefined): string;
  encodeFunctionData(functionFragment: "DST_H4", values?: undefined): string;
  encodeFunctionData(functionFragment: "SCHEME_ID", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "blocklockRequests",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "decrypt",
    values: [TypesLib.CiphertextStruct, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "decryptionSender",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getRequest",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "isInFlight",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "receiveDecryptionData",
    values: [BigNumberish, BytesLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "requestBlocklock",
    values: [BigNumberish, TypesLib.CiphertextStruct]
  ): string;

  decodeFunctionResult(functionFragment: "DST_H1_G1", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "DST_H2", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "DST_H3", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "DST_H4", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "SCHEME_ID", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "blocklockRequests",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "decrypt", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "decryptionSender",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getRequest", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "isInFlight", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "receiveDecryptionData",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "requestBlocklock",
    data: BytesLike
  ): Result;
}

export namespace BlocklockCallbackSuccessEvent {
  export type InputTuple = [
    requestID: BigNumberish,
    blockHeight: BigNumberish,
    ciphertext: TypesLib.CiphertextStruct,
    decryptionKey: BytesLike
  ];
  export type OutputTuple = [
    requestID: bigint,
    blockHeight: bigint,
    ciphertext: TypesLib.CiphertextStructOutput,
    decryptionKey: string
  ];
  export interface OutputObject {
    requestID: bigint;
    blockHeight: bigint;
    ciphertext: TypesLib.CiphertextStructOutput;
    decryptionKey: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace BlocklockRequestedEvent {
  export type InputTuple = [
    requestID: BigNumberish,
    blockHeight: BigNumberish,
    ciphertext: TypesLib.CiphertextStruct,
    requester: AddressLike,
    requestedAt: BigNumberish
  ];
  export type OutputTuple = [
    requestID: bigint,
    blockHeight: bigint,
    ciphertext: TypesLib.CiphertextStructOutput,
    requester: string,
    requestedAt: bigint
  ];
  export interface OutputObject {
    requestID: bigint;
    blockHeight: bigint;
    ciphertext: TypesLib.CiphertextStructOutput;
    requester: string;
    requestedAt: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface BlocklockSender extends BaseContract {
  connect(runner?: ContractRunner | null): BlocklockSender;
  waitForDeployment(): Promise<this>;

  interface: BlocklockSenderInterface;

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

  DST_H1_G1: TypedContractMethod<[], [string], "view">;

  DST_H2: TypedContractMethod<[], [string], "view">;

  DST_H3: TypedContractMethod<[], [string], "view">;

  DST_H4: TypedContractMethod<[], [string], "view">;

  SCHEME_ID: TypedContractMethod<[], [string], "view">;

  blocklockRequests: TypedContractMethod<
    [arg0: BigNumberish],
    [
      [bigint, bigint, TypesLib.CiphertextStructOutput, string, string] & {
        decryptionRequestID: bigint;
        blockHeight: bigint;
        ciphertext: TypesLib.CiphertextStructOutput;
        signature: string;
        callback: string;
      }
    ],
    "view"
  >;

  decrypt: TypedContractMethod<
    [ciphertext: TypesLib.CiphertextStruct, decryptionKey: BytesLike],
    [string],
    "view"
  >;

  decryptionSender: TypedContractMethod<[], [string], "view">;

  getRequest: TypedContractMethod<
    [requestID: BigNumberish],
    [TypesLib.BlocklockRequestStructOutput],
    "view"
  >;

  isInFlight: TypedContractMethod<[requestID: BigNumberish], [boolean], "view">;

  receiveDecryptionData: TypedContractMethod<
    [requestID: BigNumberish, decryptionKey: BytesLike, signature: BytesLike],
    [void],
    "nonpayable"
  >;

  requestBlocklock: TypedContractMethod<
    [blockHeight: BigNumberish, ciphertext: TypesLib.CiphertextStruct],
    [bigint],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "DST_H1_G1"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "DST_H2"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "DST_H3"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "DST_H4"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "SCHEME_ID"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "blocklockRequests"
  ): TypedContractMethod<
    [arg0: BigNumberish],
    [
      [bigint, bigint, TypesLib.CiphertextStructOutput, string, string] & {
        decryptionRequestID: bigint;
        blockHeight: bigint;
        ciphertext: TypesLib.CiphertextStructOutput;
        signature: string;
        callback: string;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "decrypt"
  ): TypedContractMethod<
    [ciphertext: TypesLib.CiphertextStruct, decryptionKey: BytesLike],
    [string],
    "view"
  >;
  getFunction(
    nameOrSignature: "decryptionSender"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "getRequest"
  ): TypedContractMethod<
    [requestID: BigNumberish],
    [TypesLib.BlocklockRequestStructOutput],
    "view"
  >;
  getFunction(
    nameOrSignature: "isInFlight"
  ): TypedContractMethod<[requestID: BigNumberish], [boolean], "view">;
  getFunction(
    nameOrSignature: "receiveDecryptionData"
  ): TypedContractMethod<
    [requestID: BigNumberish, decryptionKey: BytesLike, signature: BytesLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "requestBlocklock"
  ): TypedContractMethod<
    [blockHeight: BigNumberish, ciphertext: TypesLib.CiphertextStruct],
    [bigint],
    "nonpayable"
  >;

  getEvent(
    key: "BlocklockCallbackSuccess"
  ): TypedContractEvent<
    BlocklockCallbackSuccessEvent.InputTuple,
    BlocklockCallbackSuccessEvent.OutputTuple,
    BlocklockCallbackSuccessEvent.OutputObject
  >;
  getEvent(
    key: "BlocklockRequested"
  ): TypedContractEvent<
    BlocklockRequestedEvent.InputTuple,
    BlocklockRequestedEvent.OutputTuple,
    BlocklockRequestedEvent.OutputObject
  >;

  filters: {
    "BlocklockCallbackSuccess(uint256,uint256,tuple,bytes)": TypedContractEvent<
      BlocklockCallbackSuccessEvent.InputTuple,
      BlocklockCallbackSuccessEvent.OutputTuple,
      BlocklockCallbackSuccessEvent.OutputObject
    >;
    BlocklockCallbackSuccess: TypedContractEvent<
      BlocklockCallbackSuccessEvent.InputTuple,
      BlocklockCallbackSuccessEvent.OutputTuple,
      BlocklockCallbackSuccessEvent.OutputObject
    >;

    "BlocklockRequested(uint256,uint256,tuple,address,uint256)": TypedContractEvent<
      BlocklockRequestedEvent.InputTuple,
      BlocklockRequestedEvent.OutputTuple,
      BlocklockRequestedEvent.OutputObject
    >;
    BlocklockRequested: TypedContractEvent<
      BlocklockRequestedEvent.InputTuple,
      BlocklockRequestedEvent.OutputTuple,
      BlocklockRequestedEvent.OutputObject
    >;
  };
}
