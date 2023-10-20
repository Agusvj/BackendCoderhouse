import CustomError from "./errors/CustomError.js";
import { generateProductErrorInfo } from "./errors/info.js";
import EErrors from "./errors/enums.js";

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
      CustomError.createError({
        name: "Invalid field",
        cause: generateProductErrorInfo(product),
        message: `Error: Field ${key} is invalid`,
        code: EErrors.INVALID_PARAM,
      });
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
      CustomError.createError({
        name: "Invalid field",
        cause: generateProductErrorInfo(product),
        message: `Error: Field ${key} is invalid`,
        code: EErrors.INVALID_PARAM,
      });
    } else {
      return true;
    }
  }

  async addProduct(addedProduct) {
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

    try {
      const newProduct = await this.dao.addProduct(product);

      return newProduct;
    } catch (error) {
      if (error.code === 11000) {
        CustomError.createError({
          name: "Invalid field",
          cause: generateProductErrorInfo(product),
          message: `Error: Field code is repeated`,
          code: EErrors.INVALID_PARAM,
        });
      } else {
        CustomError.createError({
          name: "Invalid field",
          cause: generateProductErrorInfo(product),
          message: `Error: product is invalid`,
          code: EErrors.INVALID_PARAM,
        });
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
      CustomError.createError({
        name: "Database error",
        cause: "Problemas en la base de datos, intente mas tarde",
        message: `Error al traer los productos, ${error}`,
        code: EErrors.DATABASE_ERROR,
      });
    }
  }

  async getProductById(id) {
    try {
      const foundProduct = await this.dao.getProductById(id);

      return foundProduct;
    } catch (error) {
      CustomError.createError({
        name: "Database error",
        cause: "Product not found",
        message: `Error al traer el producto, ${id}`,
        code: EErrors.NOT_FOUND,
      });
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
          CustomError.createError({
            name: "Invalid field",
            cause: generateProductErrorInfo(product),
            message: `Error: products fields invalid`,
            code: EErrors.INVALID_PARAM,
          });
        }
      });

      const productToUpdate = await this.dao.updateProduct(id, product);

      return productToUpdate;
    } catch (error) {
      CustomError.createError({
        name: "Invalid field",
        cause: generateProductErrorInfo(product),
        message: `Error: products fields invalid`,
        code: EErrors.INVALID_PARAM,
      });
    }
  }

  async deleteProduct(id) {
    try {
      const deletedProduct = await this.dao.deleteProduct(id);
      return deletedProduct;
    } catch (error) {
      CustomError.createError({
        name: "Database error",
        cause: "Product not found",
        message: `Error al borrar el producto, ${id}`,
        code: EErrors.NOT_FOUND,
      });
    }
  }
}
