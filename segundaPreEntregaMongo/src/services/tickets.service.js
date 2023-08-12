export class TicketService {
  constructor(dao) {
    this.dao = dao;
  }

  async getAllTickets() {
    const tickets = await this.dao.get({});
    return tickets;
  }

  async getTicketById(id) {
    try {
      const ticket = await this.dao.getOne({ _id: id });

      if (!ticket) {
        throw new Error("Ticket not found");
      }

      return ticket;
    } catch (error) {
      throw new Error(error);
    }
  }

  async createTicket(ticket) {
    try {
      const newTicket = await this.dao.create(ticket);

      return newTicket;
    } catch (error) {
      throw new Error(error);
    }
  }
}
