import { useState, useContext } from "react";
import SearchBar from "/src/components/searchBar/SearchBar";
import ListingSearchedEvents from "/src/features/listingSearchedEvents/ListingSearchedEvents";
import searchEvents from "/src/services/searchEvents";
import TicketMasterContext from "/src/state/TicketMasterContext";
import Loader from "../../components/loader/Loader";

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
    <div>
      <h2>Welcome to TicketMaster</h2>
      <p>Search for awesome events</p>
      <SearchBar onSearch={onSearch} searchTerm={searchTerm} />
      {!isSearching && (
        <ListingSearchedEvents events={events} searchTerm={searchTerm} />
      )}
      {isSearching && <Loader />}
    </div>
  );
};

export default Home;
