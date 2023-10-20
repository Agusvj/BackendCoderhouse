import { Schema, model } from "mongoose";

export const RecoverCodesSchema = model(
  "recover-codes",
  new Schema({
    email: { type: String, required: true, max: 100 },
    code: { type: String, required: true, max: 100, unique: true },
    expire: { type: Number, required: true },
  })
);
