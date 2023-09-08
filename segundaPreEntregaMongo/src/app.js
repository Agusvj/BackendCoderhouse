import express from "express";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import { productManagerRouter } from "./routes/products.router.js";
// import { ProductManagerMongo } from "./dao/services/productManagerMongo.js";
// import { MsgModel } from "./dao/models/msgs.model.js";
import { cartsRouter } from "./routes/carts.router.js";
import { viewsRouter } from "./routes/views.router.js";
import { Server } from "socket.io";
import { connectMongo } from "./utils.js";
import { authRouter } from "./routes/auth.router.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import { initializePassport } from "./config/passport.config.js";
import passport from "passport";
import errorHandler from "./middlewares/error.js";
import { addLogger } from "./middlewares/logger.js";
import { sendEmailTransport } from "./utils.js";
import crypto from "crypto";
import { RecoverCodesSchema } from "./dao/models/recover-codes.js";
import { userModel } from "./dao/models/users.model.js";
import bcrypt from "bcrypt";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";

const app = express();
app.use(cookieParser());
app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://agusvj:7C2af80b2e53asd@cluster0.gjhmyvj.mongodb.net/ecommerce?retryWrites=true&w=majority",
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
    }),
    secret: "secretCoder",
    resave: true,
    saveUninitialized: true,
  })
);
const port = 8080;

connectMongo();

app.use(express.urlencoded({ extended: true }));

const swaggerOptions = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Ecommerce CoderHouse Backend",
      description: "Practica de backend de Ecommerce",
    },
  },
  apis: [`${__dirname}/docs/**/*.yaml`],
};

const specs = swaggerJsdoc(swaggerOptions);
app.use("/apidocs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

// const productManagerMongo = new ProductManagerMongo();

const httpServer = app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});

const socketServer = new Server(httpServer);

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public"));

app.use("/", viewsRouter);
app.use(addLogger);

// socketServer.on("connection", async (socket) => {
//   console.log("Nuevo cliente conectado");
//   const products = await productManagerMongo.getProducts();
//   socket.emit("products", products);
//   const msgs = await MsgModel.find({});
//   socketServer.sockets.emit("all_msgs", msgs);

//   socket.on("formSubmission", async (data) => {
//     await productManagerMongo.addProduct(data);
//     const products = await productManagerMongo.getProducts();
//     socketServer.sockets.emit("products", products);
//   });

//   socket.on("msg_front_to_back", async (msg) => {
//     const msgCreated = await MsgModel.create(msg);
//     const msgs = await MsgModel.find({});
//     socketServer.sockets.emit("all_msgs", msgs);
//   });
// });

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.get("/recover-form", async (req, res) => {
  res.render("recover-form");
});

app.post("/recover-form", async (req, res) => {
  const code = crypto.randomBytes(16).toString("hex");
  const { email } = req.body;
  const createRecoverCode = await RecoverCodesSchema.create({
    email,
    code,
    expire: Date.now() + 1 * 60 * 60 * 1000,
  });

  const result = await sendEmailTransport.sendMail({
    from: process.env.GOOGLE_EMAIL,
    to: email,
    subject: "Recuperar contraseña",
    html: `<a href="http://localhost:8080/recover-pass?code=${code}&email=${email}"> Tu codigo: ${code} </a>`,
  });

  res.send("Email sent, check your inbox");
});

app.get("/recover-pass", async (req, res) => {
  const { code, email } = req.query;
  const findRecoverCode = await RecoverCodesSchema.findOne({ email, code });
  if (Date.now() < findRecoverCode.expire) {
    res.render("recover-pass");
  } else {
    res.send("Codigo expirado");
  }
});

app.post("/recover-pass", async (req, res) => {
  const { code, email, password } = req.body;
  const findRecoverCode = await RecoverCodesSchema.findOne({ email, code });
  if (Date.now() < findRecoverCode.expire) {
    const findUser = await userModel.findOne({ email });
    if (findUser) {
      const newPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
      const updatedUser = await userModel.findOneAndUpdate({
        password: newPassword,
      });
      res.send("Password updated");
    }
  } else {
    res.send("Codigo expirado");
  }
});

app.use("/api/products", productManagerRouter);

app.use("/api/carts", cartsRouter);

app.use("/api/sessions", authRouter);

app.get("/mockingproducts", (req, res) => {
  const products = [];
  for (let i = 0; i < 100; i++) {
    products.push({
      _id: `6483de46fc7349e7c00e547${i}`,
      title: `Mock ${i}`,
      description: `Mock desc ${i}`,
      price: 100 * i,
      thumbnail: `/img${i}.png`,
      code: `abc${i}`,
      stock: 5,
      status: true,
      category: `Mock`,
      __v: 0,
    });
  }
  return res.status(200).json({
    status: "success",
    msg: "Products created",
    docs: products,
  });
});

app.get("/loggerTest", (req, res) => {
  req.logger.debug("debug alert!!");
  req.logger.http("http alert!!");
  req.logger.info("info alert!!");
  req.logger.warning("warning alert!!!");
  req.logger.error("error alert!!!");
  req.logger.fatal("fatal error!!");
  res.send({ message: "test logger" });
});

app.get("*", (req, res) => {
  return res.status(404).json({
    status: "error",
    msg: "Route not found",
    data: {},
  });
});

app.get("*", (req, res) => {
  res.status(404).send({ status: "error", data: "Page not found" });
});

app.use(errorHandler);
