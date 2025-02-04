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

export interface BlocklockSenderInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "ADMIN_ROLE"
      | "DEFAULT_ADMIN_ROLE"
      | "DST_H1_G1"
      | "DST_H2"
      | "DST_H3"
      | "DST_H4"
      | "SCHEME_ID"
      | "UPGRADE_INTERFACE_VERSION"
      | "blocklockRequests"
      | "decrypt"
      | "decryptionSender"
      | "getRequest"
      | "getRoleAdmin"
      | "getRoleMember"
      | "getRoleMemberCount"
      | "getRoleMembers"
      | "grantRole"
      | "hasRole"
      | "initialize"
      | "isInFlight"
      | "proxiableUUID"
      | "receiveDecryptionData"
      | "renounceRole"
      | "requestBlocklock"
      | "revokeRole"
      | "setDecryptionSender"
      | "supportsInterface"
      | "upgradeToAndCall"
      | "version"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "BlocklockCallbackSuccess"
      | "BlocklockRequested"
      | "DecryptionSenderUpdated"
      | "Initialized"
      | "RoleAdminChanged"
      | "RoleGranted"
      | "RoleRevoked"
      | "Upgraded"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "ADMIN_ROLE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "DEFAULT_ADMIN_ROLE",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "DST_H1_G1", values?: undefined): string;
  encodeFunctionData(functionFragment: "DST_H2", values?: undefined): string;
  encodeFunctionData(functionFragment: "DST_H3", values?: undefined): string;
  encodeFunctionData(functionFragment: "DST_H4", values?: undefined): string;
  encodeFunctionData(functionFragment: "SCHEME_ID", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "UPGRADE_INTERFACE_VERSION",
    values?: undefined
  ): string;
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
    functionFragment: "getRoleAdmin",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getRoleMember",
    values: [BytesLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getRoleMemberCount",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getRoleMembers",
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
    functionFragment: "initialize",
    values: [AddressLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "isInFlight",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "proxiableUUID",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "receiveDecryptionData",
    values: [BigNumberish, BytesLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceRole",
    values: [BytesLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "requestBlocklock",
    values: [BigNumberish, TypesLib.CiphertextStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "revokeRole",
    values: [BytesLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "setDecryptionSender",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "supportsInterface",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "upgradeToAndCall",
    values: [AddressLike, BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "version", values?: undefined): string;

  decodeFunctionResult(functionFragment: "ADMIN_ROLE", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "DEFAULT_ADMIN_ROLE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "DST_H1_G1", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "DST_H2", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "DST_H3", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "DST_H4", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "SCHEME_ID", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "UPGRADE_INTERFACE_VERSION",
    data: BytesLike
  ): Result;
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
  decodeFunctionResult(
    functionFragment: "getRoleAdmin",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getRoleMember",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getRoleMemberCount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getRoleMembers",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "grantRole", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "hasRole", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "isInFlight", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "proxiableUUID",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "receiveDecryptionData",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceRole",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "requestBlocklock",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "revokeRole", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setDecryptionSender",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "supportsInterface",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "upgradeToAndCall",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "version", data: BytesLike): Result;
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

export namespace DecryptionSenderUpdatedEvent {
  export type InputTuple = [decryptionSender: AddressLike];
  export type OutputTuple = [decryptionSender: string];
  export interface OutputObject {
    decryptionSender: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace InitializedEvent {
  export type InputTuple = [version: BigNumberish];
  export type OutputTuple = [version: bigint];
  export interface OutputObject {
    version: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
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

export namespace UpgradedEvent {
  export type InputTuple = [implementation: AddressLike];
  export type OutputTuple = [implementation: string];
  export interface OutputObject {
    implementation: string;
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

  ADMIN_ROLE: TypedContractMethod<[], [string], "view">;

  DEFAULT_ADMIN_ROLE: TypedContractMethod<[], [string], "view">;

  DST_H1_G1: TypedContractMethod<[], [string], "view">;

  DST_H2: TypedContractMethod<[], [string], "view">;

  DST_H3: TypedContractMethod<[], [string], "view">;

  DST_H4: TypedContractMethod<[], [string], "view">;

  SCHEME_ID: TypedContractMethod<[], [string], "view">;

  UPGRADE_INTERFACE_VERSION: TypedContractMethod<[], [string], "view">;

  blocklockRequests: TypedContractMethod<
    [arg0: BigNumberish],
    [
      [
        bigint,
        bigint,
        TypesLib.CiphertextStructOutput,
        string,
        string,
        string
      ] & {
        decryptionRequestID: bigint;
        blockHeight: bigint;
        ciphertext: TypesLib.CiphertextStructOutput;
        signature: string;
        decryptionKey: string;
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

  getRoleAdmin: TypedContractMethod<[role: BytesLike], [string], "view">;

  getRoleMember: TypedContractMethod<
    [role: BytesLike, index: BigNumberish],
    [string],
    "view"
  >;

  getRoleMemberCount: TypedContractMethod<[role: BytesLike], [bigint], "view">;

  getRoleMembers: TypedContractMethod<[role: BytesLike], [string[]], "view">;

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

  initialize: TypedContractMethod<
    [owner: AddressLike, _decryptionSender: AddressLike],
    [void],
    "nonpayable"
  >;

  isInFlight: TypedContractMethod<[requestID: BigNumberish], [boolean], "view">;

  proxiableUUID: TypedContractMethod<[], [string], "view">;

  receiveDecryptionData: TypedContractMethod<
    [requestID: BigNumberish, decryptionKey: BytesLike, signature: BytesLike],
    [void],
    "nonpayable"
  >;

  renounceRole: TypedContractMethod<
    [role: BytesLike, callerConfirmation: AddressLike],
    [void],
    "nonpayable"
  >;

  requestBlocklock: TypedContractMethod<
    [blockHeight: BigNumberish, ciphertext: TypesLib.CiphertextStruct],
    [bigint],
    "nonpayable"
  >;

  revokeRole: TypedContractMethod<
    [role: BytesLike, account: AddressLike],
    [void],
    "nonpayable"
  >;

  setDecryptionSender: TypedContractMethod<
    [newDecryptionSender: AddressLike],
    [void],
    "nonpayable"
  >;

  supportsInterface: TypedContractMethod<
    [interfaceId: BytesLike],
    [boolean],
    "view"
  >;

  upgradeToAndCall: TypedContractMethod<
    [newImplementation: AddressLike, data: BytesLike],
    [void],
    "payable"
  >;

  version: TypedContractMethod<[], [string], "view">;

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
    nameOrSignature: "UPGRADE_INTERFACE_VERSION"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "blocklockRequests"
  ): TypedContractMethod<
    [arg0: BigNumberish],
    [
      [
        bigint,
        bigint,
        TypesLib.CiphertextStructOutput,
        string,
        string,
        string
      ] & {
        decryptionRequestID: bigint;
        blockHeight: bigint;
        ciphertext: TypesLib.CiphertextStructOutput;
        signature: string;
        decryptionKey: string;
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
    nameOrSignature: "getRoleAdmin"
  ): TypedContractMethod<[role: BytesLike], [string], "view">;
  getFunction(
    nameOrSignature: "getRoleMember"
  ): TypedContractMethod<
    [role: BytesLike, index: BigNumberish],
    [string],
    "view"
  >;
  getFunction(
    nameOrSignature: "getRoleMemberCount"
  ): TypedContractMethod<[role: BytesLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "getRoleMembers"
  ): TypedContractMethod<[role: BytesLike], [string[]], "view">;
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
    nameOrSignature: "initialize"
  ): TypedContractMethod<
    [owner: AddressLike, _decryptionSender: AddressLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "isInFlight"
  ): TypedContractMethod<[requestID: BigNumberish], [boolean], "view">;
  getFunction(
    nameOrSignature: "proxiableUUID"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "receiveDecryptionData"
  ): TypedContractMethod<
    [requestID: BigNumberish, decryptionKey: BytesLike, signature: BytesLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "renounceRole"
  ): TypedContractMethod<
    [role: BytesLike, callerConfirmation: AddressLike],
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
  getFunction(
    nameOrSignature: "revokeRole"
  ): TypedContractMethod<
    [role: BytesLike, account: AddressLike],
    [void],
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
    nameOrSignature: "supportsInterface"
  ): TypedContractMethod<[interfaceId: BytesLike], [boolean], "view">;
  getFunction(
    nameOrSignature: "upgradeToAndCall"
  ): TypedContractMethod<
    [newImplementation: AddressLike, data: BytesLike],
    [void],
    "payable"
  >;
  getFunction(
    nameOrSignature: "version"
  ): TypedContractMethod<[], [string], "view">;

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
  getEvent(
    key: "DecryptionSenderUpdated"
  ): TypedContractEvent<
    DecryptionSenderUpdatedEvent.InputTuple,
    DecryptionSenderUpdatedEvent.OutputTuple,
    DecryptionSenderUpdatedEvent.OutputObject
  >;
  getEvent(
    key: "Initialized"
  ): TypedContractEvent<
    InitializedEvent.InputTuple,
    InitializedEvent.OutputTuple,
    InitializedEvent.OutputObject
  >;
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
    key: "Upgraded"
  ): TypedContractEvent<
    UpgradedEvent.InputTuple,
    UpgradedEvent.OutputTuple,
    UpgradedEvent.OutputObject
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

    "DecryptionSenderUpdated(address)": TypedContractEvent<
      DecryptionSenderUpdatedEvent.InputTuple,
      DecryptionSenderUpdatedEvent.OutputTuple,
      DecryptionSenderUpdatedEvent.OutputObject
    >;
    DecryptionSenderUpdated: TypedContractEvent<
      DecryptionSenderUpdatedEvent.InputTuple,
      DecryptionSenderUpdatedEvent.OutputTuple,
      DecryptionSenderUpdatedEvent.OutputObject
    >;

    "Initialized(uint64)": TypedContractEvent<
      InitializedEvent.InputTuple,
      InitializedEvent.OutputTuple,
      InitializedEvent.OutputObject
    >;
    Initialized: TypedContractEvent<
      InitializedEvent.InputTuple,
      InitializedEvent.OutputTuple,
      InitializedEvent.OutputObject
    >;

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

    "Upgraded(address)": TypedContractEvent<
      UpgradedEvent.InputTuple,
      UpgradedEvent.OutputTuple,
      UpgradedEvent.OutputObject
    >;
    Upgraded: TypedContractEvent<
      UpgradedEvent.InputTuple,
      UpgradedEvent.OutputTuple,
      UpgradedEvent.OutputObject
    >;
  };
}
