export class UserService {
  constructor(dao) {
    this.dao = dao;
  }

  async getAllusers() {
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
}
