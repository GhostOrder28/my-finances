import mongoose from "mongoose";

import { User } from "../../types/user.types.js";

const { Schema } = mongoose;

const userSchema = new Schema<User>({
  username: {
    type: String,
    required: true,
  }, 
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    min: [ 6, 'La contraseña debe tener al menos 6 caracteres.' ]
  },
  totalSalesValue: {
    type: Number,
    required: true,
    default: 0,
  },
  receivables: {
    type: Number,
    required: true,
    default: 0,
  },
  debtors: {
    type: Number,
    required: true,
    default: 0,
  },
  creationDate: {
    type: Date,
    default: Date.now
  },
  guest: {
    type: Boolean,
    required: false,
  }
});

const usersCollection = mongoose.model('User', userSchema);

export default usersCollection;
