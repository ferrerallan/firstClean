/* eslint-disable max-classes-per-file */
import { AccountModel } from '../../domain/models/account';
import { IAddAccount, IAddAccountModel } from '../../domain/usecases/addAccount';
import { IEmailValidator } from '../protocols/IEmailValidator';
import { SignUpController } from './signup';

interface sutTypes {
  sut: SignUpController,
  emailValidator: IEmailValidator,
  addAccountStub: IAddAccount
}
// factory
const makeAddAccount = (): IAddAccount => {
  class AddAccountStub implements IAddAccount {
    async add(account: IAddAccountModel): Promise<AccountModel> {
      const fakeAccount = {
        id: 'valid_id',
        email: 'any_email@email.com',
        name: 'allan',
        password: 'any_password',
      };

      return new Promise((resolve) => resolve(fakeAccount));
    }
  }
  return new AddAccountStub();
};

const makeSut = (): sutTypes => {
  class EmailValidatorStub implements IEmailValidator {
    isValid(email: string): boolean {
      return true;
    }
  }
  const emailValidator = new EmailValidatorStub();
  const addAccountStub = makeAddAccount();
  const sut = new SignUpController(emailValidator, addAccountStub);

  return { sut, emailValidator, addAccountStub };
};

describe('SignUp Controller', () => {
  test('Should return 400 if no name is provided ', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        email: 'any_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new Error('Missing Param: name'));
  });
  test('Should return 400 if no email is provided ', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: 'any_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new Error('Missing Param: email'));
  });
  test('Should return 400 if invalid email is provided ', async () => {
    const { sut, emailValidator } = makeSut();
    jest.spyOn(emailValidator, 'isValid').mockReturnValueOnce(false);
    const httpRequest = {
      body: {
        email: 'any_email@email.com',
        name: 'allan',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new Error('Invalid Param: email'));
  });
  test('Should call EmailValidator with correct email ', async () => {
    const { sut, emailValidator } = makeSut();
    const isValidSpy = jest.spyOn(emailValidator, 'isValid');
    const httpRequest = {
      body: {
        email: 'any_email@email.com',
        name: 'allan',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(isValidSpy).toHaveBeenCalledWith('any_email@email.com');
  });
  test('Should call AddAccount with correct values', async () => {
    const { sut, addAccountStub } = makeSut();
    const addSpy = jest.spyOn(addAccountStub, 'add');
    const httpRequest = {
      body: {
        id: 'valid_id',
        email: 'any_email@email.com',
        name: 'allan',
        password: 'any_password',
      },
    };
    await sut.handle(httpRequest);
    expect(addSpy).toHaveBeenCalledWith({
      email: 'any_email@email.com',
      name: 'allan',
      password: 'any_password',
    });
  });
});
