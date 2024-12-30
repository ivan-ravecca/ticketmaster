import Event from "/src/components/event/Event";
const ListingMyEvents = ({ events }) => {
  if (events.length === 0) {
    return (
      <div>
        <span>Look for magnificents events</span>
      </div>
    );
  }

  return (
    <div>
      <h2>Event List</h2>
      <ul>
        {events.map((event, index) => (
          <li key={index}>
            <Event event={event} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListingMyEvents;
