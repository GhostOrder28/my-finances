import { NotFoundError, DuplicateEntityError } from "./db-errors";
import { AuthenticationError, AuthorizationError, ValidationError } from "./server-errors";
import { Request, Response, NextFunction, ErrorRequestHandler } from "express";

function errorHandler(err: ErrorRequestHandler, _: Request, res: Response, next: NextFunction) {
  if (err instanceof NotFoundError) return res.status(404).json({ notFoundError: err.message });
  if (err instanceof AuthenticationError) return res.status(401).json({ authenticationError: err.message });
  if (err instanceof AuthorizationError) return res.status(401).json({ authorizationError: err.message });
  if (err instanceof DuplicateEntityError) return res.status(409).json({ duplicateEntityError: err.message });
  if (err instanceof ValidationError) return res.status(400).json({ validationError: err.errorDetails });
  next();
}

export default errorHandler;
