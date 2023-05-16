import { Router } from "express";
import express from "express";
import { ProductManager } from "../productManager.js";

const productManager = new ProductManager();

export const productManagerRouter = Router();

productManagerRouter.use(express.json());
productManagerRouter.use(express.urlencoded({ extended: true }));

productManagerRouter.get("/", async (req, res) => {
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

productManagerRouter.get("/:pid", async (req, res) => {
  try {
    const productId = await productManager.getProductById(
      Number(req.params.pid)
    );
    res.status(200).send({ status: "success", data: productId });
  } catch (error) {
    res.status(400).send({ status: "error", data: error.message });
  }
});

productManagerRouter.put("/:pid", async (req, res) => {
  let updateProductClient = req.body;

  try {
    const updateProduct = await productManager.updateProduct(
      Number(req.params.pid),
      updateProductClient
    );
    res.status(200).send({ status: "success", data: updateProduct });
  } catch (error) {
    res.status(400).send({ status: "error", data: error.message });
  }
});

productManagerRouter.post("/", async (req, res) => {
  let newProduct = req.body;

  try {
    const addProduct = await productManager.addProduct(newProduct);
    res.status(201).send({ status: "success", data: addProduct });
  } catch (error) {
    res.status(400).send({ status: "error", data: error.message });
  }
});

productManagerRouter.delete("/:pid", async (req, res) => {
  try {
    const deleteProduct = await productManager.deleteProduct(
      Number(req.params.pid)
    );
    res.status(200).send({ status: "success", data: deleteProduct });
  } catch (error) {
    res.status(400).send({ status: "error", data: error.message });
  }
});
