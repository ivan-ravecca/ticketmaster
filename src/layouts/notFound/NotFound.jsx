import { Container, Typography, Button, Box } from "@mui/material";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

const NotFound = () => {
  return (
    <Container
      component="main"
      maxWidth="xs"
      style={{ textAlign: "center", marginTop: "20vh" }}
    >
      <SentimentVeryDissatisfiedIcon
        style={{ fontSize: 100, color: "#f44336" }}
      />
      <Typography variant="h4" component="h1" gutterBottom>
        Oops! Page Not Found
      </Typography>
      <Typography variant="body1" gutterBottom>
        It looks like you've hit a page that doesn't exist. But don't worry,
        even the best of us get lost sometimes!
      </Typography>
      <Box mt={4}>
        <Button variant="contained" color="primary" href="/">
          Go Back Home
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound;
