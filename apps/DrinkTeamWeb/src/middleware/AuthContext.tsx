import React, { createContext, useContext, useState } from 'react';
import { signIn, signOut, signUp } from './authService';

const AuthContext = createContext({isAuthenticated:false,  register:null, login:null, logout:null});

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (credentials) => {
    const token = await signIn(credentials);
    setIsAuthenticated(!!token);
  };

  const register = async (user) => {
    const reposnse = await signUp(user);
  }; 

  const logout = async () => {
    await signOut();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
