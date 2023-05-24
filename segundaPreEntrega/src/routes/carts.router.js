import { Router } from "express";
import express from "express";
import { CartManager } from "../cartManager.js";

const cartManager = new CartManager();

export const cartsRouter = Router();

cartsRouter.use(express.json());
cartsRouter.use(express.urlencoded({ extended: true }));

cartsRouter.post("/", async (req, res) => {
  const userCart = await cartManager.createCart();

  res.status(201).send({ status: "success", data: userCart });
});

cartsRouter.get("/:cid", async (req, res) => {
  try {
    const cartId = await cartManager.getCartId(Number(req.params.cid));
    res.status(200).send({ status: "success", data: cartId });
  } catch (error) {
    res.status(404).send({ status: "error", error: error.message });
  }
});

cartsRouter.post("/:cid/product/:pid", async (req, res) => {
  try {
    const cartId = await cartManager.addProductToCart(
      Number(req.params.cid),
      Number(req.params.pid)
    );
    res.status(200).send({ status: "success", data: cartId });
  } catch (error) {
    res.status(404).send({ status: "error", error: error.message });
  }
});
