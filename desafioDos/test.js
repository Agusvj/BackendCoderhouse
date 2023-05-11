import { ProductManager } from "./main.js";

const productManager = new ProductManager();

console.log(productManager.getProducts());

const addedProduct = {
  title: "Producto prueba",
  description: "Este es un producto prueba",
  price: 200,
  thumbnail: "Sin imagen",
  code: "abc123",
  stock: 25,
};

productManager.addProduct(addedProduct);

console.log(productManager.getProducts());

console.log(productManager.getProductById(1));

try {
  console.log(productManager.getProductById(4));
} catch (error) {
  console.log(error);
}

productManager.updateProduct(1, {
  title: "Producto modificado",
  description: "Este es un producto modificado",
  price: 15,
  code: "asdasdasd",
});

productManager.deleteProduct(1);

try {
  productManager.deleteProduct(5);
} catch (error) {
  console.log("Error, producto no encontrado");
}
