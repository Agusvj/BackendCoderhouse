import { Router } from "express";
import express from "express";
import { CartManagerMongo } from "../dao/services/cartsManagerMongo.js";

export const cartsRouter = Router();

const cartsManagerMongo = new CartManagerMongo();

cartsRouter.use(express.json());
cartsRouter.use(express.urlencoded({ extended: true }));

cartsRouter.post("/", async (req, res) => {
  try {
    const userCart = await cartsManagerMongo.createCart();
    res.status(201).send({ status: "success", data: userCart });
  } catch (error) {
    res.status(400).send({ status: "error", error: "Cart not created" });
  }
});

cartsRouter.get("/:cid", async (req, res) => {
  try {
    let cid = req.params.cid;
    const cartId = await cartsManagerMongo.getCartId(cid);
    res.status(200).send({ status: "success", data: cartId });
  } catch (error) {
    res.status(404).send({ status: "error", error: error.message });
  }
});

cartsRouter.post("/:cid/product/:pid", async (req, res) => {
  try {
    let cid = req.params.cid;
    let pid = req.params.pid;
    const cartId = await cartsManagerMongo.addProductToCart(cid, pid);

    res
      .status(200)
      .send({ status: "success", data: "product added: " + cartId });
  } catch (error) {
    res.status(404).send({ status: "error", error: error.message });
  }
});

cartsRouter.put("/:cid/product/:pid", async (req, res) => {
  try {
    let cid = req.params.cid;
    let pid = req.params.pid;
    let body = req.body;
    const cartId = await cartsManagerMongo.updateQuantityProductFromCart(
      cid,
      pid,
      body
    );
    res.status(200).send({ status: "success", data: cartId });
  } catch (error) {
    res.status(404).send({ status: "error", error: error.message });
  }
});

cartsRouter.put("/:cid", async (req, res) => {
  try {
    let cid = req.params.cid;
    let body = req.body;
    const cartId = await cartsManagerMongo.updateCartArray(cid, body);
    res.status(200).send({ status: "success", data: cartId });
  } catch (error) {
    res.status(404).send({ status: "error", error: error.message });
  }
});

cartsRouter.delete("/:cid", async (req, res) => {
  try {
    const cartId = await cartsManagerMongo.deleteAllProductsFromCart(
      req.params.cid
    );
    res.status(200).send({ status: "success", data: cartId });
  } catch (error) {
    res.status(404).send({ status: "error", error: error.message });
  }
});

cartsRouter.delete("/:cid/product/:pid/quantity", async (req, res) => {
  try {
    let cid = req.params.cid;
    let pid = req.params.pid;
    const cartId = await cartsManagerMongo.deleteProductFromCart(cid, pid);

    res
      .status(200)
      .send({ status: "success", data: `Product ${pid} removed 1 quantity` });
  } catch (error) {
    res.status(404).send({ status: "error", error: error.message });
  }
});

cartsRouter.delete("/:cid/product/:pid", async (req, res) => {
  try {
    let cid = req.params.cid;
    let pid = req.params.pid;
    const cartId = await cartsManagerMongo.deleteProductFromCartComplete(
      cid,
      pid
    );

    res.status(200).send({ status: "success", data: `Product ${pid} removed` });
  } catch (error) {
    res.status(404).send({ status: "error", error: error.message });
  }
});
