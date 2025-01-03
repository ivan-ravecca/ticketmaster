import { describe, it, expect, vi, beforeEach } from "vitest";
import searchEvents from "./searchEvents";

describe("searchEvents", () => {
  const mockApiKey = "apiKey";
  const mockUrl = "https://app.ticketmaster.com/discovery/v2/events.json";

  beforeEach(() => {
    import.meta.env.VITE_API_KEY = mockApiKey;
  });

  it("should fetch events successfully", async () => {
    const mockData = {
      _embedded: {
        events: [
          { id: "1", name: "Event 1" },
          { id: "2", name: "Event 2" },
        ],
      },
    };
    // eslint-disable-next-line no-undef
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      }),
    );

    const params = { keyword: "music" };
    const events = await searchEvents(params);

    expect(events).toEqual(mockData._embedded.events);
    // eslint-disable-next-line no-undef
    expect(global.fetch).toHaveBeenCalledOnce();
    // eslint-disable-next-line no-undef
    expect(global.fetch).toHaveBeenCalledWith(
      expect.objectContaining({
        href: expect.stringContaining(mockUrl),
      }),
    );
  });

  it("should handle HTTP errors", async () => {
    // eslint-disable-next-line no-undef
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        status: 500,
      }),
    );

    const params = { keyword: "music" };
    const events = await searchEvents(params);

    expect(events).toEqual([]);
    // eslint-disable-next-line no-undef
    expect(global.fetch).toHaveBeenCalledOnce();
    // eslint-disable-next-line no-undef
    expect(global.fetch).toHaveBeenCalledWith(
      expect.objectContaining({
        href: expect.stringContaining(mockUrl),
      }),
    );
  });

  it("should handle fetch errors", async () => {
    // eslint-disable-next-line no-undef
    global.fetch = vi.fn(() => Promise.reject(new Error("Fetch error")));

    const params = { keyword: "music" };
    const events = await searchEvents(params);

    expect(events).toEqual([]);
    // eslint-disable-next-line no-undef
    expect(global.fetch).toHaveBeenCalledOnce();
    // eslint-disable-next-line no-undef
    expect(global.fetch).toHaveBeenCalledWith(
      expect.objectContaining({
        href: expect.stringContaining(mockUrl),
      }),
    );
  });

  it("should append parameters to the URL", async () => {
    const mockData = {
      _embedded: {
        events: [{ id: "1", name: "Event 1" }],
      },
    };
    // eslint-disable-next-line no-undef
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      }),
    );

    const params = { keyword: "music", city: "New York" };
    await searchEvents(params);

    // eslint-disable-next-line no-undef
    expect(global.fetch).toHaveBeenCalledOnce();
    // eslint-disable-next-line no-undef
    expect(global.fetch).toHaveBeenCalledWith(
      expect.objectContaining({
        href: expect.stringContaining("keyword=music"),
      }),
    );
    // eslint-disable-next-line no-undef
    expect(global.fetch).toHaveBeenCalledWith(
      expect.objectContaining({
        href: expect.stringContaining("city=New+York"),
      }),
    );
  });
});
