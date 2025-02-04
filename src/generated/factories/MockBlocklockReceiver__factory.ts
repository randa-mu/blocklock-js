/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type {
  Signer,
  AddressLike,
  ContractDeployTransaction,
  ContractRunner,
} from "ethers";
import type { NonPayableOverrides } from "../common";
import type {
  MockBlocklockReceiver,
  MockBlocklockReceiverInterface,
} from "../MockBlocklockReceiver";

const _abi = [
  {
    type: "constructor",
    inputs: [
      {
        name: "blocklockContract",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "blocklock",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract IBlocklockSender",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "createTimelockRequest",
    inputs: [
      {
        name: "decryptionBlockNumber",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "encryptedData",
        type: "tuple",
        internalType: "struct TypesLib.Ciphertext",
        components: [
          {
            name: "u",
            type: "tuple",
            internalType: "struct BLS.PointG2",
            components: [
              {
                name: "x",
                type: "uint256[2]",
                internalType: "uint256[2]",
              },
              {
                name: "y",
                type: "uint256[2]",
                internalType: "uint256[2]",
              },
            ],
          },
          {
            name: "v",
            type: "bytes",
            internalType: "bytes",
          },
          {
            name: "w",
            type: "bytes",
            internalType: "bytes",
          },
        ],
      },
    ],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "encrytpedValue",
    inputs: [],
    outputs: [
      {
        name: "u",
        type: "tuple",
        internalType: "struct BLS.PointG2",
        components: [
          {
            name: "x",
            type: "uint256[2]",
            internalType: "uint256[2]",
          },
          {
            name: "y",
            type: "uint256[2]",
            internalType: "uint256[2]",
          },
        ],
      },
      {
        name: "v",
        type: "bytes",
        internalType: "bytes",
      },
      {
        name: "w",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "plainTextValue",
    inputs: [],
    outputs: [
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
    name: "receiveBlocklock",
    inputs: [
      {
        name: "requestID",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "decryptionKey",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "requestId",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50604051610e0e380380610e0e83398101604081905261002f91610054565b600080546001600160a01b0319166001600160a01b0392909216919091179055610084565b60006020828403121561006657600080fd5b81516001600160a01b038116811461007d57600080fd5b9392505050565b610d7b806100936000396000f3fe608060405234801561001057600080fd5b50600436106100715760003560e01c806393b9740a1161005057806393b9740a146100be57806397a9c2851461010357806398e5a5e71461010c57600080fd5b80626d6cae14610076578063492eea42146100925780635d941802146100a9575b600080fd5b61007f60015481565b6040519081526020015b60405180910390f35b61009a61011f565b604051610089939291906105ed565b6100bc6100b736600461063d565b6102ae565b005b6000546100de9073ffffffffffffffffffffffffffffffffffffffff1681565b60405173ffffffffffffffffffffffffffffffffffffffff9091168152602001610089565b61007f60085481565b61007f61011a3660046106b9565b61049e565b6040805160808101808352600292839183918201908390819081845b81548152602001906001019080831161013b57505050918352505060408051808201918290526020909201919060028481019182845b815481526020019060010190808311610171575050505050815250509080600401805461019d90610707565b80601f01602080910402602001604051908101604052809291908181526020018280546101c990610707565b80156102165780601f106101eb57610100808354040283529160200191610216565b820191906000526020600020905b8154815290600101906020018083116101f957829003601f168201915b50505050509080600501805461022b90610707565b80601f016020809104026020016040519081016040528092919081815260200182805461025790610707565b80156102a45780601f10610279576101008083540402835291602001916102a4565b820191906000526020600020905b81548152906001019060200180831161028757829003601f168201915b5050505050905083565b60005473ffffffffffffffffffffffffffffffffffffffff16331461035a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602560248201527f4f6e6c792074696d656c6f636b20636f6e74726163742063616e2063616c6c2060448201527f746869732e00000000000000000000000000000000000000000000000000000060648201526084015b60405180910390fd5b60015483146103c5576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601260248201527f496e76616c6964207265717565737420696400000000000000000000000000006044820152606401610351565b6000546040517fc9bc18c400000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff9091169063c9bc18c4906104209060029086908690600401610861565b600060405180830381865afa15801561043d573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01682016040526104839190810190610916565b80602001905181019061049691906109e1565b600855505050565b600080546040517f46cd2b4200000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff909116906346cd2b42906104f79086908690600401610a65565b6020604051808303816000875af1158015610516573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061053a91906109e1565b60015581600261054a8282610cbb565b50506001549392505050565b8060005b600281101561057957815184526020938401939091019060010161055a565b50505050565b60005b8381101561059a578181015183820152602001610582565b50506000910152565b600081518084526105bb81602086016020860161057f565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169290920160200192915050565b6105f8818551610556565b6000602085015161060c6040840182610556565b5060c0608083015261062160c08301856105a3565b82810360a084015261063381856105a3565b9695505050505050565b60008060006040848603121561065257600080fd5b83359250602084013567ffffffffffffffff8082111561067157600080fd5b818601915086601f83011261068557600080fd5b81358181111561069457600080fd5b8760208285010111156106a657600080fd5b6020830194508093505050509250925092565b600080604083850312156106cc57600080fd5b82359150602083013567ffffffffffffffff8111156106ea57600080fd5b830160c081860312156106fc57600080fd5b809150509250929050565b600181811c9082168061071b57607f821691505b602082108103610754577f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b50919050565b8060005b600281101561057957815484526020909301926001918201910161075e565b6000815461078a81610707565b8085526020600183811680156107a757600181146107df5761080d565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff008516838901528284151560051b890101955061080d565b866000528260002060005b858110156108055781548a82018601529083019084016107ea565b890184019650505b505050505092915050565b8183528181602085013750600060208284010152600060207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f840116840101905092915050565b60408152610872604082018561075a565b610882608082016002860161075a565b60c080820152600061089b61010083016004870161077d565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc08382030160e08401526108d2816005880161077d565b90508281036020840152610633818587610818565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b60006020828403121561092857600080fd5b815167ffffffffffffffff8082111561094057600080fd5b818401915084601f83011261095457600080fd5b815181811115610966576109666108e7565b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0908116603f011681019083821181831017156109ac576109ac6108e7565b816040528281528760208487010111156109c557600080fd5b6109d683602083016020880161057f565b979650505050505050565b6000602082840312156109f357600080fd5b5051919050565b60008083357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe1843603018112610a2f57600080fd5b830160208101925035905067ffffffffffffffff811115610a4f57600080fd5b803603821315610a5e57600080fd5b9250929050565b828152604060208201526040826040830137604080830160808301376000610a9060808401846109fa565b60c080850152610aa561010085018284610818565b915050610ab560a08501856109fa565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc08584030160e08601526109d6838284610818565b60008083357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe1843603018112610b1f57600080fd5b83018035915067ffffffffffffffff821115610b3a57600080fd5b602001915036819003821315610a5e57600080fd5b601f821115610b9b576000816000526020600020601f850160051c81016020861015610b785750805b601f850160051c820191505b81811015610b9757828155600101610b84565b5050505b505050565b67ffffffffffffffff831115610bb857610bb86108e7565b610bcc83610bc68354610707565b83610b4f565b6000601f841160018114610c1e5760008515610be85750838201355b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600387901b1c1916600186901b178355610cb4565b6000838152602090207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0861690835b82811015610c6d5786850135825560209485019460019092019101610c4d565b5086821015610ca8577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff60f88860031b161c19848701351681555b505060018560011b0183555b5050505050565b8160005b6002811015610cdc57813583820155602090910190600101610cbf565b50506040820160005b6002808210610cf45750610d0b565b823584830190910155602090910190600101610ce5565b5050610d1a6080830183610aea565b610d28818360048601610ba0565b5050610d3760a0830183610aea565b610579818360058601610ba056fea26469706673582212207fa036973fdf09c2597ff57413d8ebc28ab49cb213e58d872a5f99322ff1cbb064736f6c63430008180033";

type MockBlocklockReceiverConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MockBlocklockReceiverConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class MockBlocklockReceiver__factory extends ContractFactory {
  constructor(...args: MockBlocklockReceiverConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    blocklockContract: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(blocklockContract, overrides || {});
  }
  override deploy(
    blocklockContract: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(blocklockContract, overrides || {}) as Promise<
      MockBlocklockReceiver & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(
    runner: ContractRunner | null
  ): MockBlocklockReceiver__factory {
    return super.connect(runner) as MockBlocklockReceiver__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MockBlocklockReceiverInterface {
    return new Interface(_abi) as MockBlocklockReceiverInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): MockBlocklockReceiver {
    return new Contract(
      address,
      _abi,
      runner
    ) as unknown as MockBlocklockReceiver;
  }
}
