import { productsModel } from "./models/products.model.js";

export class ProductDao {
  constructor() {}

  async addProduct(product) {
    const newProduct = await productsModel.create(product);

    return newProduct;
  }

  async getProducts(filter, options) {
    const allProducts = await productsModel.paginate(filter, options);

    return allProducts;
  }

  async getProductById(id) {
    const foundProduct = await productsModel.findById(id);

    return foundProduct;
  }

  async updateProduct(id, product) {
    const updatedProduct = await productsModel.findByIdAndUpdate(id, product);

    return updatedProduct;
  }

  async deleteProduct(id) {
    const deletedProduct = await productsModel.findByIdAndDelete(id);

    return deletedProduct;
  }
}
