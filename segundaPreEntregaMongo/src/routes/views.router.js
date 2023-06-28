import express from "express";
import { Router } from "express";
import { ProductManagerMongo } from "../dao/services/productManagerMongo.js";
import { CartManagerMongo } from "../dao/services/cartsManagerMongo.js";
import { productsModel } from "../dao/models/products.model.js";
import { checkAdmin, checkUser } from "../middlewares/auth.js";

const productManagerMongo = new ProductManagerMongo();
const cartManagerMongo = new CartManagerMongo();

export const viewsRouter = Router();

viewsRouter.use(express.json());
viewsRouter.use(express.urlencoded({ extended: true }));

viewsRouter.get("/", async (req, res) => {
  res.render("login");
});

viewsRouter.get("/products", async (req, res) => {
  const allProducts = await productManagerMongo.getProducts(req.query);

  let sessionDataName = req.session.first_name;
  let sessionAuth = req.session.admin;
  if (sessionAuth) {
    sessionAuth = "Admin";
  } else {
    sessionAuth = "User";
  }

  res.status(200).render("products", {
    style: "../css/styles.css",
    p: allProducts.docs.map((product) => ({
      name: product.name,
      description: product.description,
      price: product.price,
      _id: product._id,
    })),
    pagingCounter: allProducts.pagingCounter,
    page: allProducts.page,
    totalPages: allProducts.totalPages,
    hasPrevPage: allProducts.hasPrevPage,
    hasNextPage: allProducts.hasNextPage,
    prevPage: allProducts.prevPage,
    nextPage: allProducts.nextPage,
    session: {
      sessionAuth: sessionAuth,
      sessionDataName: sessionDataName,
    },
  });
});

viewsRouter.get("/productDetail/:pid", async (req, res) => {
  let pId = req.params.pid;
  const product = await productManagerMongo.getProductById(pId);

  console.log(product);

  res.status(200).render("productDetail", {
    style: "../css/styles.css",
    p: {
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      stock: product.stock,
    },
  });
});

viewsRouter.get("/carts/:cid", async (req, res) => {
  let cId = req.params.cid;
  const cart = await cartManagerMongo.getCartId(cId);
  const totalPrice = cart.products.reduce(
    (acc, product) => acc + product.quantity * product.product.price,
    0
  );

  res.status(200).render("cartDetail", {
    style: "styles.css",
    p: cart.products.map((product) => ({
      name: product.product.name,
      price: product.product.price,
      quantity: product.quantity,
    })),
    totalPrice,
  });
});

viewsRouter.get("/realtimeproducts", async (req, res) => {
  res.render("realTimeProducts", {});
});

viewsRouter.get("/chat", async (req, res) => {
  res.render("chat", {});
});

viewsRouter.get("/login", async (req, res) => {
  res.render("login");
});

viewsRouter.get("/logout", async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.json({ status: "Logout error", body: err });
    }
    res.redirect("/login");
  });
});

viewsRouter.get("/register", async (req, res) => {
  res.render("register");
});

viewsRouter.get("/profile", checkUser, async (req, res) => {
  res.render("profile");
});
