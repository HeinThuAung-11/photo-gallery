import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import {
  AboutPage,
  ExplorePhoto,
  ExploreVideo,
  Home,
  NotFound,
  PhotoDetail,
  SearchPhotos,
} from "./pages";
import { NavbarV1, NavbarV2 } from "./components";
import { UserProfile } from "./pages/UserProfile/UserProfile";
import { useAuth } from "./utli/Auth";
import { VideoDetail } from "./pages/VideoDetail/VideoDetail";
import { useDispatch } from "react-redux";
import { getAllData } from "./features/user/userSlice";
import { SearchVideos } from "./pages/SearchVideo/SearchVideo";
import ProtectedRoute, { ReverseProtectedRoute } from "./routes/protectedRoute";
import { LoginPage } from "./pages/Login/LoginPage";
import { RegisterPage } from "./pages/Register/RegisterPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const dispatch = useDispatch();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      dispatch(getAllData(currentUser.uid));
    }
  }, [currentUser, dispatch]);
  return (
    <>
      {currentUser ? <NavbarV1 /> : <NavbarV2 />}
      <ToastContainer />
      <Routes>
        <Route path="/explore/photos" element={<ExplorePhoto />} />
        <Route path="/explore/videos" element={<ExploreVideo />} />
        <Route path="/search/photos" element={<SearchPhotos />} />
        <Route path="/search/videos" element={<SearchVideos />} />
        <Route path="/photo/detail/:dataID" element={<PhotoDetail />} />
        <Route path="/video/detail/:videoId" element={<VideoDetail />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/about" element={<AboutPage />} />
        <Route
          path="/login"
          element={
            <ReverseProtectedRoute user={currentUser}>
              <LoginPage />
            </ReverseProtectedRoute>
          }
        />
        <Route
          path="/register"
          element={
            <ReverseProtectedRoute user={currentUser}>
              <RegisterPage />
            </ReverseProtectedRoute>
          }
        />
        <Route
          path="/userprofile"
          element={
            <ProtectedRoute user={currentUser}>
              <UserProfile />
            </ProtectedRoute>
          }
        />
        <Route path="/" exact element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
