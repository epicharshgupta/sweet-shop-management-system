require("dotenv").config();
const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const User = require("../models/User");

jest.setTimeout(20000);

describe("Auth API", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
  });

  // 💡 Clean DB before each test
  beforeEach(async () => {
    await User.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("should register a new user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Test User",
        email: "testuser@example.com",
        password: "password123",
      });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("token");
  });

  it("should login an existing user", async () => {
    // पहले एक user register करते हैं
    await request(app)
      .post("/api/auth/register")
      .send({
        name: "Test User",
        email: "testuser@example.com",
        password: "password123",
      });

    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "testuser@example.com",
        password: "password123",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });
});
