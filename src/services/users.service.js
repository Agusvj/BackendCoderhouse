export class UserService {
  constructor(dao) {
    this.dao = dao;
  }

  async getAllUsers() {
    const users = await this.dao.getAllUsers();
    return users;
  }

  async createUser(user) {
    const newUser = await this.dao.createUser(user);
    return newUser;
  }

  async updateUser(id, userToReplace) {
    const updatedUser = await this.dao.updateUser(id, userToReplace);
    return updatedUser;
  }

  async deleteUser(id) {
    const deletedUser = await this.dao.deleteUser(id);
    return deletedUser;
  }

  async deleteInactiveUsers() {
    try {
      const deletedUsers = await this.dao.deleteInactiveUsers();

      return deletedUsers;
    } catch (error) {
      throw new Error(error);
    }
  }

  async toggleUserRole(id) {
    try {
      const user = await this.dao.getOne(id);

      if (!user) {
        throw new Error("User not found");
      }

      if (user.rol === "premium") {
        user.rol = "user";
      } else if (user.rol === "user") {
        user.rol = "premium";
      } else {
        throw new Error("Can't change admin role");
      }

      await user.save();

      return user;
    } catch (error) {
      throw new Error(error);
    }
  }
}
