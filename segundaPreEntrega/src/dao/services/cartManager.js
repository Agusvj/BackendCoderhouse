import * as fs from "fs";

import { ProductManager } from "./productManager.js";

const productManager = new ProductManager();

export class CartManager {
  constructor() {
    if (!fs.existsSync("./segundaPreEntrega/carts.json")) {
      fs.writeFileSync("./segundaPreEntrega/carts.json", "[]", "utf-8");
    }
    this.carts = [];
    this.path = "./segundaPreEntrega/carts.json";
    this.carts = JSON.parse(fs.readFileSync(this.path, "utf-8"));
    if (this.carts.length > 0) {
      CartManager.id = this.carts[this.carts.length - 1].id;
    }
  }

  static id = 0;

  #generateId() {
    CartManager.id = JSON.parse(CartManager.id) + 1;

    return CartManager.id;
  }

  createCart() {
    return new Promise((resolve, reject) => {
      let newCart = {
        id: this.#generateId(),
        products: [],
      };

      this.carts.push(newCart);
      let cartsString = JSON.stringify(this.carts);
      fs.writeFileSync(this.path, cartsString);
      resolve(newCart);
    });
  }

  getCartId(id) {
    return new Promise((resolve, reject) => {
      let foundCart = this.carts.find((cart) => cart.id === id);

      if (!foundCart) {
        reject(new Error("Cart not found"));
      } else {
        resolve(foundCart.products);
      }
    });
  }

  addProductToCart(cId, pId) {
    return new Promise((resolve, reject) => {
      let foundCart = this.carts.find((cart) => cart.id === cId);

      if (!foundCart) {
        reject(new Error("Cart not found"));
      }

      let foundProduct = productManager.products.find(
        (product) => product.id === pId
      );

      if (!foundProduct) {
        reject(new Error("Product not found"));
      } else {
        let foundProductInCart = foundCart.products.find(
          (product) => product.id === pId
        );
        if (foundProductInCart) {
          foundProductInCart.quantity++;
          let cartsString = JSON.stringify(this.carts);
          fs.writeFileSync(this.path, cartsString);
          resolve(foundProductInCart);
        } else if (!foundProductInCart) {
          let productToCart = { id: foundProduct.id, quantity: 1 };
          foundCart.products.push(productToCart);
          let cartsString = JSON.stringify(this.carts);
          fs.writeFileSync(this.path, cartsString);
          resolve(productToCart);
        }
      }
    });
  }
}
