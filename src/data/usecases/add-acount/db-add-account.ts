/* eslint-disable arrow-parens */
import { AccountModel } from '../../../domain/models/account';
import {
  IAddAccount,
  IAddAccountModel,
} from '../../../domain/usecases/addAccount';
import { IAddAccountRepository } from '../../protocols/add-account-repository';
import { IEncrypter } from '../../protocols/encrypter';

export class DbAddAccount implements IAddAccount {
  private readonly encrypter: IEncrypter;

  private readonly addAccountRepository: IAddAccountRepository;

  constructor(
    encrypter: IEncrypter,
    addAccountRepository: IAddAccountRepository,
  ) {
    this.encrypter = encrypter;
    this.addAccountRepository = addAccountRepository;
  }

  async add(accountData: IAddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.encrypter.encrypt(accountData.password);
    const newAccount = this.addAccountRepository.add(
      Object.assign({}, accountData, { password: hashedPassword }),
    );
    return new Promise(resolve => resolve(newAccount));
  }
}
