const EventClassification = ({ classification }) => {
  if (!classification || classification.length === 0) {
    return (
      <section aria-labelledby="event-classification">
        <i>No classification information available</i>
      </section>
    );
  }

  const primaryClassification = classification.find((item) => item.primary);

  const buildText = (title, text) => {
    // API often returns "Undefined" as a string for the field
    if (text && text !== "Undefined") {
      return (
        <p>
          <strong>{title}:</strong> <span tabIndex="0">{text}</span>
        </p>
      );
    }
  };

  return (
    <section aria-labelledby="event-classification">
      <h3 id="event-classification">Classification</h3>
      {primaryClassification && (
        <div>
          {primaryClassification.segment?.name
            ? buildText("Segment", primaryClassification.segment?.name)
            : ""}
          {primaryClassification.genre?.name
            ? buildText("Genre", primaryClassification.genre?.name)
            : ""}
          {primaryClassification.subGenre?.name
            ? buildText("SubGenre", primaryClassification.subGenre?.name)
            : ""}
          {primaryClassification.type?.name
            ? buildText("Type", primaryClassification.type?.name)
            : ""}
          {primaryClassification.subType?.name
            ? buildText("SubType", primaryClassification.subType?.name)
            : ""}
          {primaryClassification.family
            ? buildText(
                "Family Friendly",
                primaryClassification.family ? "Yes" : "No",
              )
            : ""}
        </div>
      )}
    </section>
  );
};

export default EventClassification;
