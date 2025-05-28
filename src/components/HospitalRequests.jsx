// src/components/HospitalRequests.jsx

import React, { useEffect, useState } from 'react';     // 1. Import React and hooks for state & effects
import { Link } from 'react-router-dom';                // 2. Import Link for in-app navigation
import './HospitalRequests.css';                        // 3. Import this component’s CSS

const HospitalRequests = () => {                        // 4. Define the HospitalRequests component
  const [requests, setRequests] = useState([]);         // 5. State array to hold fetched requests

  useEffect(() => {                                     // 6. Run once on mount to fetch requests
    const fetchRequests = async () => {                 // 7. Async function to get data
      // TODO: swap this mock for a real API call
      const data = await Promise.resolve([              // 8. Mocked list of requests
        { id: '1', bloodType: 'A+', units: 5, fulfilled: 2, status: 'Active' },
        { id: '2', bloodType: 'O-', units: 3, fulfilled: 3, status: 'Fulfilled' },
      ]);
      setRequests(data);                                // 9. Store data in state
    };
    fetchRequests();                                    // 10. Invoke the fetch
  }, []);                                               // 11. Empty deps = run once

  if (requests.length === 0) {                         // 12. If no requests yet...
    return <div className="loading">No requests found.</div>; // 13. Show placeholder
  }

  return (                                              // 14. Render the list of request cards
    <div className="hospital-requests-container">       {/* 15. Outer wrapper */}
      <h2>My Requests</h2>                              {/* 16. Section heading */}
      <div className="requests-grid">                   {/* 17. Grid layout */}
        {requests.map(req => (                          // 18. Map each request to a card */}
          <div key={req.id} className="request-card">   {/* 19. Individual card */}
            <h3>
              {req.bloodType} — {req.units} units       {/* 20. Blood type & units */}
            </h3>
            <p>Fulfilled: {req.fulfilled}</p>           {/* 21. Units already fulfilled */}
            <p>
              Status:{' '}
              <span className={`status ${req.status.toLowerCase()}`}>
                {req.status}                           {/* 22. Status badge */}
              </span>
            </p>
            <div className="actions">                  {/* 23. Action buttons */}
              <Link
                to={`/hospital/requests/${req.id}`}
                className="btn detail-btn"
              >
                View Detail                             {/* 24. View detail link */}
              </Link>
              {req.status === 'Active' && (            // 25. Only show “Cancel” if still active
                <button
                  className="btn cancel-btn"
                  onClick={() => {
                    /* TODO: call API to cancel */
                  }}
                >
                  Cancel                              {/* 26. Cancel button */}
                </button>
              )}
            </div>
          </div>                                       // 27. End of card
        ))}
      </div>                                           
    </div>                                             // 29. End of wrapper
  );
};

export default HospitalRequests;                       // 30. Export for import in App.jsx
