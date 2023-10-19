import { productService } from "../services/index.js";

export class ProductController {
  async getProducts(req, res, next) {
    try {
      const allProducts = await productService.getProducts(req.query);

      res.status(200).send({
        payload: allProducts.docs.map((product) => ({
          id: product._id.toString(),
          name: product.name,
          description: product.description,
          price: product.price,
          stock: product.stock,
          thumbnails: product.thumbnails,
          status: product.status,
          code: product.code,
          category: product.category,
        })),
        totalPages: allProducts.totalPages,
        prevPage: allProducts.prevPage,
        nextPage: allProducts.nextPage,
        page: allProducts.page,
        hasPrevPage: allProducts.hasPrevPage,
        hasNextPage: allProducts.hasNextPage,
        // ...allProducts,
      });
    } catch (error) {
      next(error);
    }
  }

  async getProductById(req, res, next) {
    try {
      let pid = req.params.pid;
      const findProduct = await productService.getProductById(pid);
      res.status(200).send({ status: "success", data: findProduct });
    } catch (error) {
      next(error);
    }
  }

  async updateProduct(req, res, next) {
    let updateProductClient = req.body;
    let pid = req.params.pid;
    try {
      const updateProduct = await productService.updateProduct(
        pid,
        updateProductClient
      );
      res.status(200).send({ status: "success", data: updateProduct });
    } catch (error) {
      next(error);
    }
  }

  async addProduct(req, res, next) {
    let newProduct = req.body;
    try {
      const addProduct = await productService.addProduct(newProduct);
      res.status(201).send({ status: "success", data: addProduct });
    } catch (error) {
      next(error);
    }
  }

  async deleteProduct(req, res, next) {
    let pid = req.params.pid;

    try {
      const deleteProduct = await productService.deleteProduct(pid);
      res.status(200).send({
        status: "success",
        data: "El producto eliminado es:" + deleteProduct,
      });
    } catch (error) {
      next(error);
    }
  }
}
