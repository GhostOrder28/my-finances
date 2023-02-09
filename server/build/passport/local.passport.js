import bcrypt from "bcrypt";
import { signin } from "../models/auth/auth.model.js";
import { ValidationError } from "../errors/server-errors.js";
import { AuthenticationError } from "../errors/server-errors.js";
const AUTH_OPTIONS = {
    usernameField: 'email',
    passwordField: 'password',
};
async function verifyCallback(username, password, done) {
    try {
        const user = await signin(username);
        // if (!user) return done(null, false, { message: 'this is an error message' }); // what is the purpose of this? I though it was so passport redirects the user to the 'failureRedirect' route but it is redirecting to the 'successRedirect' route
        if (user) {
            if (!user.username.includes('guest')) {
                console.log('checking password');
                const match = await bcrypt.compare(password, user.password);
                if (!match)
                    throw new AuthenticationError('La contraseña es incorrecta o el usuario no existe');
            }
            ;
        }
        else {
            throw new AuthenticationError('La contraseña es incorrecta o el usuario no existe');
        }
        ;
        console.log('calling done with user:', user);
        return done(null, user);
    }
    catch (err) {
        if (err instanceof ValidationError)
            return done(err);
        if (err instanceof AuthenticationError)
            return done(err);
    }
}
export { AUTH_OPTIONS, verifyCallback, };
