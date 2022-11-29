import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home, NotFound, Explore } from "./pages";
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
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/userprofile" element={<UserProfile />} />
      </Routes>
    </>
  );
}

export default App;
