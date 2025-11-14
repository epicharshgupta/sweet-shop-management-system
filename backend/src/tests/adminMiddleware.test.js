require("dotenv").config();
const request = require("supertest");
const app = require("../app");
const User = require("../models/User");
const Sweet = require("../models/Sweet");

jest.setTimeout(20000);

describe("Admin Middleware", () => {

  beforeEach(async () => {
    await User.deleteMany({});
    await Sweet.deleteMany({});
  });

  it("should return 403 if normal user tries to restock", async () => {
    // normal user
    await request(app).post("/api/auth/register").send({
      name: "User",
      email: "user@test.com",
      password: "password123"
    });

    const userLogin = await request(app)
      .post("/api/auth/login")
      .send({ email: "user@test.com", password: "password123" });

    const userToken = userLogin.body.token;

    const sweet = await Sweet.create({
      name: "Ladoo",
      category: "Indian",
      price: 20,
      quantity: 5
    });

    const res = await request(app)
      .post(`/api/sweets/${sweet._id}/restock`)
      .set("Authorization", `Bearer ${userToken}`)
      .send({ quantity: 5 });

    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Admin access required");
  });

});
