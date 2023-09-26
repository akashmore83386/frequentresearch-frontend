import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegistrationForm from "./components/Registration";
import DisplayInfo from "./components/DisplayInfo";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegistrationForm />} />
        <Route path="/display" element={<DisplayInfo />} />
      </Routes>
    </Router>
  );
}

export default App;