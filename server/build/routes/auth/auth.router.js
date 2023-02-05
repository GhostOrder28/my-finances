import express from "express";
import passport from "passport";
import { httpSignup, httpSignin, httpSignout } from "./auth.controller.js";
const authRouter = express.Router();
authRouter.post('/signup', httpSignup);
authRouter.post('/signin', httpSignin, passport.authenticate('local'), httpSignin);
// authRouter.post('/signin', httpSignin);
authRouter.get('/signout', httpSignout);
export default authRouter;
