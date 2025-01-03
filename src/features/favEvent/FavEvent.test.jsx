import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import FavEvent from "./FavEvent";
import { useState } from "react";
import favEventsHelper from "../../services/favEventsHelper";
import { eventMockSimple } from "../../components/event/mocks/eventMock";

vi.mock("react", async () => {
  const actualReact = await vi.importActual("react");
  return {
    ...actualReact,
    useState: vi.fn(),
  };
});

vi.mock("../../services/favEventsHelper");

describe("FavEvent component", () => {
  const renderWithProviders = (ui, { providerProps, ...renderOptions }) => {
    return render(ui, renderOptions);
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the FavEvent component to add to favorites", () => {
    useState.mockReturnValue([false, vi.fn()]);
    renderWithProviders(<FavEvent event={eventMockSimple} />, {});
    expect(screen.getByTitle("Mark as favorite")).toBeInTheDocument();
  });

  it("renders the FavEvent component as added to favorites", () => {
    useState
      .mockReturnValueOnce(["", vi.fn()])
      .mockReturnValueOnce([true, vi.fn()])
      .mockReturnValueOnce([false, vi.fn()]);
    renderWithProviders(<FavEvent event={eventMockSimple} />, {});
    expect(screen.getByTitle("Update favorite")).toBeInTheDocument();
  });

  it("Show fav icon clicked and modal", () => {
    useState
      .mockReturnValueOnce(["", vi.fn()])
      .mockReturnValueOnce([false, vi.fn()])
      .mockReturnValueOnce([true, vi.fn()]);
    renderWithProviders(<FavEvent event={eventMockSimple} />, {});

    expect(screen.getAllByText("Notes").at(0)).toBeInTheDocument();
    expect(screen.getByText("Accept")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
  });
});
