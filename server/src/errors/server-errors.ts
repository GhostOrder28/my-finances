import { ValidationErrorItem } from "../types/utils/utility-functions.types";

class AuthorizationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthorizationError";
  }
}

class AuthenticationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthenticationError";
  }
}

class ValidationError extends Error {
  constructor(message: string, errorDetails: ValidationErrorItem[]) {
    super(message);
    this.name = "ValidationError";
    this.errorDetails = errorDetails;
  }
}

export {
  AuthorizationError,
  AuthenticationError,
  ValidationError
}
