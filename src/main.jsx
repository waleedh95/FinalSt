// src/main.jsx
import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { AuthProvider } from './hooks/useAuth.jsx';
import { Auth0Provider } from '@auth0/auth0-react';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <Auth0Provider
        domain="dev-7gs5sbtzrs7ecjdw.us.auth0.com"
        clientId="2qNUQy8Vmdi3yiAMCrpuP9mqIPRJikFF"
        authorizationParams={{
          redirect_uri: window.location.origin
          // audience: "YOUR_API_IDENTIFIER" // Uncomment if using API authorization
        }}
      >
        <App />
      </Auth0Provider>
    </AuthProvider>
  </StrictMode>
);
