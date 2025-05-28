// src/components/DonorDashboard.jsx

import React from 'react';                                  // 1. Core React import
import { Routes, Route, Link } from 'react-router-dom';     // 2. Router components for nested routing/navigation
import AvailableRequests from './AvailableRequests';        // 3. List of all available blood requests
import MyDonations from './MyDonations';                    // 4. Donor’s past/pending donations view
import RequestDetail from './RequestDetail';                // 5. Detail view for a single request
import './DonorDashboard.css';                              // 6. Component-specific styles

const DonorDashboard = () => (                              // 7. Define DonorDashboard as a functional component
  <div className="donor-dashboard-container">               {/* 8. Wrapper for the donor dashboard */}
    <header className="donor-dashboard-header">             {/* 9. Header section */}
      <h2 className="donor-dashboard-title">Donor Dashboard</h2> {/* 10. Page title */}
      <nav className="donor-dashboard-nav">                 {/* 11. Sub-nav for donor actions */}
        <Link to="" className="btn donor-nav-btn">         {/* 12. Link to available requests */}
          Available Requests
        </Link>
        <Link to="donations" className="btn donor-nav-btn"> {/* 13. Link to donation history */}
          My Donations
        </Link>
      </nav>
    </header>

    <main className="donor-dashboard-content">               {/* 14. Content area where nested routes render */}
      <Routes>
        <Route path="/" element={<AvailableRequests />} />   {/* 15. Default: show available requests */}
        <Route path="donations" element={<MyDonations />} /> {/* 16. Show donation history */}
        <Route path=":id" element={<RequestDetail />} />     {/* 17. Show detail for a specific request */}
      </Routes>
    </main>
  </div>
);

export default DonorDashboard;                              // 18. Export component for App.jsx routing
