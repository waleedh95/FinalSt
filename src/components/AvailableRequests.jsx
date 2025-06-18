// src/components/AvailableRequests.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './AvailableRequests.css';

const BACKEND = import.meta.env.VITE_BACKEND_URL;

export default function AvailableRequests() {
  const [requests, setRequests] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState('');

  useEffect(() => {
    fetch(`${BACKEND}/api/donor/requests`, {
      credentials: 'include'
    })
      .then(res => {
        if (!res.ok) throw new Error(`API error ${res.status}`);
        return res.json();
      })
      .then(data => setRequests(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleDonate = async (id) => {
    try {
      const res = await fetch(
        `${BACKEND}/api/donor/requests/${id}/donate`,
        {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ units: 1 })      // always 1
        }
      );
      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error || `Donate failed (${res.status})`);
      }
      // remove this request from the list so you can't donate again
      setRequests(rs => rs.filter(r => r.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <div className="loading">Loading requests…</div>;
  if (error)   return <div className="loading text-danger">{error}</div>;
  if (!requests.length) return <div className="loading">No open requests.</div>;

  return (
    <div className="available-requests-container">
      <h2>Available Requests</h2>
      <div className="available-grid">
        {requests.map(req => (
          <div key={req.id} className="available-card">
            <div className="available-card-header">
              <span className="blood-type">{req.blood_type}</span>
              <span className={`status ${req.status.toLowerCase()}`}>
                {req.status}
              </span>
            </div>
            <div className="available-card-body">
              <p><strong>Needed:</strong> {req.units_needed}</p>
              <p><strong>Fulfilled:</strong> {req.units_fulfilled}</p>
              <p><strong>Location:</strong> {req.location}</p>
              <p><strong>Deadline:</strong> {req.deadline}</p>
              {req.notes && <p><strong>Notes:</strong> {req.notes}</p>}
            </div>
            <div className="available-card-actions">
              <button
                className="btn donate-btn"
                onClick={() => handleDonate(req.id)}
              >
                Donate 1 Unit
              </button>
              <Link
                to={`/donor/requests/${req.id}`}
                className="btn detail-btn"
              >
                View
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
