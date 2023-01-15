import { Request, Response, NextFunction } from "express";
import { AuthorizationError } from "../errors/server-errors";

async function checkLoggedIn (req: Request, _: Response, next: NextFunction) {
  console.log('checking authorization...');
  try {
    const isLoggedIn = req.isAuthenticated() && req.user;
    if (!isLoggedIn) {
      req.logout(function (err) {
        throw new Error(`there was an error trying to logout the user: ${err}`)
      });
      throw new AuthorizationError('El usuario no esta autorizado');
    }
    next();
  } catch (err) {
    if (err instanceof AuthorizationError) return next(err);
    throw new Error(`there was an error: ${err}`);
  }
}

export default checkLoggedIn;
