import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { signIn, signUp, signOut } from "@/actions/auth";

// Mock external dependencies
jest.mock("axios");
jest.mock("next/headers");
jest.mock("next/navigation");

describe("Auth Server Actions", () => {
  // Reset mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("signUp", () => {
    it("should successfully register a user", async () => {
      // Mock axios post response
      (axios.post as jest.Mock).mockResolvedValue({
        data: { ok: true, data: { id: "1", name: "testuser" } },
      });

      const result = await signUp({
        name: "testuser",
        password: "password123",
      });

      expect(axios.post).toHaveBeenCalledWith(
        "http://localhost:8000/api/auth/signup",
        { name: "testuser", password: "password123" }
      );
      expect(result).toEqual({ ok: true, data: { id: "1", name: "testuser" } });
    });

    it("should throw an error for signup failure", async () => {
      // Mock axios post error
      (axios.post as jest.Mock).mockResolvedValue({
        data: { ok: false, message: "Registration failed" },
      });

      expect(
        await signUp({
          name: "testuser",
          password: "password123",
        })
      ).toEqual({ ok: false, message: "Registration failed" });
    });
  });

  describe("signIn", () => {
    it("should successfully sign in and set cookies", async () => {
      // Mock axios and cookies
      const mockSet = jest.fn();
      (axios.post as jest.Mock).mockResolvedValue({
        data: {
          ok: true,
          token: "test-token",
          name: "testuser",
          isAdmin: false,
        },
      });
      (cookies as jest.Mock).mockReturnValue({
        set: mockSet,
      });

      const result = await signIn({
        name: "testuser",
        password: "password123",
      });

      expect(axios.post).toHaveBeenCalledWith(
        "http://localhost:8000/api/auth/signin",
        { name: "testuser", password: "password123" }
      );
      expect(mockSet).toHaveBeenCalledWith("jwt", "test-token");
      expect(mockSet).toHaveBeenCalledWith(
        "user",
        JSON.stringify({
          ok: true,
          name: "testuser",
          isAdmin: false,
        })
      );
      expect(result).toEqual({
        ok: true,
        name: "testuser",
        isAdmin: false,
      });
    });

    it("should throw an error for signin failure", async () => {
      // Mock axios post error
      (axios.post as jest.Mock).mockResolvedValue({
        data: { ok: false, message: "Invalid credentials" },
      });

      expect(
        await signIn({
          name: "testuser",
          password: "wrongpassword",
        })
      ).toEqual({ ok: false, message: "Invalid credentials" });
    });
  });

  describe("signOut", () => {
    it("should delete jwt cookie and redirect", async () => {
      // Mock cookies and redirect
      const mockDelete = jest.fn();
      (cookies as jest.Mock).mockReturnValue({
        delete: mockDelete,
      });

      await signOut();

      expect(mockDelete).toHaveBeenCalledWith("jwt");
      expect(redirect).toHaveBeenCalledWith("/auth/signin");
    });
  });
});
