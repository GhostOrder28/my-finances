class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
  }
}

class DuplicateEntityError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DuplicateEntityError";
  }
}

export {
  NotFoundError,
  DuplicateEntityError,
}
