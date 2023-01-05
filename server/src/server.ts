import dotenv from 'dotenv';
dotenv.config();
import { mongoConnect } from './services/mongo';
import http from 'http';
import https from 'https';
import path from 'path';
import { readFileSync } from 'fs';
import app from './app';
import express from 'express';
import cors from 'cors';

// const app = express();
// app.use(cors());
// app.get('/test', (req, res) => {
//   console.log('success!');
//   return res.status(200).json('success!');
// })

// const server = http.createServer(app);

const server = https.createServer({
  cert: readFileSync(`${path.resolve()}/src/security/localhost.crt`),
  key: readFileSync(`${path.resolve()}/src/security/localhost.key`),
  // cert: readFileSync(`${path.resolve()}/src/server.cert`),
  // key: readFileSync(`${path.resolve()}/src/server.key`),
}, app);

const PORT = 3001;

async function startServer () {
  await mongoConnect();
  server.listen(PORT, () => { console.log(`listening to port ${PORT}`); })
};

startServer();
