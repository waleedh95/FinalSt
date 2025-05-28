// src/components/NotFound.jsx

import React from 'react';            // 1. Import React
import { Link } from 'react-router-dom'; // 2. Import Link for navigation
import './NotFound.css';              // 3. Import component-specific styles

const NotFound = () => {              // 4. Define the NotFound component
  return (
    <div className="nf-container">    {/* 5. Outer wrapper */}
      <div className="nf-card">       {/* 6. Centered card */}
        <h1 className="nf-code">404</h1>    {/* 7. Large error code */}
        <p className="nf-message">Page Not Found</p> {/* 8. Friendly message */}
        <Link to="/" className="nf-home-btn"> {/* 9. Link back to Home */}
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;               // 10. Export for App.jsx routing
