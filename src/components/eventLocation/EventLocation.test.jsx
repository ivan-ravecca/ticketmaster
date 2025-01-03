import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import EventLocation from "./EventLocation";
import { eventMockAddress } from "../event/mocks/eventMock";

describe("EventLocation component", () => {
  it("renders 'No event information available' when no event data is provided", () => {
    render(<EventLocation event={null} />);
    expect(
      screen.getByText("No event information available"),
    ).toBeInTheDocument();
  });

  it("renders event location with full data", () => {
    render(<EventLocation event={eventMockAddress} />);
    expect(
      screen.queryByAltText(`${eventMockAddress.name} logo`),
    ).toBeInTheDocument();
    expect(screen.getByText(eventMockAddress.name)).toBeInTheDocument();
    expect(screen.getByText("Address:")).toBeInTheDocument();
    expect(screen.getByText("3500 Sports Arena Blvd")).toBeInTheDocument();
    expect(screen.getByText("City:")).toBeInTheDocument();
    expect(screen.getByText("San Diego")).toBeInTheDocument();
    expect(screen.getByText("State:")).toBeInTheDocument();
    expect(screen.getByText("California")).toBeInTheDocument();
    expect(screen.getByText("Country:")).toBeInTheDocument();
    expect(screen.getByText("United States Of America")).toBeInTheDocument();
  });

  it("renders event location with partial data (no image)", () => {
    const noImageEventMock = { ...eventMockAddress, images: [] };
    render(<EventLocation event={noImageEventMock} />);
    expect(
      screen.queryByAltText(`${eventMockAddress.name} logo`),
    ).not.toBeInTheDocument();
    expect(screen.getByText(noImageEventMock.name)).toBeInTheDocument();
    expect(screen.getByText("Address:")).toBeInTheDocument();
    expect(screen.getByText("3500 Sports Arena Blvd")).toBeInTheDocument();
    expect(screen.getByText("City:")).toBeInTheDocument();
    expect(screen.getByText("San Diego")).toBeInTheDocument();
    expect(screen.getByText("State:")).toBeInTheDocument();
    expect(screen.getByText("California")).toBeInTheDocument();
    expect(screen.getByText("Country:")).toBeInTheDocument();
    expect(screen.getByText("United States Of America")).toBeInTheDocument();
  });

  it("renders event location with only name", () => {
    const onlyEventNameMock = {
      ...eventMockAddress,
      images: [],
      address: null,
      city: null,
      state: null,
      country: null,
    };
    render(<EventLocation event={onlyEventNameMock} />);
    expect(
      screen.queryByAltText(`${onlyEventNameMock.name} logo`),
    ).not.toBeInTheDocument();
    expect(screen.getByText(onlyEventNameMock.name)).toBeInTheDocument();
    expect(screen.queryByText("Address:")).not.toBeInTheDocument();
    expect(screen.queryByText("City:")).not.toBeInTheDocument();
    expect(screen.queryByText("State:")).not.toBeInTheDocument();
    expect(screen.queryByText("Country:")).not.toBeInTheDocument();
  });
});
