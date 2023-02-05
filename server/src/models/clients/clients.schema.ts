import mongoose, { Types } from "mongoose";

import salesSchema from "../sales/sales.schema.js";
import { patchUserAssets } from "../users/users.model.js";

import { Client } from "../../types/client.types.js";

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
  clientNameDetails: {
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
  clientSalesValue: {
    type: Number,
    required: true,
    default: 0,
  }
});
const clientsCollection = mongoose.model('Client', clientSchema);

clientsCollection.watch<Client>([], { fullDocument: 'updateLookup' }).on('change', (data) => patchUserAssets(data));

export default clientsCollection;
