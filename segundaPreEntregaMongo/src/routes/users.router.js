import { Router } from "express";

import { UserController } from "../controllers/users.controller.js";
import { checkAdmin } from "../middlewares/auth.js";

const userController = new UserController();

export const usersRouter = Router();

usersRouter.use(express.json());
usersRouter.use(express.urlencoded({ extended: true }));

usersRouter.get("/", userController.getAllUsers);

usersRouter.post("/", userController.createUser);

usersRouter.put("/:uid", userController.updateUser);

usersRouter.delete("/:uid", userController.deleteUser);

usersRouter.put("/premium/:uid", checkAdmin, userController.toggleUserRole);
