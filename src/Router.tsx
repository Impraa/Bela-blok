import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Error404 from "./pages/Error404";
import Counter from "./pages/Counter";

function Router() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/game" element={<Counter />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
  );
}

export default Router;
