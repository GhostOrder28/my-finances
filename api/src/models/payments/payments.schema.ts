import { Schema } from "mongoose";

import { Payment } from "../../types/sale.types.js";

const paymentsSchema = new Schema<Payment>({
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
