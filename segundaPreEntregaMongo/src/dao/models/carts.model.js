import mongoose from "mongoose";

const cartsCollection = "carts";

const cartSchema = new mongoose.Schema({
  products: { type: Array, required: true },
});

export const cartsModel = mongoose.model(cartsCollection, cartSchema);
