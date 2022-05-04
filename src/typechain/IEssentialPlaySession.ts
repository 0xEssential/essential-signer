/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export declare namespace IForwardRequest {
  export type PlaySessionStruct = {
    authorized: string;
    expiresAt: BigNumberish;
  };

  export type PlaySessionStructOutput = [string, BigNumber] & {
    authorized: string;
    expiresAt: BigNumber;
  };

  export type ERC721ForwardRequestStruct = {
    from: string;
    authorizer: string;
    to: string;
    nftContract: string;
    nftTokenId: BigNumberish;
    nftChainId: BigNumberish;
    targetChainId: BigNumberish;
    value: BigNumberish;
    gas: BigNumberish;
    nonce: BigNumberish;
    data: BytesLike;
  };

  export type ERC721ForwardRequestStructOutput = [
    string,
    string,
    string,
    string,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    string
  ] & {
    from: string;
    authorizer: string;
    to: string;
    nftContract: string;
    nftTokenId: BigNumber;
    nftChainId: BigNumber;
    targetChainId: BigNumber;
    value: BigNumber;
    gas: BigNumber;
    nonce: BigNumber;
    data: string;
  };
}

export interface IEssentialPlaySessionInterface extends utils.Interface {
  contractName: "IEssentialPlaySession";
  functions: {
    "createSession(address,uint256)": FunctionFragment;
    "getSession(address)": FunctionFragment;
    "verifyAuthorization((address,address,address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes))": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "createSession",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "getSession", values: [string]): string;
  encodeFunctionData(
    functionFragment: "verifyAuthorization",
    values: [IForwardRequest.ERC721ForwardRequestStruct]
  ): string;

  decodeFunctionResult(
    functionFragment: "createSession",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getSession", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "verifyAuthorization",
    data: BytesLike
  ): Result;

  events: {};
}

export interface IEssentialPlaySession extends BaseContract {
  contractName: "IEssentialPlaySession";
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IEssentialPlaySessionInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    createSession(
      authorized: string,
      length: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getSession(
      authorizer: string,
      overrides?: CallOverrides
    ): Promise<[IForwardRequest.PlaySessionStructOutput]>;

    verifyAuthorization(
      req: IForwardRequest.ERC721ForwardRequestStruct,
      overrides?: CallOverrides
    ): Promise<[boolean]>;
  };

  createSession(
    authorized: string,
    length: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getSession(
    authorizer: string,
    overrides?: CallOverrides
  ): Promise<IForwardRequest.PlaySessionStructOutput>;

  verifyAuthorization(
    req: IForwardRequest.ERC721ForwardRequestStruct,
    overrides?: CallOverrides
  ): Promise<boolean>;

  callStatic: {
    createSession(
      authorized: string,
      length: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    getSession(
      authorizer: string,
      overrides?: CallOverrides
    ): Promise<IForwardRequest.PlaySessionStructOutput>;

    verifyAuthorization(
      req: IForwardRequest.ERC721ForwardRequestStruct,
      overrides?: CallOverrides
    ): Promise<boolean>;
  };

  filters: {};

  estimateGas: {
    createSession(
      authorized: string,
      length: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    getSession(
      authorizer: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    verifyAuthorization(
      req: IForwardRequest.ERC721ForwardRequestStruct,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    createSession(
      authorized: string,
      length: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    getSession(
      authorizer: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    verifyAuthorization(
      req: IForwardRequest.ERC721ForwardRequestStruct,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
