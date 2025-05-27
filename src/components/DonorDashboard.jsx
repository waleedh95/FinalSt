import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import AvailableRequests from './AvailableRequests'
import MyDonations from './MyDonations'
import RequestDetail from './RequestDetail'

const DonorDashboard = () => (
  <div>
    <h2>Donor Dashboard</h2>
    <nav>
      <Link className="me-3" to="">Available Requests</Link>
      <Link to="donations">My Donations</Link>
    </nav>

    <Routes>
      <Route path="/" element={<AvailableRequests />} />
      <Route path="donations" element={<MyDonations />} />
      <Route path=":id" element={<RequestDetail />} />
    </Routes>
  </div>
)

export default DonorDashboard