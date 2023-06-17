import { cartsModel } from "../models/carts.model.js";
import { ProductManagerMongo } from "./productManagerMongo.js";

const productManagerMongo = new ProductManagerMongo();

export class CartManagerMongo {
  constructor() {}

  createCart() {
    return new Promise((resolve, reject) => {
      cartsModel
        .create({ products: [] })
        .then((cart) => {
          resolve(cart);
        })
        .catch((error) => {
          reject(new Error(error));
        });
    });
  }

  async getCartId(id) {
    try {
      const cart = await cartsModel.findById(id);

      return cart;
    } catch (error) {
      throw new Error("Cart not found");
    }
  }

  async addProductToCart(cId, pId) {
    try {
      const productToAdd = await productManagerMongo.getProductById(pId);

      if (!productToAdd) {
        throw new Error("Product not found");
      }

      console.log(productToAdd._id);

      let cart = await cartsModel.findOneAndUpdate(
        { _id: cId, "products.product": productToAdd._id },
        {
          $inc: { "products.$.quantity": 1 },
        }
      );

      if (!cart) {
        cart = await cartsModel.findByIdAndUpdate(cId, {
          $push: { products: { product: productToAdd._id, quantity: 1 } },
        });
      }

      return cart;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteProductFromCart(cId, pId) {
    try {
      const productToDelete = await productManagerMongo.getProductById(pId);

      if (!productToDelete) {
        throw new Error("Product not found");
      }

      let cart = await cartsModel.findOneAndUpdate(
        { _id: cId, "products.product": productToDelete._id },
        {
          $inc: { "products.$.quantity": -1 },
        }
      );

      let findIndexArray = cart.products.findIndex(
        (product) => product.product.toString() === pId
      );
      console.log(cart.products);
      console.log(findIndexArray);

      if (cart.products[findIndexArray].quantity <= 1) {
        await cartsModel.findByIdAndUpdate(cId, {
          $pull: { products: { product: productToDelete._id } },
        });
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteProductFromCartComplete(cId, pId) {
    try {
      const productToDelete = await productManagerMongo.getProductById(pId);

      if (!productToDelete) {
        throw new Error("Product not found");
      }

      let cart = await cartsModel.findOneAndUpdate(
        { _id: cId, "products.product": productToDelete._id },
        {
          $pull: { products: { product: productToDelete._id } },
        }
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateQuantityProductFromCart(cId, pId, quantity) {
    try {
      const productToUpdate = await productManagerMongo.getProductById(pId);

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

      let cart = await cartsModel.findOneAndUpdate(
        { _id: cId, "products.product": productToUpdate._id },
        {
          $set: { "products.$.quantity": quantity.quantity },
        }
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

      let cart = await cartsModel.findByIdAndUpdate(cId, {
        products: newCartProducts,
      });
      return cart;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteAllProductsFromCart(cId) {
    try {
      await cartsModel.findByIdAndUpdate(cId, { products: [] });
      return "Cart empty";
    } catch (error) {
      throw new Error("Cart not found");
    }
  }
}
