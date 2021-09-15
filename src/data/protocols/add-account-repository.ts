import { AccountModel } from '../../domain/models/account';
import { IAddAccountModel } from '../../domain/usecases/addAccount';

export interface IAddAccountRepository {
  add(accountData: IAddAccountModel): Promise<AccountModel>;
}
