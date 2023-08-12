import { Router } from "express";
import express from "express";
import { ProductController } from "../controllers/products.controller.js";
import { checkAdmin } from "../middlewares/auth.js";

export const productManagerRouter = Router();

const productController = new ProductController();

productManagerRouter.use(express.json());
productManagerRouter.use(express.urlencoded({ extended: true }));

productManagerRouter.get("/", productController.getProducts);

productManagerRouter.get("/:pid", productController.getProductById);

productManagerRouter.put("/:pid", checkAdmin, productController.updateProduct);

productManagerRouter.post("/", checkAdmin, productController.addProduct);

productManagerRouter.delete(
  "/:pid",
  checkAdmin,
  productController.deleteProduct
);
