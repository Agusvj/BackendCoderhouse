import express from "express";
import passport from "passport";

export const loginRouter = express.Router();

loginRouter.get("/session", (req, res) => {
  return res.send(JSON.stringify(req.session));
});

loginRouter.get("/register", (req, res) => {
  return res.render("register", {});
});

loginRouter.post(
  "/register",
  passport.authenticate("register", {
    failureRedirect: "api/sessions/failregister",
  }),
  (req, res) => {
    if (!req.user) {
      return res.json({ error: "something went wrong" });
    }
    req.session.user = {
      _id: req.user._id,
      email: req.user.email,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      isAdmin: req.user.isAdmin,
    };

    return res.redirect("/products");
  }
);

loginRouter.get("/failregister", (req, res) => {
  return res.send({ error: "Fail to register" });
});

loginRouter.get("/login", (req, res) => {
  return res.render("login", {});
});

loginRouter.post(
  "/login",
  passport.authenticate("login", {
    failureRedirect: "/api/sessions/faillogin",
  }),
  async (req, res) => {
    if (!req.user) {
      return res.json({ error: "invalid credentials" });
    }
    req.session.user = {
      _id: req.user._id,
      email: req.user.email,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      isAdmin: req.user.isAdmin,
    };
    return res.redirect("/products");
  }
);

loginRouter.get("/faillogin", (req, res) => {
  return res.send({ error: "Fail to login" });
});

loginRouter.get("logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    return res.redirect("/login");
  });
});

loginRouter.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);
loginRouter.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  (req, res) => {
    req.session.user = {
      _id: req.user._id,
      email: req.user.email,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      isAdmin: req.user.isAdmin,
    };
    // Successful authentication, redirect home.
    res.redirect("/products");
  }
);
