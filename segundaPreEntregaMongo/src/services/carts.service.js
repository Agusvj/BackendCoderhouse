import { productService, ticketService } from "./index.js";

export class CartService {
  constructor(dao) {
    this.dao = dao;
  }

  async createCart() {
    try {
      const newCart = await this.dao.createCart();
      return newCart;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getCartId(id) {
    try {
      const cart = await this.dao.getCartId(id);

      return cart;
    } catch (error) {
      throw new Error("Cart not found");
    }
  }

  async addProductToCart(cId, pId) {
    try {
      const productToAdd = await productService.getProductById(pId);

      if (!productToAdd) {
        throw new Error("Product not found");
      }

      let cart = await this.dao.addProductToCart(cId, productToAdd);

      return cart;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteProductFromCart(cId, pId) {
    try {
      const productToDelete = await productService.getProductById(pId);

      if (!productToDelete) {
        throw new Error("Product not found");
      }

      let cart = await this.dao.deleteProductFromCart(cId, pId);

      return cart;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteProductFromCartComplete(cId, pId) {
    try {
      const productToDelete = await productService.getProductById(pId);

      if (!productToDelete) {
        throw new Error("Product not found");
      }

      let cart = await this.dao.deleteProductFromCartComplete(
        cId,
        productToDelete
      );

      return cart;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateQuantityProductFromCart(cId, pId, quantity) {
    try {
      const productToUpdate = await productService.getProductById(pId);

      if (!productToUpdate) {
        throw new Error("Product not found");
      }

      if (
        quantity.quantity < 0 ||
        quantity.quantity === 0 ||
        quantity.quantity === null ||
        quantity.quantity === undefined ||
        typeof quantity.quantity === "string"
      ) {
        throw new Error("Quantity must be a positive number");
      }

      let cart = await this.dao.updateQuantityProductFromCart(
        cId,
        productToUpdate,
        quantity
      );

      return cart + ` QUANTITY updated to ${quantity.quantity}`;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateCartArray(cId, productArray) {
    try {
      let newCartProducts = productArray.products.map((product) => {
        return {
          product: product._id,
          quantity: product.quantity,
        };
      });

      for (let i = 0; i < newCartProducts.length; i++) {
        if (
          newCartProducts[i].quantity < 0 ||
          newCartProducts[i].quantity === 0 ||
          newCartProducts[i].quantity === null ||
          newCartProducts[i].quantity === undefined ||
          typeof newCartProducts[i].quantity === "string"
        ) {
          newCartProducts[i].quantity = 1;
        }
      }

      let cart = await this.dao.findByIdAndUpdate(cId, newCartProducts);
      return cart;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteAllProductsFromCart(cId) {
    try {
      await this.dao.findByIdAndUpdate(cId, { products: [] });
      return "Cart empty";
    } catch (error) {
      throw new Error("Cart not found");
    }
  }

  async purchase(cid, user) {
    try {
      const cart = await this.dao.getCartId(cid);

      if (cart.products.length === 0) {
        throw new Error("Cart is empty");
      }

      const purchasedProducts = [];
      const notPurchasedProducts = [];

      for (const item of cart.products) {
        if (item.product.stock >= item.quantity) {
          await productService.updateProduct(item.product._id.toString(), {
            stock: item.product.stock - item.quantity,
          });
          purchasedProducts.push(item);
        } else {
          notPurchasedProducts.push(item);
        }
      }

      let ticket;
      if (purchasedProducts.length > 0) {
        const amount = purchasedProducts.reduce(
          (acc, item) => acc + item.product.price * item.quantity,
          0
        );

        ticket = await ticketService.createTicket({
          amount,
          code: " ",
          purchaser: user.email,
        });
      } else {
        throw new Error("Cart is empty");
      }

      if (notPurchasedProducts.length > 0) {
        await this.dao.updateCartProducts(
          cid,
          notPurchasedProducts.map((item) => ({
            id: item.product._id.toString(),
            quantity: item.quantity,
          }))
        );
      } else {
        await this.dao.findByIdAndUpdate(cid);
      }

      return {
        ticket,
        notPurchasedProducts: notPurchasedProducts.map((item) =>
          item._id.toString()
        ),
      };
    } catch (error) {
      throw new Error(error);
    } finally {
    }
  }
}
