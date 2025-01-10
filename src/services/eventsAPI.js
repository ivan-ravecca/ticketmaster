const baseUrl = import.meta.env.VITE_API_URL;
export const getAllEvents = async () => {
  try {
    const response = await fetch(baseUrl);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const result = await response.json();
    return result || [];
  } catch (error) {
    console.error("Failed to fetch events:", error);
    throw error;
  }
};

export const addEvent = async (eventId, notes, event) => {
  try {
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eventId: eventId,
        notes: notes,
        event: event,
        timestamp: Date.now(),
      }),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to add event:", error);
    throw error;
  }
};

export const updateEvent = async (eventId, notes, event) => {
  try {
    const response = await fetch(`${baseUrl}/${eventId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eventId: eventId,
        notes: notes,
        event: event,
        timestamp: Date.now(),
      }),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return null;
  } catch (error) {
    console.error("Failed to update event:", error);
    throw error;
  }
};

export const deleteEvent = async (id) => {
  try {
    const response = await fetch(`${baseUrl}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return null;
  } catch (error) {
    console.error("Failed to delete event:", error);
    throw error;
  }
};

export const getEventById = async (id) => {
  try {
    const response = await fetch(`${baseUrl}/${id}`);
    if (response.status === 404) {
      return null;
    }
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch event:", error);
    throw error;
  }
};
