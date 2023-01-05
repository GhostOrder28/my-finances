import { signin } from "../models/users/users.model";
import { VerifyOptions } from "../types/passport.types";

type DoneCallback = (error: any, user?: any, options?: VerifyOptions) => void

const AUTH_OPTIONS = {
  usernameField: 'email',
  passwordField: 'password',
};

async function verifyCallback (username: string, password: string, done: DoneCallback) {
  const userData = await signin(username, password);
  // console.log('userData: ', userData);
  // bcrypt compare
  // if compare returns true
  done(null, userData);
  // User.findOne({ username: username }, function (err, user) {
  //   if (err) { return done(err); }
  //   if (!user) { return done(null, false); }
  //   if (!user.verifyPassword(password)) { return done(null, false); }
  //   return done(null, user);
  // });
}

export {
  AUTH_OPTIONS,
  verifyCallback,
}
