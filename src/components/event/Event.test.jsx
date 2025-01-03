import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Event from "./Event";
import { BrowserRouter as Router } from "react-router-dom";
import TicketMasterContext from "../../state/TicketMasterContext";
import { eventMockSimple } from "./mocks/eventMock";

describe("Event component", () => {
  const renderWithProviders = (ui, { providerProps, ...renderOptions }) => {
    return render(
      <Router>
        <TicketMasterContext.Provider value={providerProps}>
          {ui}
        </TicketMasterContext.Provider>
      </Router>,
      renderOptions,
    );
  };

  it("renders the event component", () => {
    const providerProps = {
      searchedEvents: [],
      searchedTerm: "",
    };
    renderWithProviders(<Event event={eventMockSimple} index={0} />, {
      providerProps,
    });
    expect(screen.getByText(eventMockSimple.name)).toBeInTheDocument();
  });

  it("displays 'No information available' when event.info is not provided", () => {
    const noInfoEvent = { ...eventMockSimple, info: null };
    const providerProps = {
      searchedEvents: [],
      searchedTerm: "",
    };
    renderWithProviders(<Event event={noInfoEvent} index={0} />, {
      providerProps,
    });
    expect(screen.getByText("No information available")).toBeInTheDocument();
  });

  it("displays the full info when event.info length is less than or equal to 200 characters", () => {
    const providerProps = {
      searchedEvents: [],
      searchedTerm: "",
    };
    const eventMockShortInfo = {
      ...eventMockSimple,
      info: eventMockSimple.info.substring(0, 150),
    };
    renderWithProviders(<Event event={eventMockShortInfo} index={0} />, {
      providerProps,
    });
    expect(screen.queryByText("Show more")).not.toBeInTheDocument();
  });

  it("displays truncated info and 'Show more' when event.info length exceeds 200 characters", () => {
    const providerProps = {
      searchedEvents: [],
      searchedTerm: "",
    };
    const { container } = renderWithProviders(
      <Event event={eventMockSimple} index={0} />,
      {
        providerProps,
      },
    );
    const paragraph = container.querySelector(
      ".MuiTypography-root.MuiTypography-body2.MuiListItemText-secondary.css-1a1whku-MuiTypography-root",
    );
    expect(paragraph).toBeInTheDocument();
    expect(paragraph.textContent).toContain(
      `${eventMockSimple.info.substring(0, 200)}...`,
    );
    expect(screen.getByText("Show more")).toBeInTheDocument();
  });

  it("toggles between 'Show more' and 'Show less' when the info is expanded and collapsed", () => {
    const providerProps = {
      searchedEvents: [],
      searchedTerm: "",
    };
    const { container } = renderWithProviders(
      <Event event={eventMockSimple} index={0} />,
      {
        providerProps,
      },
    );

    const paragraph = container.querySelector(
      ".MuiTypography-root.MuiTypography-body2.MuiListItemText-secondary.css-1a1whku-MuiTypography-root",
    );
    expect(paragraph).toBeInTheDocument();

    const showMoreButton = screen.getByText("Show more");

    fireEvent.click(showMoreButton);
    expect(screen.getByText("Show less")).toBeInTheDocument();
    expect(paragraph.textContent).toContain(eventMockSimple.info);

    const showLessButton = screen.getByText("Show less");
    fireEvent.click(showLessButton);
    expect(screen.getByText("Show more")).toBeInTheDocument();
    expect(paragraph.textContent).toContain(
      `${eventMockSimple.info.substring(0, 200)}...`,
    );
  });
});
