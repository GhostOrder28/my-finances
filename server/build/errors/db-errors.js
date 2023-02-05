class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = "NotFoundError";
    }
}
class DuplicateEntityError extends Error {
    constructor(message) {
        super(message);
        this.name = "DuplicateEntityError";
    }
}
export { NotFoundError, DuplicateEntityError, };
