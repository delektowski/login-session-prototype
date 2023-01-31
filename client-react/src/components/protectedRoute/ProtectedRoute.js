import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import authContext from "../../contexts/authContext";

const ProtectedRoute = () => {
  const auth = useContext(authContext);
  if (!auth.authenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
