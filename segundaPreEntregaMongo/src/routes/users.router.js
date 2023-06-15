import { Router } from "express";

import { userModel } from "../dao/models/users.model";

export const usersRouter = Router();

usersRouter.use(express.json());
usersRouter.use(express.urlencoded({ extended: true }));

usersRouter.get("/", async (req, res) => {
  try {
    const users = await userModel.find();
    res.send({ result: "success", payload: users });
  } catch (error) {
    res.send({ result: "cannot get users with mongoose" });
  }
});

usersRouter.post("/", async (req, res) => {
  let { first_name, last_name, email } = req.body;
  if (!first_name || !last_name || !email) {
    res.send({
      status: "error",
      error: "cannot create user with missing fields",
    });
  }

  let result = await userModel.create({ first_name, last_name, email });

  res.send({ status: "success", payload: result });
});

usersRouter.put("/:uid", async (req, res) => {
  let { uid } = req.params;
  let userToReplace = req.body;
  if (
    !userToReplace.first_name ||
    !userToReplace.last_name ||
    !userToReplace.email
  ) {
    res.send({
      status: "error",
      error: "cannot update user with missing fields",
    });
  }
  let result = await userModel.updateOne({ _id: uid }, userToReplace);
  res.send({ status: "success", payload: result });
});

usersRouter.delete("/:uid", async (req, res) => {
  let { uid } = req.params;
  let result = await userModel.deleteOne({ _id: uid });
  res.send({ status: "success", payload: result });
});
