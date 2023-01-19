import { Request, Response, NextFunction } from "express";
import { signup, signin } from "../../models/auth/auth.model";
import { UserCredentials, SignupData } from "../../types/auth.types";
import { AuthenticationError } from "../../errors/server-errors";
import bcrypt from 'bcrypt';

async function httpSignup (req: Request<any, any, SignupData>, res: Response) {
  const saltRounds = 10;
  try {
    req.body.hashedPwd = await bcrypt.hash(req.body.password, saltRounds);
    const userCredentials = await signup(req.body);
    return res.status(200).json({ userCredentials });
  } catch (err) {
    throw new Error(`there was an error trying to register a new user: ${err}`);
  }
}

async function httpSignin (req: Request<any, any, UserCredentials>, res: Response, next: NextFunction) {
  const { email } = req.body;
  try {
    const { password, ...userData } = await signin(email);
    return res.status(200).json({ userData })
  } catch (err) {
    if (err instanceof AuthenticationError) return next(err);
    throw new Error(`there was an error trying to signin a user: ${err}`);
  }
};

async function httpSignout (req: Request, res: Response) {
  req.logout(function (err) { throw new Error(`there was an error trying to log out the user: ${err}`) });
  return res.send('success!');
}

export {
  httpSignup,
  httpSignin,
  httpSignout,
}
