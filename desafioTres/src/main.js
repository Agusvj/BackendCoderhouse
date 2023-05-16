import * as fs from "fs";

export class ProductManager {
  constructor() {
    if (!fs.existsSync("./desafioTres/products.json")) {
      fs.writeFileSync("./desafioTres/products.json", "[]", "utf-8");
    }
    this.products = [];
    this.path = "./desafioTres/products.json";
    this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
    if (this.products.length > 0) {
      ProductManager.id = this.products[this.products.length - 1].id;
    }
  }

  static id = 0;

  #validateStringField(key, product) {
    if (!product[key]) {
      throw new Error(`Error: Field ${key} is required`);
    } else if (
      product[key] === "" ||
      product[key] === undefined ||
      product[key] === null ||
      typeof product[key] !== "string"
    ) {
      throw new Error(`Error: Field ${key} is invalid`);
    } else {
      return true;
    }
  }

  #validateNumberField(key, product) {
    if (product[key] === undefined) {
      throw new Error(`Error: Field ${key} is required`);
    } else if (
      product[key] === NaN ||
      product[key] === null ||
      product[key] < 0
    ) {
      throw new Error(`Error: Field ${key} is invalid`);
    } else {
      return true;
    }
  }

  #generateId() {
    ProductManager.id = JSON.parse(ProductManager.id) + 1;

    return ProductManager.id;
  }

  #verifyCode(code) {
    let verifyCode = this.products.some(
      (productCode) => productCode.code === code
    );
    return verifyCode;
  }

  addProduct(addedProduct) {
    this.#validateStringField("title", addedProduct);
    this.#validateStringField("description", addedProduct);
    this.#validateNumberField("price", addedProduct);
    this.#validateStringField("thumbnail", addedProduct);
    this.#validateStringField("code", addedProduct);
    this.#validateNumberField("stock", addedProduct);

    if (this.#verifyCode(addedProduct.code)) {
      throw new Error("CODE repeated");
    } else {
      let product = {
        title: addedProduct.title,
        description: addedProduct.description,
        price: addedProduct.price,
        thumbnail: addedProduct.thumbnail,
        code: addedProduct.code,
        stock: addedProduct.stock,
        id: this.#generateId(),
      };

      this.products.push(product);
      let productsString = JSON.stringify(this.products);
      fs.writeFileSync(this.path, productsString);
    }
  }

  getProducts() {
    let products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
    return products;
  }

  getProductById(id) {
    let foundProduct = this.products.find((product) => product.id === id);

    if (!foundProduct) {
      throw new Error("Product ID not found");
    } else {
      return foundProduct;
    }
  }

  updateProduct(id, product) {
    let newProductFields = Object.keys(product);

    newProductFields.forEach((field) => {
      if (
        field === "title" ||
        field === "description" ||
        field === "price" ||
        field === "thumbnail" ||
        field === "code" ||
        field === "stock"
      ) {
        if (
          field === "title" ||
          field === "description" ||
          field === "thumbnail" ||
          field === "code"
        ) {
          this.#validateStringField(field, product);
        }

        if (field === "price" || field === "stock") {
          this.#validateNumberField(field, product);
        }
      } else {
        throw new Error("Invalid field");
      }
    });

    let productIndex = this.products.findIndex((product) => product.id === id);

    if (productIndex === -1) {
      throw new Error("Product ID not found");
    } else {
      let oldProduct = this.products[productIndex];
      let newProduct = { ...oldProduct, ...product };
      this.products[productIndex] = newProduct;
      let productsString = JSON.stringify(this.products);
      fs.writeFileSync(this.path, productsString);
    }
  }

  deleteProduct(id) {
    let productIndex = this.products.findIndex((product) => product.id === id);

    if (productIndex === -1) {
      throw new Error("Product ID not found");
    } else {
      this.products.splice(productIndex, 1);
      let productsString = JSON.stringify(this.products);
      fs.writeFileSync(this.path, productsString);
    }
  }
}
