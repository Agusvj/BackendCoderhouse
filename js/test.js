import { ProductManager } from "./main.js";

const productManager = new ProductManager();

console.log(productManager.getProducts());

productManager.addProduct(
  "Producto Prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc123",
  25
);

productManager.addProduct(
  "Producto Prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc123",
  25
);

console.log(productManager.getProducts());

console.log(productManager.getProductById(1));
console.log(productManager.getProductById(4));
