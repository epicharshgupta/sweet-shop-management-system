require("dotenv").config();
const request = require("supertest");
const app = require("../app");

jest.setTimeout(20000);

describe("Auth Middleware", () => {

  it("should return 401 if no token is provided", async () => {
    const res = await request(app)
      .get("/api/sweets") // protected route
      .send();

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe("No token provided");
  });

  it("should return 401 if invalid token is provided", async () => {
    const res = await request(app)
      .get("/api/sweets")
      .set("Authorization", "Bearer invalidtoken123");

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe("Invalid or expired token");
  });

});
