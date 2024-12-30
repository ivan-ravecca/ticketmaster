import fetchEvent from "./fetchEvent";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

describe.skip("fetchEvent", () => {
  beforeEach(() => {
    globalThis.fetch = vi.fn();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("should fetch event data successfully", async () => {
    const mockEventId = "12345";
    const mockResponse = {
      ok: true,
      json: vi.fn().mockResolvedValue({ id: mockEventId, name: "Test Event" }),
    };

    globalThis.fetch.mockResolvedValue(mockResponse);

    const result = await fetchEvent({ queryKey: ["", mockEventId] });

    expect(globalThis.fetch).toHaveBeenCalledWith(
      expect.stringContaining(
        `https://app.ticketmaster.com/discovery/v2/events/${mockEventId}.json`,
      ),
    );
    expect(result).toEqual({ id: mockEventId, name: "Test Event" });
  });

  it("should handle fetch error", async () => {
    const mockEventId = "12345";
    const mockError = new Error("HTTP error! status: 404");

    globalThis.fetch.mockResolvedValue({
      ok: false,
      status: 404,
    });

    const result = await fetchEvent({ queryKey: ["", mockEventId] });

    expect(globalThis.fetch).toHaveBeenCalledWith(
      expect.stringContaining(
        `https://app.ticketmaster.com/discovery/v2/events/${mockEventId}.json`,
      ),
    );
    expect(result).toEqual({});
  });

  it("should handle network error", async () => {
    const mockEventId = "12345";
    const mockError = new Error("Network error");

    globalThis.fetch.mockRejectedValue(mockError);

    const result = await fetchEvent({ queryKey: ["", mockEventId] });

    expect(globalThis.fetch).toHaveBeenCalledWith(
      expect.stringContaining(
        `https://app.ticketmaster.com/discovery/v2/events/${mockEventId}.json`,
      ),
    );
    expect(result).toEqual({});
  });
});
