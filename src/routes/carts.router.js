import { Router } from "express";
import express from "express";
import { CartController } from "../controllers/carts.controller.js";
import { checkOwner } from "../middlewares/auth.js";
import { purchaseController } from "../controllers/purchase.controller.js";

const cartController = new CartController();

export const cartsRouter = Router();

cartsRouter.use(express.json());
cartsRouter.use(express.urlencoded({ extended: true }));

cartsRouter.post("/", cartController.createCart);

cartsRouter.get("/:cid", cartController.getCartId);

cartsRouter.post(
  "/:cid/product/:pid",
  checkOwner,
  cartController.addProductToCart
);

cartsRouter.put(
  "/:cid/product/:pid",
  cartController.updateQuantityProductFromCart
);

cartsRouter.put("/:cid", cartController.updateCartArray);

cartsRouter.delete("/:cid", cartController.deleteAllProductsFromCart);

cartsRouter.delete(
  "/:cid/product/:pid/quantity",
  cartController.deleteProductFromCart
);

cartsRouter.delete(
  "/:cid/product/:pid",
  cartController.deleteProductFromCartComplete
);

cartsRouter.post("/:cid/purchase", cartController.purchase);
