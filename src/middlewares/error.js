import EErrors from "../services/errors/enums.js";

export default (error, req, res, next) => {
  let logMessage = "Error"; // Default log message

  switch (error.code) {
    case EErrors.INVALID_PARAM:
      logMessage = "error";
      res.status(400);
      break;

    case EErrors.DATABASE_ERROR:
      logMessage = "fatal";
      res.status(500);
      break;

    case EErrors.NOT_FOUND:
      logMessage = "error";
      res.status(404);
      break;

    case EErrors.AUTH_ERROR:
      res.status(401);
      break;

    case EErrors.CART_ERROR:
      logMessage = "warning";
      res.status(400);
      break;

    default:
      console.error(error); // Log the error for debugging purposes
      res.status(500);
  }

  // Log the message without involving the response object
  req.logger.log(logMessage, { error: error.name, cause: error.cause });

  // Build the response object
  res.send({
    status: "error",
    error: error.name,
    cause: error.cause,
    info: error.message,
    code: error.code,
  });
};
