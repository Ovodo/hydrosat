import request from "supertest";
import { AppDataSource } from "../setup/datasource";
import { UserEntity, FeedbackEntity } from "../entities";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { createApp } from "../setup/backend.setup";

describe("Feedback Endpoints", () => {
  const app = createApp();
  let adminToken: string;
  let userToken: string;
  let adminUser: UserEntity;
  let regularUser: UserEntity;

  beforeAll(async () => {
    // Ensure database connection
    await AppDataSource.initialize();

    // Create test users
    const userRepository = AppDataSource.getRepository(UserEntity);

    // Create admin user
    adminUser = new UserEntity();
    adminUser.name = "admin_test";
    adminUser.hashedPassword = await bcrypt.hash("admin_password", 10);
    adminUser.role = "admin";
    await userRepository.save(adminUser);

    // Create regular user
    regularUser = new UserEntity();
    regularUser.name = "user_test";
    regularUser.hashedPassword = await bcrypt.hash("user_password", 10);
    regularUser.role = "user";
    await userRepository.save(regularUser);

    // Generate tokens
    adminToken = jwt.sign(
      { username: adminUser.name },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    userToken = jwt.sign(
      { username: regularUser.name },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
  });

  afterAll(async () => {
    // Clean up test data
    const userRepository = AppDataSource.getRepository(UserEntity);
    const feedbackRepository = AppDataSource.getRepository(FeedbackEntity);

    await feedbackRepository.clear();
    await userRepository.clear();

    await AppDataSource.destroy();
  });

  describe("POST /feedback", () => {
    it("should create feedback for authenticated user", async () => {
      const response = await request(app)
        .post("/api/feedback")
        .set("Authorization", `Bearer ${userToken}`)
        .send({ text: "Test feedback message" });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("uuid");
      expect(response.body.text).toBe("Test feedback message");
    });

    it("should reject feedback over 1000 characters", async () => {
      const longText = "a".repeat(1001);
      const response = await request(app)
        .post("/api/feedback")
        .set("Authorization", `Bearer ${userToken}`)
        .send({ text: longText });

      expect(response.status).toBe(400);
    });

    it("should reject feedback without authentication", async () => {
      const response = await request(app)
        .post("/api/feedback")
        .send({ text: "Test feedback message" });

      expect(response.status).toBe(401);
    });
  });

  describe("GET /feedback", () => {
    it("should allow admin to get all feedback", async () => {
      // First, create some feedback
      const feedbackRepository = AppDataSource.getRepository(FeedbackEntity);
      const feedback = new FeedbackEntity();
      feedback.text = "Test feedback";
      feedback.userUuid = regularUser.uuid;
      feedback.sentiment = "NEUTRAL";
      await feedbackRepository.save(feedback);

      const response = await request(app)
        .get("/api/feedback")
        .set("Authorization", `Bearer ${adminToken}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });

    it("should reject non-admin access to all feedback", async () => {
      const response = await request(app)
        .get("/api/feedback")
        .set("Authorization", `Bearer ${userToken}`);

      expect(response.status).toBe(403);
    });
  });
});
