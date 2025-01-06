import { describe, it, expect, vi } from "vitest";
import fetchEvent from "./fetchEvent";
const apiKey = import.meta.env.VITE_API_KEY;

describe("fetchEvent", () => {
  const mockApiKey = apiKey;
  const mockEventId = "test-event-id";
  const mockUrl = `https://app.ticketmaster.com/discovery/v2/events/${mockEventId}.json?apikey=${mockApiKey}`;

  // vi.mock("fetch");

  it("should fetch event data successfully", async () => {
    const mockData = { id: mockEventId, name: "Test Event" };
    // eslint-disable-next-line no-undef
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      }),
    );

    const result = await fetchEvent({ queryKey: ["event", mockEventId] });
    expect(result).toEqual(mockData);
    // eslint-disable-next-line no-undef
    expect(global.fetch).toHaveBeenCalledWith(new URL(mockUrl));
  });

  it("should handle fetch error", async () => {
    // eslint-disable-next-line no-undef
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        status: 404,
      }),
    );

    const result = await fetchEvent({ queryKey: ["event", mockEventId] });
    expect(result).toEqual(null);
    // eslint-disable-next-line no-undef
    expect(global.fetch).toHaveBeenCalledWith(new URL(mockUrl));
  });

  it("should handle network error", async () => {
    // eslint-disable-next-line no-undef
    global.fetch = vi.fn(() => Promise.reject(new Error("Network Error")));

    const result = await fetchEvent({ queryKey: ["event", mockEventId] });
    expect(result).toEqual(null);
    // eslint-disable-next-line no-undef
    expect(global.fetch).toHaveBeenCalledWith(new URL(mockUrl));
  });
});
