import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages";
import { Navbar } from "./components";
import {Login} from "./pages/Login/Login";
import {Register} from "./pages/Register/Register";
import {useState, useEffect} from 'react'
import {onAuthStateChanged} from 'firebase/auth'
import {UserProfile} from "./pages/User-Profile/User-Profile";
import {useSelector} from "react-redux";
import {userInfo} from "./features/user/userSlice";
import {About} from "./pages/About/About";


function App() {
    // const [currentUser, setCurrentUser] = useState(null)
    const currentUser = useSelector(userInfo)
    // useEffect(() => {
    //     onAuthStateChanged(auth, (user) => {
    //         setCurrentUser(user)
    //     })
    // }, [])

    return (
    <>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      <Navbar />
        <About/>
        <UserProfile/>
      <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
      </Routes>
    </>
  );
}

export default App;
