import { useState } from "react";
import { Link } from "react-router-dom";

const Event = ({ event }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => setIsExpanded(!isExpanded);

  const renderInfo = () => {
    if (!event.info) {
      return <p>No information available</p>;
    } else if (event.info.length <= 200) {
      return <p>{event.info}</p>;
    }

    return (
      <p>
        {isExpanded ? event.info : `${event.info.substring(0, 200)}...`}{" "}
        <span
          onClick={toggleExpand}
          style={{ color: "blue", cursor: "pointer" }}
        >
          {isExpanded ? "Show less" : "Show more"}
        </span>
      </p>
    );
  };

  return (
    <div className="event">
      <h3>
        <Link to={`/event/${event.id}`} style={{ textDecoration: "none" }}>
          {event.name}
        </Link>
      </h3>
      <p>{event.dates.start.localDate}</p>
      {renderInfo()}
    </div>
  );
};

export default Event;
