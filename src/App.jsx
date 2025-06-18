import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { useAuth } from './hooks/useAuth';          // <= our hook to get the logged-in user

import Home from './components/Home';
import Signup from './components/Signup'; 
import HospitalDashboard from './components/HospitalDashboard';
import DonorDashboard from './components/DonorDashboard';
import CreateRequest from './components/CreateRequest';
import HospitalRequests from './components/HospitalRequests';
import AvailableRequests from './components/AvailableRequests';
import RequestDetail from './components/RequestDetail';
import MyDonations from './components/MyDonations';
import NotFound from './components/NotFound';

function App() {
  const user = useAuth(); // null if not logged in, else the Auth0 profile

  const BACKEND = import.meta.env.VITE_BACKEND_URL; // e.g. "http://localhost:4000"

  return (
    <Router>
      <nav className="p-3 bg-light d-flex align-items-center">
        <Link className="me-3" to="/">Home</Link>
        <Link className="me-3" to="/hospital">Hospital</Link>
        <Link className="me-3" to="/donor">Donor</Link>

        <div className="ms-auto">
          {user ? (
            <>
              <span className="me-3">Hello, {user.name}</span>
       <a
    href={`${BACKEND}/logout`}
    className="btn btn-outline-secondary"
      >
        Log Out
        </a>
            </>
          ) : (
            <button
              className="btn btn-primary"
              onClick={() => window.location.href = `${BACKEND}/login`}
            >
              Log In
            </button>
          )}
        </div>
      </nav>

      <div className="p-4">
        <Routes>
          {/* public */}
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />

          {/* hospital flow */}
          <Route path="/hospital" element={<HospitalDashboard />} />
          <Route path="/hospital/requests/new" element={<CreateRequest />} />
          <Route path="/hospital/requests" element={<HospitalRequests />} />
          <Route path="/hospital/requests/:id" element={<RequestDetail />} />

          {/* donor flow */}
          <Route path="/donor" element={<DonorDashboard />} />
          <Route path="/donor/requests" element={<AvailableRequests />} />
          <Route path="/donor/requests/:id" element={<RequestDetail />} />
          <Route path="/donor/donations" element={<MyDonations />} />

          {/* catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;