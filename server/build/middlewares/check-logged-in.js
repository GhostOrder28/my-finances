import { AuthorizationError } from "../errors/server-errors.js";
async function checkLoggedIn(req, _, next) {
    console.log('checking authorization...');
    console.log('is authenticated?', req.isAuthenticated());
    try {
        const isLoggedIn = req.isAuthenticated() && req.user;
        if (!isLoggedIn) {
            req.logout(function (err) {
                throw new Error(`there was an error trying to logout the user: ${err}`);
            });
            throw new AuthorizationError('El usuario no esta autorizado');
        }
        next();
    }
    catch (err) {
        console.log('error!!!');
        if (err instanceof AuthorizationError)
            return next(err);
        throw new Error(`there was an error: ${err}`);
    }
}
export default checkLoggedIn;
