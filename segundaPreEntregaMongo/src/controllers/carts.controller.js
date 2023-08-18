import { cartService } from "../services/index.js";
import { productService } from "../services/index.js";

export class CartController {
  async createCart(req, res, next) {
    try {
      const userCart = await cartService.createCart();
      res.status(201).send({ status: "success", data: userCart });
    } catch (error) {
      next(error);
    }
  }

  async getCartId(req, res, next) {
    try {
      let cid = req.params.cid;
      const cartId = await cartService.getCartId(cid);
      res.status(200).send({ status: "success", data: cartId });
    } catch (error) {
      next(error);
    }
  }

  async addProductToCart(req, res, next) {
    try {
      let cid = req.params.cid;
      let pid = req.params.pid;
      const cartId = await cartService.addProductToCart(cid, pid);
      res
        .status(200)
        .send({ status: "success", data: "product added: " + cartId });
    } catch (error) {
      next(error);
    }
  }

  async deleteProductFromCart(req, res, next) {
    try {
      let cid = req.params.cid;
      let pid = req.params.pid;
      const cartId = await cartService.deleteProductFromCart(cid, pid);

      res
        .status(200)
        .send({ status: "success", data: `Product ${pid} removed 1 quantity` });
    } catch (error) {
      next(error);
    }
  }

  async deleteProductFromCartComplete(req, res, next) {
    try {
      let cid = req.params.cid;
      let pid = req.params.pid;
      const cartId = await cartService.deleteProductFromCartComplete(cid, pid);

      res
        .status(200)
        .send({ status: "success", data: `Product ${pid} removed` });
    } catch (error) {
      next(error);
    }
  }

  async updateQuantityProductFromCart(req, res, next) {
    try {
      let cid = req.params.cid;
      let pid = req.params.pid;
      let body = req.body;
      const cartId = await cartService.updateQuantityProductFromCart(
        cid,
        pid,
        body
      );
      res.status(200).send({ status: "success", data: cartId });
    } catch (error) {
      next(error);
    }
  }

  async updateCartArray(req, res, next) {
    try {
      let cid = req.params.cid;
      let body = req.body;
      const cartId = await cartService.updateCartArray(cid, body);
      res.status(200).send({ status: "success", data: cartId });
    } catch (error) {
      next(error);
    }
  }

  async deleteAllProductsFromCart(req, res, next) {
    try {
      const cartId = await cartService.deleteAllProductsFromCart(
        req.params.cid
      );
      res.status(200).send({ status: "success", data: cartId });
    } catch (error) {
      next(error);
    }
  }

  async purchase(req, res, next) {
    try {
      const result = await cartService.purchase(
        req.params.cid,
        req.session.user
      );

      return res.status(201).json({
        status: "success",
        msg: "Purchase completed",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
