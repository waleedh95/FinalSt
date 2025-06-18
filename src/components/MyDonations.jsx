// src/components/MyDonations.jsx
import React, { useEffect, useState } from 'react';
import './MyDonations.css';

const BACKEND = import.meta.env.VITE_BACKEND_URL;

export default function MyDonations() {
  const [donations, setDonations] = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState('');

  useEffect(() => {
    fetch(`${BACKEND}/api/donor/donations`, {
      credentials: 'include'
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to load donations');
        return res.json();
      })
      .then(setDonations)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="md-loading">Loading…</div>;
  if (error)   return <div className="md-loading">{error}</div>;
  if (!donations.length) return <div className="md-loading">No donations yet.</div>;

  return (
    <div className="my-donations-container">
      <h2 className="md-header">My Donation History</h2>
      <table className="md-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Request ID</th>
            <th>Blood Type</th>
            <th>Units</th>
            <th>Status</th>
            <th>Location</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {donations.map(d => (
            <tr key={d.id}>
              <td>{d.id}</td>
              <td>{d.request_id}</td>
              <td>{d.blood_type}</td>
              <td>{d.units}</td>
              <td><span className={`md-status ${d.status.toLowerCase()}`}>{d.status}</span></td>
              <td>{d.location}</td>
              <td>{new Date(d.donated_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
