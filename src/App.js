import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home, NotFound, ExplorePhoto, ExploreVideo, PhotoDetail, Search} from "./pages";
import { NavbarV1, NavbarV2 } from "./components";
import { Login } from "./pages/Login/Login";
import { Register } from "./pages/Register/Register";
import { onAuthStateChanged } from 'firebase/auth'
import { UserProfile } from "./pages/User-Profile/User-Profile";
import { About } from "./pages/About/About";
import { LogOut } from "./pages/Logout/Logout";


function App() {
  const navbar = false

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
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/userprofile" element={<UserProfile />} />
      </Routes>
    </>
  );
}

export default App;
