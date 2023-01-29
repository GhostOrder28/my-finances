import { signin } from "../models/auth/auth.model";
import { VerifyOptions } from "../types/passport.types";
import bcrypt from 'bcrypt';
import { ValidationError } from "../errors/server-errors";
import { AuthenticationError } from '../errors/server-errors';

type DoneCallback = (error: any, user?: any, options?: VerifyOptions) => void

const AUTH_OPTIONS = {
  usernameField: 'email',
  passwordField: 'password',
};

async function verifyCallback (username: string, password: string, done: DoneCallback){
  try {
    const user = await signin(username);

    // if (!user) return done(null, false, { message: 'this is an error message' }); // what is the purpose of this? I though it was so passport redirects the user to the 'failureRedirect' route but it is redirecting to the 'successRedirect' route
    
    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (!match) throw new AuthenticationError('Contraseña incorrecta o el usuario no existe');
    } else {
      throw new AuthenticationError('Contraseña incorrecta o el usuario no existe');
    };

    return done(null, user);
  } catch (err) {
    if (err instanceof ValidationError) return done(err);
    if (err instanceof AuthenticationError) return done(err);
  }
}

export {
  AUTH_OPTIONS,
  verifyCallback,
}
