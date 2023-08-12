import TicketModel from "./models/tickets.model.js";

export class Tickets {
  constructor() {}

  async get() {
    const users = await TicketModel.find();
    return users;
  }

  async getOne(id) {
    const user = await TicketModel.findById(id);
    return user;
  }

  async create(data) {
    const result = await TicketModel.create(data);
    return result;
  }
}
