import { Request, Response } from "express";
import { signup } from "../../models/users/users.model";
import { SignupBody } from "../../types/auth.types";

async function httpSignup (req: Request<SignupBody>, res: Response) {
  await signup(req.body);
  return res.status(200).json('success')
}

export {
  httpSignup,
}
