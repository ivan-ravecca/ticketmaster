import { useState } from "react";
import "./App.css";
import Footer from "./layouts/footer/Footer";
import Header from "./layouts/header/Header";
import Home from "./pages/home/Home";
import MyEvents from "./pages/myEvents/MyEvents";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TicketMasterContext from "./state/TicketMasterContext";
import EventDetails from "./features/eventDetails/EventDetails";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

function App() {
  const ticketMasterState = useState(null);

  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg" align="center">
        <Box sx={{ bgcolor: "#cfe8fc" }}>
          <BrowserRouter>
            <QueryClientProvider client={queryClient}>
              <TicketMasterContext.Provider value={ticketMasterState}>
                <Header />
                <Routes>
                  <Route path="/my-events" element={<MyEvents />} />
                  <Route path="/event/:id" element={<EventDetails />} />
                  <Route path="/" element={<Home />} />
                </Routes>
                <Footer />
              </TicketMasterContext.Provider>
            </QueryClientProvider>
          </BrowserRouter>
        </Box>
      </Container>
    </>
  );
}

export default App;
