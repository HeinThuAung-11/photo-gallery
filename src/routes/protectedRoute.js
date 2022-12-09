import React, {Component, useState} from 'react';
import {
    Link,
    Route,
    Navigate,
} from "react-router-dom";
export default  function ProtectedRoute({ children, user})  {

    console.log("Protected Route Render");
    return user ? children : <Navigate to={'/login'} /> ;
}
