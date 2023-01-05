import express from 'express';
import path from 'path';
import morgan from 'morgan';
import cors from 'cors';
import passport from 'passport';
import cookieSession from 'cookie-session';
import { Strategy as LocalStrategy } from 'passport-local';
import { AUTH_OPTIONS, verifyCallback } from './passport/local.passport';
import { cookieSessionOptions } from './middlewares/cookie-session.middleware';
import { User } from './types/auth.types';

import authRouter from './routes/users/users.router'; 
import clientsRouter from './routes/clients/clients.router';


const corsOptions = {
  origin: 'https://192.168.100.3:8080',
  credentials: true,
};

const app = express();

passport.use(new LocalStrategy(AUTH_OPTIONS, verifyCallback));
passport.serializeUser((userData, done) => {
  console.log('serializing user: ', userData)
  // done(null, userData._id.toString()); // here typescript doesn't yell on vim but it does on the server
  done(null, (userData as User)._id.toString());
});
passport.deserializeUser<User>((userId, done) => {
  // console.log('deserializing user: ', userId)
  done(null, userId); 
  // this is wrong, what i'm expecting in userId is a string and not an object, but I had to type the User as an object because of the serializeUser function.
});

app.use(cors(corsOptions));
app.use(cookieSession(cookieSessionOptions));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.json());
app.use(morgan('combined'));

app.use('/auth', authRouter);
app.use('/clients', clientsRouter);

export default app;
