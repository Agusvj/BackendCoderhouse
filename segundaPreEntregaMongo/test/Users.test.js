import supertest from "supertest";
import chai from "chai";

const expect = chai.expect;
const requester = supertest("http://localhost:8080");

describe("Login and Current", () => {
  let cookieName;
  let cookieValue;
  const mockUser = {
    email: "asd@gmail.com",
    password: "asd",
  };

  it("Debe loggear un user y DEVOLVER UNA COOKIE", async () => {
    const result = await requester.post("/api/sessions/login").send({
      email: mockUser.email,
      password: mockUser.password,
    });

    const cookie = result.headers["set-cookie"][0];
    expect(cookie).to.be.ok;

    cookieName = cookie.split("=")[0];
    cookieValue = cookie.split("=")[1];

    expect(cookieName).to.be.ok.and.eql("connect.sid");
    expect(cookieValue).to.be.ok;
  });
});
