import { Error } from "mongoose";
import { MongoServerError } from "mongodb";
import userModel from "../users/users.schema.js";
import { DuplicateEntityError } from "../../errors/db-errors.js";
async function signup(body) {
    const { username, email, password, hashedPwd } = body;
    const newUser = new userModel({ username, email, password: hashedPwd });
    try {
        await newUser.save();
        return {
            email: newUser.email,
            password,
        };
    }
    catch (err) {
        if (err instanceof MongoServerError && err.code === 11000) {
            throw new DuplicateEntityError(`Este usuario ya existe.`);
        }
        ;
        throw new Error(`there was an error: ${err}`);
    }
}
;
async function signin(email) {
    try {
        const userData = await userModel.findOne({ email });
        if (userData) {
            return {
                _id: userData._id,
                username: userData.username,
                email: userData.email,
                password: userData.password
            };
        }
    }
    catch (err) {
        throw new Error(`there was an error: ${err}`);
    }
}
;
export { signup, signin, };
