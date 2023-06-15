import mongoose, { mongo } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productsCollection = "products";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, max: 100 },
  description: { type: String, required: true, max: 100 },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  thumbnails: { type: Array, required: true, max: 100 },
  status: { type: Boolean, required: true },
  code: { type: String, required: true, max: 100, unique: true },
  category: { type: String, required: true, max: 100 },
});

productSchema.plugin(mongoosePaginate);

export const productsModel = mongoose.model(productsCollection, productSchema);
