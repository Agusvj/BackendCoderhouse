import { ProductDao } from "../dao/products.dao.js";
import { ProductService } from "./product.service.js";
import { CartsDao } from "../dao/carts.dao.js";
import { CartService } from "./carts.service.js";
import { UsersDao } from "../dao/users.dao.js";
import { UserService } from "./users.service.js";
import { TicketService } from "./tickets.service.js";
import { Tickets } from "../dao/tickets.dao.js";

export const productService = new ProductService(new ProductDao());

export const cartService = new CartService(new CartsDao());

export const userService = new UserService(new UsersDao());

export const ticketService = new TicketService(new Tickets());
