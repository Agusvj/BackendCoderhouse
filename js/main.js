export class ProductManager {
  constructor() {
    this.products = [];
  }

  static id = 0;

  #isValid(val) {
    return val !== "" && val !== undefined && val !== null;
  }

  #isNumValid(val) {
    return parseInt(val) === Number(val);
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

  addProduct(title, description, price, thumbnail, code, stock) {
    if (
      this.#isValid(title) &&
      this.#isValid(description) &&
      this.#isNumValid(price) &&
      this.#isValid(thumbnail) &&
      this.#isValid(code) &&
      this.#isNumValid(stock)
    ) {
      if (this.#verifyCode(code)) {
        console.log("ERROR: Codigo repetido");
      } else {
        let product = {
          title: title,
          description: description,
          price: price,
          thumbnail: thumbnail,
          code: code,
          stock: stock,
          id: this.#generateId(),
        };

        this.products.push(product);
      }
    } else {
      console.log("error");
    }
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    let foundProduct = this.products.find((product) => product.id === id);

    if (foundProduct === undefined) {
      return "Not Found";
    } else {
      return foundProduct;
    }
  }
}
