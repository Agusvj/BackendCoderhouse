import { productService } from "../services/index.js";
import { cartService } from "../services/index.js";

export class ViewsController {
  async getProducts(req, res) {
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
    } catch (error) {
      throw new Error(error);
    }
  }

  async getProductById(req, res) {
    try {
      let pId = req.params.pid;
      const product = await productService.getProductById(pId);

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
    } catch (error) {
      throw new Error(error);
    }
  }

  async getCartById(req, res) {
    let cId = req.params.cid;
    const cart = await cartService.getCartId(cId);
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
  }

  async logout(req, res) {
    req.session.destroy((err) => {
      if (err) {
        return res.json({ status: "Logout error", body: err });
      }
      res.redirect("/login");
    });
  }
}
