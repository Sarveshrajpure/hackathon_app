import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Navbar from "./Components/Navbar";
import { theme } from "./Utilities/theme";
import { ThemeProvider } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EventDetails from "./Pages/EventDetails";
import CreateEvent from "./Pages/CreateEvent";
import EditEvent from "./Pages/EditEvent";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <ToastContainer />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/eventdetails/:id" element={<EventDetails />} />
            <Route path="/createevent" element={<CreateEvent />} />
            <Route path="/editevent/:id" element={<EditEvent />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
