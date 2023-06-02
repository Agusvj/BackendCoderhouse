const socket = io();

let form = document.getElementById("myForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let formData = new FormData(form);

  let title = formData.get("title");
  let description = formData.get("description");
  let price = formData.get("price");
  let thumbnails = formData.get("thumbnails");
  let code = formData.get("code");
  let stock = formData.get("stock");
  let category = formData.get("category");

  let product = {
    title: title,
    description: description,
    price: price,
    thumbnails: thumbnails,
    code: code,
    stock: stock,
    category: category,
  };

  socket.emit("formSubmission", product);
});

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
