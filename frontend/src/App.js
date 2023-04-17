import "./App.css";
import React, { useState } from "react";
import Mold from "./components/Cargo/DropMold";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import ShipMold from "./components/Ship/ShipMold";
// import 'react-tooltip/dist/react-tooltip.min.css'

function App() {
  const [test, setTest] = useState([]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ship" element={<ShipMold />} />
        <Route path="/cargo" element={<Mold />} />
      </Routes>
    </div>
  );
}

export default App;
