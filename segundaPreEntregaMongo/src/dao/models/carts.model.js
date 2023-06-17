import mongoose from "mongoose";

const cartsCollection = "carts";

const cartSchema = new mongoose.Schema({
  products: {
    type: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
        },
        quantity: { type: Number, min: 1 },
      },
    ],
    required: true,
  },
});

cartSchema.pre(["find", "findOne", "findById"], function () {
  this.populate("products.product");
});

export const cartsModel = mongoose.model(cartsCollection, cartSchema);
