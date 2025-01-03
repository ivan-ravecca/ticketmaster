import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import EventDates from "./EventDates";
import { eventDatesSimple } from "../event/mocks/eventMock";

describe("EventDates component", () => {
  it("renders 'No date information available' when no event data is provided", () => {
    render(<EventDates event={null} />);
    expect(
      screen.getByText("No date information available"),
    ).toBeInTheDocument();
  });

  it("renders event dates with full data", () => {
    render(<EventDates event={eventDatesSimple} />);
    expect(screen.getByText("Event Dates")).toBeInTheDocument();
    expect(screen.getByText("Start Date:")).toBeInTheDocument();

    expect(
      screen.getByText(eventDatesSimple.start.localDate),
    ).toBeInTheDocument();

    expect(screen.getByText("End Date:")).toBeInTheDocument();
    expect(
      screen.getByText(eventDatesSimple.end.localDate),
    ).toBeInTheDocument();
    expect(screen.getByText("Timezone:")).toBeInTheDocument();
    expect(screen.getByText(eventDatesSimple.timezone)).toBeInTheDocument();
  });

  it("renders event dates with partial data", () => {
    const mockDatePartialData = {
      ...eventDatesSimple,
      end: null,
      timezone: null,
    };
    render(<EventDates event={mockDatePartialData} />);
    expect(screen.getByText("Event Dates")).toBeInTheDocument();
    expect(screen.getByText("Start Date:")).toBeInTheDocument();
    expect(
      screen.getByText(mockDatePartialData.start.localDate),
    ).toBeInTheDocument();
    expect(screen.queryByText("End Date:")).not.toBeInTheDocument();
    expect(screen.queryByText("Timezone:")).not.toBeInTheDocument();
  });
});
