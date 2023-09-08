import express from "express";
import passport from "passport";

import { AuthController } from "../controllers/auth.controller.js";

const authController = new AuthController();

export const authRouter = express.Router();

authRouter.get("/session", authController.createSession);

authRouter.get("/current", authController.getCurrentUser);

authRouter.get("/register", (req, res) => {
  return res.render("register", {});
});

authRouter.post(
  "/register",
  passport.authenticate("register", {
    failureRedirect: "api/sessions/failregister",
  }),
  authController.register
);

authRouter.get("/failregister", (req, res) => {
  return res.send({ error: "Fail to register" });
});

authRouter.get("/login", (req, res) => {
  return res.render("login", {});
});

authRouter.post(
  "/login",
  passport.authenticate("login", {
    failureRedirect: "/api/sessions/faillogin",
  }),
  authController.loginUser
);

authRouter.get("/faillogin", (req, res) => {
  return res.send({ error: "Fail to login" });
});

authRouter.get("logout", authController.logout);

authRouter.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);
authRouter.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  (req, res) => {
    req.session.user = {
      _id: req.user._id,
      email: req.user.email,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      rol: req.user.rol,
    };

    res.redirect("/products");
  }
);
