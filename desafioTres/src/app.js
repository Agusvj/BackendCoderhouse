import express from "express";
import { ProductManager } from "./main.js";
const app = express();
const port = 8080;
app.use(express.urlencoded({ extended: true }));
const productManager = new ProductManager();

app.get("/products", async (req, res) => {
  const allProducts = await productManager.getProducts();
  let limit = req.query.limit;

  if (!limit) {
    res.status(200).send({ status: "success", data: allProducts });
  } else if (limit > 0 && limit <= allProducts.length) {
    let productsLimit = allProducts.slice(0, limit);
    res.status(200).send({ status: "success", data: productsLimit });
  } else if (limit > allProducts.length) {
    res
      .status(400)
      .send({ status: "error", data: "Limit exceeds the products quantity" });
  } else {
    res.status(400).send({ status: "error", data: "Limit must be a number" });
  }
});

app.get("/products/:pid", async (req, res) => {
  const allProducts = await productManager.getProducts();
  let productId = req.params.pid;
  let productFound = allProducts.find((product) => product.id === productId);
  if (!productFound) {
    return res
      .status(404)
      .send({ status: "error", data: "Product ID not found" });
  }
  res.status(200).send({ status: "success", data: productFound });
});

app.get("*", (req, res) => {
  res.status(404).send({ status: "error", data: "Page not found" });
});

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
