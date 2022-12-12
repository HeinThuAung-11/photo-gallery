import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Home, NotFound, ExplorePhoto, ExploreVideo, PhotoDetail, SearchPhotos, AboutPage } from "./pages";
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
import { SearchVideos } from "./pages/SearchVideo/SearchVideo";
import { UserPhoto } from "./pages/UserProfile/UserPhoto";
import { UserVideo } from "./pages/UserProfile/UserVideo";
import ProtectedRoute from "./routes/protectedRoute";
import { LoginPage } from "./pages/Login/LoginPage";
import { RegisterPage } from "./pages/Register/RegisterPage";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

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
      <ToastContainer />
      <Routes >
        <Route path="/explore/photos" element={<ExplorePhoto />} />
        <Route path="/explore/videos" element={<ExploreVideo />} />
        <Route path="/search/photos" element={<SearchPhotos />} />
        <Route path="/search/videos" element={<SearchVideos />} />
        <Route path="/photo/detail/:dataID" element={<PhotoDetail />} />
        <Route path="/video/detail/:videoId" element={<VideoDetail />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/userprofile" element={
          <ProtectedRoute user={currentUser}>
            <UserProfile />
          </ProtectedRoute>
        } />
        {/*<Route path="/userprofile/videos" element={ <ProtectedRoute user={currentUser}>*/}
        {/*  <UserVideo />*/}
        {/*</ProtectedRoute>} />*/}
        <Route path="/" exact element={<Home />} />

      </Routes>

    </>
  );
}

export default App;
