import React from "react";
import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Navbar from "./Components/Navbar";
import { theme } from "./Utilities/theme";
import { ThemeProvider } from "@mui/material/styles";
import EventDetails from "./Pages/EventDetails";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <HashRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/eventdetails" element={<EventDetails />} />
          </Routes>
        </HashRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
