import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import SearchBar from "./SearchBar";

describe("SearchBar Component", () => {
  it("should render the SearchBar component", () => {
    render(<SearchBar onSearch={() => {}} />);
    const inputElement = screen.getByPlaceholderText("Search for events");
    expect(inputElement).toBeInTheDocument();
  });

  it("should call onSearch with the correct query after debounce", async () => {
    const mockOnSearch = vi.fn();
    render(<SearchBar onSearch={mockOnSearch} waitingTime={500} />);

    const inputElement = screen.getByPlaceholderText("Search for events");
    fireEvent.change(inputElement, { target: { value: "test query" } });

    // Wait for the debounce time
    await new Promise((r) => setTimeout(r, 600));

    expect(mockOnSearch).toHaveBeenCalledWith("test query");
  });

  it("should update the query state when input changes", () => {
    render(<SearchBar onSearch={() => {}} />);
    const inputElement = screen.getByPlaceholderText("Search for events");

    fireEvent.change(inputElement, { target: { value: "new query" } });
    expect(inputElement.value).toBe("new query");
  });

  it("should not call onSearch if the query is empty", async () => {
    const mockOnSearch = vi.fn();
    render(<SearchBar onSearch={mockOnSearch} waitingTime={500} />);

    const inputElement = screen.getByPlaceholderText("Search for events");
    fireEvent.change(inputElement, { target: { value: "" } });

    // Wait for the debounce time
    await new Promise((r) => setTimeout(r, 600));

    expect(mockOnSearch).not.toHaveBeenCalled();
  });

  it("should use the initial searchTerm if provided", () => {
    render(<SearchBar onSearch={() => {}} searchTerm="initial query" />);
    const inputElement = screen.getByPlaceholderText("Search for events");
    expect(inputElement.value).toBe("initial query");
  });
});
