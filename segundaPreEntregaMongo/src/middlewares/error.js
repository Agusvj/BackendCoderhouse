import EErrors from "../services/errors/enums.js";

export default (error, req, res, next) => {
  switch (error.code) {
    case EErrors.INVALID_PARAM:
      res.status(400).send({
        status: "error",
        error: error.name,
        cause: error.cause,
        info: error.message,
        code: error.code,
      });
      break;

    case EErrors.DATABASE_ERROR:
      res.status(500).send({
        status: "error",
        error: error.name,
        cause: error.cause,
        info: error.message,
        code: error.code,
      });
      break;

    case EErrors.NOT_FOUND:
      res.status(404).send({
        status: "error",
        error: error.name,
        cause: error.cause,
        info: error.message,
        code: error.code,
      });
      break;

    case EErrors.AUTH_ERROR:
      res.status(401).send({
        status: "error",
        error: error.name,
        cause: error.cause,
        info: error.message,
        code: error.code,
      });
      break;

    case EErrors.CART_ERROR:
      res.status(400).send({
        status: "error",
        error: error.name,
        cause: error.cause,
        info: error.message,
        code: error.code,
      });
      break;

    default:
      res.send({ status: "error", error: "Unhandled error" });
  }
};
