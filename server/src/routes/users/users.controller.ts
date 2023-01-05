import { Request, Response } from "express";
import { signup, signin } from "../../models/users/users.model";
import { UserCredentials, SignupData } from "../../types/auth.types";

async function httpSignup (req: Request<any, any, SignupData>, res: Response) {
  const userCredentials = await signup(req.body);
  return res.status(200).json({ userCredentials })
}

async function httpSignin (req: Request<any, any, UserCredentials>, res: Response) {
  const { email, password } = req.body;
  const userData = await signin(email, password);
  return res.status(200).json({ userData })
};

export {
  httpSignup,
  httpSignin,
}
