import { render, screen, fireEvent } from "@testing-library/react";
import InputWithHeader from "@/components/InputWithHeader";

describe("InputWithHeader Component", () => {
  const mockSetValue = jest.fn();

  it("renders with correct title and placeholder", () => {
    render(
      <InputWithHeader
        title='Password'
        holder='Enter your password'
        width='w-full'
        setValue={mockSetValue}
        val=''
        password
      />
    );

    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter your password")
    ).toBeInTheDocument();
  });

  it("calls setValue when input changes", () => {
    render(
      <InputWithHeader
        title='Name'
        holder='Enter your name'
        width='w-full'
        setValue={mockSetValue}
        val=''
      />
    );

    const input = screen.getByPlaceholderText("Enter your name");
    fireEvent.change(input, { target: { value: "John Doe" } });

    expect(mockSetValue).toHaveBeenCalledWith("John Doe");
  });

  it("toggles password visibility when button is clicked", () => {
    render(
      <InputWithHeader
        title='Password'
        holder='Enter your password'
        width='w-full'
        setValue={mockSetValue}
        val='password123'
        password
      />
    );

    const input = screen.getByPlaceholderText("Enter your password");
    expect(input).toHaveAttribute("type", "password");

    const toggleButton = screen.getByRole("button", { name: /show/i });
    fireEvent.click(toggleButton);

    expect(input).toHaveAttribute("type", "text");

    fireEvent.click(toggleButton);
    expect(input).toHaveAttribute("type", "password");
  });

  it("renders required attribute when specified", () => {
    render(
      <InputWithHeader
        title='Email'
        holder='Enter your email'
        width='w-full'
        setValue={mockSetValue}
        val=''
        required
      />
    );

    const input = screen.getByPlaceholderText("Enter your email");
    expect(input).toBeRequired();
  });
});
