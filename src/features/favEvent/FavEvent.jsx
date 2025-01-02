import { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  TextField,
  IconButton,
} from "@mui/material";
import { Star, StarBorder } from "@mui/icons-material";

const FavEvent = ({ isFavved, notes, handleAddToFavorites, event }) => {
  const [_notes, setNotes] = useState(notes || "");
  const [_isFavved, setIsFavved] = useState(isFavved || false);
  const [showModal, setShowModal] = useState(false);
  const wasStored = isFavved;

  const handleFavClick = () => {
    setShowModal(!showModal);
  };
  const handleClose = () => {
    setShowModal(!showModal);
  };

  const handleAccept = () => {
    if (!wasStored) {
      setIsFavved(!_isFavved);
    }
    handleAddToFavorites(event.id, _notes, event);
    handleClose();
  };

  const boxStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      {!showModal && (
        <IconButton
          sx={{ position: "absolute", top: 16, right: 16 }}
          onClick={handleFavClick}
          aria-label={_isFavved ? "Update favorite" : "Mark as favorite"}
          title={_isFavved ? "Update favorite" : "Mark as favorite"}
        >
          {_isFavved ? <Star sx={{ color: "yellow" }} /> : <StarBorder />}
        </IconButton>
      )}

      <Modal
        open={showModal}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={boxStyle}>
          <Typography id="modal-title" variant="h6" component="h2">
            {wasStored ? "Update favorite event" : "Add to my favorites"}
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            {wasStored ? (
              <>
                Do you want to update <b>{event.name}</b> from your favorites?
              </>
            ) : (
              <>
                Do you want to add <b>{event.name}</b> to your favorites?
              </>
            )}
          </Typography>
          <TextField
            label="Notes"
            multiline
            rows={4}
            value={_notes}
            onChange={(e) => setNotes(e.target.value)}
            fullWidth
            sx={{ mt: 2 }}
          />
          <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
            <Button variant="contained" color="primary" onClick={handleAccept}>
              {wasStored ? "Update" : "Accept"}
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default FavEvent;
