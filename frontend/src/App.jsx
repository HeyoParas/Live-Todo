import React, { useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import LoginScreen from './authComponent/loginScreen'
import SignupScreen from './authComponent/signupScreen'
import Dashboard from './Dashboard/dashboard';
import VerifyOtpScreen from './authComponent/verifyOtpScreen'
import './App.css'
import axios from 'axios'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null); 

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const response = await axios.get("http://localhost:7000/auth/checkToken", {
          withCredentials: true, 
        });
        console.log("Authentication response:", response.data.success);
        setIsAuthenticated(response.data.success);
      } catch (error) {
        console.error("Error checking authentication:", error);
        setIsAuthenticated(false);
      }
    };
  
    verifyAuth();
  }, []);

  if (isAuthenticated === null) {
    return <></>;
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: isAuthenticated ? <Navigate to="/dashboard" /> : <LoginScreen setIsAuthenticated={setIsAuthenticated}/>,
    },
    {
      path : "/verifyOtp",
      element: isAuthenticated ? <Navigate to="/dashboard" /> : <VerifyOtpScreen />,
    },
    {
      path: "/login",
      element: isAuthenticated ? <Navigate to="/dashboard" /> : <LoginScreen setIsAuthenticated={setIsAuthenticated}/>,
    },
    {
      path: "/signup",
      element:isAuthenticated ? <Navigate to="/dashboard" /> : <SignupScreen />,
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
};

export default App
