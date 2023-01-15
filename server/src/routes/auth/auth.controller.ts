import { Request, Response } from "express";
import { signup, signin } from "../../models/auth/auth.model";
import { UserCredentials, SignupData } from "../../types/auth.types";
import bcrypt from 'bcrypt';

async function httpSignup (req: Request<any, any, SignupData>, res: Response) {
  const saltRounds = 10;
  req.body.hashedPwd = await bcrypt.hash(req.body.password, saltRounds);
  const userCredentials = await signup(req.body);
  return res.status(200).json({ userCredentials })
}

async function httpSignin (req: Request<any, any, UserCredentials>, res: Response) {
  const { email, password } = req.body;
  const userData = await signin(email, password);
  console.log('userData: ', userData);
  return res.status(200).json({ userData })
};

async function httpSignout (req: Request, res: Response) {
  console.log('AAAAA');
  req.logout(function (err) { throw new Error(`there was an error trying to log out the user: ${err}`) });
  return res.send('success!');
}

export {
  httpSignup,
  httpSignin,
  httpSignout,
}
