import { Provider } from '@ethersproject/abstract-provider';
import { Contract } from '@ethersproject/contracts';
import { JsonRpcProvider, Web3Provider } from '@ethersproject/providers';
import {
  signTypedData as signWithKey,
  SignTypedDataVersion,
  TypedMessage,
} from '@metamask/eth-sig-util';
import { BigNumber } from 'ethers';
import { hexZeroPad } from 'ethers/lib/utils';

import { EssentialForwarderDeployments } from '../deployments';
import {
  EssentialForwarder,
  IForwardRequest,
} from '../typechain/contracts/fwd/EssentialForwarder';

/**
 * Field in a User Defined Types
 */
export interface EIP712StructField {
  name: string;
  type: string;
}

/**
 * User Defined Types are just an array of the fields they contain
 */
export type EIP712Struct = EIP712StructField[];
/**
 * Interface of the EIP712Domain structure
 */
export interface EIP712Domain {
  name: string;
  version: string;
  chainId?: number;
  verifyingContract: string;
  salt?: string;
}

/**
 * Interface of the complete payload required for signing
 */
export interface EIP712Payload {
  types: PayloadTypes;
  primaryType: string;
  message: IForwardRequest.ERC721ForwardRequestStruct;
  domain: EIP712Domain;
}

export interface EIP712Signature {
  hex: string;
  v: number;
  s: string;
  r: string;
}

const EIP712Domain = [
  { name: 'name', type: 'string' },
  { name: 'version', type: 'string' },
  { name: 'verifyingContract', type: 'address' },
  { name: 'salt', type: 'bytes32' },
];

const ForwardRequest = [
  { name: 'to', type: 'address' },
  { name: 'from', type: 'address' },
  { name: 'authorizer', type: 'address' },
  { name: 'nftContract', type: 'address' },
  { name: 'nonce', type: 'uint256' },
  { name: 'nftChainId', type: 'uint256' },
  { name: 'nftTokenId', type: 'uint256' },
  { name: 'targetChainId', type: 'uint256' },
  { name: 'data', type: 'bytes' },
];

const MinimalRequest = [
  { name: 'to', type: 'address' },
  { name: 'from', type: 'address' },
  { name: 'targetChainId', type: 'uint256' },
  { name: 'data', type: 'bytes' },
];

interface PayloadTypes {
  EIP712Domain: EIP712Struct;
  ForwardRequest: EIP712Struct;
  MinimalRequest: EIP712Struct;
}

function getMetaTxTypeData(
  verifyingContract: string,
  _chainId: number,
  message: IForwardRequest.ERC721ForwardRequestStruct,
  name: string,
  primaryType: string,
): EIP712Payload {
  return {
    types: {
      EIP712Domain,
      ForwardRequest,
      MinimalRequest,
    },
    domain: {
      name,
      version: '0.0.1',
      verifyingContract,
      salt: hexZeroPad(BigNumber.from(_chainId).toHexString(), 32),
    },
    primaryType,
    message,
  };
}

async function signTypedData(
  signer: Web3Provider | string | Provider,
  from: string,
  data: EIP712Payload,
) {
  // If signer is a private key, use it to sign
  if (typeof signer === 'string') {
    const privateKey = Buffer.from(signer.replace(/^0x/, ''), 'hex');
    return signWithKey({
      privateKey,
      data: data as unknown as TypedMessage<any>,
      version: SignTypedDataVersion.V3,
    });
  }

  return await (signer as Web3Provider).send('eth_signTypedData_v4', [
    from,
    JSON.stringify(data),
  ]);
}

async function attachNonce(
  forwarder: Contract,
  input: Record<string, any>,
): Promise<IForwardRequest.ERC721ForwardRequestStruct> {
  const nonce = await forwarder
    .getNonce(input.from)
    .then((nonce: BigNumber) => nonce.toString());

  return {
    value: BigNumber.from(0),
    gas: 1e6,
    to: input.to,
    from: input.from,
    authorizer: input.authorizer,
    nftContract: input.nftContract,
    nonce,
    nftChainId: input.nftChainId,
    nftTokenId: input.nftTokenId,
    targetChainId: input.targetChainId,
    data: input.data,
  };
}

function buildNetworkForwarder(chainId: number) {
  const { abi, address } = EssentialForwarderDeployments[chainId];
  return new Contract(
    address,
    abi,
    new JsonRpcProvider(process.env.RPC_URL, chainId),
  );
}

export async function signMetaTxRequest(
  signer: Web3Provider | Provider | string,
  chainId: number,
  input: Record<string, any>,
  domainName?: string,
  forwarder?: EssentialForwarder | Contract,
): Promise<{
  signature: string;
  request: IForwardRequest.ERC721ForwardRequestStruct;
}> {
  const _forwarder = forwarder || buildNetworkForwarder(chainId);

  const request = await attachNonce(_forwarder, input);

  const toSign = getMetaTxTypeData(
    _forwarder.address,
    chainId,
    request,
    domainName || '0xEssential PlaySession',
    request.nftContract ? 'ForwardRequest' : 'MinimalRequest',
  );

  const signature = await signTypedData(signer, input.from, toSign);

  return {
    signature,
    request,
  };
}
