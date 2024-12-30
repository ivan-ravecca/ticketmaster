import TicketMasterContext from "/src/state/TicketMasterContext";
import { useContext } from "react";
import { Container, Typography, Box, Link, Stack } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

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

  const boxStyle = {
    bgcolor: "background.paper",
    p: 6,
    mt: "auto",
    textAlign: "center",
    borderTop: "1px solid #e0e0e0",
  };
  return (
    <footer className="footer">
      <div className="footer-content">
        <Box sx={boxStyle} component="footer">
          <Container maxWidth="lg">
            <Stack direction="row" justifyContent="center" spacing={2}>
              <Typography variant="body1">
                <Link
                  component={RouterLink}
                  to="/"
                  onClick={handleHomeClick}
                  color="inherit"
                  underline="hover"
                >
                  Home
                </Link>
              </Typography>
              <Typography variant="body1">
                <Link
                  component={RouterLink}
                  to="/my-events"
                  color="inherit"
                  underline="hover"
                >
                  My Events
                </Link>
              </Typography>
            </Stack>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
              &copy; {new Date().getFullYear()} TicketMaster. All rights
              reserved.
            </Typography>
          </Container>
        </Box>
      </div>
    </footer>
  );
};

export default Footer;
