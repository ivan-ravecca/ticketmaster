import { useState } from "react";
import { Link, ListItem, ListItemText } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const Event = ({ event, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => setIsExpanded(!isExpanded);

  const renderInfo = () => {
    if (!event.info) {
      return <span>No information available</span>;
    } else if (event.info.length <= 200) {
      return event.info;
    }

    return (
      <>
        {isExpanded ? event.info : `${event.info.substring(0, 200)}...`}{" "}
        <span
          onClick={toggleExpand}
          style={{ color: "blue", cursor: "pointer" }}
        >
          {isExpanded ? "Show less" : "Show more"}
        </span>
      </>
    );
  };

  return (
    <div className="event">
      <ListItem key={index} alignItems="flex-start">
        <ListItemText
          primary={
            <>
              <Link
                component={RouterLink}
                to={`/event/${event.id}`}
                style={{ textDecoration: "none" }}
              >
                {event.name}
              </Link>
            </>
          }
          secondary={
            <>
              On {event.dates.start.localDate}
              <br />
              {renderInfo()}
            </>
          }
          slotProps={{
            primary: {
              variant: "body1",
              color: "textPrimary",
            },
            secondary: {
              variant: "body2",
              color: "textSecondary",
            },
          }}
        />{" "}
      </ListItem>
    </div>
  );
};

export default Event;
