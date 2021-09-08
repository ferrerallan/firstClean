import { MissingParamError } from '../errors/missing-param-error';
import { HttpRequest, HttpResponse } from '../protocols/http';
import { IEmailValidator } from '../protocols/IEmailValidator';

export class SignUpController {
  private readonly emailValidator: IEmailValidator;

  constructor(emailValidator: IEmailValidator) {
    this.emailValidator = emailValidator;
  }

  handle(httpRequest: HttpRequest): HttpResponse {
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
        body: new Error('email'),
      };
    }

    return null;
  }
}
