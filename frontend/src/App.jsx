import React, { useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import LoginScreen from './authComponent/loginScreen'
import SignupScreen from './authComponent/signupScreen'
import Dashboard from './Dashboard/dashboard';
import VerifyOtpScreen from './authComponent/verifyOtpScreen'
import './App.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null); 

  useEffect(() => {
    // const verifyLogin = async () => {
    //   const loggedIn = await checkIfLogin();
    //   console.log(loggedIn);
    //   setIsAuthenticated(loggedIn);
    // };
    
    // verifyLogin(); // Check authentication status on load
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginScreen/>, 
    },
    {
      path : "/verifyOtp",
      element: <VerifyOtpScreen/>
    },
    {
      path: "/login",
      element:<LoginScreen/>,
    },
    {
      path: "/signup",
      element:<SignupScreen/>, 
    },
    {
      path: "/dashboard",
      element: <Dashboard/>,  
    },
    {
      path: "*",
      element: <h1>Page Not Found</h1>,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App