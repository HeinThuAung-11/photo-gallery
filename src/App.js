import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home, NotFound } from "./pages";
import { NavbarV1, NavbarV2 } from "./components";

function App() {
  const navbar = true

  return (
    <>
      {navbar ?
        <NavbarV1 />
        :
        <NavbarV2 />
      }
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
