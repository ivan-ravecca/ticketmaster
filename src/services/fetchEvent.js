async function fetchEvent({ queryKey }) {
  const eventId = queryKey[1];
  console.log(`fetchEvent(${eventId})`, eventId);
  const url = new URL(
    `https://app.ticketmaster.com/discovery/v2/events/${eventId}.json`,
  );

  url.searchParams.append("apikey", "tyfA0IA7Dsdisa5tZa7AKffmcrVTkZy2");

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
