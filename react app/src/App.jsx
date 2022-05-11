import React from "react";
import { Routes, Route } from "react-router-dom";
import MapViewComponent from "./components/mapViewComponent";


function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<MapViewComponent />} />
      </Routes>
    </main>
  );
}

export default App;
