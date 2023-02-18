import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Error404 from "./pages/Error404";
import Counter from "./pages/Counter";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import "./styles/Router.scss";

function Router() {
  return (
    <div className="routes">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/game" element={<Counter />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
  );
}

export default Router;
