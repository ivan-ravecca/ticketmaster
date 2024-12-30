import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import TicketMasterContext from "/src/state/TicketMasterContext";

const Header = () => {
  const location = useLocation();
  const { ticketMasterContext, setTicketMasterContext } =
    useContext(TicketMasterContext);

  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  const handleHomeClick = () => {
    setTicketMasterContext({
      ...ticketMasterContext,
      searchedEvents: [],
      searchTerm: "",
    });
  };

  return (
    <header className="header">
      <Link
        to="/"
        className={`header-link ${isActive("/")}`}
        onClick={handleHomeClick}
      >
        <h1>Home</h1>
      </Link>
      <Link to="/my-events" className={`header-link ${isActive("/my-events")}`}>
        <h1>My Events</h1>
      </Link>
    </header>
  );
};

export default Header;
