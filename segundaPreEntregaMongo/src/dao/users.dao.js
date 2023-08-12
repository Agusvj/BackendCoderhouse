import { userModel } from "./models/users.model.js";

export class UsersDao {
  constructor() {}

  async getAllUsers() {
    const users = await userModel.find();
    return users;
  }

  async createUser(user) {
    const newUser = await userModel.create(user);
    return newUser;
  }

  async updateUser(id, userToReplace) {
    let updatedUser = await userModel.findByIdAndUpdate(
      { _id: id },
      userToReplace
    );
    return updatedUser;
  }

  async deleteUser(id) {
    let deletedUser = await userModel.findByIdAndDelete({ _id: id });
    return deletedUser;
  }
}
