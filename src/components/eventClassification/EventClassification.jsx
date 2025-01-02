import { Box, Typography, Stack } from "@mui/material";

const EventClassification = ({ classification }) => {
  if (!classification || classification.length === 0) {
    return (
      <Box sx={{ padding: 2 }}>
        <Typography variant="body2" color="textSecondary">
          <i>No classification information available</i>
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

  const primaryClassification = classification.find((item) => item.primary);
  const { segment, genre, subGenre, type, subType, family } =
    primaryClassification;

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h6" id="event-classification" gutterBottom>
        Classification
      </Typography>
      <Stack direction="column" spacing={6}>
        <Box>
          {buildText("Segment", segment?.name)}
          {buildText("Genre", genre?.name)}
          {buildText("Sub Genre", subGenre?.name)}
          {buildText("Type", type?.name)}
          {buildText("Sub Type", subType?.name)}
          {buildText("Family Friendly", family ? "Yes" : "No")}
        </Box>
      </Stack>
    </Box>
  );
};

export default EventClassification;
