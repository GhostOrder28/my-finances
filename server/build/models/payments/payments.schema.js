import { Schema } from "mongoose";
const paymentsSchema = new Schema({
    paymentDate: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
});
export default paymentsSchema;
