// src/components/Login.jsx
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './Login.css';

const Login = () => {
  const { loginWithRedirect, logout, user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return <div className="login-container"><div className="login-card">Loading...</div></div>;

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login</h2>
        {isAuthenticated ? (
          <>
            <div className="user-info">
              <img src={user.picture} alt={user.name} style={{ width: 60, borderRadius: '50%' }} />
              <h3>Welcome, {user.name}</h3>
              <p>{user.email}</p>
            </div>
            <button className="btn login-btn" onClick={() => logout({ returnTo: window.location.origin })}>
              Log Out
            </button>
          </>
        ) : (
          <button className="btn login-btn" onClick={() => loginWithRedirect()}>
            Log In with Auth0
          </button>
        )}
      </div>
    </div>
  );
};

export default Login;
