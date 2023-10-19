import dotenv from "dotenv";

dotenv.config();

export default {
  googleEmail: process.env.GOOGLE_EMAIL,
  googlePass: process.env.GOOGLE_PASS,
  mongoUrl: process.env.MONGO_URL,
};
