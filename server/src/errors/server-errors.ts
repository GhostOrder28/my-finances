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

export {
  AuthorizationError,
  AuthenticationError,
}
