import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Grid from "./Grid";
import Detail from "./Detail";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="" element={<Navigate to={"/photos"} />} />
        <Route path="/photos" element={<Grid />} />
        <Route path="/photos/:id" element={<Detail />} />
      </Routes>
    </Router>
  );
};

export default App;
