import passport from 'passport';
import express from 'express';
import { httpSignup, httpSignin } from './users.controller';

const authRouter = express.Router();

authRouter.post('/signup', httpSignup);
authRouter.post('/signin', httpSignin);

export default authRouter;
