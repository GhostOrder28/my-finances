import userModel from "../users/users.schema";
import { SignupData } from "../../types/auth.types";
import { DuplicateEntityError } from "../../errors/db-errors";
import { AuthenticationError } from "../../errors/server-errors";
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

async function signin (email: string) {
  console.log('AAAAA');
  try {
    const userData = await userModel.findOne({ email });
    if (userData) {
      console.log('ZZZZ');
      return {
        _id: userData._id,
        username: userData.username,
        email: userData.email,
        password: userData.password
      };
    } 
  } catch (err) {
    console.log('HHHH');
    throw new Error(`there was an error: ${err}`)
  }
};

export {
  signup,
  signin,
}
