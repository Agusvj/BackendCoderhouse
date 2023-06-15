import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import { connect } from "mongoose";

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
