import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home, NotFound, ExplorePhoto, ExploreVideo, PhotoDetail, Search } from "./pages";
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
        <Route path="/" exact element={<Home />} />
        <Route path="/explore/photos" element={<ExplorePhoto />} />
        <Route path="/explore/videos" element={<ExploreVideo />} />
        <Route path="/search" element={<Search />} />
        <Route path="/photo/detail/:dataID" element={<PhotoDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
