export function checkUser(req, res, next) {
  if (req.session.user.email) {
    return next();
  }
  return res.redirect("/login");
}

export function checkAdmin(req, res, next) {
  console.log(req.session.user.email, req.session.user.rol);
  if (req.session.user.email && req.session.user.rol === "admin") {
    return next();
  }
  return res.status(401).send("Unauthorized");
}

export function checkOwner(req, res, next) {
  if (req.session.user && req.session.user.cart === req.params.cid) {
    return next();
  }
  return res.status(401).send("Not your cart");
}
