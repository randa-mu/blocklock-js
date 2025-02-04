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
  BigNumberish,
  AddressLike,
  ContractDeployTransaction,
  ContractRunner,
} from "ethers";
import type { NonPayableOverrides } from "../common";
import type {
  SignatureSender,
  SignatureSenderInterface,
} from "../SignatureSender";

const _abi = [
  {
    type: "constructor",
    inputs: [
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
      {
        name: "owner",
        type: "address",
        internalType: "address",
      },
      {
        name: "_signatureSchemeAddressProvider",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "ADMIN_ROLE",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "DEFAULT_ADMIN_ROLE",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "fulfilSignatureRequest",
    inputs: [
      {
        name: "requestID",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "signature",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getPublicKey",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256[2]",
        internalType: "uint256[2]",
      },
      {
        name: "",
        type: "uint256[2]",
        internalType: "uint256[2]",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getPublicKeyBytes",
    inputs: [],
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
    name: "getRequestInFlight",
    inputs: [
      {
        name: "requestID",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct TypesLib.SignatureRequest",
        components: [
          {
            name: "message",
            type: "bytes",
            internalType: "bytes",
          },
          {
            name: "messageHash",
            type: "bytes",
            internalType: "bytes",
          },
          {
            name: "condition",
            type: "bytes",
            internalType: "bytes",
          },
          {
            name: "schemeID",
            type: "string",
            internalType: "string",
          },
          {
            name: "callback",
            type: "address",
            internalType: "address",
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getRoleAdmin",
    inputs: [
      {
        name: "role",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "grantRole",
    inputs: [
      {
        name: "role",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "account",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "hasRole",
    inputs: [
      {
        name: "role",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "account",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "isInFlight",
    inputs: [
      {
        name: "requestID",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "lastRequestID",
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
    name: "multicall",
    inputs: [
      {
        name: "data",
        type: "bytes[]",
        internalType: "bytes[]",
      },
    ],
    outputs: [
      {
        name: "results",
        type: "bytes[]",
        internalType: "bytes[]",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "renounceRole",
    inputs: [
      {
        name: "role",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "callerConfirmation",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "requestSignature",
    inputs: [
      {
        name: "schemeID",
        type: "string",
        internalType: "string",
      },
      {
        name: "message",
        type: "bytes",
        internalType: "bytes",
      },
      {
        name: "condition",
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
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "requestsInFlight",
    inputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "message",
        type: "bytes",
        internalType: "bytes",
      },
      {
        name: "messageHash",
        type: "bytes",
        internalType: "bytes",
      },
      {
        name: "condition",
        type: "bytes",
        internalType: "bytes",
      },
      {
        name: "schemeID",
        type: "string",
        internalType: "string",
      },
      {
        name: "callback",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "revokeRole",
    inputs: [
      {
        name: "role",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "account",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "signatureSchemeAddressProvider",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract ISignatureSchemeAddressProvider",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "supportsInterface",
    inputs: [
      {
        name: "interfaceId",
        type: "bytes4",
        internalType: "bytes4",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "event",
    name: "RoleAdminChanged",
    inputs: [
      {
        name: "role",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
      {
        name: "previousAdminRole",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
      {
        name: "newAdminRole",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "RoleGranted",
    inputs: [
      {
        name: "role",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
      {
        name: "account",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "sender",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "RoleRevoked",
    inputs: [
      {
        name: "role",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
      {
        name: "account",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "sender",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "SignatureRequestFulfilled",
    inputs: [
      {
        name: "requestID",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "SignatureRequested",
    inputs: [
      {
        name: "requestID",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "callback",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "schemeID",
        type: "string",
        indexed: false,
        internalType: "string",
      },
      {
        name: "message",
        type: "bytes",
        indexed: false,
        internalType: "bytes",
      },
      {
        name: "messageHashToSign",
        type: "bytes",
        indexed: false,
        internalType: "bytes",
      },
      {
        name: "condition",
        type: "bytes",
        indexed: false,
        internalType: "bytes",
      },
      {
        name: "requestedAt",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "error",
    name: "AccessControlBadConfirmation",
    inputs: [],
  },
  {
    type: "error",
    name: "AccessControlUnauthorizedAccount",
    inputs: [
      {
        name: "account",
        type: "address",
        internalType: "address",
      },
      {
        name: "neededRole",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
  },
  {
    type: "error",
    name: "AddressEmptyCode",
    inputs: [
      {
        name: "target",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    type: "error",
    name: "FailedCall",
    inputs: [],
  },
  {
    type: "error",
    name: "SignatureCallbackFailed",
    inputs: [
      {
        name: "requestID",
        type: "uint256",
        internalType: "uint256",
      },
    ],
  },
] as const;

const _bytecode =
  "0x6000600181905560e081815261010082905260a08181526101606040526101208381526101409390935260c0929092526002906200004090829081620002d0565b506020820151620000589060028084019190620002d0565b5050503480156200006857600080fd5b5060405162002dd238038062002dd28339810160408190526200008b91620003c9565b60408051808201909152848152602081018490526002620000ae818781620002d0565b506020820151620000c69060028084019190620002d0565b50620000f791507fa49807205ce4d355092ef5a8a18f56e8913cf4a201fbe287825b095693c2177590508362000221565b6200013d5760405162461bcd60e51b815260206004820152601160248201527011dc985b9d081c9bdb194819985a5b1959607a1b60448201526064015b60405180910390fd5b6200014a60008362000221565b6200018d5760405162461bcd60e51b81526020600482015260126024820152714772616e7420726f6c65207265766572747360701b604482015260640162000134565b6001600160a01b0381166200020b5760405162461bcd60e51b815260206004820152603c60248201527f43616e6e6f7420736574207a65726f2061646472657373206173207369676e6160448201527f7475726520736368656d6520616464726573732070726f766964657200000000606482015260840162000134565b6001600160a01b03166080525062000428915050565b6000828152602081815260408083206001600160a01b038516845290915281205460ff16620002c6576000838152602081815260408083206001600160a01b03861684529091529020805460ff191660011790556200027d3390565b6001600160a01b0316826001600160a01b0316847f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a4506001620002ca565b5060005b92915050565b826002810192821562000301579160200282015b8281111562000301578251825591602001919060010190620002e4565b506200030f92915062000313565b5090565b5b808211156200030f576000815560010162000314565b600082601f8301126200033c57600080fd5b604080519081016001600160401b03811182821017156200036d57634e487b7160e01b600052604160045260246000fd5b80604052508060408401858111156200038557600080fd5b845b81811015620003a157805183526020928301920162000387565b509195945050505050565b80516001600160a01b0381168114620003c457600080fd5b919050565b60008060008060c08587031215620003e057600080fd5b620003ec86866200032a565b9350620003fd86604087016200032a565b92506200040d60808601620003ac565b91506200041d60a08601620003ac565b905092959194509250565b608051612979620004596000396000818161034001528181610b8e01528181610f3701526112cf01526129796000f3fe608060405234801561001057600080fd5b50600436106101365760003560e01c806391d14854116100b2578063acae9fee11610081578063d547741f11610066578063d547741f14610304578063d5c2d4f514610317578063e6b3ca711461033b57600080fd5b8063acae9fee146102b4578063cd802c91146102c957600080fd5b806391d148541461023557806395b8d07314610279578063a217fddf1461028c578063ac9650d81461029457600080fd5b806336568abe1161010957806347c03186116100ee57806347c03186146101f25780635eab2b20146101fb57806375b238fc1461020e57600080fd5b806336568abe146101bf57806344880e1e146101d257600080fd5b806301ffc9a71461013b578063248a9ca3146101635780632e334452146101945780632f2ff15d146101aa575b600080fd5b61014e610149366004611f4d565b610387565b60405190151581526020015b60405180910390f35b610186610171366004611f8f565b60009081526020819052604090206001015490565b60405190815260200161015a565b61019c610420565b60405161015a929190611fcb565b6101bd6101b8366004612008565b61049a565b005b6101bd6101cd366004612008565b6104c5565b6101e56101e0366004611f8f565b610523565b60405161015a91906120a6565b61018660015481565b6101bd6102093660046121af565b6107f3565b6101867fa49807205ce4d355092ef5a8a18f56e8913cf4a201fbe287825b095693c2177581565b61014e610243366004612008565b60009182526020828152604080842073ffffffffffffffffffffffffffffffffffffffff93909316845291905290205460ff1690565b6101866102873660046121fb565b610ee1565b610186600081565b6102a76102a2366004612295565b6115de565b60405161015a919061230a565b6102bc6116c6565b60405161015a919061238c565b61014e6102d7366004611f8f565b60009081526006602052604090206004015473ffffffffffffffffffffffffffffffffffffffff16151590565b6101bd610312366004612008565b611745565b61032a610325366004611f8f565b61176a565b60405161015a95949392919061239f565b6103627f000000000000000000000000000000000000000000000000000000000000000081565b60405173ffffffffffffffffffffffffffffffffffffffff909116815260200161015a565b60007fffffffff0000000000000000000000000000000000000000000000000000000082167f7965db0b00000000000000000000000000000000000000000000000000000000148061041a57507f01ffc9a7000000000000000000000000000000000000000000000000000000007fffffffff000000000000000000000000000000000000000000000000000000008316145b92915050565b610428611ee1565b610430611ee1565b6040805180820191829052600291600491908390819081845b815481526020019060010190808311610449575050604080518082019182905294965085935060029250905082845b8154815260200190600101908083116104785750505050509050915091509091565b6000828152602081905260409020600101546104b5816119ce565b6104bf83836119db565b50505050565b73ffffffffffffffffffffffffffffffffffffffff81163314610514576040517f6697b23200000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b61051e8282611ad7565b505050565b61056b6040518060a0016040528060608152602001606081526020016060815260200160608152602001600073ffffffffffffffffffffffffffffffffffffffff1681525090565b60008281526006602052604090819020815160a0810190925280548290829061059390612415565b80601f01602080910402602001604051908101604052809291908181526020018280546105bf90612415565b801561060c5780601f106105e15761010080835404028352916020019161060c565b820191906000526020600020905b8154815290600101906020018083116105ef57829003601f168201915b5050505050815260200160018201805461062590612415565b80601f016020809104026020016040519081016040528092919081815260200182805461065190612415565b801561069e5780601f106106735761010080835404028352916020019161069e565b820191906000526020600020905b81548152906001019060200180831161068157829003601f168201915b505050505081526020016002820180546106b790612415565b80601f01602080910402602001604051908101604052809291908181526020018280546106e390612415565b80156107305780601f1061070557610100808354040283529160200191610730565b820191906000526020600020905b81548152906001019060200180831161071357829003601f168201915b5050505050815260200160038201805461074990612415565b80601f016020809104026020016040519081016040528092919081815260200182805461077590612415565b80156107c25780601f10610797576101008083540402835291602001916107c2565b820191906000526020600020905b8154815290600101906020018083116107a557829003601f168201915b50505091835250506004919091015473ffffffffffffffffffffffffffffffffffffffff1660209091015292915050565b61081c7fa49807205ce4d355092ef5a8a18f56e8913cf4a201fbe287825b095693c217756119ce565b60008381526006602052604090206004015473ffffffffffffffffffffffffffffffffffffffff166108d5576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602360248201527f4e6f20726571756573742077697468207370656369666965642072657175657360448201527f744944000000000000000000000000000000000000000000000000000000000060648201526084015b60405180910390fd5b600083815260066020526040808220815160a081019092528054829082906108fc90612415565b80601f016020809104026020016040519081016040528092919081815260200182805461092890612415565b80156109755780601f1061094a57610100808354040283529160200191610975565b820191906000526020600020905b81548152906001019060200180831161095857829003601f168201915b5050505050815260200160018201805461098e90612415565b80601f01602080910402602001604051908101604052809291908181526020018280546109ba90612415565b8015610a075780601f106109dc57610100808354040283529160200191610a07565b820191906000526020600020905b8154815290600101906020018083116109ea57829003601f168201915b50505050508152602001600282018054610a2090612415565b80601f0160208091040260200160405190810160405280929190818152602001828054610a4c90612415565b8015610a995780601f10610a6e57610100808354040283529160200191610a99565b820191906000526020600020905b815481529060010190602001808311610a7c57829003601f168201915b50505050508152602001600382018054610ab290612415565b80601f0160208091040260200160405190810160405280929190818152602001828054610ade90612415565b8015610b2b5780601f10610b0057610100808354040283529160200191610b2b565b820191906000526020600020905b815481529060010190602001808311610b0e57829003601f168201915b505050918352505060049182015473ffffffffffffffffffffffffffffffffffffffff90811660209092019190915260608301516040517f5bb09cf8000000000000000000000000000000000000000000000000000000008152939450926000927f000000000000000000000000000000000000000000000000000000000000000090921691635bb09cf891610bc39186910161238c565b602060405180830381865afa158015610be0573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c049190612468565b905060008190508073ffffffffffffffffffffffffffffffffffffffff1663f6e548e985602001518888610c366116c6565b6040518563ffffffff1660e01b8152600401610c5594939291906124ce565b602060405180830381865afa158015610c72573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c969190612513565b610cfc576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f5369676e617475726520766572696669636174696f6e206661696c656400000060448201526064016108cc565b6000846080015173ffffffffffffffffffffffffffffffffffffffff1663c8db658260e01b898989604051602401610d3693929190612535565b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181529181526020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fffffffff00000000000000000000000000000000000000000000000000000000909416939093179092529051610dbf919061254f565b6000604051808303816000865af19150503d8060008114610dfc576040519150601f19603f3d011682016040523d82523d6000602084013e610e01565b606091505b5050905080610e3f576040517fb4474744000000000000000000000000000000000000000000000000000000008152600481018990526024016108cc565b60405188907fd4ea4684d3a92e95520ada379d1fd257a1e354567964ffd985b5f28c5940e7ab90600090a2600088815260066020526040812090610e838282611eff565b610e91600183016000611eff565b610e9f600283016000611eff565b610ead600383016000611eff565b5060040180547fffffffffffffffffffffffff00000000000000000000000000000000000000001690555050505050505050565b60006001806000828254610ef5919061259a565b90915550506040517f2fc9fa3300000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff7f00000000000000000000000000000000000000000000000000000000000000001690632fc9fa3390610f6e908a908a906004016125ad565b602060405180830381865afa158015610f8b573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610faf9190612513565b611015576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601e60248201527f5369676e617475726520736368656d65206e6f7420737570706f72746564000060448201526064016108cc565b61105d600161100087878080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250929493925050611b929050565b6110e9576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602260248201527f4d657373616765206661696c6564206c656e67746820626f756e64732063686560448201527f636b00000000000000000000000000000000000000000000000000000000000060648201526084016108cc565b611131600061100085858080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250929493925050611b929050565b6111bc576040517f08c379a0000000000000000000000000000000000000000000000000000000008152602060048201526024808201527f436f6e646974696f6e206661696c6564206c656e67746820626f756e6473206360448201527f6865636b0000000000000000000000000000000000000000000000000000000060648201526084016108cc565b81801561128f5761120284848080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250611c4192505050565b1561128f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602360248201527f436f6e646974696f6e2062797465732063616e6e6f7420626520616c6c207a6560448201527f726f73000000000000000000000000000000000000000000000000000000000060648201526084016108cc565b6040517f5bb09cf800000000000000000000000000000000000000000000000000000000815260009073ffffffffffffffffffffffffffffffffffffffff7f00000000000000000000000000000000000000000000000000000000000000001690635bb09cf890611306908c908c906004016125ad565b602060405180830381865afa158015611323573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906113479190612468565b6040517feae1e15b000000000000000000000000000000000000000000000000000000008152909150819060009073ffffffffffffffffffffffffffffffffffffffff83169063eae1e15b906113a3908c908c906004016125ad565b600060405180830381865afa1580156113c0573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016820160405261140691908101906125f8565b6040805160c06020601f8d01819004028201810190925260a081018b81529293509182918c908c9081908501838280828437600092019190915250505090825250602080820184905260408051601f8b0183900483028101830182528a8152920191908a908a9081908401838280828437600092019190915250505090825250604080516020601f8f018190048102820181019092528d815291810191908e908e90819084018382808284376000920182905250938552505033602093840152506001548152600690915260409020815181906114e39082612708565b50602082015160018201906114f89082612708565b506040820151600282019061150d9082612708565b50606082015160038201906115229082612708565b5060808201518160040160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055509050503373ffffffffffffffffffffffffffffffffffffffff166001547ff0a5ef4bc87d6534674b1469f4b31d03c6510d0f7ab353f3e53f9d1d87ead02b8d8d8d8d878e8e426040516115c4989796959493929190612822565b60405180910390a350506001549998505050505050505050565b6040805160008152602081019091526060908267ffffffffffffffff811115611609576116096125c9565b60405190808252806020026020018201604052801561163c57816020015b60608152602001906001900390816116275790505b50915060005b838110156116be576116993086868481811061166057611660612888565b905060200281019061167291906128b7565b856040516020016116859392919061291c565b604051602081830303815290604052611ca6565b8382815181106116ab576116ab612888565b6020908102919091010152600101611642565b505092915050565b604080516080810180835260609261174092916002918391908201908390819081845b8154815260200190600101908083116116e957505050918352505060408051808201918290526020909201919060028481019182845b81548152602001906001019080831161171f57505050505081525050611d29565b905090565b600082815260208190526040902060010154611760816119ce565b6104bf8383611ad7565b60066020526000908152604090208054819061178590612415565b80601f01602080910402602001604051908101604052809291908181526020018280546117b190612415565b80156117fe5780601f106117d3576101008083540402835291602001916117fe565b820191906000526020600020905b8154815290600101906020018083116117e157829003601f168201915b50505050509080600101805461181390612415565b80601f016020809104026020016040519081016040528092919081815260200182805461183f90612415565b801561188c5780601f106118615761010080835404028352916020019161188c565b820191906000526020600020905b81548152906001019060200180831161186f57829003601f168201915b5050505050908060020180546118a190612415565b80601f01602080910402602001604051908101604052809291908181526020018280546118cd90612415565b801561191a5780601f106118ef5761010080835404028352916020019161191a565b820191906000526020600020905b8154815290600101906020018083116118fd57829003601f168201915b50505050509080600301805461192f90612415565b80601f016020809104026020016040519081016040528092919081815260200182805461195b90612415565b80156119a85780601f1061197d576101008083540402835291602001916119a8565b820191906000526020600020905b81548152906001019060200180831161198b57829003601f168201915b5050506004909301549192505073ffffffffffffffffffffffffffffffffffffffff1685565b6119d88133611d86565b50565b60008281526020818152604080832073ffffffffffffffffffffffffffffffffffffffff8516845290915281205460ff16611acf5760008381526020818152604080832073ffffffffffffffffffffffffffffffffffffffff86168452909152902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00166001179055611a6d3390565b73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16847f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a450600161041a565b50600061041a565b60008281526020818152604080832073ffffffffffffffffffffffffffffffffffffffff8516845290915281205460ff1615611acf5760008381526020818152604080832073ffffffffffffffffffffffffffffffffffffffff8616808552925280832080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0016905551339286917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a450600161041a565b600081831115611c24576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603a60248201527f496e76616c696420626f756e64733a206d696e4c656e6774682063616e6e6f7460448201527f2062652067726561746572207468616e206d61784c656e67746800000000000060648201526084016108cc565b8351838110801590611c365750828111155b9150505b9392505050565b6000805b8251811015611c9d57828181518110611c6057611c60612888565b01602001517fff000000000000000000000000000000000000000000000000000000000000001615611c955750600092915050565b600101611c45565b50600192915050565b60606000808473ffffffffffffffffffffffffffffffffffffffff1684604051611cd0919061254f565b600060405180830381855af49150503d8060008114611d0b576040519150601f19603f3d011682016040523d82523d6000602084013e611d10565b606091505b5091509150611d20858383611e10565b95945050505050565b60408051608080825260a08201909252606091600091906020820181803683375050845180516020918201519682015180519083015192850191909152604084019690965260608301959095525060808101939093525090919050565b60008281526020818152604080832073ffffffffffffffffffffffffffffffffffffffff8516845290915290205460ff16611e0c576040517fe2517d3f00000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff82166004820152602481018390526044016108cc565b5050565b606082611e2557611e2082611e9f565b611c3a565b8151158015611e49575073ffffffffffffffffffffffffffffffffffffffff84163b155b15611e98576040517f9996b31500000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff851660048201526024016108cc565b5080611c3a565b805115611eaf5780518082602001fd5b6040517fd6bda27500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60405180604001604052806002906020820280368337509192915050565b508054611f0b90612415565b6000825580601f10611f1b575050565b601f0160209004906000526020600020908101906119d891905b80821115611f495760008155600101611f35565b5090565b600060208284031215611f5f57600080fd5b81357fffffffff0000000000000000000000000000000000000000000000000000000081168114611c3a57600080fd5b600060208284031215611fa157600080fd5b5035919050565b8060005b60028110156104bf578151845260209384019390910190600101611fac565b60808101611fd98285611fa8565b611c3a6040830184611fa8565b73ffffffffffffffffffffffffffffffffffffffff811681146119d857600080fd5b6000806040838503121561201b57600080fd5b82359150602083013561202d81611fe6565b809150509250929050565b60005b8381101561205357818101518382015260200161203b565b50506000910152565b60008151808452612074816020860160208601612038565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169290920160200192915050565b602081526000825160a060208401526120c260c084018261205c565b905060208401517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0808584030160408601526120fe838361205c565b9250604086015191508085840301606086015261211b838361205c565b9250606086015191508085840301608086015250612139828261205c565b91505073ffffffffffffffffffffffffffffffffffffffff60808501511660a08401528091505092915050565b60008083601f84011261217857600080fd5b50813567ffffffffffffffff81111561219057600080fd5b6020830191508360208285010111156121a857600080fd5b9250929050565b6000806000604084860312156121c457600080fd5b83359250602084013567ffffffffffffffff8111156121e257600080fd5b6121ee86828701612166565b9497909650939450505050565b6000806000806000806060878903121561221457600080fd5b863567ffffffffffffffff8082111561222c57600080fd5b6122388a838b01612166565b9098509650602089013591508082111561225157600080fd5b61225d8a838b01612166565b9096509450604089013591508082111561227657600080fd5b5061228389828a01612166565b979a9699509497509295939492505050565b600080602083850312156122a857600080fd5b823567ffffffffffffffff808211156122c057600080fd5b818501915085601f8301126122d457600080fd5b8135818111156122e357600080fd5b8660208260051b85010111156122f857600080fd5b60209290920196919550909350505050565b600060208083016020845280855180835260408601915060408160051b87010192506020870160005b8281101561237f577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc088860301845261236d85835161205c565b94509285019290850190600101612333565b5092979650505050505050565b602081526000611c3a602083018461205c565b60a0815260006123b260a083018861205c565b82810360208401526123c4818861205c565b905082810360408401526123d8818761205c565b905082810360608401526123ec818661205c565b91505073ffffffffffffffffffffffffffffffffffffffff831660808301529695505050505050565b600181811c9082168061242957607f821691505b602082108103612462577f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b50919050565b60006020828403121561247a57600080fd5b8151611c3a81611fe6565b8183528181602085013750600060208284010152600060207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f840116840101905092915050565b6060815260006124e1606083018761205c565b82810360208401526124f4818688612485565b90508281036040840152612508818561205c565b979650505050505050565b60006020828403121561252557600080fd5b81518015158114611c3a57600080fd5b838152604060208201526000611d20604083018486612485565b60008251612561818460208701612038565b9190910192915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b8082018082111561041a5761041a61256b565b6020815260006125c1602083018486612485565b949350505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b60006020828403121561260a57600080fd5b815167ffffffffffffffff8082111561262257600080fd5b818401915084601f83011261263657600080fd5b815181811115612648576126486125c9565b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0908116603f0116810190838211818310171561268e5761268e6125c9565b816040528281528760208487010111156126a757600080fd5b612508836020830160208801612038565b601f82111561051e576000816000526020600020601f850160051c810160208610156126e15750805b601f850160051c820191505b81811015612700578281556001016126ed565b505050505050565b815167ffffffffffffffff811115612722576127226125c9565b612736816127308454612415565b846126b8565b602080601f83116001811461278957600084156127535750858301515b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600386901b1c1916600185901b178555612700565b6000858152602081207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08616915b828110156127d6578886015182559484019460019091019084016127b7565b508582101561281257878501517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600388901b60f8161c191681555b5050505050600190811b01905550565b60a08152600061283660a083018a8c612485565b828103602084015261284981898b612485565b9050828103604084015261285d818861205c565b90508281036060840152612872818688612485565b9150508260808301529998505050505050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60008083357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe18436030181126128ec57600080fd5b83018035915067ffffffffffffffff82111561290757600080fd5b6020019150368190038213156121a857600080fd5b828482376000838201600081528351612939818360208801612038565b019594505050505056fea264697066735822122009bab19e32e30afa14c6e3a3f23b31306b7992e18915ca41f2a2846611064f5864736f6c63430008180033";

type SignatureSenderConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: SignatureSenderConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class SignatureSender__factory extends ContractFactory {
  constructor(...args: SignatureSenderConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    x: [BigNumberish, BigNumberish],
    y: [BigNumberish, BigNumberish],
    owner: AddressLike,
    _signatureSchemeAddressProvider: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(
      x,
      y,
      owner,
      _signatureSchemeAddressProvider,
      overrides || {}
    );
  }
  override deploy(
    x: [BigNumberish, BigNumberish],
    y: [BigNumberish, BigNumberish],
    owner: AddressLike,
    _signatureSchemeAddressProvider: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(
      x,
      y,
      owner,
      _signatureSchemeAddressProvider,
      overrides || {}
    ) as Promise<
      SignatureSender & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): SignatureSender__factory {
    return super.connect(runner) as SignatureSender__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): SignatureSenderInterface {
    return new Interface(_abi) as SignatureSenderInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): SignatureSender {
    return new Contract(address, _abi, runner) as unknown as SignatureSender;
  }
}
