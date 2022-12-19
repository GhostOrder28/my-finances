import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
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
  creationDate: {
    type: Date,
    default: Date.now
  }
});

const userModel = mongoose.model('User', userSchema);

export {
  userModel,
}

