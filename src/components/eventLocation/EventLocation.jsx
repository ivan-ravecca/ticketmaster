import { Typography, Box, Stack } from "@mui/material";

const EventLocation = ({ event }) => {
  if (!event) {
    return (
      <Box className="event-location" sx={{ padding: 2 }}>
        <Typography
          variant="body2"
          color="textSecondary"
          aria-label="Event Address"
        >
          <i>No event information available</i>
        </Typography>
      </Box>
    );
  }

  const buildText = (title, text) => {
    return text ? (
      <Typography variant="body1" component="p">
        <strong>{title}:</strong> <span tabIndex="0">{text}</span>
      </Typography>
    ) : null;
  };

  const buildImage = (image, eventName) => {
    if (image && image.length > 0) {
      return (
        <img
          src={image[0].url}
          alt={`${eventName} logo`}
          style={{ maxWidth: "200px", maxHeight: "100px" }}
        />
      );
    }
    return null;
  };
  return (
    <Box className="event-location" sx={{ padding: 2 }}>
      <Stack direction="column" spacing={2} alignItems="center">
        <Box>{buildImage(event.images, event.name)}</Box>
        <Box>
          {buildText("Name", event.name)}
          {buildText("Address", event?.address?.line1)}
          {buildText("City", event?.city?.name)}
          {buildText("State", event?.state?.name)}
          {buildText("Country", event?.country?.name)}
        </Box>
      </Stack>
    </Box>
  );
};

export default EventLocation;
