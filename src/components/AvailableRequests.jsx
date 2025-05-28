// src/components/AvailableRequests.jsx

import React, { useEffect, useState } from 'react'; // 1. React core and hooks
import { Link } from 'react-router-dom';            // 2. Link for in-app navigation
import './AvailableRequests.css';                   // 3. Component-specific styles

const AvailableRequests = () => {                   // 4. Define the AvailableRequests component
  const [requests, setRequests] = useState([]);     // 5. State for fetched request data
  const [loading, setLoading] = useState(true);     // 6. State for loading indicator

  useEffect(() => {                                 // 7. Fetch data on mount
    const fetchRequests = async () => {             // 8. Async fetch function
      // TODO: replace mock with real API call
      const data = await Promise.resolve([          // 9. Mocked request list
        {
          id: '1',
          bloodType: 'A+',
          units: 5,
          fulfilled: 2,
          status: 'Active',
          location: 'City Hospital',
          deadline: '2025-06-10',
          notes: ''
        },
        {
          id: '2',
          bloodType: 'O-',
          units: 3,
          fulfilled: 0,
          status: 'Active',
          location: 'Regional Clinic',
          deadline: '2025-06-15',
          notes: 'Urgent'
        }
      ]);
      setRequests(data);                            // 10. Store data
      setLoading(false);                            // 11. Disable loading
    };
    fetchRequests();                                // 12. Invoke fetch
  }, []);                                           // 13. Empty deps = once

  if (loading) {                                    // 14. Show while loading
    return <div className="available-loading">Loading requests...</div>;
  }
  if (requests.length === 0) {                      // 15. Show if none
    return <div className="available-loading">No available requests.</div>;
  }

  return (                                          // 16. Render list
    <div className="available-requests-container">  
      <h2 className="available-header">Available Requests</h2>
      <div className="available-grid">             
        {requests.map(req => (
          <div key={req.id} className="available-card">
            <div className="available-card-header">
              <span className="available-blood-type">{req.bloodType}</span>
              <span className={`available-status ${req.status.toLowerCase()}`}>
                {req.status}
              </span>
            </div>

            <div className="available-card-body">
              <p><strong>Units:</strong> {req.units}</p>
              <p><strong>Location:</strong> {req.location}</p>
              <p><strong>Deadline:</strong> {req.deadline}</p>
              {req.notes && <p><strong>Notes:</strong> {req.notes}</p>}
            </div>

            <div className="available-card-actions">
              <button
                className="btn donate-btn"
                onClick={() => console.log('Donating to', req.id)}
              >
                Donate
              </button>
              <Link
                to={`/donor/requests/${req.id}`}
                className="btn available-detail-btn"
              >
                View
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableRequests;
