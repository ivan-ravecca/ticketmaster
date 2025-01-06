import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import NotFound from "./NotFound";

describe("NotFound Component", () => {
  it("renders without crashing, and displays the correct text", () => {
    render(<NotFound />);
    expect(screen.getByText("Oops! Page Not Found")).toBeInTheDocument();
    expect(
      screen.getByText(
        "It looks like you've hit a page that doesn't exist. But don't worry, even the best of us get lost sometimes!",
      ),
    ).toBeInTheDocument();
  });

  it("renders the icon", () => {
    render(<NotFound />);
    expect(
      screen.getByTestId("SentimentVeryDissatisfiedIcon"),
    ).toBeInTheDocument();
  });

  it("renders the Go Back Home button", () => {
    render(<NotFound />);
    expect(screen.getByText("Go Back Home")).toBeInTheDocument();
  });
});
