import mongoose from "mongoose";
import paymentsSchema from "../payments/payments.schema";
import { Item, Sale } from '../../types/sale.types';

const { Schema } = mongoose;

const itemsSchema = new Schema<Item>({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const salesSchema = new Schema<Sale>({
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  items: {
    type: [ itemsSchema ],
    required: true,
    default: [],
  },
  payments: {
    type: [ paymentsSchema ],
    required: true,
    default: [],
  },
  saleValue: {
    type: Number,
    required: true,
    default: 0,
  },
  paidAmount: {
    type: Number,
    required: true,
    default: 0,
  },
  unpaidAmount: {
    type: Number,
    required: true,
    default: 0,
    min: [ 0, 'El pago que intentas añadir es mayor que la deuda' ]
  }
});

function minimumItems (val: Item[]) {
  return val.length > 0;   
};

export default salesSchema;