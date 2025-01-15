import bcrypt from "bcrypt";
import { Request, Response, NextFunction } from "express";

import { signup } from "../../models/auth/auth.model.js";
import { ValidationError } from "../../errors/server-errors.js";
import { getValidationErrorMessages } from "../../utils/utility-functions.js";
import { signupValidator, signinValidator } from "../../joi/auth.validators.js";

import { User } from "../../types/user.types.js";
import { UserCredentials, SignupData } from "../../types/auth.types.js";

async function httpSignup (req: Request<any, any, SignupData>, res: Response, next: NextFunction) {
  try {
    const { error } = signupValidator.validate(req.body, { abortEarly: false });
    if (error) throw new ValidationError('there is a validation error', getValidationErrorMessages(error.details))
    const saltRounds = 10;
    req.body.hashedPwd = await bcrypt.hash(req.body.password, saltRounds);
    const userCredentials = await signup(req.body);
    return res.status(200).json({ userCredentials });
  } catch (err) {
    if (err instanceof ValidationError) return next(err);
    throw new Error(`there was an error trying to register a new user: ${err}`);
  }
}

async function httpSignin (req: Request<any, any, UserCredentials>, res: Response, next: NextFunction) {
  console.log('req.body: ', req.body);
  console.log('req.user: ', req.user);
  try {
    if (req.user) {
      console.log('req.user is defined, responding to the client...');
      const { password, ...userData } = req.user as User;
      return res.status(200).json({ userData });
    } else {
      console.log('req.user is undefined, validating input...');
      const { error } = signinValidator.validate(req.body, { abortEarly: false });
      if (error) throw new ValidationError('there was a validation error', getValidationErrorMessages(error.details));
      next();
    };
  } catch (err) {
    if (err instanceof ValidationError) return next(err);
    throw new Error(`there was an error, ${err}`);
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
