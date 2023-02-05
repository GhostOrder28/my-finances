import mongoose from "mongoose";
const MONGO_URL = process.env.MONGO_CONNECTION_STRING;
mongoose.set('strictQuery', false);
mongoose.connection.once('open', () => {
    console.log('MongoDB connection ready!');
});
mongoose.connection.on('error', (err) => {
    throw new Error(`MongoDB connection error: ${err}`);
});
async function mongoConnect() {
    if (MONGO_URL) {
        await mongoose.connect(MONGO_URL);
    }
    else {
        throw new Error("MONGO_CONNECTION_STRING is undefined");
    }
    ;
}
;
async function mongoDisconnect() {
    await mongoose.disconnect();
}
;
export { mongoConnect, mongoDisconnect, };
