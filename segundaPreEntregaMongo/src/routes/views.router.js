import express from "express";
import { Router } from "express";
import { ProductManagerMongo } from "../dao/services/productManagerMongo.js";
import { productsModel } from "../dao/models/products.model.js";

const productManagerMongo = new ProductManagerMongo();

export const viewsRouter = Router();

viewsRouter.use(express.json());
viewsRouter.use(express.urlencoded({ extended: true }));

viewsRouter.get("/", async (req, res) => {
  const allProducts = await productManagerMongo.getProducts(req.query);

  res.status(200).render("home", {
    p: allProducts.docs.map((product) => ({
      name: product.name,
      description: product.description,
      price: product.price,
    })),
    pagingCounter: allProducts.pagingCounter,
    page: allProducts.page,
    totalPages: allProducts.totalPages,
    hasPrevPage: allProducts.hasPrevPage,
    hasNextPage: allProducts.hasNextPage,
    prevPage: allProducts.prevPage,
    nextPage: allProducts.nextPage,

    // ...allProducts,
  });
});

viewsRouter.get("/realtimeproducts", async (req, res) => {
  res.render("realTimeProducts", {});
});

viewsRouter.get("/chat", async (req, res) => {
  res.render("chat", {});
});
