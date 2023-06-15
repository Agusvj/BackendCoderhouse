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

  getCartId(id) {
    return new Promise((resolve, reject) => {
      cartsModel
        .findById(id)
        .then((cart) => {
          resolve(cart);
        })
        .catch((error) => {
          reject(new Error("Cart not found"));
        });
    });
  }

  async addProductToCart(cId, pId) {
    try {
      const productToAdd = await productManagerMongo.getProductById(pId);

      if (!productToAdd) {
        throw new Error("Product not found");
      }

      let cart = await cartsModel.findOneAndUpdate(
        { _id: cId, "products.pId": productToAdd._id },
        {
          $inc: { "products.$.quantity": 1 },
        }
      );

      if (!cart) {
        cart = await cartsModel.findByIdAndUpdate(cId, {
          $push: { products: { pId: productToAdd._id, quantity: 1 } },
        });
      }
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
        { _id: cId, "products.pId": productToDelete._id },
        {
          $inc: { "products.$.quantity": -1 },
        }
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteAllProductsFromCart(cId) {
    try {
      await cartsModel.findByIdAndUpdate(cId, { products: [] });
    } catch (error) {
      throw new Error(error);
    }
  }
}
