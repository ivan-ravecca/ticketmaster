import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Box } from "@mui/material";
import EventClassification from "./EventClassification";
import { eventMockClassifications } from "../event/mocks/eventMock";

describe("EventClassification component", () => {
  const renderWithProviders = (ui, { providerProps, ...renderOptions }) => {
    return render(<Box>{ui}</Box>, renderOptions);
  };

  it("renders the classification component with full data", () => {
    renderWithProviders(
      <EventClassification classification={eventMockClassifications} />,
      {},
    );
    expect(screen.getByText("Classification")).toBeInTheDocument();
    expect(screen.getByText("Segment:")).toBeInTheDocument();
    expect(
      screen.getByText(eventMockClassifications[0].segment.name),
    ).toBeInTheDocument();
    expect(screen.getByText("Genre:")).toBeInTheDocument();
    expect(
      screen.getByText(eventMockClassifications[0].genre.name),
    ).toBeInTheDocument();
    expect(screen.getByText("Sub Genre:")).toBeInTheDocument();
    expect(
      screen.getByText(eventMockClassifications[0].subGenre.name),
    ).toBeInTheDocument();
    expect(screen.getByText("Type:")).toBeInTheDocument();
    expect(
      screen.getByText(eventMockClassifications[0].type.name),
    ).toBeInTheDocument();
    expect(screen.getByText("Sub Type:")).toBeInTheDocument();
    expect(
      screen.getByText(eventMockClassifications[0].subType.name),
    ).toBeInTheDocument();
    expect(screen.getByText("Family Friendly:")).toBeInTheDocument();
    expect(
      screen.getByText(eventMockClassifications[0].family ? "Yes" : "No"),
    ).toBeInTheDocument();
  });

  it("renders the classification component with partial data", () => {
    const eventMockClassificationsPartial = [
      {
        ...eventMockClassifications[0],
        genre: null,
        subGenre: null,
        type: null,
        subType: null,
        family: null,
      },
    ];
    renderWithProviders(
      <EventClassification classification={eventMockClassificationsPartial} />,
      {},
    );
    expect(screen.getByText("Classification")).toBeInTheDocument();
    expect(screen.getByText("Segment:")).toBeInTheDocument();
    expect(
      screen.getByText(eventMockClassificationsPartial[0].segment.name),
    ).toBeInTheDocument();
    expect(screen.queryByText("Genre:")).not.toBeInTheDocument();
    expect(screen.queryByText("Sub Genre:")).not.toBeInTheDocument();
    expect(screen.queryByText("Type:")).not.toBeInTheDocument();
    expect(screen.queryByText("Sub Type:")).not.toBeInTheDocument();
    expect(screen.getByText("Family Friendly:")).toBeInTheDocument();
    expect(
      screen.getByText(
        eventMockClassificationsPartial[0].family ? "Yes" : "No",
      ),
    ).toBeInTheDocument();
  });

  it("renders the classification component with no data", () => {
    renderWithProviders(<EventClassification classification={[]} />, {});
    expect(
      screen.getByText("No classification information available"),
    ).toBeInTheDocument();
    expect(screen.queryByText("Classification")).not.toBeInTheDocument();
    expect(screen.queryByText("Segment:")).not.toBeInTheDocument();
    expect(screen.queryByText("Genre:")).not.toBeInTheDocument();
    expect(screen.queryByText("Sub Genre:")).not.toBeInTheDocument();
    expect(screen.queryByText("Type:")).not.toBeInTheDocument();
    expect(screen.queryByText("Sub Type:")).not.toBeInTheDocument();
    expect(screen.queryByText("Family Friendly:")).not.toBeInTheDocument();
  });
});
