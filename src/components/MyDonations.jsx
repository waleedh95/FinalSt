// src/components/MyDonations.jsx

import React, { useEffect, useState } from 'react';           // 1. Import React and hooks for state & lifecycle
import './MyDonations.css';                                    // 2. Import component-specific CSS

const MyDonations = () => {                                    // 3. Define the MyDonations component
  const [donations, setDonations] = useState([]);              // 4. State to hold fetched donation records
  const [loading, setLoading] = useState(true);                // 5. Loading indicator state

  useEffect(() => {                                            // 6. Run once on mount to load data
    const fetchDonations = async () => {                       // 7. Async function to simulate API call
      // TODO: replace mock with your real API endpoint
      const data = await Promise.resolve([                      // 8. Mocked donation history array
        {
          id: 'd1',
          requestId: '1',
          bloodType: 'A+',
          units: 2,
          status: 'Pending',
          hospital: 'City Hospital',
          date: '2025-05-28'
        },
        {
          id: 'd2',
          requestId: '2',
          bloodType: 'O-',
          units: 1,
          status: 'Completed',
          hospital: 'Regional Clinic',
          date: '2025-05-20'
        }
      ]);
      setDonations(data);                                      // 9. Store fetched data in state
      setLoading(false);                                       // 10. Turn off loading flag
    };
    fetchDonations();                                          // 11. Invoke the fetch function
  }, []);                                                      // 12. Empty deps => run once

  if (loading) {                                               // 13. Show while loading
    return <div className="md-loading">Loading donations...</div>;
  }
  if (donations.length === 0) {                                // 14. Show if no records
    return <div className="md-loading">No donations yet.</div>;
  }

  return (                                                     // 15. Render the donation history table
    <div className="my-donations-container">
      <h2 className="md-header">My Donation History</h2>       {/* 16. Section header */}
      <table className="md-table">                            {/* 17. Table for listing donations */}
        <thead>
          <tr>
            <th>ID</th>                                       {/* 18. Donation record ID */}
            <th>Request ID</th>                               {/* 19. Associated request ID */}
            <th>Blood Type</th>                               {/* 20. Donated blood type */}
            <th>Units</th>                                    {/* 21. Number of units donated */}
            <th>Status</th>                                   {/* 22. Pending/Completed */}
            <th>Hospital</th>                                 {/* 23. Hospital name */}
            <th>Date</th>                                     {/* 24. Donation date */}
          </tr>
        </thead>
        <tbody>
          {donations.map(d => (                              // 25. Map each donation to a row
            <tr key={d.id}>
              <td>{d.id}</td>
              <td>{d.requestId}</td>
              <td>{d.bloodType}</td>
              <td>{d.units}</td>
              <td>
                <span className={`md-status ${d.status.toLowerCase()}`}>
                  {d.status}                                  {/* 26. Styled status badge */}
                </span>
              </td>
              <td>{d.hospital}</td>
              <td>{d.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyDonations;                                    // 27. Export component for routing
