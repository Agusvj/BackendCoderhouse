import { Router } from "express";
import express from "express";
import { productsModel } from "../dao/models/products.model.js";
import { ProductManagerMongo } from "../dao/services/productManagerMongo.js";

export const productManagerRouter = Router();

const productManagerMongo = new ProductManagerMongo();

productManagerRouter.use(express.json());
productManagerRouter.use(express.urlencoded({ extended: true }));

productManagerRouter.get("/", async (req, res) => {
  try {
    const allProducts = await productManagerMongo.getProducts(req.query);

    res.status(200).send({
      payload: allProducts.docs.map((product) => ({
        id: product._id.toString(),
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        thumbnails: product.thumbnails,
        status: product.status,
        code: product.code,
        category: product.category,
      })),
      totalPages: allProducts.totalPages,
      prevPage: allProducts.prevPage,
      nextPage: allProducts.nextPage,
      page: allProducts.page,
      hasPrevPage: allProducts.hasPrevPage,
      hasNextPage: allProducts.hasNextPage,
      // ...allProducts,
    });
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
