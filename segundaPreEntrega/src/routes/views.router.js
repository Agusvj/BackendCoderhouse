import express from "express";
import { Router } from "express";
import { ProductManager } from "../productManager.js";

const productManager = new ProductManager();

export const viewsRouter = Router();

viewsRouter.use(express.json());
viewsRouter.use(express.urlencoded({ extended: true }));

viewsRouter.get("/", async (req, res) => {
  let allProducts = await productManager.getProducts();
  res.render("home", { allProducts });
});

viewsRouter.get("/realtimeproducts", async (req, res) => {
  res.render("realTimeProducts", {});
});
