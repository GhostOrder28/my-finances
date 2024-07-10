import "dotenv/config";
// import dotenv from 'dotenv';
// dotenv.config();
import http from "http";
// import path from "path";
// import https from "https";
// import { readFileSync } from "fs";
import app from "./app.js";
import { mongoConnect } from "./services/mongo.js";
const server = http.createServer(app);
// const server = https.createServer({
//   cert: readFileSync(`${path.resolve()}/src/security/localhost.crt`),
//   key: readFileSync(`${path.resolve()}/src/security/localhost.key`),
// }, app);
const PORT = process.env.PORT || 4000;
async function startServer() {
    await mongoConnect();
    server.listen(PORT, () => { console.log(`listening to port ${PORT}`); });
}
;
startServer();
