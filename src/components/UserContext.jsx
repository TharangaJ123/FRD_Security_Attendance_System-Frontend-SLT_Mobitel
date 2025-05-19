import React, { createContext, useState, useContext } from "react";

// Create the context
const UserContext = createContext();

// Create a Provider Component
export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    userId: null,
    userRole: null,
    userName:null,
  });

  // Update both userId and userRole
  const setUser = (userId, userRole,userName) => {
    setUserData({ userId, userRole,userName });
  };

  // Update just userId
  const setUserId = (userId) => {
    setUserData(prev => ({ ...prev, userId }));
  };

  // Update just userRole
  const setUserRole = (userRole) => {
    setUserData(prev => ({ ...prev, userRole }));
  };

  const setUserName = (userName) => {
    setUserData(prev => ({ ...prev, userName }));
  };

  return (
    <UserContext.Provider value={{ 
      ...userData,
      setUser,
      setUserId, 
      setUserRole,
      setUserName 
    }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use UserContext
export const useUser = () => useContext(UserContext);