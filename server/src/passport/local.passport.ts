import { signin } from "../models/auth/auth.model";
import { VerifyOptions } from "../types/passport.types";
import bcrypt from 'bcrypt';
import { AuthenticationError } from '../errors/server-errors';

type DoneCallback = (error: any, user?: any, options?: VerifyOptions) => void

const AUTH_OPTIONS = {
  usernameField: 'email',
  passwordField: 'password',
};

async function verifyCallback (username: string, password: string, done: DoneCallback) {
  try {
    const user = await signin(username, password);

    // if (!user) return done(null, false, { message: 'this is an error message' }); // what is the purpose of this? I though it was so passport redirects the user to the 'failureRedirect' route but it is redirecting to the 'successRedirect' route
    console.log('AA');
    if (!user) throw new AuthenticationError('Contraseña incorrecta o el usuario no exsite');
    console.log({ password, dbPassword: user.password });
    const match = await bcrypt.compare(password, user.password);
    console.log('BB');
    if (!match) throw new AuthenticationError('Contraseña incorrecta o el usuario no exsite');

    return done(null, user);
  } catch (err) {
    console.log('an error was throwed');
    return done(err);
  }
}

export {
  AUTH_OPTIONS,
  verifyCallback,
}
