import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import fetchEvent from "../../services/FetchEvent";
import { useQuery } from "@tanstack/react-query";
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
    return <div>Loading...</div>;
  } else if (isError) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      {data ? (
        <div className="event-details">
          <h2>{data.name}</h2>
          <EventLocation event={data._embedded.venues[0]} />
          <EventClassification classification={data.classifications} />
          <EventDates event={data.dates} />
          <p>{data.info}</p>
          <EventImages images={data.images} />
        </div>
      ) : (
        <i>No event details available</i>
      )}

      {ticketMasterContext && ticketMasterContext.searchedEvents ? (
        <button onClick={() => navigate("/")}>Go back to search</button>
      ) : (
        ""
      )}
    </>
  );
};

export default EventDetails;
