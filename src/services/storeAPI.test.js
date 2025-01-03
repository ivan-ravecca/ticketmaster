// Import libraries
import { describe, it, beforeEach, expect } from "vitest";
import {
  getAllEvents,
  addEvent,
  deleteEvent,
  updateEvent,
  getEventById,
} from "./storeAPI";
import { IDBFactory } from "fake-indexeddb";

// Mock IndexedDB
// eslint-disable-next-line no-undef
global.indexedDB = new IDBFactory();

describe("FavEventsDB Tests", () => {
  beforeEach(async () => {
    await new Promise((resolve, reject) => {
      const request = indexedDB.deleteDatabase("FavEventsDB");
      request.onsuccess = resolve;
      request.onerror = reject;
      request.onblocked = resolve;
    });
  });

  it("should return an empty array when no events are present", async () => {
    const events = await getAllEvents();
    expect(events).toEqual([]);
  });

  it("should return all events from the database", async () => {
    const event1 = { id: 1, notes: "Event 1 notes", event: "Event 1" };
    const event2 = { id: 2, notes: "Event 2 notes", event: "Event 2" };
    await addEvent(event1.id, event1.notes, event1.event);
    await addEvent(event2.id, event2.notes, event2.event);

    const events = await getAllEvents();
    expect(events).toEqual(
      expect.arrayContaining([
        expect.objectContaining(event1),
        expect.objectContaining(event2),
      ]),
    );
  });

  it("should add an event to the database and return its ID", async () => {
    const newEvent = { notes: "New Event notes", event: "New Event" };
    const id = await addEvent(0, newEvent.notes, newEvent.event); // 0 for auto-increment

    const addedEvent = await getEventById(id);
    expect(addedEvent).toEqual(expect.objectContaining({ ...newEvent, id }));
  });

  it("should delete an event from the database", async () => {
    const eventToDelete = {
      id: 10,
      notes: "Event to Delete",
      event: "Delete Me",
    };
    await addEvent(eventToDelete.id, eventToDelete.notes, eventToDelete.event);

    await deleteEvent(eventToDelete.id);
    const deletedEvent = await getEventById(eventToDelete.id);
    expect(deletedEvent).toBeUndefined();
  });

  it("should not throw an error when deleting a non-existent event", async () => {
    await expect(deleteEvent(100)).resolves.not.toThrow();
  });

  it("should update an event in the database", async () => {
    const eventToUpdate = {
      id: 20,
      notes: "Event to Update",
      event: "Update Me",
    };
    await addEvent(eventToUpdate.id, eventToUpdate.notes, eventToUpdate.event);

    const updatedNotes = "Updated Event notes";
    await updateEvent(eventToUpdate.id, updatedNotes);

    const updatedEvent = await getEventById(eventToUpdate.id);
    expect(updatedEvent.notes).toEqual(updatedNotes);
  });

  it("should return an event by its ID", async () => {
    const eventToGet = {
      id: 30,
      notes: "Event to Get",
      event: "Get Me",
    };
    await addEvent(eventToGet.id, eventToGet.notes, eventToGet.event);

    const event = await getEventById(eventToGet.id);
    expect(event).toEqual(expect.objectContaining({ ...eventToGet }));
  });

  it("should return undefined for a non-existent event ID", async () => {
    const event = await getEventById(100);
    expect(event).toBeUndefined();
  });
});
