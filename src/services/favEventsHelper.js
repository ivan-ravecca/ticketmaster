import {
  getAllEvents,
  addEvent,
  deleteEvent,
  updateEvent,
  getEventById,
} from "./storeAPI";

const favEventsHelper = {
  addFavEvent: async (eventId, notes, event) => {
    try {
      const response = await addEvent(eventId, notes, event);
      return response;
    } catch (error) {
      console.error("Error adding favorite event:", error);
      throw error;
    }
  },

  updateFavEvent: async (eventId, notes, event) => {
    try {
      const storedEvent = await getEventById(eventId);
      if (storedEvent) {
        return await updateEvent(eventId, notes, event);
      } else {
        return await favEventsHelper.addFavEvent(eventId, notes, event);
      }
    } catch (error) {
      console.error("Error updating favorite event:", error);
      throw error;
    }
  },

  deleteFavEvent: async (eventId) => {
    try {
      const response = await deleteEvent(eventId);
      return response;
    } catch (error) {
      console.error("Error deleting favorite event:", error);
      throw error;
    }
  },

  getEventById: async ({ queryKey }) => {
    const eventId = queryKey[0];
    try {
      const response = await getEventById(eventId);
      return response || null;
    } catch (error) {
      console.error("Error getting favorite event:", error);
      throw error;
    }
  },

  getAllEvents: async () => {
    try {
      const response = await getAllEvents();
      return response || [];
    } catch (error) {
      console.error("Error getting all favorite events:", error);
      throw error;
    }
  },
};

export default favEventsHelper;
