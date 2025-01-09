const useSQL = import.meta.env.VITE_API_SQL === "true";
import FactoryAPI from "./factoryAPI";

const eventsAPI = new FactoryAPI(useSQL);

const favEventsHelper = {
  addFavEvent: async (eventId, notes, event) => {
    try {
      const response = await eventsAPI.addEvent(eventId, notes, event);
      return response;
    } catch (error) {
      console.error("Error adding favorite event:", error);
      throw error;
    }
  },

  updateFavEvent: async (eventId, notes, event) => {
    try {
      const storedEvent = await eventsAPI.getEventById(eventId);
      if (storedEvent) {
        return await eventsAPI.updateEvent(eventId, notes, event);
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
      const response = await eventsAPI.deleteEvent(eventId);
      return response;
    } catch (error) {
      console.error("Error deleting favorite event:", error);
      throw error;
    }
  },

  getEventById: async ({ queryKey }) => {
    const eventId = queryKey[1];
    try {
      const response = await eventsAPI.getEventById(eventId);
      return response || null;
    } catch (error) {
      console.error("Error getting favorite event:", error);
      throw error;
    }
  },

  getAllEvents: async () => {
    try {
      const response = await eventsAPI.getAllEvents();
      return response || [];
    } catch (error) {
      console.error("Error getting all favorite events:", error);
      throw error;
    }
  },
};

export default favEventsHelper;
