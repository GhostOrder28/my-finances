import dotenv from 'dotenv';
dotenv.config();
import { mongoConnect } from './services/mongo';
import http from 'http';
import app from './app';


const server = http.createServer(app);
const PORT = 3001;

async function startServer () {
  await mongoConnect();
  server.listen(PORT, () => { console.log(`listening to port ${PORT}`); })
};

startServer();
