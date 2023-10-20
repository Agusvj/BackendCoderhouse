import { Router } from "express";

import { UserController } from "../controllers/users.controller.js";
import { checkAdmin } from "../middlewares/auth.js";

const userController = new UserController();

export const usersRouter = Router();

usersRouter.get("/", userController.getAllUsers);

usersRouter.post("/", userController.createUser);

usersRouter.delete("/", userController.deleteInactiveUsers);

usersRouter.put("/:uid", userController.updateUser);

usersRouter.delete("/:uid", userController.deleteUser);

usersRouter.put("/premium/:uid", checkAdmin, userController.toggleUserRole);
