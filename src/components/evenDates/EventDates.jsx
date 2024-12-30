const EventDates = ({ event }) => {
  if (!event) {
    return (
      <section aria-labelledby="event-dates" className="event-dates">
        <i>No event details available</i>
      </section>
    );
  }

  const { access, start, end, status, timezone } = event;

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: timezone,
      timeZoneName: "short",
    };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  };

  const buildText = (text, formattedDate) => {
    return (
      <p>
        <strong>{text}:</strong>
        <span tabIndex="0"> {formattedDate}</span>
      </p>
    );
  };

  return (
    <section aria-labelledby="event-dates" className="event-dates">
      <h3 id="event-dates">Dates</h3>
      {buildText("Date and Time", formatDate(start.dateTime))}
      {buildText(
        "Access Start Time",
        access ? formatDate(access.startDateTime) : "TBD",
      )}

      {end && (end.approximate || !end.noSpecificTime)
        ? buildText(
            "Approximate End Time",
            end.approximate ? "Approximate" : "To be announced",
          )
        : null}
      {buildText(
        "Status",
        status.code.charAt(0).toUpperCase() + status.code.slice(1),
      )}
    </section>
  );
};

export default EventDates;
