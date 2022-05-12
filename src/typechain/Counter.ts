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
import { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export interface CounterInterface extends utils.Interface {
  contractName: "Counter";
  functions: {
    "collectionCount(address)": FunctionFragment;
    "count(address)": FunctionFragment;
    "increment()": FunctionFragment;
    "isTrustedForwarder(address)": FunctionFragment;
    "owner()": FunctionFragment;
    "setTrustedForwarder(address)": FunctionFragment;
    "totalCount()": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "collectionCount",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "count", values: [string]): string;
  encodeFunctionData(functionFragment: "increment", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "isTrustedForwarder",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "setTrustedForwarder",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "totalCount",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "collectionCount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "count", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "increment", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "isTrustedForwarder",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setTrustedForwarder",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "totalCount", data: BytesLike): Result;

  events: {
    "Counted(address,uint256,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Counted"): EventFragment;
}

export type CountedEvent = TypedEvent<
  [string, BigNumber, string],
  { contractAddress: string; tokenId: BigNumber; counter: string }
>;

export type CountedEventFilter = TypedEventFilter<CountedEvent>;

export interface Counter extends BaseContract {
  contractName: "Counter";
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: CounterInterface;

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
    collectionCount(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    count(arg0: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    increment(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    isTrustedForwarder(
      forwarder: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    setTrustedForwarder(
      trustedForwarder: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    totalCount(overrides?: CallOverrides): Promise<[BigNumber]>;
  };

  collectionCount(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

  count(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

  increment(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  isTrustedForwarder(
    forwarder: string,
    overrides?: CallOverrides
  ): Promise<boolean>;

  owner(overrides?: CallOverrides): Promise<string>;

  setTrustedForwarder(
    trustedForwarder: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  totalCount(overrides?: CallOverrides): Promise<BigNumber>;

  callStatic: {
    collectionCount(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    count(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    increment(overrides?: CallOverrides): Promise<void>;

    isTrustedForwarder(
      forwarder: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    owner(overrides?: CallOverrides): Promise<string>;

    setTrustedForwarder(
      trustedForwarder: string,
      overrides?: CallOverrides
    ): Promise<void>;

    totalCount(overrides?: CallOverrides): Promise<BigNumber>;
  };

  filters: {
    "Counted(address,uint256,address)"(
      contractAddress?: string | null,
      tokenId?: BigNumberish | null,
      counter?: string | null
    ): CountedEventFilter;
    Counted(
      contractAddress?: string | null,
      tokenId?: BigNumberish | null,
      counter?: string | null
    ): CountedEventFilter;
  };

  estimateGas: {
    collectionCount(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    count(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    increment(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    isTrustedForwarder(
      forwarder: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    setTrustedForwarder(
      trustedForwarder: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    totalCount(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    collectionCount(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    count(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    increment(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    isTrustedForwarder(
      forwarder: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    setTrustedForwarder(
      trustedForwarder: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    totalCount(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
