import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages";
import { NavbarV1 } from "./components";

function App() {
  return (
    <>
      <NavbarV1 />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
