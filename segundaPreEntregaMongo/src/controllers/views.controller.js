import { productService, userService } from "../services/index.js";
import { cartService } from "../services/index.js";

export class ViewsController {
  async getProducts(req, res, next) {
    try {
      const allProducts = await productService.getProducts(req.query);

      let sessionDataName = req.session.user.firstName;

      let sessionAuth = req.session.user.rol;

      res.status(200).render("products", {
        style: "../css/styles.css",
        p: allProducts.docs.map((product) => ({
          name: product.name,
          description: product.description,
          price: product.price,
          _id: product._id,
          sessionCart: req.session.user.cart,
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
          sessionCart: req.session.user.cart,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async getUsers(req, res, next) {
    try {
      const allUsers = await userService.getAllUsers();

      res.status(200).render("users", {
        u: allUsers.map((user) => ({
          firstName: user.firstName,
          lastName: user.lastName,
          rol: user.rol,
          id: user._id,
        })),
      });
    } catch (error) {
      next(error);
    }
  }

  async getProductById(req, res, next) {
    try {
      let pId = req.params.pid;
      const product = await productService.getProductById(pId);

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
    } catch (error) {
      next(error);
    }
  }

  async getCartById(req, res, next) {
    try {
      let cId = req.params.cid;
      const cart = await cartService.getCartId(cId);
      const totalPrice = cart.products.reduce(
        (acc, product) => acc + product.quantity * product.product.price,
        0
      );

      res.status(200).render("cartDetail", {
        style: "../css/styles.css",
        p: cart.products.map((product) => ({
          name: product.product.name,
          price: product.product.price,
          quantity: product.quantity,
        })),
        totalPrice,
        cart: req.session.user.cart,
      });
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      req.session.destroy((err) => {
        if (err) {
          return res.json({ status: "Logout error", body: err });
        }
        res.redirect("/login");
      });
    } catch (error) {
      next(error);
    }
  }

  async purchaseSuccess(req, res, next) {
    try {
      const ticket = req.query.ticket;

      return res.render("purchaseSuccess", { ticket });
    } catch (error) {
      next(error);
    }
  }
}
