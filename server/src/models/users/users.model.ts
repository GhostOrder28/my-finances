import { userModel } from "./users.schema";
import { SignupBody } from "../../types/auth.types";

async function signup (body: SignupBody) {
  const { name, email, password } = body;
  const newUser = new userModel({ name, email, password });
  await newUser.save();
  console.log('new user: ', newUser);
};

export {
  signup
}
