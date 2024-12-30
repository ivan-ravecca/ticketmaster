import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import TicketMasterContext from "/src/state/TicketMasterContext";

const MyEvents = () => {
  const [events, setEvents] = useState([
    { id: 1, name: "Event 1" },
    { id: 2, name: "Event 2" },
    { id: 3, name: "Event 3" },
  ]);

  const [ticketMasterContext] = useContext(TicketMasterContext);
  const navigate = useNavigate();

  const handleDelete = (id) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  const handleModify = (id) => {
    const newName = prompt("Enter new name for the event:");
    if (newName) {
      setEvents(
        events.map((event) =>
          event.id === id ? { ...event, name: newName } : event,
        ),
      );
    }
  };

  return (
    <div>
      <h1>This is My Events</h1>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            {event.name}
            <button onClick={() => handleDelete(event.id)}>Delete</button>
            <button onClick={() => handleModify(event.id)}>Modify</button>
          </li>
        ))}
      </ul>
      {ticketMasterContext && ticketMasterContext.searchedEvents ? (
        <button onClick={() => navigate("/")}>Go back to search</button>
      ) : (
        ""
      )}
    </div>
  );
};

export default MyEvents;
