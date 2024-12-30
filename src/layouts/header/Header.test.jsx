import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "./Header";
import { describe, it, expect, vi } from "vitest";
import TicketMasterContext from "../../state/TicketMasterContext";

const renderWithRouterAndContext = (
  ui,
  { route = "/", contextValue = {} } = {},
) => {
  window.history.pushState({}, "Test page", route);

  return render(
    <MemoryRouter>
      <TicketMasterContext.Provider value={contextValue}>
        {ui}
      </TicketMasterContext.Provider>
    </MemoryRouter>,
  );
};

describe("Rendering", () => {
  it("should render the Header component", () => {
    renderWithRouterAndContext(<Header />);
    const homeElement = screen.getByText("Home");
    expect(homeElement).toBeInTheDocument();
    const myEventsElement = screen.getByText("My Events");
    expect(myEventsElement).toBeInTheDocument();
  });

  it("should display home as active", () => {
    const { container } = renderWithRouterAndContext(<Header />);
    const anchors = container.getElementsByTagName("a");
    expect(anchors[0].getAttribute("class")).toContain("active");
    expect(anchors[1].getAttribute("class")).not.toContain("active");
  });

  it("should display my events as active when on /my-events route", () => {
    const { container } = renderWithRouterAndContext(<Header />, {
      route: "/my-events",
    });
    const anchors = container.getElementsByTagName("a");
    expect(anchors[1].getAttribute("class")).not.toContain("active");
    expect(anchors[0].getAttribute("class")).toContain("active");
  });
});

describe("Behavior", () => {
  it("should handle click to go home", () => {
    const setTicketMasterContext = vi.fn();
    const contextValue = {
      ticketMasterContext: { searchedEvents: [], searchTerm: "" },
      setTicketMasterContext,
    };

    const { container } = renderWithRouterAndContext(<Header />, {
      contextValue,
    });
    const anchors = container.getElementsByTagName("a");
    fireEvent(
      anchors[0],
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      }),
    );

    expect(setTicketMasterContext).toHaveBeenCalledWith({
      searchedEvents: [],
      searchTerm: "",
    });
  });

  it("should not call setTicketMasterContext when clicking on My Events", () => {
    const setTicketMasterContext = vi.fn();
    const contextValue = {
      ticketMasterContext: { searchedEvents: [], searchTerm: "" },
      setTicketMasterContext,
    };

    const { container } = renderWithRouterAndContext(<Header />, {
      contextValue,
    });
    const anchors = container.getElementsByTagName("a");
    fireEvent(
      anchors[1],
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      }),
    );

    expect(setTicketMasterContext).not.toHaveBeenCalled();
  });
});
