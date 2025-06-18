import React, { createContext, useContext, useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);    // { userId, role, exp }

  // On mount, load any existing token
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwt_decode(token);
        setUser({ userId: decoded.userId, role: decoded.role });
      } catch {
        localStorage.removeItem('token');
      }
    }
  }, []);

  // Call this to log in
  const login = async (email, password) => {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (!res.ok) {
      const { error } = await res.json();
      throw new Error(error || 'Login failed');
    }
    const { token } = await res.json();
    localStorage.setItem('token', token);
    const decoded = jwt_decode(token);
    setUser({ userId: decoded.userId, role: decoded.role });
  };

  // Call this to log out
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
