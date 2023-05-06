import { ProductManager } from "./main.js";

const productManager = new ProductManager();

console.log(productManager.getProducts());

const addedProduct = {
  title: "Producto Prueba",
  description: "Este es un producto prueba",
  price: 200,
  thumbnail: "Sin imagen",
  code: "abc123",
  stock: 25,
};

productManager.addProduct(addedProduct);

try {
  productManager.addProduct(addedProduct);
} catch (error) {
  console.log(error);
}

console.log(productManager.getProducts());

console.log(productManager.getProductById(1));

try {
  console.log(productManager.getProductById(4));
} catch (error) {
  console.log(error);
}
