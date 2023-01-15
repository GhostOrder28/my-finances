import express from 'express';
import { httpSignup, httpSignin, httpSignout } from './auth.controller';
import passport from 'passport';

const authRouter = express.Router();

authRouter.post('/signup', httpSignup);
authRouter.post('/signin', passport.authenticate('local'), httpSignin);
authRouter.get('/signout', httpSignout);

export default authRouter;
