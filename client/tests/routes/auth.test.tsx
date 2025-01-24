// __tests__/auth.test.tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { signIn } from "@/actions/auth";
import SignInPage from "@/app/auth/signin/page";
import toast from "react-hot-toast";

// Mock dependencies
jest.mock("@/actions/auth", () => ({
  signIn: jest.fn(),
}));
jest.mock("react-hot-toast");
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe("SignIn Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders sign in form correctly", () => {
    render(<SignInPage />);

    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Password")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  test("disables submit button when form is incomplete", () => {
    render(<SignInPage />);
    const submitButton = screen.getByText("Login");

    expect(submitButton).toBeDisabled();
  });

  test("handles successful sign in", async () => {
    // Mock successful sign in
    (signIn as jest.Mock).mockResolvedValue({ username: "testuser" });

    render(<SignInPage />);

    // Fill out form
    const nameInput = screen.getByLabelText("Name");
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByText("Login");

    fireEvent.change(nameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith({
        name: "testuser",
        password: "password123",
      });
      expect(toast.success).toHaveBeenCalledWith("Sign-in Successful!");
    });
  });

  test("handles sign in error", async () => {
    // Mock sign in error
    (signIn as jest.Mock).mockRejectedValue(new Error("Invalid credentials"));

    render(<SignInPage />);

    // Fill out form
    const nameInput = screen.getByLabelText("Name");
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByText("Login");

    fireEvent.change(nameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "wrongpassword" } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Invalid credentials");
    });
  });
});
