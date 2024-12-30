import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Home from "./Home";
import TicketMasterContext from "/src/state/TicketMasterContext";

const { mockedUseState } = vi.hoisted(() => {
  return {
    mockedUseState: vi.fn().mockReturnValue("This is a mocked useState"),
  };
});

vi.mock("/src/services/searchEvents");
vi.mock("/src/components/searchBar/SearchBar", () => ({
  __esModule: true,
  default: vi.fn(() => <div>Mocked SearchBar</div>),
}));

vi.mock("/src/features/listingSearchedEvents/ListingSearchedEvents", () => ({
  __esModule: true,
  default: vi.fn(() => <div>Mocked ListingSearchedEvents</div>),
}));

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
    useState: mockedUseState,
  };
});

describe("Home", () => {
  const mockContextValue = {
    searchedEvents: [],
    searchedTerm: "",
  };

  it("renders the Home component", () => {
    render(
      <TicketMasterContext.Provider value={[mockContextValue, vi.fn()]}>
        <Home />
      </TicketMasterContext.Provider>,
    );

    expect(screen.getByText("Welcome to TicketMaster")).toBeInTheDocument();
    expect(screen.getByText("Search for awesome events")).toBeInTheDocument();
  });

  it("should call useState twice when searchEvents and searchTerms are in context", () => {
    render(<Home />);
    expect(mockedUseState).toHaveBeenCalled();
    expect(mockedUseState).toHaveBeenCalledWith([{ id: 1, name: "Event 11" }]);
    expect(mockedUseState).toHaveBeenCalledWith("rock");
  });
});
