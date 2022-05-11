/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type {
  IEssentialPlaySession,
  IEssentialPlaySessionInterface,
} from "../IEssentialPlaySession";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "authorized",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "length",
        type: "uint256",
      },
    ],
    name: "createSession",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "authorizer",
        type: "address",
      },
    ],
    name: "getSession",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "authorized",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "expiresAt",
            type: "uint256",
          },
        ],
        internalType: "struct IForwardRequest.PlaySession",
        name: "",
        type: "tuple",
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
    ],
    name: "verifyAuthorization",
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

export class IEssentialPlaySession__factory {
  static readonly abi = _abi;
  static createInterface(): IEssentialPlaySessionInterface {
    return new utils.Interface(_abi) as IEssentialPlaySessionInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IEssentialPlaySession {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as IEssentialPlaySession;
  }
}