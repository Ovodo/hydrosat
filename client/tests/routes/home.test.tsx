import { render, screen } from "@testing-library/react";
import Home from "@/app/page";
import { decrypt } from "@/lib/session";
import { getFeedbacks } from "@/actions/feedback";

// Mock dependencies
jest.mock("@/lib/session", () => ({
  decrypt: jest.fn(),
}));
jest.mock("@/actions/feedback", () => ({
  getFeedbacks: jest.fn(),
}));

describe("Home Page", () => {
  test("renders welcome message for non-admin user", async () => {
    // Mock user data
    (decrypt as jest.Mock).mockResolvedValue(
      JSON.stringify({
        name: "testuser",
        isAdmin: false,
      })
    );

    render(await Home());

    expect(screen.getByText(/Welcome back testuser/)).toBeInTheDocument();
    expect(screen.getByText("Product Feedback")).toBeInTheDocument();
  });

  test("renders admin feedbacks for admin user", async () => {
    // Mock admin user and feedback data
    (decrypt as jest.Mock).mockResolvedValue(
      JSON.stringify({
        name: "admin",
        isAdmin: true,
      })
    );

    const mockFeedbacks = [
      {
        id: 1,
        text: "Great product",
        sentiment: "POSITIVE",
        score: 4,
        user: {
          name: "ovd",
        },
      },
      {
        id: 2,
        text: "Could be improved",
        sentiment: "NEUTRAL",
        score: 0,
        user: {
          name: "ovd",
        },
      },
    ];

    (getFeedbacks as jest.Mock).mockResolvedValue(mockFeedbacks);

    render(await Home());

    expect(screen.getByText(/Welcome back admin/)).toBeInTheDocument();
    expect(getFeedbacks).toHaveBeenCalled();
  });
});
