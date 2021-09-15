import { AccountModel } from '../../../domain/models/account';
import { IAddAccount, IAddAccountModel } from '../../../domain/usecases/addAccount';
import { IAddAccountRepository } from '../../protocols/add-account-repository';
import { IEncrypter } from '../../protocols/encrypter';

export class DbAddAccount implements IAddAccount {
  private readonly encrypter: IEncrypter;

  constructor(encrypter: IEncrypter, addAccountRepository: IAddAccountRepository) {
    this.encrypter = encrypter;
  }

  async add(account: IAddAccountModel): Promise<AccountModel> {
    this.encrypter.encrypt(account.password);
    return new Promise((resolve) => resolve(null));
  }
}
