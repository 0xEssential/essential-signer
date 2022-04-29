import {
  BlockTag,
  Provider,
  TransactionRequest,
  TransactionResponse,
} from '@ethersproject/abstract-provider';
import { Deferrable, defineReadOnly } from '@ethersproject/properties';
import { logger, Signer } from 'ethers';
import { Bytes, Logger, resolveProperties } from 'ethers/lib/utils';

import { EIP712Domain, EIP712StructField } from './messageSigner';

export class EssentialSigner extends Signer {
  readonly address: string;
  readonly provider: Provider;
  readonly relayerUri: string;

  constructor(
    address: string,
    provider: Provider,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    relayerUri: string = process.env.RELAYER_URI!,
  ) {
    logger.checkNew(new.target, EssentialSigner);
    super();
    defineReadOnly(this, 'address', address);
    defineReadOnly(this, 'provider', provider);
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

  // Populates "from" if unspecified, and calls with the transaction
  async call(
    transaction: Deferrable<TransactionRequest>,
    blockTag?: BlockTag,
  ): Promise<string> {
    this._checkProvider('call');
    const tx = await resolveProperties(this.checkTransaction(transaction));
    return await this.provider.call(tx, blockTag);
  }

  // Populates all fields in a transaction, signs it and sends it to the network
  async sendTransaction(
    transaction: Deferrable<TransactionRequest>,
  ): Promise<TransactionResponse> {
    this._checkProvider('sendTransaction');
    const tx = await this.populateTransaction(transaction);
    const signedTx = await this.signTransaction(tx);
    return await this.provider.sendTransaction(signedTx);
  }

  signMessage(_message: Bytes | string): Promise<string> {
    return this._fail('VoidSigner cannot sign messages', 'signMessage');
  }

  signTransaction(
    _transaction: Deferrable<TransactionRequest>,
  ): Promise<string> {
    return this._fail('VoidSigner cannot sign transactions', 'signTransaction');
  }

  _signTypedData(
    _domain: EIP712Domain,
    _types: Record<string, Array<EIP712StructField>>,
    _value: Record<string, any>,
  ): Promise<string> {
    return this._fail('VoidSigner cannot sign typed data', 'signTypedData');
  }

  connect(provider: Provider): EssentialSigner {
    return new EssentialSigner(this.address, provider);
  }
}
