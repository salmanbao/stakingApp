/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  Signer,
  utils,
  BigNumberish,
  Contract,
  ContractFactory,
  Overrides,
} from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { MasterChef, MasterChefInterface } from "../MasterChef";

const _abi = [
  {
    inputs: [
      {
        internalType: "contract IERC20",
        name: "_stakingToken",
        type: "address",
      },
      {
        internalType: "contract IERC20",
        name: "_rewardingToken",
        type: "address",
      },
      {
        internalType: "address",
        name: "_vesting",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_tokenPerBlock",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "stakeIndex",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Deposit",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Paused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenPerBlockMaxCap",
        type: "uint256",
      },
    ],
    name: "TokenPerBlockMaxCapUpdate",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenPerBlock",
        type: "uint256",
      },
    ],
    name: "TokenPerBlockUpdate",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Unpaused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "stakeIndex",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Withdraw",
    type: "event",
  },
  {
    inputs: [],
    name: "approveForVesting",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "claim",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "_stakeFor",
        type: "uint8",
      },
    ],
    name: "deposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "getCurrentClaimed",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "getCurrentStaked",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "getCurrentUnstaked",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
    name: "getStakes",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "weight",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "timestamp",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "stakeUntill",
            type: "uint256",
          },
          {
            internalType: "uint8",
            name: "stakeFor",
            type: "uint8",
          },
        ],
        internalType: "struct MasterChef.UserInfo[]",
        name: "stakes",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "paused",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "pendingRewards",
    outputs: [
      {
        internalType: "uint256",
        name: "rewards",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "poolInfo",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "stakeToken",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "lastRewardBlock",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalWeight",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "puase",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "pull",
    outputs: [
      {
        internalType: "uint256",
        name: "rewards",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "rewardingToken",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "rewardsInfo",
    outputs: [
      {
        internalType: "uint256",
        name: "totalClaimed",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalUnstaked",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalStaked",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalWeight",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "lastVest",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_tokenPerBlock",
        type: "uint256",
      },
    ],
    name: "setTokenPerBlock",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "setTokenPerBlockMaxCap",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "token",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "tokenPerBlock",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "tokenPerBlockMaxCap",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "unpuase",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "userStakes",
    outputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "weight",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "stakeUntill",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "stakeFor",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "vesting",
    outputs: [
      {
        internalType: "contract IVesting",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "stakeIndex",
        type: "uint256",
      },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60e0604052683635c9adc5dea000006008553480156200001e57600080fd5b5060405162001c7438038062001c74833981016040819052620000419162000276565b6200004c3362000226565b600180556002805460ff191690556001600160601b0319606085811b8216608090815294811b821660c05292831b1660a0526003556040805192830181526001600160a01b03909316808352600060208481018290524395850186905293909201829052600480546001600160a01b031916909117905560058190556006929092556007829055670494654067e100007f72c6bfb7988af3a1efa6568f02a999bc52252641c659d85961ca3d372b57d5cf55670de0b6b3a76400007f64c15cc42be7899b001f818cf4433057002112c418d1d3a67cd5cb453051d33e55671bc16d674ec800007f0387e9d1203691d8e3362a7e4c6723de358a4010d7f31ecbec3fbfc61d1c75fc55673782dace9d9000007f765e72d9703c9804ad76c7d0af52f5313041ea56bb31a328e17fea205151b5ea55600c908190526224ea007fd421a5181c571bba3f01190c922c3b2a896fc1d84e86c9f17ac10e67ebef8b5c55626ebe007fc0da782485e77ae272268ae0a3ff44c1552ecb60b3743924de17a815e0a3cfd75562eff1007f980f427e00e74f6d338adfccc7468518c8c8ea00836d0dce98c5fe154e17bf2b5590526301dfe2007f37877ab6ac9e279d19a4db3294b259b5a4163c0ed597627ae79e33d80cde4db855620002e8565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b600080600080608085870312156200028c578384fd5b84516200029981620002cf565b6020860151909450620002ac81620002cf565b6040860151909350620002bf81620002cf565b6060959095015193969295505050565b6001600160a01b0381168114620002e557600080fd5b50565b60805160601c60a05160601c60c05160601c6119296200034b60003960008181610198015281816109080152610f010152600081816102960152818161078e01528181610871015281816108d40152610ed10152600061040001526119296000f3fe608060405234801561001057600080fd5b506004361061018e5760003560e01c8063654cfdff116100de578063a7bbb52d11610097578063f2fde38b11610071578063f2fde38b146103e8578063fc0c546a146103fb578063fc56a81314610422578063fccc887f1461048757600080fd5b8063a7bbb52d1461038e578063b5d5b5fa14610397578063bdfc7f0c146103d557600080fd5b8063654cfdff14610332578063715018a6146103455780637ba6f4581461034d5780638a9758fe1461036d5780638da5cb5b146103755780639ba2bde81461038657600080fd5b80634198709a1161014b57806352d112381161012557806352d11238146102b85780635a2f3d09146102cb5780635c975abb146103145780635d5eaa4f1461032a57600080fd5b80634198709a1461025c578063443de10c1461026557806344c63eec1461029157600080fd5b80630f8a267b146101935780631f715f9b146101d75780632e1a7d4d1461020e57806331d7a26214610223578063379607f514610236578063411330bd14610249575b600080fd5b6101ba7f000000000000000000000000000000000000000000000000000000000000000081565b6040516001600160a01b0390911681526020015b60405180910390f35b6102006101e536600461166c565b6001600160a01b03166000908152600a602052604090205490565b6040519081526020016101ce565b61022161021c3660046116cf565b6104b3565b005b61020061023136600461166c565b610614565b6102216102443660046116cf565b610772565b6102216102573660046116cf565b6107f5565b61020060035481565b61020061027336600461166c565b6001600160a01b03166000908152600a602052604090206002015490565b6101ba7f000000000000000000000000000000000000000000000000000000000000000081565b6102006102c636600461166c565b610864565b6004546005546006546007546102ea936001600160a01b031692919084565b604080516001600160a01b03909516855260208501939093529183015260608201526080016101ce565b60025460ff1660405190151581526020016101ce565b61022161098a565b6102216103403660046116ff565b6109be565b610221610d86565b61036061035b36600461166c565b610dba565b6040516101ce919061174f565b610221610e5e565b6000546001600160a01b03166101ba565b610221610e90565b61020060085481565b6103aa6103a5366004611686565b610f80565b60408051958652602086019490945292840191909152606083015260ff16608082015260a0016101ce565b6102216103e33660046116cf565b610fd1565b6102216103f636600461166c565b611036565b6101ba7f000000000000000000000000000000000000000000000000000000000000000081565b61045f61043036600461166c565b600a60205260009081526040902080546001820154600283015460038401546004909401549293919290919085565b604080519586526020860194909452928401919091526060830152608082015260a0016101ce565b61020061049536600461166c565b6001600160a01b03166000908152600a602052604090206001015490565b6002600154141561050b5760405162461bcd60e51b815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c0060448201526064015b60405180910390fd5b6002600155600061051b826110ce565b90504281606001511061052d57600080fd5b8051336000908152600a60205260408120600201805490919061055190849061187f565b90915550508051336000908152600a60205260408120600101805490919061057a908490611828565b9091555050602080820151336000908152600a909252604082206003018054919290916105a890849061187f565b909155505080516004546105c9916001600160a01b03909116903390611186565b805160405133917ff279e6a1f5e320cca91135676d9cb6e44ca8a08c0b88342bcdb1144f6511b5689161060491868252602082015260400190565b60405180910390a2505060018055565b6001600160a01b038116600090815260096020908152604080832080548251818502810185019093528083528493849084015b828210156106a85760008481526020908190206040805160a081018252600586029092018054835260018082015484860152600282015492840192909252600381015460608401526004015460ff1660808301529083529092019101610647565b50505050905060005b815181101561076b57428282815181106106db57634e487b7160e01b600052603260045260246000fd5b60200260200101516060015110610759576001600160a01b0384166000908152600a602052604090206004015461074c90610716904361187f565b61074684848151811061073957634e487b7160e01b600052603260045260246000fd5b60200260200101516111ee565b90611232565b6107569084611828565b92505b80610763816118c2565b9150506106b1565b5050919050565b60405163017043b560e51b8152336004820152602481018290527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031690632e0876a090604401600060405180830381600087803b1580156107da57600080fd5b505af11580156107ee573d6000803e3d6000fd5b5050505050565b6000546001600160a01b0316331461081f5760405162461bcd60e51b8152600401610502906117f3565b8061085f5760405162461bcd60e51b815260206004820152601060248201526f4d5553545f4e4f545f42455f5a45524f60801b6044820152606401610502565b600355565b6000336001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000161461089b57600080fd5b6108a482610614565b6001600160a01b038381166000908152600a60205260409081902043600491820155905163095ea7b360e01b81527f0000000000000000000000000000000000000000000000000000000000000000831691810191909152602481018390529192507f0000000000000000000000000000000000000000000000000000000000000000169063095ea7b390604401602060405180830381600087803b15801561094c57600080fd5b505af1158015610960573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061098491906116af565b50919050565b6000546001600160a01b031633146109b45760405162461bcd60e51b8152600401610502906117f3565b6109bc611245565b565b60026001541415610a115760405162461bcd60e51b815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c006044820152606401610502565b6002600155610a2260025460ff1690565b15610a625760405162461bcd60e51b815260206004820152601060248201526f14185d5cd8589b194e881c185d5cd95960821b6044820152606401610502565b8060ff168060011480610a755750806003145b80610a805750806006145b80610a8b575080600c145b610ad05760405162461bcd60e51b81526020600482015260166024820152751a5b9d985b1a59081cdd185ada5b99c81c195c9a5bd960521b6044820152606401610502565b60048054604051636eb1769f60e11b8152339281019290925230602483015284916001600160a01b039091169063dd62ed3e9060440160206040518083038186803b158015610b1e57600080fd5b505afa158015610b32573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b5691906116e7565b1015610b6157600080fd5b610b966040518060a0016040528060008152602001600081526020016000815260200160008152602001600060ff1681525090565b83815260ff831660808201819052426040808401919091526000918252600b602052902054610bd990670de0b6b3a764000090610bd39087611232565b906112dd565b60208083019190915260ff84166000908152600c9091526040902054610c009042906112e9565b606082019081523360009081526009602090815260408083208054600180820183559185528385208751600592830290910190815593870151918401919091559085015160028301559251600382015560808401516004918201805460ff191660ff9092169190911790558254909287929091610c7e908490611828565b90915550506020820151600382018054600090610c9c908490611828565b90915550508151336000908152600a602052604081206002018054909190610cc5908490611828565b9091555050602080830151336000908152600a90925260408220600301805491929091610cf3908490611828565b9091555050336000908152600a60209081526040808320436004909101556009909152812054610d259060019061187f565b8254909150610d3f906001600160a01b03163330896112f5565b604080518281526020810188905233917f90890809c654f11d6e72a28fa60149770a0d11ec6c92319d6ceb2bb0a4ea1a15910160405180910390a250506001805550505050565b6000546001600160a01b03163314610db05760405162461bcd60e51b8152600401610502906117f3565b6109bc6000611333565b6001600160a01b0381166000908152600960209081526040808320805482518185028101850190935280835260609492939192909184015b82821015610e535760008481526020908190206040805160a081018252600586029092018054835260018082015484860152600282015492840192909252600381015460608401526004015460ff1660808301529083529092019101610df2565b505050509050919050565b6000546001600160a01b03163314610e885760405162461bcd60e51b8152600401610502906117f3565b6109bc611383565b6000546001600160a01b03163314610eba5760405162461bcd60e51b8152600401610502906117f3565b60405163095ea7b360e01b81526001600160a01b037f00000000000000000000000000000000000000000000000000000000000000008116600483015260001960248301527f0000000000000000000000000000000000000000000000000000000000000000169063095ea7b390604401602060405180830381600087803b158015610f4557600080fd5b505af1158015610f59573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f7d91906116af565b50565b60096020528160005260406000208181548110610f9c57600080fd5b600091825260209091206005909102018054600182015460028301546003840154600490940154929550909350919060ff1685565b6000546001600160a01b03163314610ffb5760405162461bcd60e51b8152600401610502906117f3565b60088190556040518181527f077314f91a82ed8438b0dfdfe50d3fa564f5f11abde2aeb87c2960836e8470639060200160405180910390a150565b6000546001600160a01b031633146110605760405162461bcd60e51b8152600401610502906117f3565b6001600160a01b0381166110c55760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610502565b610f7d81611333565b6111036040518060a0016040528060008152602001600081526020016000815260200160008152602001600060ff1681525090565b33600090815260096020526040902080548390811061113257634e487b7160e01b600052603260045260246000fd5b60009182526020918290206040805160a0810182526005909302909101805483526001810154938301939093526002830154908201526003820154606082015260049091015460ff16608082015292915050565b6040516001600160a01b0383166024820152604481018290526111e990849063a9059cbb60e01b906064015b60408051601f198184030181529190526020810180516001600160e01b03166001600160e01b0319909316929092179091526113fd565b505050565b600754608082015160ff166000908152600b60205260408120546003548451929361122c93670de0b6b3a764000093610bd393849261074691611232565b92915050565b600061123e8284611860565b9392505050565b60025460ff161561128b5760405162461bcd60e51b815260206004820152601060248201526f14185d5cd8589b194e881c185d5cd95960821b6044820152606401610502565b6002805460ff191660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a2586112c03390565b6040516001600160a01b03909116815260200160405180910390a1565b600061123e8284611840565b600061123e8284611828565b6040516001600160a01b038085166024830152831660448201526064810182905261132d9085906323b872dd60e01b906084016111b2565b50505050565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b60025460ff166113cc5760405162461bcd60e51b815260206004820152601460248201527314185d5cd8589b194e881b9bdd081c185d5cd95960621b6044820152606401610502565b6002805460ff191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa336112c0565b6000611452826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c6564815250856001600160a01b03166114cf9092919063ffffffff16565b8051909150156111e9578080602001905181019061147091906116af565b6111e95760405162461bcd60e51b815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e6044820152691bdd081cdd58d8d9595960b21b6064820152608401610502565b60606114de84846000856114e6565b949350505050565b6060824710156115475760405162461bcd60e51b815260206004820152602660248201527f416464726573733a20696e73756666696369656e742062616c616e636520666f6044820152651c8818d85b1b60d21b6064820152608401610502565b6001600160a01b0385163b61159e5760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e74726163740000006044820152606401610502565b600080866001600160a01b031685876040516115ba9190611733565b60006040518083038185875af1925050503d80600081146115f7576040519150601f19603f3d011682016040523d82523d6000602084013e6115fc565b606091505b509150915061160c828286611617565b979650505050505050565b6060831561162657508161123e565b8251156116365782518084602001fd5b8160405162461bcd60e51b815260040161050291906117c0565b80356001600160a01b038116811461166757600080fd5b919050565b60006020828403121561167d578081fd5b61123e82611650565b60008060408385031215611698578081fd5b6116a183611650565b946020939093013593505050565b6000602082840312156116c0578081fd5b8151801515811461123e578182fd5b6000602082840312156116e0578081fd5b5035919050565b6000602082840312156116f8578081fd5b5051919050565b60008060408385031215611711578182fd5b82359150602083013560ff81168114611728578182fd5b809150509250929050565b60008251611745818460208701611896565b9190910192915050565b602080825282518282018190526000919060409081850190868401855b828110156117b357815180518552868101518786015285810151868601526060808201519086015260809081015160ff169085015260a0909301929085019060010161176c565b5091979650505050505050565b60208152600082518060208401526117df816040850160208701611896565b601f01601f19169190910160400192915050565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b6000821982111561183b5761183b6118dd565b500190565b60008261185b57634e487b7160e01b81526012600452602481fd5b500490565b600081600019048311821515161561187a5761187a6118dd565b500290565b600082821015611891576118916118dd565b500390565b60005b838110156118b1578181015183820152602001611899565b8381111561132d5750506000910152565b60006000198214156118d6576118d66118dd565b5060010190565b634e487b7160e01b600052601160045260246000fdfea26469706673582212204f8e2906446b76a485c8532bfe98e8a0d9a24080a34af085d8b0438842d3962464736f6c63430008040033";

export class MasterChef__factory extends ContractFactory {
  constructor(
    ...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>
  ) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
  }

  deploy(
    _stakingToken: string,
    _rewardingToken: string,
    _vesting: string,
    _tokenPerBlock: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<MasterChef> {
    return super.deploy(
      _stakingToken,
      _rewardingToken,
      _vesting,
      _tokenPerBlock,
      overrides || {}
    ) as Promise<MasterChef>;
  }
  getDeployTransaction(
    _stakingToken: string,
    _rewardingToken: string,
    _vesting: string,
    _tokenPerBlock: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _stakingToken,
      _rewardingToken,
      _vesting,
      _tokenPerBlock,
      overrides || {}
    );
  }
  attach(address: string): MasterChef {
    return super.attach(address) as MasterChef;
  }
  connect(signer: Signer): MasterChef__factory {
    return super.connect(signer) as MasterChef__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MasterChefInterface {
    return new utils.Interface(_abi) as MasterChefInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): MasterChef {
    return new Contract(address, _abi, signerOrProvider) as MasterChef;
  }
}
