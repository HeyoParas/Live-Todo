import React from 'react'
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

//create context
export const AuthContext = createContext();

//context provider
export const AuthProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [userData, setUserData] = useState(null);
    const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const response = await axios.get("http://localhost:7000/auth/checkToken", {
          withCredentials: true,
        });
        setIsAuthenticated(response.data.success);
      } catch (error) {
        console.error("Error checking authentication:", error);
        setIsAuthenticated(false);
      }
    };
    verifyAuth();
  }, []);
  
  return(
        <AuthContext.Provider value={{  isAuthenticated, setIsAuthenticated, userData, setUserData, tasks, setTasks }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom Hook for using context
export const useAuth = () => {
    return useContext(AuthContext);
};