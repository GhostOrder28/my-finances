import bcrypt from "bcrypt";
import { signup } from "../../models/auth/auth.model.js";
import { ValidationError } from "../../errors/server-errors.js";
import { getValidationErrorMessages } from "../../utils/utility-functions.js";
import { signupValidator, signinValidator } from "../../joi/auth.validators.js";
async function httpSignup(req, res, next) {
    try {
        const { error } = signupValidator.validate(req.body, { abortEarly: false });
        if (error)
            throw new ValidationError('there is a validation error', getValidationErrorMessages(error.details));
        const saltRounds = 10;
        req.body.hashedPwd = await bcrypt.hash(req.body.password, saltRounds);
        const userCredentials = await signup(req.body);
        return res.status(200).json({ userCredentials });
    }
    catch (err) {
        if (err instanceof ValidationError)
            return next(err);
        throw new Error(`there was an error trying to register a new user: ${err}`);
    }
}
async function httpSignin(req, res, next) {
    console.log(req.body);
    try {
        if (req.user) {
            console.log('req.user is defined, responding to the client...');
            const { password, ...userData } = req.user;
            return res.status(200).json({ userData });
        }
        else {
            console.log('req.user is undefined, validating input...');
            const { error } = signinValidator.validate(req.body, { abortEarly: false });
            if (error)
                throw new ValidationError('there was a validation error', getValidationErrorMessages(error.details));
            next();
        }
        ;
    }
    catch (err) {
        if (err instanceof ValidationError)
            return next(err);
        throw new Error(`there was an error, ${err}`);
    }
}
;
async function httpSignout(req, res) {
    req.logout(function (err) { throw new Error(`there was an error trying to log out the user: ${err}`); });
    return res.send('success!');
}
export { httpSignup, httpSignin, httpSignout, };
