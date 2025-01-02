import { Link as RouterLink, useLocation } from "react-router-dom";
import { AppBar, Toolbar, Button } from "@mui/material";
import { useContext } from "react";
import TicketMasterContext from "/src/state/TicketMasterContext";
import "./Header.css";

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
    <AppBar
      position="static"
      sx={{
        backgroundColor: "color(srgb 0.1 0.46 0.82 / 0.65)",
        boxShadow: "none",
      }}
    >
      <Toolbar>
        <Button
          component={RouterLink}
          to="/"
          color="inherit"
          className={`header-link ${isActive("/")}`}
          onClick={handleHomeClick}
        >
          Home
        </Button>
        <Button
          component={RouterLink}
          to="/my-events"
          color="inherit"
          className={`header-link ${isActive("/my-events")}`}
        >
          My Events
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
