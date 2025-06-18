// src/components/RequestDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate }        from 'react-router-dom';
import './RequestDetail.css';

const BACKEND = import.meta.env.VITE_BACKEND_URL;

export default function RequestDetail() {
  const { id }        = useParams();
  const navigate      = useNavigate();
  const [request, setRequest]   = useState(null);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState('');
  const [editing, setEditing]   = useState(false);
  const [form, setForm]         = useState({
    blood_type:    '',
    units_needed:  0,
    location:      '',
    deadline:      '',
    notes:         '',
    status:        ''
  });

  // Fetch detail once
  useEffect(() => {
    fetch(`${BACKEND}/api/requests/${id}`)
      .then(res => {
        if (!res.ok) throw new Error(`API returned ${res.status}`);
        return res.json();
      })
      .then(data => {
        setRequest(data);
        // initialize form for editing
        setForm({
          blood_type:   data.blood_type,
          units_needed: data.units_needed,
          location:     data.location,
          deadline:     data.deadline,
          notes:        data.notes || '',
          status:       data.status || 'Active'
        });
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({
      ...f,
      [name]: name === 'units_needed' ? Number(value) : value
    }));
  };

  const handleSave = async () => {
    setError('');
    try {
      const res = await fetch(`${BACKEND}/api/requests/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const payload = await res.json();
      if (!res.ok) {
        throw new Error(payload.error || `Update failed (${res.status})`);
      }
      setRequest(payload);
      setEditing(false);
    } catch (e) {
      setError(e.message);
    }
  };

  const handleCancel = async () => {
    if (!window.confirm('Delete this request?')) return;
    try {
      const res = await fetch(`${BACKEND}/api/requests/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });
      const payload = await res.json();
      if (!res.ok) throw new Error(payload.error || `Delete failed (${res.status})`);
      navigate('/hospital/requests');
    } catch (e) {
      alert(e.message);
    }
  };

  if (loading) return <div>Loading…</div>;
  if (error)   return <div className="text-danger">{error}</div>;
  if (!request) return <div>Request not found.</div>;

  return (
    <div className="request-detail-container">
      <h2>Request Details</h2>

      {editing ? (
        <>
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="mb-3">
            <label>Blood Type</label>
            <select
              name="blood_type"
              className="form-select"
              value={form.blood_type}
              onChange={handleChange}
            >
              {['A+','A–','B+','B–','O+','O–','AB+','AB–'].map(bt => (
                <option key={bt} value={bt}>{bt}</option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label>Units Needed</label>
            <input
              type="number"
              name="units_needed"
              className="form-control"
              min="1"
              value={form.units_needed}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label>Location</label>
            <input
              type="text"
              name="location"
              className="form-control"
              value={form.location}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label>Deadline</label>
            <input
              type="date"
              name="deadline"
              className="form-control"
              value={form.deadline}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label>Notes</label>
            <textarea
              name="notes"
              className="form-control"
              rows="3"
              value={form.notes}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label>Status</label>
            <select
              name="status"
              className="form-select"
              value={form.status}
              onChange={handleChange}
            >
              {['Active','Cancelled','Fulfilled'].map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <button className="btn btn-primary me-2" onClick={handleSave}>
            Save
          </button>
          <button className="btn btn-secondary" onClick={() => setEditing(false)}>
            Cancel
          </button>
        </>
      ) : (
        <>
          <p><strong>Blood Type:</strong> {request.blood_type}</p>
          <p><strong>Needed:</strong> {request.units_needed}</p>
          <p><strong>Fulfilled:</strong> {request.units_fulfilled}</p>
          <p><strong>Status:</strong> {request.status}</p>
          <p><strong>Location:</strong> {request.location}</p>
          <p><strong>Deadline:</strong> {request.deadline}</p>
          {request.notes && <p><strong>Notes:</strong> {request.notes}</p>}

          <button className="btn btn-warning me-2" onClick={() => setEditing(true)}>
            Edit
          </button>
          <button className="btn btn-danger me-2" onClick={handleCancel}>
            Delete
          </button>
          <button className="btn btn-secondary" onClick={() => navigate(-1)}>
            Back
          </button>
        </>
      )}
    </div>
  );
}
