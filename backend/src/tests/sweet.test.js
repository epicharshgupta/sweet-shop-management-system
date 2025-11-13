require("dotenv").config();
const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const User = require("../models/User");
const Sweet = require("../models/Sweet");

jest.setTimeout(20000);

describe("Sweets API", () => {
  let token;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);

    // एक user register करें और login करें
    await request(app).post("/api/auth/register").send({
      name: "Sweet Tester",
      email: "sweet@test.com",
      password: "password123",
    });

    const res = await request(app).post("/api/auth/login").send({
      email: "sweet@test.com",
      password: "password123",
    });

    token = res.body.token;
  });

  beforeEach(async () => {
    await Sweet.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("should create a new sweet", async () => {
    const res = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Rasgulla",
        category: "Bengali",
        price: 50,
        quantity: 20,
      });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("name", "Rasgulla");
  });

  it("should get all sweets", async () => {
    const sweet = new Sweet({
      name: "Ladoo",
      category: "Indian",
      price: 30,
      quantity: 10,
    });
    await sweet.save();

    const res = await request(app)
      .get("/api/sweets")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
