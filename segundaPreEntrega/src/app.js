import express from "express";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import { ProductManager } from "./productManager.js";
import { productManagerRouter } from "./routes/products.router.js";
import { cartsRouter } from "./routes/carts.router.js";
import { viewsRouter } from "./routes/views.router.js";
import { Server } from "socket.io";
const app = express();
const port = 8080;
app.use(express.urlencoded({ extended: true }));
const productManager = new ProductManager();

const httpServer = app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});

const socketServer = new Server(httpServer);

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public"));

app.use("/", viewsRouter);

socketServer.on("connection", async (socket) => {
  console.log("Nuevo cliente conectado");
  const products = await productManager.getProducts();
  socket.emit("products", products);
});
app.use("/api/products", productManagerRouter);

app.use("/api/carts", cartsRouter);

app.get("*", (req, res) => {
  res.status(404).send({ status: "error", data: "Page not found" });
});
