import express from 'express';
import { httpSignup } from './users.controller';

const authRouter = express.Router();

authRouter.post('/signup', httpSignup);

export default authRouter;
