import {
  Provider,
  TransactionRequest,
  TransactionResponse,
} from '@ethersproject/abstract-provider';
import { ExternallyOwnedAccount } from '@ethersproject/abstract-signer';
import { Deferrable, defineReadOnly } from '@ethersproject/properties';
import { BigNumberish, logger, Signer, Wallet } from 'ethers';
import { Bytes, Logger } from 'ethers/lib/utils';

import { EssentialForwarderDeployments } from '../deployments';
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

export interface EssentialSignerConfig {
  relayerUri?: string;
  chainId?: number;
  domainName?: string;
  onSubmit?: () => void;
}

export class EssentialSigner extends Signer implements ExternallyOwnedAccount {
  readonly address: string;
  readonly chainId: number;
  readonly domainName: string;
  readonly privateKey: string;
  readonly provider: Provider;
  readonly relayerUri: string;
  onSubmit: () => void;

  constructor(
    address: string,
    provider: Provider,
    wallet?: Wallet,
    config?: EssentialSignerConfig,
  ) {
    logger.checkNew(new.target, EssentialSigner);
    super();

    const { chainId, domainName, relayerUri, onSubmit } = {
      ...{
        domainName: 'Essential Forwarder',
        relayerUri: process.env.RELAYER_URI,
        chainId: process.env.CHAIN_ID
          ? parseInt(process.env.CHAIN_ID, 10)
          : 137,
      },
      ...config,
    };

    if (!relayerUri)
      logger.throwError('Relayer URI not set', Logger.errors.INVALID_ARGUMENT, {
        argument: 'relayerUri',
        value: null,
      });

    defineReadOnly(this, 'address', address);
    defineReadOnly(this, 'chainId', chainId);
    defineReadOnly(this, 'domainName', domainName);
    defineReadOnly(this, 'provider', provider);
    wallet && defineReadOnly(this, 'privateKey', wallet.privateKey);
    defineReadOnly(this, 'relayerUri', relayerUri);

    if (onSubmit) this.onSubmit = onSubmit;
  }

  getAddress(): Promise<string> {
    return Promise.resolve(this.address);
  }

  async _fail(message: string, operation: string): Promise<any> {
    await Promise.resolve();
    logger.throwError(message, Logger.errors.UNSUPPORTED_OPERATION, {
      operation: operation,
    });
  }

  // Populates all fields in a transaction, signs it and sends it to the network
  async sendTransaction(
    transaction: Deferrable<
      TransactionRequest & { customData: EssentialOverrides }
    >,
  ): Promise<TransactionResponse | any> {
    const result = await signMetaTxRequest(
      this.privateKey || this.provider,
      this.chainId,
      {
        to: transaction.to,
        from: transaction.from,
        authorizer: transaction.from,
        ...transaction.customData,
        targetChainId: this.chainId,
        data: transaction.data,
      },
      this.domainName,
    );

    // SUBMITTING META TX EVENT
    this.onSubmit && this.onSubmit();

    const txResult = await fetch(this.relayerUri, {
      method: 'POST',
      body: JSON.stringify({
        ...result,
        forwarder: EssentialForwarderDeployments[this.chainId],
      }),
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
