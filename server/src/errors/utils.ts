import { NextFunction } from "express";
import { NotFoundError } from "../errors/db-errors";
import { ValidationError } from "./server-errors";

function checkCommonErrors (err: Error, nextFn: NextFunction) {
  if (err instanceof NotFoundError) return nextFn(err);
  if (err instanceof ValidationError) return nextFn(err);
};

export {
  checkCommonErrors,
}
