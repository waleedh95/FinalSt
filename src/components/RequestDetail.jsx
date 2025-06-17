import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './RequestDetail.css';

const BACKEND = import.meta.env.VITE_BACKEND_URL;

const RequestDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch single request
  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const res = await fetch(`${BACKEND}/api/requests/${id}`, {
          credentials: 'include'
        });
        if (!res.ok) throw new Error('Failed to load request');
        const data = await res.json();
        setRequest(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRequest();
  }, [id]);

  // Cancel (delete) the request
  const handleCancel = async () => {
    if (!window.confirm('Cancel this request?')) return;
    try {
      const res = await fetch(`${BACKEND}/api/requests/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Cancel failed');
      }
      navigate('/hospital/requests');
    } catch (e) {
      alert(e.message);
    }
  };

  if (loading) return <div className="detail-loading">Loading request...</div>;
  if (error)   return <div className="detail-loading">{error}</div>;
  if (!request) return <div className="detail-loading">Request not found.</div>;

  return (
    <div className="request-detail-container">
      <h2 className="detail-header">Request Details</h2>
      <div className="detail-card">
        <div className="detail-row">
          <span className="detail-label">Blood Type:</span>
          <span className="detail-value">{request.blood_type}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Units Needed:</span>
          <span className="detail-value">{request.units_needed}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Units Fulfilled:</span>
          <span className="detail-value">{request.units_fulfilled}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Status:</span>
          <span
            className={`detail-value status ${request.status.toLowerCase()}`}
          >
            {request.status}
          </span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Location:</span>
          <span className="detail-value">{request.location}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Deadline:</span>
          <span className="detail-value">{request.deadline}</span>
        </div>
        {request.notes && (
          <div className="detail-row">
            <span className="detail-label">Notes:</span>
            <span className="detail-value">{request.notes}</span>
          </div>
        )}
        <div className="detail-actions">
          <button className="btn back-btn" onClick={() => navigate(-1)}>
            Back
          </button>
          {request.status === 'Active' && (
            <button className="btn cancel-btn" onClick={handleCancel}>
              Cancel Request
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestDetail;