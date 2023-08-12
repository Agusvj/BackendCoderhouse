export class ProductService {
  constructor(dao) {
    this.dao = dao;
  }

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

  async addProduct(addedProduct) {
    try {
      const product = {
        name: addedProduct.name,
        description: addedProduct.description,
        price: addedProduct.price,
        stock: addedProduct.stock,
        thumbnails: addedProduct.thumbnails,
        status: true,
        code: addedProduct.code,
        category: addedProduct.category,
      };

      const newProduct = await this.dao.addProduct(product);

      return newProduct;
    } catch (error) {
      if (error.code === 11000) {
        console.log(error);
        throw new Error('El campo "code" ya existe en la base de datos.');
      } else {
        throw new Error(error);
      }
    }
  }

  async getProducts({ limit = 10, page, sort, query }) {
    try {
      const filter = {};

      if (query) {
        filter.category = query;
      }

      const options = {
        page: page || 1,
        limit: limit || 10,
        sort: sort ? { price: sort === "asc" ? 1 : -1 } : undefined,
      };

      const allProducts = this.dao.getProducts(filter, options);

      return allProducts;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getProductById(id) {
    try {
      const foundProduct = await this.dao.getProductById(id);

      return foundProduct;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateProduct(id, product) {
    try {
      if (product.code) {
        throw new Error("Code cant be modified");
      }

      let newProductFields = Object.keys(product);

      newProductFields.forEach((field) => {
        if (
          field === "name" ||
          field === "description" ||
          field === "price" ||
          field === "thumbnail" ||
          field === "code" ||
          field === "stock"
        ) {
          if (
            field === "name" ||
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
          throw new Error("Product field not valid");
        }
      });

      const productToUpdate = await this.dao.updateProduct(id, product);

      return productToUpdate;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteProduct(id) {
    try {
      const deletedProduct = await this.dao.deleteProduct(id);
      return deletedProduct;
    } catch (error) {
      throw new Error(error);
    }
  }
}
