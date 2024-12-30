const apiKey = import.meta.env.VITE_API_KEY;

async function fetchEvent({ queryKey }) {
  const eventId = queryKey[1];
  console.log(`fetchEvent(${eventId})`, eventId);
  const url = new URL(
    `https://app.ticketmaster.com/discovery/v2/events/${eventId}.json`,
  );

  url.searchParams.append("apikey", apiKey);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.info(data);
    return data || {};
  } catch (error) {
    console.error("Error fetching events:", error);
    return {};
  }
}

export default fetchEvent;
