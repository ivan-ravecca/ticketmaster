import { describe, it, expect, vi, beforeEach } from "vitest";
import favEventsHelper from "./favEventsHelper";
vi.stubGlobal("import.meta.env", {
  VITE_API_SQL: true,
});
const { storeAPI } = vi.hoisted(() => {
  return {
    storeAPI: {
      getAllEvents: vi.fn(),
      addEvent: vi.fn(),
      deleteEvent: vi.fn(),
      updateEvent: vi.fn(),
      getEventById: vi.fn(),
    },
  };
});
vi.mock("./FactoryAPI", () => {
  return {
    default: vi.fn().mockImplementation(() => {
      return storeAPI;
    }),
  };
});

describe("favEventsHelper", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("happy path", () => {
    it("should get all favorite events", async () => {
      const mockEvents = [
        { id: "1", name: "Event 1" },
        { id: "2", name: "Event 2" },
      ];
      storeAPI.getAllEvents.mockResolvedValue(mockEvents);

      const events = await favEventsHelper.getAllEvents();

      expect(events).toEqual(mockEvents);
      expect(storeAPI.getAllEvents).toHaveBeenCalled();
    });

    it("should get all favorite events returnung empty", async () => {
      storeAPI.getAllEvents.mockResolvedValue(false);

      const events = await favEventsHelper.getAllEvents();

      expect(events).toEqual([]);
      expect(storeAPI.getAllEvents).toHaveBeenCalled();
    });

    it("should add a favorite event", async () => {
      const eventId = "1";
      const notes = "Test notes";
      const event = { name: "Test Event" };
      storeAPI.addEvent.mockResolvedValue("1");

      const result = await favEventsHelper.addFavEvent(eventId, notes, event);

      expect(result).toBe("1");
      expect(storeAPI.addEvent).toHaveBeenCalledWith(eventId, notes, event);
    });

    it("should delete a favorite event", async () => {
      const eventId = "1";
      storeAPI.deleteEvent.mockResolvedValue();

      await favEventsHelper.deleteFavEvent(eventId);

      expect(storeAPI.deleteEvent).toHaveBeenCalledWith(eventId);
    });

    it("should update a favorite existing event", async () => {
      const eventId = "1";
      const notes = "Updated notes";
      const mockedEvent = {
        id: eventId,
        name: "Event 1",
        timestamp: Date.now(),
        notes: notes,
      };
      storeAPI.updateEvent.mockResolvedValue();
      storeAPI.getEventById.mockResolvedValue(mockedEvent);

      await favEventsHelper.updateFavEvent(eventId, notes);

      expect(storeAPI.addEvent).not.toHaveBeenCalled();
      expect(storeAPI.updateEvent).toHaveBeenCalledOnce();
    });

    it("should update a favorite a non-existing event", async () => {
      const eventId = "1";
      const notes = "Updated notes";
      storeAPI.addEvent.mockResolvedValue();
      storeAPI.getEventById.mockResolvedValue(false);

      await favEventsHelper.updateFavEvent(eventId, notes);

      expect(storeAPI.updateEvent).not.toHaveBeenCalled();
      expect(storeAPI.addEvent).toHaveBeenCalledOnce();
    });

    it("should get a favorite event by id", async () => {
      const eventId = "1";
      const mockEvent = { id: "1", name: "Event 1" };
      storeAPI.getEventById.mockResolvedValue(mockEvent);

      const event = await favEventsHelper.getEventById({
        queryKey: ["storedEvent", eventId],
      });

      expect(event).toEqual(mockEvent);
      expect(storeAPI.getEventById).toHaveBeenCalledWith(eventId);
    });

    it("should get a favorite event by id returning null", async () => {
      const eventId = "1";
      storeAPI.getEventById.mockResolvedValue(false);

      const event = await favEventsHelper.getEventById({
        queryKey: ["storedEvent", eventId],
      });

      expect(event).toEqual(null);
      expect(storeAPI.getEventById).toHaveBeenCalledWith(eventId);
    });
  });

  describe("when an error occurs", () => {
    it("should handle error when getting all favorite events", async () => {
      const errorMessage = "Error getting all favorite events";
      storeAPI.getAllEvents.mockRejectedValue(new Error(errorMessage));

      await expect(favEventsHelper.getAllEvents()).rejects.toThrow(
        errorMessage,
      );
      expect(storeAPI.getAllEvents).toHaveBeenCalled();
    });

    it("should handle error when adding a favorite event", async () => {
      const eventId = "1";
      const notes = "Test notes";
      const event = { name: "Test Event" };
      const errorMessage = "Error adding favorite event";
      storeAPI.addEvent.mockRejectedValue(new Error(errorMessage));

      await expect(
        favEventsHelper.addFavEvent(eventId, notes, event),
      ).rejects.toThrow(errorMessage);
      expect(storeAPI.addEvent).toHaveBeenCalledWith(eventId, notes, event);
    });

    it("should handle error when deleting a favorite event", async () => {
      const eventId = "1";
      const errorMessage = "Error deleting favorite event";
      storeAPI.deleteEvent.mockRejectedValue(new Error(errorMessage));

      await expect(favEventsHelper.deleteFavEvent(eventId)).rejects.toThrow(
        errorMessage,
      );
      expect(storeAPI.deleteEvent).toHaveBeenCalledWith(eventId);
    });

    it("should handle error when updating a favorite existing event", async () => {
      const eventId = "1";
      const notes = "Updated notes";
      const mockedEvent = {
        id: eventId,
        name: "Event 1",
        timestamp: Date.now(),
        notes: notes,
      };
      const errorMessage = "Error updating favorite event";
      storeAPI.getEventById.mockResolvedValue(mockedEvent);
      storeAPI.updateEvent.mockRejectedValue(new Error(errorMessage));

      await expect(
        favEventsHelper.updateFavEvent(eventId, notes),
      ).rejects.toThrow(errorMessage);
      expect(storeAPI.updateEvent).toHaveBeenCalledWith(
        eventId,
        notes,
        undefined,
      );
    });

    it("should handle error when updating a non-existing favorite event", async () => {
      const eventId = "1";
      const notes = "Updated notes";
      const errorMessage = "Error adding favorite event";
      storeAPI.getEventById.mockResolvedValue(false);
      storeAPI.addEvent.mockRejectedValue(new Error(errorMessage));

      await expect(
        favEventsHelper.updateFavEvent(eventId, notes),
      ).rejects.toThrow(errorMessage);
      expect(storeAPI.addEvent).toHaveBeenCalledWith(eventId, notes, undefined);
    });

    it("should handle error when getting a favorite event by id", async () => {
      const eventId = "1";
      const errorMessage = "Error getting favorite event";
      storeAPI.getEventById.mockRejectedValue(new Error(errorMessage));

      await expect(
        favEventsHelper.getEventById({ queryKey: ["storedEvent", eventId] }),
      ).rejects.toThrow(errorMessage);
      expect(storeAPI.getEventById).toHaveBeenCalledWith(eventId);
    });
  });
});
