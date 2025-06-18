import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateRequest.css';  // assume you have some styles here

const BACKEND = import.meta.env.VITE_BACKEND_URL;

export default function CreateRequest() {
  const navigate = useNavigate();

  // mirror exactly the fields in your router.post(...)
  const [form, setForm] = useState({
    hospital_id: 1,     // default for testing; replace with real user ID later
    blood_type:  'A+',
    units_needed: 1,
    location:     '',
    deadline:     '',
    notes:        ''
  });
  const [error, setError] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({
      ...f,
      [name]: name === 'units_needed' 
        ? Number(value)    // ensure we send a number
        : value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch(`${BACKEND}/api/requests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const payload = await res.json();
      if (!res.ok) {
        // server sends { error: '...' }
        throw new Error(payload.error || `API error ${res.status}`);
      }

      // on success, go back to the list
      navigate('/hospital/requests');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="create-request-container">
      <div className="create-request-card">
        <h2>Create New Blood Request</h2>

        {error && 
          <div className="alert alert-danger">{error}</div>
        }

        <form onSubmit={handleSubmit}>

          {/* Blood Type */}
          <div className="mb-3">
            <label htmlFor="blood_type" className="form-label">Blood Type</label>
            <select
              id="blood_type"
              name="blood_type"
              className="form-select"
              value={form.blood_type}
              onChange={handleChange}
              required
            >
              {['A+','A–','B+','B–','O+','O–','AB+','AB–'].map(bt => (
                <option key={bt} value={bt}>{bt}</option>
              ))}
            </select>
          </div>

          {/* Units Needed */}
          <div className="mb-3">
            <label htmlFor="units_needed" className="form-label">Units Needed</label>
            <input
              type="number"
              id="units_needed"
              name="units_needed"
              className="form-control"
              min="1"
              value={form.units_needed}
              onChange={handleChange}
              required
            />
          </div>

          {/* Location */}
          <div className="mb-3">
            <label htmlFor="location" className="form-label">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              className="form-control"
              value={form.location}
              onChange={handleChange}
              required
            />
          </div>

          {/* Deadline */}
          <div className="mb-3">
            <label htmlFor="deadline" className="form-label">Deadline</label>
            <input
              type="date"
              id="deadline"
              name="deadline"
              className="form-control"
              value={form.deadline}
              onChange={handleChange}
              required
            />
          </div>

          {/* Notes */}
          <div className="mb-3">
            <label htmlFor="notes" className="form-label">Notes (optional)</label>
            <textarea
              id="notes"
              name="notes"
              className="form-control"
              rows="3"
              value={form.notes}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
}