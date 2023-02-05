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
        this.name = "ValidationError";
        this.errorDetails = errorDetails;
    }
}
export { AuthorizationError, AuthenticationError, ValidationError };
