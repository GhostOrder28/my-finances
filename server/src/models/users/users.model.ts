import userModel from "./users.schema";
import { SignupData } from "../../types/auth.types";

async function signup (body: SignupData) {
  const { username, email, password } = body;
  const newUser = new userModel({ username, email, password });
  await newUser.save();
  console.log('new user: ', newUser);
  return newUser;
};

async function signin (email: string, password: string) {
  const userData = await userModel.findOne({ email, password });
  return userData;
};

export {
  signup,
  signin,
}
