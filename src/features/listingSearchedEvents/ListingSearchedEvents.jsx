import Event from "/src/components/event/Event";
import { Box, Typography, Divider, List } from "@mui/material";

const ListingSearchedEvents = ({ events, searchTerm }) => {
  const boxStyle = {
    bgcolor: "background.paper",
    p: 6,
    mt: "auto",
    textAlign: "center",
    borderTop: "1px solid #e0e0e0",
    borderRadius: "4px",
  };
  if (events.length === 0 && searchTerm === "") {
    return "";
  } else if (events.length === 0 && searchTerm != "") {
    return (
      <Box sx={boxStyle}>
        {" "}
        <Typography variant="h6" color="textSecondary" gutterBottom>
          {" "}
          No Results Found
        </Typography>
        <Typography variant="body2" color="textSecondary">
          I was not able to find any events that matches the term{" "}
          {`"${searchTerm}"`}
        </Typography>{" "}
      </Box>
    );
  }

  return (
    <section aria-labelledby="events-searched" className="eventsSearched">
      <Divider style={{ margin: "20px 0" }}></Divider>
      <Box sx={boxStyle}>
        <Typography variant="h6" color="textSecondary" gutterBottom>
          These are the events that matches the search {`"${searchTerm}"`}
        </Typography>
        <List>
          {events.map((event, index) => (
            <Event event={event} key={index} index={index} />
          ))}
        </List>
      </Box>
    </section>
  );
};

export default ListingSearchedEvents;
