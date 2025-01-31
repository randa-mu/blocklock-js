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
import type { Deployer, DeployerInterface } from "../Deployer";

const _abi = [
  {
    type: "function",
    name: "computeAddress",
    inputs: [
      {
        name: "salt",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "creationCodeHash",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    outputs: [
      {
        name: "addr",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "deploy",
    inputs: [
      {
        name: "salt",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "creationCode",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "payable",
  },
  {
    type: "event",
    name: "CreatedContract",
    inputs: [
      {
        name: "addr",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "salt",
        type: "bytes32",
        indexed: false,
        internalType: "bytes32",
      },
    ],
    anonymous: false,
  },
  {
    type: "error",
    name: "Create2EmptyBytecode",
    inputs: [],
  },
  {
    type: "error",
    name: "Create2FailedDeployment",
    inputs: [],
  },
] as const;

const _bytecode =
  "0x608060405234801561000f575f80fd5b506102618061001d5f395ff3fe608060405260043610610028575f3560e01c8063481286e61461002c578063cdcb760a14610067575b5f80fd5b348015610037575f80fd5b5061004b610046366004610142565b61007a565b6040516001600160a01b03909116815260200160405180910390f35b61004b610075366004610176565b6100a4565b6040805190810182905260208101839052308082525f91600b0160ff815360559020949350505050565b5f81515f036100c657604051631328927760e21b815260040160405180910390fd5b5f8383516020850134f590506001600160a01b0381166100f957604051633a0ba96160e11b815260040160405180910390fd5b604080516001600160a01b0383168152602081018690527f4108529e399e9cd5343c48ae06aa62a23c8c1b7c93f59d4691a0ea1e6f5b4603910160405180910390a19392505050565b5f8060408385031215610153575f80fd5b50508035926020909101359150565b634e487b7160e01b5f52604160045260245ffd5b5f8060408385031215610187575f80fd5b82359150602083013567ffffffffffffffff808211156101a5575f80fd5b818501915085601f8301126101b8575f80fd5b8135818111156101ca576101ca610162565b604051601f8201601f19908116603f011681019083821181831017156101f2576101f2610162565b8160405282815288602084870101111561020a575f80fd5b826020860160208301375f602084830101528095505050505050925092905056fea26469706673582212205d30a1576505ed8e8e10595980c2262bb732a255f6697e3842744c100deb54b164736f6c63430008180033";

type DeployerConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: DeployerConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Deployer__factory extends ContractFactory {
  constructor(...args: DeployerConstructorParams) {
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
      Deployer & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): Deployer__factory {
    return super.connect(runner) as Deployer__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): DeployerInterface {
    return new Interface(_abi) as DeployerInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): Deployer {
    return new Contract(address, _abi, runner) as unknown as Deployer;
  }
}
