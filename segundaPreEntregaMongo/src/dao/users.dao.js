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

  async getOne(id) {
    const user = await userModel.findById(id);
    return user;
  }

  async deleteUser(id) {
    let deletedUser = await userModel.findByIdAndDelete({ _id: id });
    return deletedUser;
  }

  async deleteInactiveUsers() {
    const today = new Date();
    const daysOfInactivity = 2;
    const twoDaysBefore = today.setDate(today.getDate() - daysOfInactivity);

    const deletedUsers = await userModel.deleteMany({
      last_connection: { $lte: twoDaysBefore },
    });

    return deletedUsers;
  }
}
