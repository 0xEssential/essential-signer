import {
  Provider,
  TransactionRequest,
  TransactionResponse,
} from '@ethersproject/abstract-provider';
import { ExternallyOwnedAccount } from '@ethersproject/abstract-signer';
import { Deferrable, defineReadOnly } from '@ethersproject/properties';
import { BigNumberish, logger, Signer, Wallet } from 'ethers';
import { Bytes, Logger } from 'ethers/lib/utils';

import EssentialForwarder from '../abi/EssentialForwarder.json';
import {
  EIP712Domain,
  EIP712StructField,
  signMetaTxRequest,
} from './messageSigner';

export interface EssentialOverrides {
  authorizer?: string;
  nftContract: string;
  nftChainId: BigNumberish;
  nftTokenId: BigNumberish;
}

export class EssentialSigner extends Signer implements ExternallyOwnedAccount {
  readonly address: string;
  readonly privateKey: string;
  readonly provider: Provider;
  readonly relayerUri: string;

  constructor(
    address: string,
    provider: Provider,
    wallet?: Wallet,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    relayerUri: string = process.env.RELAYER_URI!,
  ) {
    logger.checkNew(new.target, EssentialSigner);
    super();
    defineReadOnly(this, 'address', address);
    defineReadOnly(this, 'provider', provider);
    wallet && defineReadOnly(this, 'privateKey', wallet.privateKey);
    defineReadOnly(this, 'relayerUri', relayerUri);
  }

  getAddress(): Promise<string> {
    return Promise.resolve(this.address);
  }

  _fail(message: string, operation: string): Promise<any> {
    return Promise.resolve().then(() => {
      logger.throwError(message, Logger.errors.UNSUPPORTED_OPERATION, {
        operation: operation,
      });
    });
  }

  // Populates all fields in a transaction, signs it and sends it to the network
  async sendTransaction(
    transaction: Deferrable<
      TransactionRequest & { customData: EssentialOverrides }
    >,
  ): Promise<TransactionResponse | any> {
    const result = await signMetaTxRequest(
      this.provider || this.privateKey,
      // for us, this chain ID is the chain where our Forwarding and implementation contract live.
      // our payload is network-agnostic, so it won't necessarily be the same chain as the provider.
      parseInt(process.env.CHAIN_ID!, 10),
      {
        to: transaction.to,
        from: transaction.from,
        ...transaction.customData,
        targetChainId: process.env.CHAIN_ID,
        data: transaction.data,
      },
    );

    const txResult = await fetch(this.relayerUri, {
      method: 'POST',
      body: JSON.stringify({ ...result, forwarder: EssentialForwarder }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((resp) => resp.json())
      .then(({ result, status }) => {
        if (status === 'success') {
          return JSON.parse(result);
        }
      });

    return {
      hash: txResult.txHash,
      confirmations: 0,
      from: transaction.from,
      wait: async (_confirmations?: number) =>
        Promise.reject('EssentialSigner does not support wait()'),
    };
  }

  // We throw errors on direct signing requests to ensure developers
  // correctly use EssentialSigner with their contract calls

  signMessage(_message: Bytes | string): Promise<string> {
    return this._fail('EssentialSigner cannot sign messages', 'signMessage');
  }

  signTransaction(
    _transaction: Deferrable<TransactionRequest>,
  ): Promise<string> {
    return this._fail(
      'EssentialSigner cannot sign transactions',
      'signTransaction',
    );
  }

  _signTypedData(
    _domain: EIP712Domain,
    _types: Record<string, Array<EIP712StructField>>,
    _value: Record<string, any>,
  ): Promise<string> {
    return this._fail(
      'EssentialSigner cannot sign typed data',
      'signTypedData',
    );
  }

  connect(provider: Provider): EssentialSigner {
    return new EssentialSigner(this.address, provider);
  }
}
