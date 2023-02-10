import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";

function Router() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />} />
      </Routes>
    </div>
  );
}

export default Router;
