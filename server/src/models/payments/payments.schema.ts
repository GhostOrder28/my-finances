import { Schema } from "mongoose";
import { Payment } from '../../types/sale.types';

const paymentsSchema = new Schema<Payment>({
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  amount: {
    type: Number,
    required: true,
  },
});

export default paymentsSchema;
