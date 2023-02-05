import { NextFunction } from "express";

import { ValidationError } from "./server-errors.js";
import { NotFoundError } from "../errors/db-errors.js";

function checkCommonErrors (err: Error, nextFn: NextFunction) {
  if (err instanceof NotFoundError) return nextFn(err);
  if (err instanceof ValidationError) return nextFn(err);
};

export {
  checkCommonErrors,
}
