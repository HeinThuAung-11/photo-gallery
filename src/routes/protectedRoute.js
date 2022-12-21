import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, user }) {
  return user ? children : <Navigate to={"/login"} />;
}

export const ReverseProtectedRoute = ({ children, user }) => {
  return user ? <Navigate to={"/"} /> : children;
};
