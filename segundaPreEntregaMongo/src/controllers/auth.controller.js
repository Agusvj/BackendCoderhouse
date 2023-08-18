import { userDto } from "../dao/dto/user.dto.js";

export class AuthController {
  async createSession(req, res, next) {
    return res.send(JSON.stringify(req.session));
  }

  async register(req, res, next) {
    if (!req.user) {
      return res.json({ error: "something went wrong" });
    }
    req.session.user = {
      _id: req.user._id,
      email: req.user.email,
      age: req.user.age,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      rol: req.user.rol,
      cart: req.user.cart,
    };

    return res.redirect("/products");
  }

  async loginUser(req, res, next) {
    if (!req.user) {
      return res.json({ error: "invalid credentials" });
    }
    req.session.user = {
      _id: req.user._id,
      email: req.user.email,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      rol: req.user.rol,
      cart: req.user.cart,
    };
    return res.redirect("/products");
  }

  async logout(req, res, next) {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      return res.redirect("/login");
    });
  }

  async getCurrentUser(req, res, next) {
    if (!req.session.user) {
      return res.json({ error: "invalid credentials" });
    }
    const user = userDto(req.session.user);
    return res.json(user);
  }
}
