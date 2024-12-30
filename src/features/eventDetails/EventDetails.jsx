import { useParams, useNavigate } from "react-router-dom";
import {
  Typography,
  Button,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import fetchEvent from "../../services/FetchEvent";
import EventLocation from "../../components/eventLocation/EventLocation";
import EventClassification from "../../components/eventClassification/EventClassification";
import EventDates from "../../components/evenDates/EventDates";
import EventImages from "../../components/eventImages/EventImages";
import TicketMasterContext from "../../state/TicketMasterContext";

const EventDetails = () => {
  const { id } = useParams();
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["event", id],
    queryFn: fetchEvent,
  });

  const [ticketMasterContext] = useContext(TicketMasterContext);
  const navigate = useNavigate();

  if (isPending) {
    return <CircularProgress />;
  } else if (isError) {
    return <Alert severity="error">Error: {error}</Alert>;
  }

  return (
    <Box className="event-details" sx={{ padding: 2 }}>
      {data ? (
        <>
          <Typography variant="h4" component="h2" gutterBottom>
            {data.name}
          </Typography>
          <EventLocation event={data._embedded.venues[0]} />
          <EventClassification classification={data.classifications} />
          <EventDates event={data.dates} />
          <Typography variant="body1" paragraph>
            {data.info}
          </Typography>
          <EventImages images={data.images} />
        </>
      ) : (
        <Typography variant="body2" color="textSecondary">
          No event details available
        </Typography>
      )}

      {ticketMasterContext && ticketMasterContext.searchedEvents ? (
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/")}
        >
          Go back to search
        </Button>
      ) : null}
    </Box>
  );
};

export default EventDetails;
