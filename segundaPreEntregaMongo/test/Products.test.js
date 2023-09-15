import supertest from "supertest";
import chai from "chai";

const expect = chai.expect;
const requester = supertest("http://localhost:8080");

describe("Testing products", () => {
  describe("test de productos", () => {
    it("deberia retornar un arreglo de productos", async () => {
      const { statusCode, _body } = await requester.get("/api/products");
      expect(statusCode).to.equal(200);
      expect(_body.payload).to.be.an("array");
    });
  });
});
