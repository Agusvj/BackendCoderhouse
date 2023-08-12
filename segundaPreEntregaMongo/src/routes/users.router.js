import { Router } from "express";

import { UserController } from "../controllers/users.controller";

const userController = new UserController();

export const usersRouter = Router();

usersRouter.use(express.json());
usersRouter.use(express.urlencoded({ extended: true }));

usersRouter.get("/", userController.getAllUsers);

usersRouter.post("/", userController.createUser);

usersRouter.put("/:uid", userController.updateUser);

usersRouter.delete("/:uid", userController.deleteUser);
