//React
import React from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

//styles and components
import "./App.css";
import LoginScreen from "./authComponent/loginScreen";
import SignupScreen from "./authComponent/signupScreen";
import Dashboard from "./Dashboard/dashboard";
import NewChanges from './Dashboard/newChanges';
import { ToastContainer } from "react-toastify";
import VerifyOtpScreen from "./authComponent/verifyOtpScreen";
import { useAuth, AuthProvider } from "./context/AuthContext";
import Error404 from "./antd/error404";
import NewChanges from "./Dashboard/newChanges"

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
    // {
    //   path: "/dashboard",
    //   element: isAuthenticated ? <Dashboard /> : <Navigate to="/login" />,
    // },
    {
      path: "/dashboard",
      element: isAuthenticated ? <NewChanges /> : <Navigate to="/login" />,
    },
    // {
    //   path: "/dashboard",
    //   element: isAuthenticated ? <NewChanges /> : <Navigate to="/login" />,
    // },
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
    {/* <ToastContainer position="top-right" autoClose={5000} /> */}

      <AppContent />
    </AuthProvider>
  );
}

export default App;
