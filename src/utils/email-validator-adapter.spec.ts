import { EmailValidatorAdapter } from './email-validator';

describe('Email Validator Adapter', () => {
  test('should return false if validator returns false', () => {
    const sut = new EmailValidatorAdapter();
    const isValid = sut.isValid('invalidmail@mailcom');
    expect(isValid).toBe(false);
  });
  test('should return true if validator returns true', () => {
    const sut = new EmailValidatorAdapter();
    const isValid = sut.isValid('valid@mail.com');
    expect(isValid).toBe(true);
  });
});
