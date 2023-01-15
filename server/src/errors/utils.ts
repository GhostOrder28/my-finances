import { NextFunction } from "express";
import { NotFoundError } from "../errors/db-errors";

function checkCommonErrors (err: Error, nextFn: NextFunction) {
  if (err instanceof NotFoundError) nextFn(err);
};

export {
  checkCommonErrors,
}
