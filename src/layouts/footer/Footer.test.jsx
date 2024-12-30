import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import Footer from "./Footer";
import TicketMasterContext from "/src/state/TicketMasterContext";

describe("Footer component", () => {
  const mockContextValue = {
    ticketMasterContext: { searchedEvents: [], searchTerm: "" },
    setTicketMasterContext: vi.fn(),
  };

  it("renders the footer content", () => {
    render(
      <TicketMasterContext.Provider value={mockContextValue}>
        <BrowserRouter>
          <Footer />
        </BrowserRouter>
      </TicketMasterContext.Provider>,
    );

    expect(
      screen.getByText(/TicketMaster. All rights reserved./i),
    ).toBeInTheDocument();
  });

  it("renders the Home link", () => {
    render(
      <TicketMasterContext.Provider value={mockContextValue}>
        <BrowserRouter>
          <Footer />
        </BrowserRouter>
      </TicketMasterContext.Provider>,
    );

    expect(screen.getByText(/Home/i)).toBeInTheDocument();
  });

  it("renders the My Events link", () => {
    render(
      <TicketMasterContext.Provider value={mockContextValue}>
        <BrowserRouter>
          <Footer />
        </BrowserRouter>
      </TicketMasterContext.Provider>,
    );

    expect(screen.getByText(/My Events/i)).toBeInTheDocument();
  });

  it("calls setTicketMasterContext when Home link is clicked", () => {
    render(
      <TicketMasterContext.Provider value={mockContextValue}>
        <BrowserRouter>
          <Footer />
        </BrowserRouter>
      </TicketMasterContext.Provider>,
    );

    screen.getByText(/Home/i).click();
    expect(mockContextValue.setTicketMasterContext).toHaveBeenCalledWith({
      searchedEvents: [],
      searchTerm: "",
    });
  });
});
