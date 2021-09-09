import { IEmailValidator } from '../protocols/IEmailValidator';
import { SignUpController } from './signup';

interface sutTypes {
  sut: SignUpController,
  emailValidator: IEmailValidator
}
// factory
const makeSut = (): sutTypes => {
  class EmailValidatorStub implements IEmailValidator {
    isValid(email: string): boolean {
      return true;
    }
  }
  const emailValidator = new EmailValidatorStub();
  const sut = new SignUpController(emailValidator);
  return { sut, emailValidator };
};

describe('SignUp Controller', () => {
  test('Should return 400 if no name is provided ', () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        email: 'any_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new Error('Missing Param: name'));
  });
  test('Should return 400 if no email is provided ', () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: 'any_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new Error('Missing Param: email'));
  });
  test('Should return 400 if invalid email is provided ', () => {
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
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new Error('Invalid Param: email'));
  });
  test('Should call EmailValidator with correct email ', () => {
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
    const httpResponse = sut.handle(httpRequest);
    expect(isValidSpy).toHaveBeenCalledWith('any_email@email.com');
  });
});
