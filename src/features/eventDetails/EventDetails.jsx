import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Typography,
  Button,
  Box,
  CircularProgress,
  Alert,
  Stack,
} from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import fetchEvent from "../../services/FetchEvent";
import EventLocation from "../../components/eventLocation/EventLocation";
import EventClassification from "../../components/eventClassification/EventClassification";
import EventDates from "../../components/eventDates/EventDates";
import EventImages from "../../components/eventImages/EventImages";
import TicketMasterContext from "../../state/TicketMasterContext";
import FavEvent from "../favEvent/FavEvent";
import favEventsHelper from "../../services/favEventsHelper";

const EventDetails = () => {
  const { id } = useParams();
  const {
    isPending,
    isError,
    data: event,
    error,
  } = useQuery({
    queryKey: ["event", id],
    queryFn: fetchEvent,
  });

  const { data: storedEvent } = useQuery({
    queryKey: [id],
    queryFn: favEventsHelper.getEventById,
  });

  const navigate = useNavigate();
  const [ticketMasterContext] = useContext(TicketMasterContext);
  const queryClient = useQueryClient();

  const handleAddToFavorites = (id, notes, event) => {
    queryClient.invalidateQueries(["favEvents"]);
    favEventsHelper.updateFavEvent(id, notes, event);
  };

  if (isPending) {
    return <CircularProgress />;
  } else if (isError) {
    return <Alert severity="error">Error: {error}</Alert>;
  } else if (!event) {
    return (
      <Typography variant="body2" color="textSecondary">
        No event details available
      </Typography>
    );
  }

  return (
    <Box className="event-details" sx={{ padding: 2, position: "relative" }}>
      <>
        <FavEvent
          isFavved={storedEvent || false}
          handleAddToFavorites={handleAddToFavorites}
          event={event}
          notes={storedEvent?.notes || ""}
        ></FavEvent>
        <Typography variant="h4" component="h2" gutterBottom>
          {event.name}
        </Typography>
        <Stack direction="row" spacing={2}>
          <Box sx={{ flex: 1 }}>
            <EventLocation event={event._embedded?.venues[0]} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <EventClassification classification={event.classifications} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <EventDates event={event.dates} />
          </Box>
        </Stack>
        <Typography variant="body1" component="p">
          {event.info}
        </Typography>
        <EventImages images={event.images} />
      </>
      {ticketMasterContext && ticketMasterContext.searchedEvents && (
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/")}
        >
          Go back to search
        </Button>
      )}
    </Box>
  );
};

export default EventDetails;
