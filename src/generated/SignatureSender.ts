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

export declare namespace TypesLib {
  export type SignatureRequestStruct = {
    message: BytesLike;
    messageHash: BytesLike;
    condition: BytesLike;
    schemeID: string;
    callback: AddressLike;
  };

  export type SignatureRequestStructOutput = [
    message: string,
    messageHash: string,
    condition: string,
    schemeID: string,
    callback: string
  ] & {
    message: string;
    messageHash: string;
    condition: string;
    schemeID: string;
    callback: string;
  };
}

export interface SignatureSenderInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "ADMIN_ROLE"
      | "DEFAULT_ADMIN_ROLE"
      | "fulfilSignatureRequest"
      | "getPublicKey"
      | "getPublicKeyBytes"
      | "getRequestInFlight"
      | "getRoleAdmin"
      | "grantRole"
      | "hasRole"
      | "isInFlight"
      | "lastRequestID"
      | "multicall"
      | "renounceRole"
      | "requestSignature"
      | "requestsInFlight"
      | "revokeRole"
      | "signatureSchemeAddressProvider"
      | "supportsInterface"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "RoleAdminChanged"
      | "RoleGranted"
      | "RoleRevoked"
      | "SignatureRequestFulfilled"
      | "SignatureRequested"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "ADMIN_ROLE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "DEFAULT_ADMIN_ROLE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "fulfilSignatureRequest",
    values: [BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getPublicKey",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getPublicKeyBytes",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getRequestInFlight",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getRoleAdmin",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "grantRole",
    values: [BytesLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "hasRole",
    values: [BytesLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "isInFlight",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "lastRequestID",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "multicall",
    values: [BytesLike[]]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceRole",
    values: [BytesLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "requestSignature",
    values: [string, BytesLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "requestsInFlight",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "revokeRole",
    values: [BytesLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "signatureSchemeAddressProvider",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "supportsInterface",
    values: [BytesLike]
  ): string;

  decodeFunctionResult(functionFragment: "ADMIN_ROLE", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "DEFAULT_ADMIN_ROLE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "fulfilSignatureRequest",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getPublicKey",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getPublicKeyBytes",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getRequestInFlight",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getRoleAdmin",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "grantRole", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "hasRole", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "isInFlight", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "lastRequestID",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "multicall", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceRole",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "requestSignature",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "requestsInFlight",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "revokeRole", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "signatureSchemeAddressProvider",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "supportsInterface",
    data: BytesLike
  ): Result;
}

export namespace RoleAdminChangedEvent {
  export type InputTuple = [
    role: BytesLike,
    previousAdminRole: BytesLike,
    newAdminRole: BytesLike
  ];
  export type OutputTuple = [
    role: string,
    previousAdminRole: string,
    newAdminRole: string
  ];
  export interface OutputObject {
    role: string;
    previousAdminRole: string;
    newAdminRole: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace RoleGrantedEvent {
  export type InputTuple = [
    role: BytesLike,
    account: AddressLike,
    sender: AddressLike
  ];
  export type OutputTuple = [role: string, account: string, sender: string];
  export interface OutputObject {
    role: string;
    account: string;
    sender: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace RoleRevokedEvent {
  export type InputTuple = [
    role: BytesLike,
    account: AddressLike,
    sender: AddressLike
  ];
  export type OutputTuple = [role: string, account: string, sender: string];
  export interface OutputObject {
    role: string;
    account: string;
    sender: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace SignatureRequestFulfilledEvent {
  export type InputTuple = [requestID: BigNumberish];
  export type OutputTuple = [requestID: bigint];
  export interface OutputObject {
    requestID: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace SignatureRequestedEvent {
  export type InputTuple = [
    requestID: BigNumberish,
    callback: AddressLike,
    schemeID: string,
    message: BytesLike,
    messageHashToSign: BytesLike,
    condition: BytesLike,
    requestedAt: BigNumberish
  ];
  export type OutputTuple = [
    requestID: bigint,
    callback: string,
    schemeID: string,
    message: string,
    messageHashToSign: string,
    condition: string,
    requestedAt: bigint
  ];
  export interface OutputObject {
    requestID: bigint;
    callback: string;
    schemeID: string;
    message: string;
    messageHashToSign: string;
    condition: string;
    requestedAt: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface SignatureSender extends BaseContract {
  connect(runner?: ContractRunner | null): SignatureSender;
  waitForDeployment(): Promise<this>;

  interface: SignatureSenderInterface;

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

  ADMIN_ROLE: TypedContractMethod<[], [string], "view">;

  DEFAULT_ADMIN_ROLE: TypedContractMethod<[], [string], "view">;

  fulfilSignatureRequest: TypedContractMethod<
    [requestID: BigNumberish, signature: BytesLike],
    [void],
    "nonpayable"
  >;

  getPublicKey: TypedContractMethod<
    [],
    [[[bigint, bigint], [bigint, bigint]]],
    "view"
  >;

  getPublicKeyBytes: TypedContractMethod<[], [string], "view">;

  getRequestInFlight: TypedContractMethod<
    [requestID: BigNumberish],
    [TypesLib.SignatureRequestStructOutput],
    "view"
  >;

  getRoleAdmin: TypedContractMethod<[role: BytesLike], [string], "view">;

  grantRole: TypedContractMethod<
    [role: BytesLike, account: AddressLike],
    [void],
    "nonpayable"
  >;

  hasRole: TypedContractMethod<
    [role: BytesLike, account: AddressLike],
    [boolean],
    "view"
  >;

  isInFlight: TypedContractMethod<[requestID: BigNumberish], [boolean], "view">;

  lastRequestID: TypedContractMethod<[], [bigint], "view">;

  multicall: TypedContractMethod<[data: BytesLike[]], [string[]], "payable">;

  renounceRole: TypedContractMethod<
    [role: BytesLike, callerConfirmation: AddressLike],
    [void],
    "nonpayable"
  >;

  requestSignature: TypedContractMethod<
    [schemeID: string, message: BytesLike, condition: BytesLike],
    [bigint],
    "nonpayable"
  >;

  requestsInFlight: TypedContractMethod<
    [arg0: BigNumberish],
    [
      [string, string, string, string, string] & {
        message: string;
        messageHash: string;
        condition: string;
        schemeID: string;
        callback: string;
      }
    ],
    "view"
  >;

  revokeRole: TypedContractMethod<
    [role: BytesLike, account: AddressLike],
    [void],
    "nonpayable"
  >;

  signatureSchemeAddressProvider: TypedContractMethod<[], [string], "view">;

  supportsInterface: TypedContractMethod<
    [interfaceId: BytesLike],
    [boolean],
    "view"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "ADMIN_ROLE"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "DEFAULT_ADMIN_ROLE"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "fulfilSignatureRequest"
  ): TypedContractMethod<
    [requestID: BigNumberish, signature: BytesLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "getPublicKey"
  ): TypedContractMethod<[], [[[bigint, bigint], [bigint, bigint]]], "view">;
  getFunction(
    nameOrSignature: "getPublicKeyBytes"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "getRequestInFlight"
  ): TypedContractMethod<
    [requestID: BigNumberish],
    [TypesLib.SignatureRequestStructOutput],
    "view"
  >;
  getFunction(
    nameOrSignature: "getRoleAdmin"
  ): TypedContractMethod<[role: BytesLike], [string], "view">;
  getFunction(
    nameOrSignature: "grantRole"
  ): TypedContractMethod<
    [role: BytesLike, account: AddressLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "hasRole"
  ): TypedContractMethod<
    [role: BytesLike, account: AddressLike],
    [boolean],
    "view"
  >;
  getFunction(
    nameOrSignature: "isInFlight"
  ): TypedContractMethod<[requestID: BigNumberish], [boolean], "view">;
  getFunction(
    nameOrSignature: "lastRequestID"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "multicall"
  ): TypedContractMethod<[data: BytesLike[]], [string[]], "payable">;
  getFunction(
    nameOrSignature: "renounceRole"
  ): TypedContractMethod<
    [role: BytesLike, callerConfirmation: AddressLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "requestSignature"
  ): TypedContractMethod<
    [schemeID: string, message: BytesLike, condition: BytesLike],
    [bigint],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "requestsInFlight"
  ): TypedContractMethod<
    [arg0: BigNumberish],
    [
      [string, string, string, string, string] & {
        message: string;
        messageHash: string;
        condition: string;
        schemeID: string;
        callback: string;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "revokeRole"
  ): TypedContractMethod<
    [role: BytesLike, account: AddressLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "signatureSchemeAddressProvider"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "supportsInterface"
  ): TypedContractMethod<[interfaceId: BytesLike], [boolean], "view">;

  getEvent(
    key: "RoleAdminChanged"
  ): TypedContractEvent<
    RoleAdminChangedEvent.InputTuple,
    RoleAdminChangedEvent.OutputTuple,
    RoleAdminChangedEvent.OutputObject
  >;
  getEvent(
    key: "RoleGranted"
  ): TypedContractEvent<
    RoleGrantedEvent.InputTuple,
    RoleGrantedEvent.OutputTuple,
    RoleGrantedEvent.OutputObject
  >;
  getEvent(
    key: "RoleRevoked"
  ): TypedContractEvent<
    RoleRevokedEvent.InputTuple,
    RoleRevokedEvent.OutputTuple,
    RoleRevokedEvent.OutputObject
  >;
  getEvent(
    key: "SignatureRequestFulfilled"
  ): TypedContractEvent<
    SignatureRequestFulfilledEvent.InputTuple,
    SignatureRequestFulfilledEvent.OutputTuple,
    SignatureRequestFulfilledEvent.OutputObject
  >;
  getEvent(
    key: "SignatureRequested"
  ): TypedContractEvent<
    SignatureRequestedEvent.InputTuple,
    SignatureRequestedEvent.OutputTuple,
    SignatureRequestedEvent.OutputObject
  >;

  filters: {
    "RoleAdminChanged(bytes32,bytes32,bytes32)": TypedContractEvent<
      RoleAdminChangedEvent.InputTuple,
      RoleAdminChangedEvent.OutputTuple,
      RoleAdminChangedEvent.OutputObject
    >;
    RoleAdminChanged: TypedContractEvent<
      RoleAdminChangedEvent.InputTuple,
      RoleAdminChangedEvent.OutputTuple,
      RoleAdminChangedEvent.OutputObject
    >;

    "RoleGranted(bytes32,address,address)": TypedContractEvent<
      RoleGrantedEvent.InputTuple,
      RoleGrantedEvent.OutputTuple,
      RoleGrantedEvent.OutputObject
    >;
    RoleGranted: TypedContractEvent<
      RoleGrantedEvent.InputTuple,
      RoleGrantedEvent.OutputTuple,
      RoleGrantedEvent.OutputObject
    >;

    "RoleRevoked(bytes32,address,address)": TypedContractEvent<
      RoleRevokedEvent.InputTuple,
      RoleRevokedEvent.OutputTuple,
      RoleRevokedEvent.OutputObject
    >;
    RoleRevoked: TypedContractEvent<
      RoleRevokedEvent.InputTuple,
      RoleRevokedEvent.OutputTuple,
      RoleRevokedEvent.OutputObject
    >;

    "SignatureRequestFulfilled(uint256)": TypedContractEvent<
      SignatureRequestFulfilledEvent.InputTuple,
      SignatureRequestFulfilledEvent.OutputTuple,
      SignatureRequestFulfilledEvent.OutputObject
    >;
    SignatureRequestFulfilled: TypedContractEvent<
      SignatureRequestFulfilledEvent.InputTuple,
      SignatureRequestFulfilledEvent.OutputTuple,
      SignatureRequestFulfilledEvent.OutputObject
    >;

    "SignatureRequested(uint256,address,string,bytes,bytes,bytes,uint256)": TypedContractEvent<
      SignatureRequestedEvent.InputTuple,
      SignatureRequestedEvent.OutputTuple,
      SignatureRequestedEvent.OutputObject
    >;
    SignatureRequested: TypedContractEvent<
      SignatureRequestedEvent.InputTuple,
      SignatureRequestedEvent.OutputTuple,
      SignatureRequestedEvent.OutputObject
    >;
  };
}
