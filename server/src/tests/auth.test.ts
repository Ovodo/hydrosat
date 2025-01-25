import request from "supertest";
import { createApp } from "../setup/backend.setup";
import { AppDataSource } from "../setup/datasource";
import { UserEntity } from "../entities";
import bcrypt from "bcryptjs";

describe("Authentication Endpoints", () => {
  const app = createApp();

  beforeAll(async () => {
    await AppDataSource.initialize();
  });

  afterAll(async () => {
    const userRepository = AppDataSource.getRepository(UserEntity);
    await userRepository.clear();
    await AppDataSource.destroy();
  });

  describe("POST /signup", () => {
    it("should create a new user", async () => {
      const response = await request(app).post("/api/auth/signup").send({
        name: "newuser",
        password: "validpassword",
        role: "user",
      });

      expect(response.status).toBe(201);
      expect(response.body.data).toHaveProperty("uuid");
      expect(response.body.data.name).toBe("newuser");
    });

    it("should reject signup with existing username", async () => {
      // First, create a user
      await request(app).post("/api/auth/signup").send({
        name: "existinguser",
        password: "password123",
        role: "user",
      });

      // Try to create same user again
      const response = await request(app).post("/api/auth/signup").send({
        name: "existinguser",
        password: "password123",
        role: "user",
      });

      expect(response.status).toBe(409);
    });

    it("should reject signup with invalid data", async () => {
      const response = await request(app).post("/api/auth/signup").send({
        name: "",
        password: "",
      });

      expect(response.status).toBe(400);
    });
  });

  describe("POST /signin", () => {
    beforeEach(async () => {
      const userRepository = AppDataSource.getRepository(UserEntity);
      const hashedPassword = await bcrypt.hash("testpassword", 10);

      const testUser = new UserEntity();
      testUser.name = "testuser";
      testUser.hashedPassword = hashedPassword;
      testUser.role = "user";
      await userRepository.save(testUser);
    });

    it("should signin existing user", async () => {
      const response = await request(app).post("/api/auth/signin").send({
        name: "testuser",
        password: "testpassword",
      });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("token");
      expect(response.body).toHaveProperty("name", "testuser");
    });

    it("should reject signin with incorrect password", async () => {
      const response = await request(app).post("/api/auth/signin").send({
        name: "testuser",
        password: "wrongpassword",
      });

      expect(response.status).toBe(401);
    });

    it("should reject signin for non-existent user", async () => {
      const response = await request(app).post("/api/auth/signin").send({
        name: "nonexistentuser",
        password: "somepassword",
      });

      expect(response.status).toBe(409);
    });
  });
});
