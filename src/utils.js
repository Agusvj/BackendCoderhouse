import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import { connect } from "mongoose";
import bcrypt from "bcrypt";
import winston from "winston";
import nodemailer from "nodemailer";
import config from "../config.js";

export default __dirname;

export async function connectMongo() {
  try {
    await connect(
      "mongodb+srv://agusvj:7C2af80b2e53asd@cluster0.gjhmyvj.mongodb.net/ecommerce?retryWrites=true&w=majority"
    );
    console.log("plug mongo");
  } catch (e) {
    console.log(e);
    throw new Error("Error de conexión");
  }
}

export const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (password, hashPassword) =>
  bcrypt.compareSync(password, hashPassword);

const customLevelsOptions = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5,
  },
  colors: {
    fatal: "red",
    error: "cyan",
    warning: "yellow",
    info: "green",
    http: "blue",
    debug: "white",
  },
};

export const logger = winston.createLogger({
  levels: customLevelsOptions.levels,
  transports: [
    new winston.transports.Console({
      level: "debug",
      format: winston.format.combine(
        winston.format.colorize({ colors: customLevelsOptions.colors }),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({
      filename: "./error.log",
      level: "info",
      format: winston.format.simple(),
    }),
  ],
});

export const sendEmailTransport = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: process.env.GOOGLE_EMAIL,
    pass: process.env.GOOGLE_PASS,
  },
});
