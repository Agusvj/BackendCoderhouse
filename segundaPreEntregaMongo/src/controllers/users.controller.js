import { userService } from "../services/index.js";

export class UserController {
  async getAllUsers(req, res) {
    try {
      const users = await userService.getAllUsers();
      res.send({ result: "success", payload: users });
    } catch (error) {
      res.send({ result: "cannot get users with mongoose" });
    }
  }

  async createUser(req, res) {
    try {
      let { first_name, last_name, email } = req.body;
      if (!first_name || !last_name || !email) {
        res.send({
          status: "error",
          error: "cannot create user with missing fields",
        });
      }

      let result = await userService.createUser({
        first_name,
        last_name,
        email,
      });

      res.send({ status: "success", payload: result });
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateUser(req, res) {
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
    let result = await userService.updateUser(uid, userToReplace);
    res.send({ status: "success", payload: result });
  }

  async deleteUser(req, res) {
    let { uid } = req.params;
    let result = await userService.deleteUser(uid);
    res.send({ status: "success", payload: result });
  }
}
