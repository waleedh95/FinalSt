import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './CreateRequest.css';

const BACKEND = import.meta.env.VITE_BACKEND_URL;

const CreateRequest = () => {
  const navigate = useNavigate();
  const user = useAuth();

  const [bloodType, setBloodType] = useState('A+');
  const [units, setUnits] = useState(1);
  const [location, setLocation] = useState('');
  const [deadline, setDeadline] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    if (!user) {
      setError('Please log in to create a request');
      return;
    }

    try {
      const res = await fetch(`${BACKEND}/api/requests`, {
        method: 'POST',
        credentials: 'include',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.access_token}`
        },
        body: JSON.stringify({
          blood_type: bloodType,
          units_needed: units,
          location,
          deadline,
          notes
        }),
      });
      if (!res.ok) {
        const { error: msg } = await res.json();
        throw new Error(msg || 'Failed to create request');
      }
      // success → go back to your list
      navigate('/hospital/requests');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="create-request-container">
      <div className="create-request-card">
        <h2 className="title">New Blood Request</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit} className="form">
          {/* Blood Type */}
          <div className="form-group">
            <label htmlFor="bloodType">Blood Type</label>
            <select
              id="bloodType"
              value={bloodType}
              onChange={e => setBloodType(e.target.value)}
            >
              {['A+','A–','B+','B–','O+','O–','AB+','AB–'].map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* Units */}
          <div className="form-group">
            <label htmlFor="units">Units Needed</label>
            <input
              type="number"
              id="units"
              min="1"
              value={units}
              onChange={e => setUnits(e.target.value)}
            />
          </div>

          {/* Location */}
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={e => setLocation(e.target.value)}
              placeholder="City, Ward…"
            />
          </div>

          {/* Deadline */}
          <div className="form-group">
            <label htmlFor="deadline">Deadline</label>
            <input
              type="date"
              id="deadline"
              value={deadline}
              onChange={e => setDeadline(e.target.value)}
            />
          </div>

          {/* Notes */}
          <div className="form-group">
            <label htmlFor="notes">Notes (optional)</label>
            <textarea
              id="notes"
              rows="3"
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Anything else?"
            />
          </div>

          <button type="submit" className="btn submit-btn">
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateRequest;