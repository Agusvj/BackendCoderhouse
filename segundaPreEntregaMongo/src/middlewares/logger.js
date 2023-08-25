import { logger } from "../utils.js";

export const addLogger = (req, res, next) => {
  req.logger = logger;
  req.logger.debug(
    `${req.method} en ${req.url} - ${new Date().toLocaleTimeString}`
  );
  next();
};
