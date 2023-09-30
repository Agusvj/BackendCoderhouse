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

  async toggleUserRole(id) {
    try {
      const user = await this.dao.getOne(id);

      if (!user) {
        throw new NotFoundError("User not found");
      }

      if (user.role === "premium") {
        user.role = "user";
      } else if (user.role === "user") {
        const neededDocuments = [
          "identification",
          "residence",
          "account_state",
        ];

        const userDocuments = user.documents.map(
          (document) => document.name.split(".")[0]
        );

        let equals = false;
        if (userDocuments.length > 0) {
          equals = neededDocuments.every((document) =>
            userDocuments.includes(document)
          );
        }

        if (!equals) {
          throw new BadRequestError("User doesn't have necessary files");
        }

        user.role = "premium";
      } else {
        throw new BadRequestError("Can't change admin role");
      }

      await user.save();

      return user;
    } catch (error) {
      throw new ServerError(error);
    }
  }
}
