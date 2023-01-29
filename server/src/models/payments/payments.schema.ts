import { Schema } from "mongoose";
import { Payment } from '../../types/sale.types';

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
