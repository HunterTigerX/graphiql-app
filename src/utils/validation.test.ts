import { isValidEmail, isValidPassword } from './validation';

describe('isValidEmail', () => {
  test('should return true for valid email with standard format', () => {
    expect(isValidEmail('test@example.com')).toBe(true);
  });

  test('should return true for valid email with subdomain', () => {
    expect(isValidEmail('test@mail.example.com')).toBe(true);
  });

  test('should return true for valid email with numbers and special characters', () => {
    expect(isValidEmail('test+filter@example.co.uk')).toBe(true);
  });

  test('should return false for email without "@" symbol', () => {
    expect(isValidEmail('testexample.com')).toBe(false);
  });

  test('should return false for email without domain', () => {
    expect(isValidEmail('test@.com')).toBe(false);
  });

  test('should return false for email with whitespace', () => {
    expect(isValidEmail('test @example.com')).toBe(false);
  });

  test('should return true for email with valid characters', () => {
    expect(isValidEmail('test@exam!ple.com')).toBe(true);
  });

  test('should return false for empty string', () => {
    expect(isValidEmail('')).toBe(false);
  });
});

describe('isValidPassword', () => {
  test('should return true for valid password with letters, numbers, and special characters', () => {
    expect(isValidPassword('Password1!')).toBe(true);
  });

  test('should return true for valid password with minimum length', () => {
    expect(isValidPassword('Abcdefg1!')).toBe(true);
  });

  test('should return false for password shorter than 8 characters', () => {
    expect(isValidPassword('Abc1!')).toBe(false);
  });

  test('should return false for password without a number', () => {
    expect(isValidPassword('Password!')).toBe(false);
  });

  test('should return false for password without a special character', () => {
    expect(isValidPassword('Password1')).toBe(false);
  });

  test('should return false for password without letters', () => {
    expect(isValidPassword('12345678!')).toBe(false);
  });

  test('should return false for empty string', () => {
    expect(isValidPassword('')).toBe(false);
  });
});
