import mongoose from "mongoose";

const { Schema } = mongoose;

const clientSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  name: {
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
    type: [ Schema.Types.ObjectId ],
    required: true,
  },
  totalDebtValue: {
    type: Number,
    required: true,
  },
  totalSalesValue: {
    type: Number,
    required: true,
  }
});

export default mongoose.model('Client', clientSchema);
