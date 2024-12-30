import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

const Loader = () => {
  return (
    <Box sx={{ width: "100%", margin: "10px 0 10px 0" }}>
      <LinearProgress />
    </Box>
  );
};

export default Loader;
