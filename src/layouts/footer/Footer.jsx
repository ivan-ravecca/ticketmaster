import { Link } from "react-router-dom";
import TicketMasterContext from "/src/state/TicketMasterContext";
import { useContext } from "react";

const Footer = () => {
  const { ticketMasterContext, setTicketMasterContext } =
    useContext(TicketMasterContext);

  const handleHomeClick = () => {
    setTicketMasterContext({
      ...ticketMasterContext,
      searchedEvents: [],
      searchTerm: "",
    });
  };
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>
          &copy; {new Date().getFullYear()} TicketMaster. All rights reserved.
        </p>
        <nav className="footer-nav">
          <Link to="/" onClick={handleHomeClick}>
            Home
          </Link>
          <Link to="/my-events">My Events</Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
