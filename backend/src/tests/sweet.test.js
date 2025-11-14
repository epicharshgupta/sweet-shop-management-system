require("dotenv").config();
const request = require("supertest");
const app = require("../app");
const Sweet = require("../models/Sweet");
const User = require("../models/User");

jest.setTimeout(20000);

describe("Sweets API", () => {
  let token;

  beforeAll(async () => {
    await User.deleteMany({});
    await Sweet.deleteMany({});

    await request(app).post("/api/auth/register").send({
      name: "Sweet Tester",
      email: "sweet@test.com",
      password: "password123",
    });

    const loginRes = await request(app).post("/api/auth/login").send({
      email: "sweet@test.com",
      password: "password123",
    });

    token = loginRes.body.token;
  });

  beforeEach(async () => {
    await Sweet.deleteMany({});
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
    expect(res.body.name).toBe("Kaju Barfi");
  });

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
    expect(res.body.message).toBe("Sweet deleted successfully");
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
    expect(res.body.quantity).toBe(8);
  });

  it("should restock a sweet (admin only)", async () => {
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
});


it("should search sweets by name", async () => {
  await Sweet.create([
    { name: "Rasgulla", category: "Bengali", price: 50, quantity: 10 },
    { name: "Gulab Jamun", category: "Indian", price: 40, quantity: 12 }
  ]);

  const res = await request(app)
    .get("/api/sweets/search?name=ras")
    .set("Authorization", `Bearer ${token}`);

  expect(res.statusCode).toBe(200);
  expect(res.body.length).toBe(1);
  expect(res.body[0].name).toBe("Rasgulla");
});

it("should filter sweets by category", async () => {
  await Sweet.create([
    { name: "Rasgulla", category: "Bengali", price: 50, quantity: 10 },
    { name: "Ladoo", category: "Indian", price: 30, quantity: 15 }
  ]);

  const res = await request(app)
    .get("/api/sweets/search?category=Indian")
    .set("Authorization", `Bearer ${token}`);

  expect(res.statusCode).toBe(200);
  expect(res.body.length).toBe(1);
  expect(res.body[0].category).toBe("Indian");
});

it("should filter sweets by price range", async () => {
  await Sweet.create([
    { name: "Rasgulla", category: "Bengali", price: 50, quantity: 10 },
    { name: "Kaju Katli", category: "Indian", price: 100, quantity: 5 }
  ]);

  const res = await request(app)
    .get("/api/sweets/search?minPrice=40&maxPrice=80")
    .set("Authorization", `Bearer ${token}`);

  expect(res.statusCode).toBe(200);
  expect(res.body.length).toBe(1);
  expect(res.body[0].name).toBe("Rasgulla");
});
