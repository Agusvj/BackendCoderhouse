import mongoose from "mongoose";

const userCollection = "users";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, max: 100 },
  lastName: { type: String, required: true, max: 100 },
  email: { type: String, required: true, unique: true, max: 100 },
  password: { type: String, required: true, max: 100 },
});

export const userModel = mongoose.model(userCollection, userSchema);
