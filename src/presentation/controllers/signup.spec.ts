import { IEmailValidator } from '../protocols/IEmailValidator';
import { SignUpController } from './signup';

// factory
const makeSut = (): SignUpController => {
  class EmailValidatorStub implements IEmailValidator {
    isValid(email: string): boolean {
      return true;
    }
  }
  const emailValidator = new EmailValidatorStub();
  return new SignUpController(emailValidator);
};

describe('SignUp Controller', () => {
  test('Should return 400 if no name is provided ', () => {
    const sut = makeSut();
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
    const sut = makeSut();
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
});
