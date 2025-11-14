require("dotenv").config();
const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const User = require("../models/User");
const Sweet = require("../models/Sweet");

jest.setTimeout(20000);

describe("Sweets API", () => {
  let token;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);

    // Register user
    await request(app).post("/api/auth/register").send({
      name: "Sweet Tester",
      email: "sweet@test.com",
      password: "password123",
    });

    // Login user
    const loginRes = await request(app).post("/api/auth/login").send({
      email: "sweet@test.com",
      password: "password123",
    });

    token = loginRes.body.token;
  });

  beforeEach(async () => {
    await Sweet.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  // -----------------------------------------
  // CREATE SWEET TEST
  // -----------------------------------------
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

  // -----------------------------------------
  // GET ALL SWEETS TEST
  // -----------------------------------------
  it("should get all sweets", async () => {
    await Sweet.create({
      name: "Ladoo",
      category: "Indian",
      price: 30,
      quantity: 10,
    });

    const res = await request(app)
      .get("/api/sweets")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  // -----------------------------------------
  // UPDATE SWEET TEST
  // -----------------------------------------
  it("should update a sweet", async () => {
    const sweet = await Sweet.create({
      name: "Barfi",
      category: "Indian",
      price: 40,
      quantity: 15,
    });

    const res = await request(app)
      .put(`/api/sweets/${sweet._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Kaju Barfi",
        category: "Indian",
        price: 60,
        quantity: 20,
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("name", "Kaju Barfi");
  });

  // -----------------------------------------
  // DELETE SWEET TEST
  // -----------------------------------------
  it("should delete a sweet", async () => {
    const sweet = await Sweet.create({
      name: "Jalebi",
      category: "Indian",
      price: 30,
      quantity: 25,
    });

    const res = await request(app)
      .delete(`/api/sweets/${sweet._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "Sweet deleted successfully");
  });
});


it("should purchase a sweet and reduce quantity", async () => {
  const sweet = await Sweet.create({
    name: "Gulab Jamun",
    category: "Indian",
    price: 40,
    quantity: 10,
  });

  const res = await request(app)
    .post(`/api/sweets/${sweet._id}/purchase`)
    .set("Authorization", `Bearer ${token}`)
    .send({ quantity: 2 });

  expect(res.statusCode).toBe(200);
  expect(res.body.quantity).toBe(8); // 10 - 2 = 8
});


it("should restock a sweet (admin only)", async () => {
  // Create admin account
  await request(app).post("/api/auth/register").send({
    name: "Admin User",
    email: "admin@test.com",
    password: "password123",
    role: "admin",
  });

  const adminLogin = await request(app).post("/api/auth/login").send({
    email: "admin@test.com",
    password: "password123",
  });

  const adminToken = adminLogin.body.token;

  const sweet = await Sweet.create({
    name: "Soan Papdi",
    category: "Indian",
    price: 50,
    quantity: 10,
  });

  const res = await request(app)
    .post(`/api/sweets/${sweet._id}/restock`)
    .set("Authorization", `Bearer ${adminToken}`)
    .send({ quantity: 5 });

  expect(res.statusCode).toBe(200);
  expect(res.body.quantity).toBe(15);
});
