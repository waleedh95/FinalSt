// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';  // only if you’ve run `npm install bootstrap`
import './App.css';

import Home from './components/Home';
import Login from './components/Login';
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
  return (
    <Router>
      {/* top-nav */}
      <nav className="p-3 bg-light">
        <Link className="me-3" to="/">Home</Link>
        <Link className="me-3" to="/hospital">Hospital</Link>
        <Link className="me-3" to="/donor">Donor</Link>
        <Link className="me-3" to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
      </nav>

      <div className="p-4">
        <Routes>
          {/* public */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
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

          {/* catch‐all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
