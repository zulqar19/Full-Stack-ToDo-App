import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";

// PrivateRoute component to handle logged-in users
export const PrivateRoute = () => {
    const { user } = useContext(AuthContext);
    return user ? <HomePage /> : <Navigate to="/login" replace />;
  };
  
  // PublicRoute component to handle not logged-in users
export const PublicRoute = () => {
    const { user } = useContext(AuthContext);
    return !user ? <LoginPage /> : <Navigate to="/" replace />;
  };
  