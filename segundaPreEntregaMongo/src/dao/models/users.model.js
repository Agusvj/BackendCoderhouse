import mongoose from "mongoose";
import Schema from "mongoose";

const userCollection = "users";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, max: 100 },
  lastName: { type: String, required: true, max: 100 },
  email: { type: String, required: true, unique: true, max: 100 },
  password: { type: String, required: true, max: 100 },
  age: { type: Number, required: false, max: 100 },
  cart: {
    type: Schema.Types.ObjectId,
    ref: "carts",
    required: false,
    max: 100,
  },
  rol: { type: String, default: "user", required: true },
});

export const userModel = mongoose.model(userCollection, userSchema);
