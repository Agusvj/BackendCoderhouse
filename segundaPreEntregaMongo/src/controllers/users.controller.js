import { userService } from "../services/index.js";
import { userDto } from "../dao/dto/user.dto.js";

export class UserController {
  async getAllUsers(req, res, next) {
    try {
      let users = await userService.getAllUsers();
      users = users.map((user) => userDto(user));
      res.send({ result: "success", payload: users });
    } catch (error) {
      next(error);
    }
  }

  async createUser(req, res, next) {
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
      next(error);
    }
  }

  async updateUser(req, res, next) {
    try {
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
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req, res, next) {
    try {
      let { uid } = req.params;
      let result = await userService.deleteUser(uid);
      res.send({ status: "success", payload: result });
    } catch (error) {
      next(error);
    }
  }

  async deleteInactiveUsers(req, res, next) {
    try {
      const users = await userService.deleteInactiveUsers();

      return res.status(201).json({
        status: "success",
        msg: "Inactive users deleted successfully",
        payload: users,
      });
    } catch (error) {
      next(error);
    }
  }

  async toggleUserRole(req, res, next) {
    try {
      let { uid } = req.params;
      let result = await userService.toggleUserRole(uid);
      res.send({ status: "success", payload: result });
    } catch (error) {
      next(error);
    }
  }
}
