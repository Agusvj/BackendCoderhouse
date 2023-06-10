import express from "express";
import { Router } from "express";
import { ProductManager } from "../dao/services/productManager.js";
import { ProductManagerMongo } from "../dao/services/productManagerMongo.js";
const productManager = new ProductManager();
const productManagerMongo = new ProductManagerMongo();

export const viewsRouter = Router();

viewsRouter.use(express.json());
viewsRouter.use(express.urlencoded({ extended: true }));

viewsRouter.get("/", async (req, res) => {
  let allProducts = await productManagerMongo.getProducts();
  let mapAllproducts = allProducts.map((product) => {
    return {
      name: product.name,
      description: product.description,
      price: product.price,
    };
  });
  res.render("home", { mapAllproducts });
});

viewsRouter.get("/realtimeproducts", async (req, res) => {
  res.render("realTimeProducts", {});
});

viewsRouter.get("/chat", async (req, res) => {
  res.render("chat", {});
});
