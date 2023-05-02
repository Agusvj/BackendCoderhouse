export class ProductManager {
  constructor() {
    this.products = [];
  }

  static id = 0;

  #validateStringField(key, product) {
    if (!product[key]) {
      throw new Error(`Error: Field ${key} is required`);
    } else if (
      product[key] === "" ||
      product[key] === undefined ||
      product[key] === null
    ) {
      throw new Error(`Error: Field ${key} is invalid`);
    } else {
      return true;
    }
  }

  #validateNumberField(key, product) {
    if (!product[key]) {
      throw new Error(`Error: Field ${key} is required`);
    } else if (
      product[key] === NaN ||
      product[key] === undefined ||
      product[key] === null ||
      product[key] < 0
    ) {
      throw new Error(`Error: Field ${key} is invalid`);
    } else {
      return true;
    }
  }

  #generateId() {
    ProductManager.id = ProductManager.id + 1;

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
    }
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    let foundProduct = this.products.find((product) => product.id === id);

    if (!foundProduct) {
      throw new Error("Product ID not found");
    } else {
      return foundProduct;
    }
  }
}
