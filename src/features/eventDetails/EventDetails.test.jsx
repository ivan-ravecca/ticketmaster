import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import EventDetails from "./EventDetails";
import { useParams, useNavigate, BrowserRouter } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import TicketMasterContext from "../../state/TicketMasterContext";
import favEventsHelper from "../../services/favEventsHelper";
import {
  eventMockSimple,
  eventMockAddress,
} from "../../components/event/mocks/eventMock";

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useParams: vi.fn(),
    useNavigate: vi.fn(),
  };
});

vi.mock("react", async () => {
  const actualReact = await vi.importActual("react");
  return {
    ...actualReact,
    useContext: vi.fn().mockReturnValue([
      {
        searchedEvents: [{ id: 1, name: "Event 11" }],
        searchedTerm: "rock",
      },
      vi.fn().mockReturnValue("This is a mocked setContext"),
    ]),
  };
});

vi.mock("@tanstack/react-query", () => ({
  ...vi.importActual("@tanstack/react-query"),
  useQuery: vi.fn(),
  useQueryClient: vi.fn(),
}));

vi.mock("../../services/favEventsHelper");

describe("EventDetails component", () => {
  const renderWithProviders = (ui, { providerProps, ...renderOptions }) => {
    return render(
      <BrowserRouter>
        <TicketMasterContext.Provider value={[providerProps, vi.fn()]}>
          {ui}
        </TicketMasterContext.Provider>
      </BrowserRouter>,
      renderOptions,
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders error state", () => {
    useParams.mockReturnValue({ id: "1" });
    useQuery.mockReturnValue({
      data: null,
      isPending: false,
      isError: true,
    });

    const providerProps = {
      searchedEvents: [],
      searchedTerm: "",
    };
    renderWithProviders(<EventDetails />, { providerProps });
    expect(screen.getByText("Error:")).toBeInTheDocument();
  });

  it("renders 'No event details available'", () => {
    useParams.mockReturnValue({ id: "1" });
    useQuery.mockReturnValue({
      data: null,
      isPending: false,
      isError: false,
    });

    const providerProps = {
      searchedEvents: [],
      searchedTerm: "",
    };
    renderWithProviders(<EventDetails />, { providerProps });
    expect(screen.getByText("No event details available")).toBeInTheDocument();
  });

  it("renders loading state", () => {
    useParams.mockReturnValue({ id: "1" });
    useQuery.mockReturnValue({
      data: null,
      isPending: true,
      isError: false,
    });

    const providerProps = {
      searchedEvents: [],
      searchedTerm: "",
    };
    renderWithProviders(<EventDetails />, { providerProps });
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("renders the event details component with full data", () => {
    useParams.mockReturnValue({ id: "1" });
    useQuery.mockReturnValue({
      data: eventMockSimple,
      isPending: false,
      isError: false,
    });
    useNavigate.mockReturnValue(vi.fn());
    useQueryClient.mockReturnValue({
      invalidateQueries: vi.fn(),
    });

    const providerProps = {
      searchedEvents: [],
      searchedTerm: "",
    };
    renderWithProviders(<EventDetails />, { providerProps });

    // Expected texts to show
    expect(screen.getByText(eventMockSimple.name)).toBeInTheDocument();
    expect(screen.getByText(eventMockAddress.name)).toBeInTheDocument();
    expect(screen.getByText("Classification")).toBeInTheDocument();
    expect(screen.getByText("Event Dates")).toBeInTheDocument();
    expect(screen.getByText(eventMockSimple.info)).toBeInTheDocument();

    //Expected fav ico to show
    expect(screen.getByTitle("Update favorite")).toBeInTheDocument();
  });
});
