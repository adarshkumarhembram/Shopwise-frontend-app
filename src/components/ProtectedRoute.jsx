// src/components/ProtectedRoute.jsx
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const user = useSelector((s) => s.auth?.user ?? null);
  return user ? children : <Navigate to="/login" replace />;
}
