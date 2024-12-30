const EventInfo = ({ event }) => {
  if (!event) {
    return (
      <div className="event-location">
        <address aria-label="Event Address">
          <i>No event information available</i>
        </address>
      </div>
    );
  }

  const buildText = (title, text) => {
    return text ? (
      <p>
        <strong>{title}:</strong>
        <span tabIndex="0"> {text}</span>
      </p>
    ) : (
      ""
    );
  };

  const buildImage = (image) => {
    if (image && image.length > 0) {
      return (
        <img
          src={event.images[0].url}
          alt="{event.name} logo"
          style={{ maxWidth: "200px", maxHeight: "100px" }}
        />
      );
    }
  };

  return (
    <div className="event-location">
      <h1 tabIndex="0">{event.name}</h1>
      {buildImage(event.images)}
      <address aria-label="Event Address">
        {buildText("Address", event?.address?.line1)}
        {buildText("City", event?.city?.name)}
        {buildText("State", event?.state?.name)}
        {buildText("Country", event?.country?.name)}
      </address>
    </div>
  );
};

export default EventInfo;
