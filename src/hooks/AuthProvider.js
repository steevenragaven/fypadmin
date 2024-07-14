import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'universal-cookie';

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState('');
  const cookies = new Cookies();

  useEffect(() => {
    const savedUserType = cookies.get('userType');
    if (savedUserType) {
      setIsAuthenticated(true);
      setUserType(savedUserType);
    }
  }, []);

  const login = (type) => {
    setIsAuthenticated(true);
    setUserType(type);
    cookies.set('userType', type, { path: '/' });
  };

  const logout = () => {
    console.log('logout');
    setIsAuthenticated(false);
    setUserType('');
    cookies.remove('userType', { path: '/' });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userType, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
