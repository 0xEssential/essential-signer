/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  SignedOwnershipProof,
  SignedOwnershipProofInterface,
} from "../../../contracts/fwd/SignedOwnershipProof";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "signer",
        type: "address",
      },
      {
        internalType: "address",
        name: "authorizer",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "nonce",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "nftChainId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "nftContract",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "createMessage",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "ownershipSigner",
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
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            internalType: "address",
            name: "authorizer",
            type: "address",
          },
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "address",
            name: "nftContract",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "nftTokenId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "nftChainId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "targetChainId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "gas",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "nonce",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes",
          },
        ],
        internalType: "struct IForwardRequest.ERC721ForwardRequest",
        name: "req",
        type: "tuple",
      },
      {
        internalType: "bytes",
        name: "signature",
        type: "bytes",
      },
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "verifyOwnershipProof",
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
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50611040806100206000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c806312ce42fd146100465780635c0dfff6146100645780638190256414610094575b600080fd5b61004e6100c4565b60405161005b919061067d565b60405180910390f35b61007e6004803603810190610079919061070e565b6100ed565b60405161008b91906107c9565b60405180910390f35b6100ae60048036038101906100a99190610a5c565b610131565b6040516100bb9190610b02565b60405180910390f35b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6000878787878787468860405160200161010e989796959493929190610b2c565b604051602081830303815290604052805190602001209050979650505050505050565b600061025882426101429190610bd9565b10610182576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161017990610c6a565b60405180910390fd5b60006101b46101af866000015187602001518861012001518960a001518a606001518b608001518a6100ed565b610221565b905060008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16610200858361025190919063ffffffff16565b73ffffffffffffffffffffffffffffffffffffffff16149150509392505050565b6000816040516020016102349190610d02565b604051602081830303815290604052805190602001209050919050565b60008060006102608585610278565b9150915061026d816102fb565b819250505092915050565b6000806041835114156102ba5760008060006020860151925060408601519150606086015160001a90506102ae878285856104d0565b945094505050506102f4565b6040835114156102eb5760008060208501519150604085015190506102e08683836105dd565b9350935050506102f4565b60006002915091505b9250929050565b6000600481111561030f5761030e610d28565b5b81600481111561032257610321610d28565b5b141561032d576104cd565b6001600481111561034157610340610d28565b5b81600481111561035457610353610d28565b5b1415610395576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161038c90610da3565b60405180910390fd5b600260048111156103a9576103a8610d28565b5b8160048111156103bc576103bb610d28565b5b14156103fd576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103f490610e0f565b60405180910390fd5b6003600481111561041157610410610d28565b5b81600481111561042457610423610d28565b5b1415610465576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161045c90610ea1565b60405180910390fd5b60048081111561047857610477610d28565b5b81600481111561048b5761048a610d28565b5b14156104cc576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104c390610f33565b60405180910390fd5b5b50565b6000807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a08360001c111561050b5760006003915091506105d4565b601b8560ff16141580156105235750601c8560ff1614155b156105355760006004915091506105d4565b60006001878787876040516000815260200160405260405161055a9493929190610f6f565b6020604051602081039080840390855afa15801561057c573d6000803e3d6000fd5b505050602060405103519050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614156105cb576000600192509250506105d4565b80600092509250505b94509492505050565b60008060007f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff60001b841690506000601b60ff8660001c901c6106209190610fb4565b905061062e878288856104d0565b935093505050935093915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006106678261063c565b9050919050565b6106778161065c565b82525050565b6000602082019050610692600083018461066e565b92915050565b6000604051905090565b600080fd5b600080fd5b6106b58161065c565b81146106c057600080fd5b50565b6000813590506106d2816106ac565b92915050565b6000819050919050565b6106eb816106d8565b81146106f657600080fd5b50565b600081359050610708816106e2565b92915050565b600080600080600080600060e0888a03121561072d5761072c6106a2565b5b600061073b8a828b016106c3565b975050602061074c8a828b016106c3565b965050604061075d8a828b016106f9565b955050606061076e8a828b016106f9565b945050608061077f8a828b016106c3565b93505060a06107908a828b016106f9565b92505060c06107a18a828b016106f9565b91505092959891949750929550565b6000819050919050565b6107c3816107b0565b82525050565b60006020820190506107de60008301846107ba565b92915050565b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b610832826107e9565b810181811067ffffffffffffffff82111715610851576108506107fa565b5b80604052505050565b6000610864610698565b90506108708282610829565b919050565b600080fd5b600080fd5b600080fd5b600067ffffffffffffffff82111561089f5761089e6107fa565b5b6108a8826107e9565b9050602081019050919050565b82818337600083830152505050565b60006108d76108d284610884565b61085a565b9050828152602081018484840111156108f3576108f261087f565b5b6108fe8482856108b5565b509392505050565b600082601f83011261091b5761091a61087a565b5b813561092b8482602086016108c4565b91505092915050565b6000610160828403121561094b5761094a6107e4565b5b61095661016061085a565b90506000610966848285016106c3565b600083015250602061097a848285016106c3565b602083015250604061098e848285016106c3565b60408301525060606109a2848285016106c3565b60608301525060806109b6848285016106f9565b60808301525060a06109ca848285016106f9565b60a08301525060c06109de848285016106f9565b60c08301525060e06109f2848285016106f9565b60e083015250610100610a07848285016106f9565b61010083015250610120610a1d848285016106f9565b6101208301525061014082013567ffffffffffffffff811115610a4357610a42610875565b5b610a4f84828501610906565b6101408301525092915050565b600080600060608486031215610a7557610a746106a2565b5b600084013567ffffffffffffffff811115610a9357610a926106a7565b5b610a9f86828701610934565b935050602084013567ffffffffffffffff811115610ac057610abf6106a7565b5b610acc86828701610906565b9250506040610add868287016106f9565b9150509250925092565b60008115159050919050565b610afc81610ae7565b82525050565b6000602082019050610b176000830184610af3565b92915050565b610b26816106d8565b82525050565b600061010082019050610b42600083018b61066e565b610b4f602083018a61066e565b610b5c6040830189610b1d565b610b696060830188610b1d565b610b76608083018761066e565b610b8360a0830186610b1d565b610b9060c0830185610b1d565b610b9d60e0830184610b1d565b9998505050505050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000610be4826106d8565b9150610bef836106d8565b925082821015610c0257610c01610baa565b5b828203905092915050565b600082825260208201905092915050565b7f5374616c65000000000000000000000000000000000000000000000000000000600082015250565b6000610c54600583610c0d565b9150610c5f82610c1e565b602082019050919050565b60006020820190508181036000830152610c8381610c47565b9050919050565b600081905092915050565b7f19457468657265756d205369676e6564204d6573736167653a0a333200000000600082015250565b6000610ccb601c83610c8a565b9150610cd682610c95565b601c82019050919050565b6000819050919050565b610cfc610cf7826107b0565b610ce1565b82525050565b6000610d0d82610cbe565b9150610d198284610ceb565b60208201915081905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b7f45434453413a20696e76616c6964207369676e61747572650000000000000000600082015250565b6000610d8d601883610c0d565b9150610d9882610d57565b602082019050919050565b60006020820190508181036000830152610dbc81610d80565b9050919050565b7f45434453413a20696e76616c6964207369676e6174757265206c656e67746800600082015250565b6000610df9601f83610c0d565b9150610e0482610dc3565b602082019050919050565b60006020820190508181036000830152610e2881610dec565b9050919050565b7f45434453413a20696e76616c6964207369676e6174757265202773272076616c60008201527f7565000000000000000000000000000000000000000000000000000000000000602082015250565b6000610e8b602283610c0d565b9150610e9682610e2f565b604082019050919050565b60006020820190508181036000830152610eba81610e7e565b9050919050565b7f45434453413a20696e76616c6964207369676e6174757265202776272076616c60008201527f7565000000000000000000000000000000000000000000000000000000000000602082015250565b6000610f1d602283610c0d565b9150610f2882610ec1565b604082019050919050565b60006020820190508181036000830152610f4c81610f10565b9050919050565b600060ff82169050919050565b610f6981610f53565b82525050565b6000608082019050610f8460008301876107ba565b610f916020830186610f60565b610f9e60408301856107ba565b610fab60608301846107ba565b95945050505050565b6000610fbf826106d8565b9150610fca836106d8565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115610fff57610ffe610baa565b5b82820190509291505056fea264697066735822122099ea8bc8e61e8ef446e03f4bda536f0268d59d9da7f952558d7b5160a79149e864736f6c63430008090033";

type SignedOwnershipProofConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: SignedOwnershipProofConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class SignedOwnershipProof__factory extends ContractFactory {
  constructor(...args: SignedOwnershipProofConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<SignedOwnershipProof> {
    return super.deploy(overrides || {}) as Promise<SignedOwnershipProof>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): SignedOwnershipProof {
    return super.attach(address) as SignedOwnershipProof;
  }
  override connect(signer: Signer): SignedOwnershipProof__factory {
    return super.connect(signer) as SignedOwnershipProof__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): SignedOwnershipProofInterface {
    return new utils.Interface(_abi) as SignedOwnershipProofInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): SignedOwnershipProof {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as SignedOwnershipProof;
  }
}