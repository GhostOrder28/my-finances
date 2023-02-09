import cors from "cors";
import path from "path";
import morgan from "morgan";
import passport from "passport";
import cookieSession from "cookie-session";
import express, { Response } from "express";
import { Strategy as LocalStrategy } from "passport-local";

import errorHandler from "./errors/error-handler.js";
import { fileDirName } from "./utils/utility-functions.js";
import checkLoggedIn from "./middlewares/check-logged-in.js";
import { AUTH_OPTIONS, verifyCallback } from "./passport/local.passport.js";
import { cookieSessionOptions } from "./middlewares/cookie-session.middleware.js";

import authRouter from "./routes/auth/auth.router.js"; 
import usersRouter from "./routes/users/users.router.js";
import clientsRouter from "./routes/clients/clients.router.js";
import guestsRouter from "./routes/guests/guests.router.js";

import { User } from "./types/user.types.js";

const { __dirname } = fileDirName(import.meta);

const corsOptions = {
  origin: 'https://192.168.100.3:8080',
  // origin: 'https://localhost:8080',
  credentials: true,
};

const app = express();
passport.use(new LocalStrategy(AUTH_OPTIONS, verifyCallback));
passport.serializeUser((userData, done) => {
  // done(null, userData._id.toString()); // here typescript doesn't yell on vim but it does on the server
  done(null, (userData as User)._id.toString());
  console.log('serializing user...', (userData as User)._id.toString());
});
passport.deserializeUser<string>((userId, done) => {
  console.log('deserializing user: ', userId)
  done(null, userId); 
});

app.use(morgan('combined'));
app.use(cors(corsOptions));
app.use(cookieSession(cookieSessionOptions));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('/signin', (_, res: Response) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.get('/signup', (_, res: Response) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.use('/auth', authRouter);
app.use('/guests', guestsRouter);
app.use(checkLoggedIn);

app.use('/users', usersRouter);
app.use('/clients', clientsRouter);

app.get('/*', function (_, res: Response) { 
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.use(errorHandler);

export default app;
