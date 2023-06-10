import { Router } from "express";
import express from "express";
import { ProductManagerMongo } from "../dao/services/productManagerMongo.js";

export const productManagerRouter = Router();

const productManagerMongo = new ProductManagerMongo();

productManagerRouter.use(express.json());
productManagerRouter.use(express.urlencoded({ extended: true }));

productManagerRouter.get("/", async (req, res) => {
  try {
    const allProducts = await productManagerMongo.getProducts();

    res.status(200).send({ status: "success", data: allProducts });
  } catch (error) {
    res.status(400).send({ status: "error", error: error.message });
  }
});

productManagerRouter.get("/:pid", async (req, res) => {
  try {
    let pid = req.params.pid;
    const findProduct = await productManagerMongo.getProductById(pid);
    res.status(200).send({ status: "success", data: findProduct });
  } catch (error) {
    res.status(400).send({ status: "error", data: error.message });
  }
});

productManagerRouter.put("/:pid", async (req, res) => {
  let updateProductClient = req.body;
  let pid = req.params.pid;
  try {
    const updateProduct = await productManagerMongo.updateProduct(
      pid,
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
    const addProduct = await productManagerMongo.addProduct(newProduct);
    res.status(201).send({ status: "success", data: addProduct });
  } catch (error) {
    res.status(400).send({
      status: "error",
      data: error.message,
    });
  }
});

productManagerRouter.delete("/:pid", async (req, res) => {
  let pid = req.params.pid;
  console.log(pid);

  try {
    const deleteProduct = await productManagerMongo.deleteProduct(pid);
    res.status(200).send({
      status: "success",
      data: "El producto eliminado es:" + deleteProduct,
    });
  } catch (error) {
    res.status(400).send({ status: "error", data: error.message });
  }
});
