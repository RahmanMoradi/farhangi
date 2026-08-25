"use client";
import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [token, setToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const TOKEN_KEY = "farhangi_token";

  const getToken = () => {
    return localStorage.getItem(TOKEN_KEY);
  };

  const fetchUserInfo = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
        headers: {
          Authorization: token,
        },
      });
      setUserInfo(response.data.data);
    } catch (err) {
      setUserInfo(null);
    } finally {
      setLoading(false);
    }
  };

  const login = (newToken) => {
    localStorage.setItem(TOKEN_KEY, newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setUserInfo(null);
  };

  useEffect(() => {
    const storedToken = getToken();
    if (storedToken) {
      setToken(storedToken);
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetchUserInfo();
    } else {
      setLoading(false);
    }
  }, [token]);

  return (
    <UserContext.Provider value={{ 
      userInfo, 
      token, 
      loading, 
      login, 
      logout, 
      fetchUserInfo 
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}