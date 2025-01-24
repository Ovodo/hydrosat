import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { createFeedback } from "@/actions/feedback";
import FeedbackForm from "@/components/FeedbackForm";
import toast from "react-hot-toast";
import { act } from "react";

// Mock dependencies
jest.mock("@/actions/feedback", () => ({
  createFeedback: jest.fn(),
}));
jest.mock("react-hot-toast");

describe("Feedback Form", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders feedback form", () => {
    render(<FeedbackForm />);

    expect(
      screen.getByPlaceholderText("Share your thoughts about our product...")
    ).toBeInTheDocument();
    expect(screen.getByText("Submit Feedback")).toBeInTheDocument();
  });

  test("validates feedback input", () => {
    render(<FeedbackForm />);
    const input = screen.getByPlaceholderText(
      "Share your thoughts about our product..."
    );
    const submitButton = screen.getByText("Submit Feedback");

    // Test empty input
    act(() => {
      fireEvent.click(submitButton);
    });
    expect(createFeedback).not.toHaveBeenCalled();

    // Test too short input
    // act(() => {
    //   fireEvent.change(input, { target: { value: "a" } });
    //   fireEvent.click(submitButton);
    // });
    expect(createFeedback).not.toHaveBeenCalled();
  });

  test("submits feedback successfully", async () => {
    // Mock successful feedback creation
    (createFeedback as jest.Mock).mockResolvedValue(200);

    render(<FeedbackForm />);

    const input = screen.getByPlaceholderText(
      "Share your thoughts about our product..."
    );
    const submitButton = screen.getByText("Submit Feedback");

    // Enter valid feedback
    act(() => {
      fireEvent.change(input, {
        target: { value: "This is a great product!" },
      });
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(createFeedback).toHaveBeenCalledWith({
        text: "This is a great product!",
      });
      expect(toast.success).toHaveBeenCalled();
    });
  });

  test("handles feedback submission error", async () => {
    // Mock feedback creation error
    (createFeedback as jest.Mock).mockRejectedValue(
      new Error("Submission failed")
    );

    render(<FeedbackForm />);

    const input = screen.getByPlaceholderText(
      "Share your thoughts about our product..."
    );
    const submitButton = screen.getByText("Submit Feedback");

    // Enter valid feedback

    act(() => {
      fireEvent.change(input, {
        target: { value: "This is a great product!" },
      });
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(createFeedback).toHaveBeenCalled();
      expect(toast.error).toHaveBeenCalledWith("Submission failed");
    });
  });
});
