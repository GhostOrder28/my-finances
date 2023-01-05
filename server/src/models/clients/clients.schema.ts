import mongoose, { Types } from "mongoose";
import salesSchema from "../sales/sales.schema";
import { Client } from "../../types/client.types";

const { Schema } = mongoose;


const clientSchema = new Schema<Client>({
  // @ts-ignore: Unreachable code error
  userId: {
    type: Types.ObjectId,
    required: true,
  },
  clientName: {
    type: String,
    required: true,
  },
  nameDetails: {
    type: String,
    required: false,
  },
  contactPhone: {
    type: String,
    required: false,
  },
  sales: {
    type: [ salesSchema ],
    required: true,
    default: [],
  },
  currentDebt: {
    type: Number,
    required: true,
    default: 0,
  },
  totalSalesValue: {
    type: Number,
    required: true,
    default: 0,
  }
});

export default mongoose.model('Client', clientSchema);
