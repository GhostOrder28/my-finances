class AuthorizationError extends Error {
    constructor(message) {
        super(message);
        this.name = "AuthorizationError";
    }
}
class AuthenticationError extends Error {
    constructor(message) {
        super(message);
        this.name = "AuthenticationError";
    }
}
class ValidationError extends Error {
    constructor(message, errorDetails) {
        super(message);
        Object.setPrototypeOf(this, ValidationError.prototype);
        this.name = "ValidationError";
        // @ts-ignore: Unreachable code error
        this.errorDetails = errorDetails;
    }
}
export { AuthorizationError, AuthenticationError, ValidationError };
