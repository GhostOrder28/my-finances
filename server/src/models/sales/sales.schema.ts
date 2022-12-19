import mongoose from "mongoose";
import { SaleItem, Sale } from '../../types/sale.types';

const { Schema } = mongoose;

const saleSchema = new Schema({
  clientId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  clientName: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  items: {
    type: [{
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
      }
    }],
    required: true,
    validate: [ minimumItems, 'Es necesario al menos un item' ],
  },
  payments: {
    type: [{
      date: {
        type: Date,
        required: true,
        default: Date.now,
      },
      amount: {
        type: Number,
        required: true,
      },
      details: {
        type: String,
        required: false,
      }
    }]
  },
  totalValue: {
    type: Number,
    required: true,
    default: function (this: Sale) {
      const totalValue = this.items.reduce((acc, curr) => {
        return acc + curr.price;
      }, 0);
      return totalValue;
    }
  },
  paidAmount: {
    type: Number,
    required: true,
    default: 0,
  },
  debt: {
    type: Number,
    required: true,
    default: function (this: Sale) {
      return this.totalValue - this.paidAmount;
    }
  }
});

function minimumItems (val: SaleItem[]) {
  return val.length > 0;   
};

export default mongoose.model('Sale', saleSchema);
