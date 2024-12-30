import { useState, useContext } from "react";
import SearchBar from "/src/components/searchBar/SearchBar";
import ListingSearchedEvents from "/src/features/listingSearchedEvents/ListingSearchedEvents";
import searchEvents from "/src/services/searchEvents";
import TicketMasterContext from "/src/state/TicketMasterContext";
const Home = () => {
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
    const results = await searchEvents({ keyword: args });
    setSearchTerm(args);
    setEvents(results);
    setTicketMasterContext({
      ...ticketMasterContext,
      searchedEvents: results,
      searchedTerm: args,
    });
  };
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>This is the home page of the Ticketmaster application.</p>
      <SearchBar onSearch={onSearch} searchTerm={searchTerm} />
      <ListingSearchedEvents events={events} searchTerm={searchTerm} />
    </div>
  );
};

export default Home;
