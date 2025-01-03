import { useState, useContext } from "react";
import SearchBar from "/src/components/searchBar/SearchBar";
import ListingSearchedEvents from "/src/features/listingSearchedEvents/ListingSearchedEvents";
import searchEvents from "/src/services/searchEvents";
import TicketMasterContext from "/src/state/TicketMasterContext";
import Loader from "../../components/loader/Loader";
import { Container, Typography } from "@mui/material";

const Home = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [ticketMasterContext, setTicketMasterContext] =
    useContext(TicketMasterContext);
  const [events, setEvents] = useState(
    ticketMasterContext && ticketMasterContext.searchedEvents
      ? ticketMasterContext.searchedEvents
      : [],
  );
  const [searchTerm, setSearchTerm] = useState(
    ticketMasterContext && ticketMasterContext.searchedTerm
      ? ticketMasterContext.searchedTerm
      : "",
  );

  const onSearch = async (args) => {
    setIsSearching(true);
    const results = await searchEvents({ keyword: args });
    setSearchTerm(args);
    setEvents(results);
    setTicketMasterContext({
      ...ticketMasterContext,
      searchedEvents: results,
      searchedTerm: args,
    });
    setIsSearching(false);
  };

  return (
    <Container>
      <Typography variant="h2" gutterBottom>
        Welcome to TicketMaster
      </Typography>
      <Typography variant="body1" gutterBottom>
        Search for awesome events
      </Typography>
      <SearchBar onSearch={onSearch} searchTerm={searchTerm} />
      {!isSearching && (
        <ListingSearchedEvents events={events} searchTerm={searchTerm} />
      )}
      {isSearching && <Loader />}
    </Container>
  );
};

export default Home;
