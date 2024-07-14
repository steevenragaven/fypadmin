import { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';

const useAuth = () => {
  const cookies = new Cookies();
  const [userType, setUserType] = useState(cookies.get('userType') || null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!userType);

  useEffect(() => {
    if (userType) {
      cookies.set('userType', userType, { path: '/' });
    }
  }, [userType]);

  const login = (username, password, userType) => {
    if (
      (userType === 'admin' && username === 'admin' && password === 'admin') ||
      (userType === 'deliveryman' && username === 'deliveryman' && password === 'deliveryman') ||
      (userType === 'storemanager' && username === 'storemanager' && password === 'storemanager')
    ) {
      setUserType(userType);
      setIsAuthenticated(true);
      cookies.set('userType', userType, { path: '/' });
      return true;
    } else {
      return false;
    }
  };

  const logout = () => {
    setUserType(null);
    setIsAuthenticated(false);
    cookies.remove('userType', { path: '/' });
  };

  return {
    isAuthenticated,
    userType,
    login,
    logout,
  };
};

export default useAuth;
