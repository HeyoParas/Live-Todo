import React from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import LoginScreen from "./authComponent/loginScreen";
import SignupScreen from "./authComponent/signupScreen";
import Dashboard from "./Dashboard/dashboard";
import VerifyOtpScreen from "./authComponent/verifyOtpScreen";
import "./App.css";
import { useAuth, AuthProvider } from "../context/AuthContext";

function AppContent() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated === null) {
    return <></>;     // Waiting for authentication check
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: isAuthenticated ? <Navigate to="/dashboard" /> : <LoginScreen />,
    },
    {
      path: "/verifyOtp",
      element: isAuthenticated ? <Navigate to="/dashboard" /> : <VerifyOtpScreen />,
    },
    {
      path: "/login",
      element: isAuthenticated ? <Navigate to="/dashboard" /> : <LoginScreen />,
    },
    {
      path: "/signup",
      element: isAuthenticated ? <Navigate to="/dashboard" /> : <SignupScreen />,
    },
    {
      path: "/dashboard",
      element: isAuthenticated ? <Dashboard /> : <Navigate to="/login" />,
    },
    {
      path: "*",
      element: <h1>Page Not Found</h1>,
    },
  ]);

  return <RouterProvider router={router} />;
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
