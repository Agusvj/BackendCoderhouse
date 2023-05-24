const socket = io();

socket.on("products", (products) => {
  console.log(products);
  let divAllProducts = document.getElementById("allProducts");
  divAllProducts.innerHTML = "";

  products.forEach((element) => {
    divAllProducts.innerHTML += `<div style="width: 250px; padding: 15px; border: solid 3px; margin: 15px;">
    <p>${element.title}</p>
    <p>${element.description}</p>
    <p>${element.price}</p>
    </div>`;
  });
});

socket.emit("message", "hello from client");
