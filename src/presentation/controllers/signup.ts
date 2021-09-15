import { ok } from '../helpers/http-helpers';
import { IAddAccount } from '../../domain/usecases/addAccount';
import { MissingParamError } from '../errors/missing-param-error';
import { HttpRequest, HttpResponse } from '../protocols/http';
import { IEmailValidator } from '../protocols/IEmailValidator';

export class SignUpController {
  private readonly emailValidator: IEmailValidator;

  private readonly addAccount: IAddAccount;

  constructor(emailValidator: IEmailValidator, addAccount: IAddAccount) {
    this.emailValidator = emailValidator;
    this.addAccount = addAccount;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const requiredFields = ['name', 'email'];
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return {
          statusCode: 400,
          body: new MissingParamError(field),
        };
      }
    }

    if (!this.emailValidator.isValid(httpRequest.body.email)) {
      return {
        statusCode: 400,
        body: new Error('Invalid Param: email'),
      };
    }

    try {
      const { name, email, password } = httpRequest.body;
      const account = await this.addAccount.add({
        name,
        email,
        password,
      });
      return ok(account);
    } catch (err) {
      return {
        statusCode: 500,
        body: new Error('Server error'),
      };
    }
  }
}
