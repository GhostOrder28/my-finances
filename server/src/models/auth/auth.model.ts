import userModel from "../users/users.schema";
import { SignupData } from "../../types/auth.types";
import { DuplicateEntityError } from "../../errors/db-errors";
import { Error } from "mongoose";
import { MongoServerError } from 'mongodb';

async function signup (body: SignupData) {
  const { username, email, password, hashedPwd } = body;
  const newUser = new userModel({ username, email, password: hashedPwd });

  try {
    await newUser.save();
    return {
      email: newUser.email,
      password,
    };
  } catch (err) {
    if (err instanceof MongoServerError && err.code === 11000) {
      throw new DuplicateEntityError(`Este usuario ya existe.`)
    };
    throw new Error(`there was an error: ${err}`)
  }
};

async function signin (email: string, password: string) {
  try {
    const userData = await userModel.findOne({ email });
    return userData;
  } catch (err) {
    throw new Error(`there was an error: ${err}`)
  }
};

export {
  signup,
  signin,
}
