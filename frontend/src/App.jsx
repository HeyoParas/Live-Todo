//React
import React from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

//styles and components
import "./App.css";
import LoginScreen from "./authComponent/loginScreen";
import SignupScreen from "./authComponent/signupScreen";
import Dashboard from "./Dashboard/dashboard";
import VerifyOtpScreen from "./authComponent/verifyOtpScreen";
import ForgotPassword from "./authComponent/forgotPassword";
import { useAuth, AuthProvider } from "./context/AuthContext";
import Error404 from "./antd/error404";

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
      element: isAuthenticated ? <Navigate to="/dashboard" /> : <VerifyOtpScreen/>,
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
      path: "/forgotPassword",
      element: <ForgotPassword />
    },
    {
      path: "*",
      element: <Error404 />,
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
