import express from "express";
import { ProductManager } from "./productManager.js";
import { productManagerRouter } from "./routes/products.router.js";
import { cartsRouter } from "./routes/carts.router.js";
const app = express();
const port = 8080;
app.use(express.urlencoded({ extended: true }));
const productManager = new ProductManager();

// endpoints to routes

app.use("/api/products", productManagerRouter);

app.use("/api/carts", cartsRouter);

app.get("*", (req, res) => {
  res.status(404).send({ status: "error", data: "Page not found" });
});

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
