import { Box, Typography, Stack } from "@mui/material";

const EventDates = ({ event }) => {
  if (!event) {
    return (
      <Box sx={{ padding: 2 }}>
        <Typography variant="body2" color="textSecondary">
          <i>No date information available</i>
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

  const { start, end, timezone } = event;

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h6" id="event-dates" gutterBottom>
        Event Dates
      </Typography>
      <Stack direction="column" spacing={4}>
        <Box>
          {buildText("Start Date", start?.localDate)}
          {buildText("Start Time", start?.localTime)}
          {buildText("End Date", end?.localDate)}
          {buildText("End Time", end?.localTime)}
          {buildText("Timezone", timezone)}
        </Box>
      </Stack>
    </Box>
  );
};

export default EventDates;
