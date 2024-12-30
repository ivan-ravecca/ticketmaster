import Event from "/src/components/event/Event";
const ListingSearchedEvents = ({ events, searchTerm }) => {
  if (!events) {
    return (
      <div>
        <span>Look for magnificents events</span>
      </div>
    );
  }

  return (
    <section aria-labelledby="events-searched" className="eventsSearched">
      <h2>These are the events that matches the search {searchTerm}</h2>
      <ul>
        {events.map((event, index) => (
          <li key={index}>
            <Event event={event} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ListingSearchedEvents;
