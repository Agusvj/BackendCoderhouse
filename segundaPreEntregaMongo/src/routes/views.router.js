import express from "express";
import { Router } from "express";
import { ViewsController } from "../controllers/views.controller.js";
import { productsModel } from "../dao/models/products.model.js";
import { checkAdmin, checkUser } from "../middlewares/auth.js";

const viewsController = new ViewsController();

export const viewsRouter = Router();

viewsRouter.use(express.json());
viewsRouter.use(express.urlencoded({ extended: true }));

viewsRouter.get("/", async (req, res) => {
  res.render("login");
});

viewsRouter.get("/products", viewsController.getProducts);

viewsRouter.get("/productDetail/:pid", viewsController.getProductById);

viewsRouter.get("/carts/:cid", viewsController.getCartById);

viewsRouter.get("/realtimeproducts", async (req, res) => {
  res.render("realTimeProducts", {});
});

viewsRouter.get("/chat", async (req, res) => {
  res.render("chat", {});
});

viewsRouter.get("/login", async (req, res) => {
  res.render("login");
});

viewsRouter.get("/logout", viewsController.logout);

viewsRouter.get("/register", async (req, res) => {
  res.render("register");
});

viewsRouter.get("/profile", checkUser, async (req, res) => {
  res.render("profile");
});
