// src/components/HospitalRequests.jsx

import React, { useEffect, useState } from 'react';     // 1. Import React and hooks for state & effects
import { Link } from 'react-router-dom';                // 2. Import Link for in-app navigation
import { useAuth } from '../hooks/useAuth';             // 3. Import auth hook
import './HospitalRequests.css';                        // 4. Import this component's CSS

const BACKEND = import.meta.env.VITE_BACKEND_URL;

const HospitalRequests = () => {                        // 5. Define the HospitalRequests component
  const [requests, setRequests] = useState([]);         // 6. State array to hold fetched requests
  const [error, setError] = useState('');              // 7. State for error handling
  const user = useAuth();                              // 8. Get auth user

  useEffect(() => {                                     // 9. Run once on mount to fetch requests
    const fetchRequests = async () => {                 // 10. Async function to get data
      if (!user) {
        setError('Please log in to view requests');
        return;
      }

      try {
        const res = await fetch(`${BACKEND}/api/requests`, {
          credentials: 'include',
          headers: {
            'Authorization': `Bearer ${user.access_token}`
          }
        });
        
        if (!res.ok) {
          throw new Error('Failed to fetch requests');
        }
        
        const data = await res.json();
        setRequests(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchRequests();                                    // 11. Invoke the fetch
  }, [user]);                                          // 12. Re-run when user changes

  if (error) {
    return <div className="loading">{error}</div>;
  }

  if (requests.length === 0) {                         // 13. If no requests yet...
    return <div className="loading">No requests found.</div>; // 14. Show placeholder
  }

  return (                                              // 15. Render the list of request cards
    <div className="hospital-requests-container">       {/* 16. Outer wrapper */}
      <h2>My Requests</h2>                              {/* 17. Section heading */}
      <div className="requests-grid">                   {/* 18. Grid layout */}
        {requests.map(req => (                          // 19. Map each request to a card */}
          <div key={req.id} className="request-card">   {/* 20. Individual card */}
            <h3>
              {req.blood_type} — {req.units_needed} units       {/* 21. Blood type & units */}
            </h3>
            <p>Fulfilled: {req.units_fulfilled}</p>           {/* 22. Units already fulfilled */}
            <p>
              Status:{' '}
              <span className={`status ${req.status.toLowerCase()}`}>
                {req.status}                           {/* 23. Status badge */}
              </span>
            </p>
            <div className="actions">                  {/* 24. Action buttons */}
              <Link
                to={`/hospital/requests/${req.id}`}
                className="btn detail-btn"
              >
                View Detail                             {/* 25. View detail link */}
              </Link>
              {req.status === 'Active' && (            // 26. Only show "Cancel" if still active
                <button
                  className="btn cancel-btn"
                  onClick={async () => {
                    try {
                      const res = await fetch(`${BACKEND}/api/requests/${req.id}`, {
                        method: 'PUT',
                        credentials: 'include',
                        headers: {
                          'Content-Type': 'application/json',
                          'Authorization': `Bearer ${user.access_token}`
                        },
                        body: JSON.stringify({ status: 'Cancelled' })
                      });
                      if (!res.ok) throw new Error('Failed to cancel request');
                      // Refresh the list
                      window.location.reload();
                    } catch (err) {
                      alert(err.message);
                    }
                  }}
                >
                  Cancel                              {/* 27. Cancel button */}
                </button>
              )}
            </div>
          </div>                                       // 28. End of card
        ))}
      </div>                                           
    </div>                                             // 29. End of wrapper
  );
};

export default HospitalRequests;                       // 30. Export for import in App.jsx
