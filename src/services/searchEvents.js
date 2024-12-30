const apiKey = import.meta.env.VITE_API_KEY;

async function searchEvents(params) {
  //const url = new URL('https://app.ticketmaster.eu/mfxapi/v2/events.json');
  const url = new URL("https://app.ticketmaster.com/discovery/v2/events.json");

  Object.keys(params).forEach((key) =>
    url.searchParams.append(key, params[key]),
  );
  url.searchParams.append("apikey", apiKey);
  url.searchParams.append("eventdate_from", "2024-26-01T00:00:01Z");

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data?._embedded?.events || [];
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
}

export default searchEvents;
