import { useContext, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Button,
  Popover,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import favEventsHelper from "../../services/favEventsHelper";
import TicketMasterContext from "/src/state/TicketMasterContext";

const MyEvents = () => {
  const [ticketMasterContext] = useContext(TicketMasterContext);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    data: events,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["favEvents"],
    queryFn: favEventsHelper.getAllEvents,
  });

  const deleteEventMutation = useMutation({
    mutationFn: favEventsHelper.deleteFavEvent,
    onSuccess: () => {
      queryClient.invalidateQueries(["favEvents"]);
    },
  });

  const handleDelete = (eventId) => {
    deleteEventMutation.mutate(eventId);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const [popoverContent, setPopoverContent] = useState("");

  const handleShowNotes = (event, notes) => {
    setAnchorEl(event.currentTarget);
    setPopoverContent(notes);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
    setPopoverContent("");
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return <Alert severity="error">Error: {error.message}</Alert>;
  }
  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" gutterBottom>
        These are the list of your favorite events ({events?.length})
      </Typography>
      <List>
        {events &&
          events.map((row, index) => (
            <ListItem
              key={row.id}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                },
              }}
            >
              <ListItemText
                primary={
                  <>
                    <Typography
                      component={RouterLink}
                      to={`/event/${row.event.id}`}
                      sx={{ textDecoration: "none", color: "inherit" }}
                    >
                      {index + 1} - {row?.event?.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {row.notes.length > 130 ? (
                        <>
                          {row.notes.substring(0, 130)}...
                          <Button
                            variant="text"
                            onClick={(event) =>
                              handleShowNotes(event, row.notes)
                            }
                          >
                            Show notes
                          </Button>
                        </>
                      ) : (
                        row.notes
                      )}
                    </Typography>
                  </>
                }
              />
              <Box>
                <IconButton
                  onClick={() => handleDelete(row.event.id)}
                  aria-label="delete"
                >
                  <Delete />
                </IconButton>
                <IconButton
                  onClick={() => navigate(`/event/${row.event.id}`)}
                  aria-label="edit"
                >
                  <Edit />
                </IconButton>
              </Box>
            </ListItem>
          ))}
      </List>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography>{popoverContent}</Typography>
        </Box>
      </Popover>

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

export default MyEvents;
