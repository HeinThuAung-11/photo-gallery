import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home, NotFound, ExplorePhoto, ExploreVideo, PhotoDetail, SearchPhotos } from "./pages";
import { NavbarV1, NavbarV2 } from "./components";
import { Login } from "./pages/Login/Login";
import { Register } from "./pages/Register/Register";
import { onAuthStateChanged } from 'firebase/auth'
import { UserProfile } from "./pages/UserProfile/UserProfile";
import { About } from "./pages/About/About";
import { LogOut } from "./pages/Logout/Logout";
import { useAuth } from './utli/Auth'
import { auth } from './utli/firebase'
import { useEffect } from 'react'
import { VideoDetail } from "./pages/VideoDetail/VideoDetail";
import { useDispatch } from "react-redux";
import { getAllData } from "./features/user/userSlice";

function App() {
  const dispatch = useDispatch()
  const { currentUser } = useAuth()
  useEffect(() => {
    if (currentUser) {
      dispatch(getAllData(currentUser.uid))
    }
  }, [currentUser, dispatch])
  return (
    <>
      {currentUser ?
        <NavbarV1 />
        :
        <NavbarV2 />
      }
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/explore/photos" element={<ExplorePhoto />} />
        <Route path="/explore/videos" element={<ExploreVideo />} />
        <Route path="/search/photos" element={<SearchPhotos />} />
        <Route path="/photo/detail/:dataID" element={<PhotoDetail />} />
        <Route path="/video/detail/:videoId" element={<VideoDetail />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/userprofile" element={<UserProfile />} />
      </Routes>
    </>
  );
}

export default App;
