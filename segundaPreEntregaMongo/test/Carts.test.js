import supertest from "supertest";
import chai from "chai";
import { before } from "mocha";
import _ from "mongoose-paginate-v2";

const expect = chai.expect;
const requester = supertest("http://localhost:8080");

describe("Login y traer datos del cart", () => {
  let cookieName;
  let cookieValue;
  const mockUser = {
    email: "pop@gmail.com",
    password: "pop",
  };
  let currentUser;

  before(async () => {
    const result = await requester
      .post("/api/sessions/login")
      .send({ email: mockUser.email, password: mockUser.password });
    console.log("hola2");
    const cookie = result.headers["set-cookie"][0];
    cookieName = cookie.split("=")[0];
    cookieValue = cookie.split("=")[1];
    const { _body } = await requester
      .get("/api/sessions/current")
      .set("Cookie", [`${cookieName}=${cookieValue}`]);

    currentUser = _body.data;
  });

  console.log(currentUser);

  it("Deberia traer los datos del cart", async () => {
    const { statusCode, _body } = await requester.get(
      `/api/carts/${currentUser.cart}`
    );

    expect(statusCode).to.equal(200);
    expect(_body.data).to.be.an("array");
  });
});
