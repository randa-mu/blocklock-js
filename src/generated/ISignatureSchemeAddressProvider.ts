/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
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

export interface ISignatureSchemeAddressProviderInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "getSignatureSchemeAddress"
      | "isSupportedScheme"
      | "updateSignatureScheme"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "getSignatureSchemeAddress",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "isSupportedScheme",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "updateSignatureScheme",
    values: [string, AddressLike]
  ): string;

  decodeFunctionResult(
    functionFragment: "getSignatureSchemeAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isSupportedScheme",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateSignatureScheme",
    data: BytesLike
  ): Result;
}

export interface ISignatureSchemeAddressProvider extends BaseContract {
  connect(runner?: ContractRunner | null): ISignatureSchemeAddressProvider;
  waitForDeployment(): Promise<this>;

  interface: ISignatureSchemeAddressProviderInterface;

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

  getSignatureSchemeAddress: TypedContractMethod<
    [schemeID: string],
    [string],
    "view"
  >;

  isSupportedScheme: TypedContractMethod<[schemeID: string], [boolean], "view">;

  updateSignatureScheme: TypedContractMethod<
    [schemeID: string, schemeAddress: AddressLike],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "getSignatureSchemeAddress"
  ): TypedContractMethod<[schemeID: string], [string], "view">;
  getFunction(
    nameOrSignature: "isSupportedScheme"
  ): TypedContractMethod<[schemeID: string], [boolean], "view">;
  getFunction(
    nameOrSignature: "updateSignatureScheme"
  ): TypedContractMethod<
    [schemeID: string, schemeAddress: AddressLike],
    [void],
    "nonpayable"
  >;

  filters: {};
}
