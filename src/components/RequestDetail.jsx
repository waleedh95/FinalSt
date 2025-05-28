// src/components/RequestDetail.jsx

import React, { useEffect, useState } from 'react';             
import {
  useParams,
  useNavigate,
  useLocation
} from 'react-router-dom';                                      
import './RequestDetail.css';                                    

const RequestDetail = () => {                                   
  const { id } = useParams();                                    // 1. Grab the `:id` from the URL  
  const navigate = useNavigate();                                // 2. For imperatively navigating back  
  const location = useLocation();                                // 3. To detect hospital vs donor path  
  const isHospital = location.pathname.startsWith('/hospital');  // 4. Determine role by URL prefix  

  const [request, setRequest] = useState(null);                  // 5. Will hold the fetched request  
  const [loading, setLoading] = useState(true);                  // 6. Loading indicator  

  useEffect(() => {                                             
    const fetchRequest = async () => {                          
      // TODO: replace with real API call
      const data = await Promise.resolve({                       
        id,
        bloodType: 'A+',
        units: 5,
        fulfilled: 2,
        status: 'Active',
        location: 'City Hospital – Ward 3',
        deadline: '2025-06-10',
        notes: 'Urgent need for surgery tomorrow'
      });
      setRequest(data);                                          // 7. Populate state  
      setLoading(false);                                        // 8. Turn off loading  
    };
    fetchRequest();                                             
  }, [id]);

  if (loading) {                                               
    return <div className="detail-loading">Loading request...</div>;
  }
  if (!request) {                                              
    return <div className="detail-loading">Request not found.</div>;
  }

  return (                                                     
    <div className="request-detail-container">
      <h2 className="detail-header">Request Details</h2>

      <div className="detail-card">
        <div className="detail-row">
          <span className="detail-label">Blood Type:</span>
          <span className="detail-value">{request.bloodType}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Units Needed:</span>
          <span className="detail-value">{request.units}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Units Fulfilled:</span>
          <span className="detail-value">{request.fulfilled}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Status:</span>
          <span className={`detail-value status ${request.status.toLowerCase()}`}>
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
          <button
            className="btn back-btn"
            onClick={() => navigate(-1)}                        // 9. Go back to previous list
          >
            Back
          </button>

          {request.status === 'Active' && isHospital && (
            <button
              className="btn cancel-btn"
              onClick={() => console.log('Cancel', id)}      // 10. TODO: cancel request API call
            >
              Cancel Request
            </button>
          )}

          {request.status === 'Active' && !isHospital && (
            <button
              className="btn donate-btn"
              onClick={() => console.log('Donate to', id)}    // 11. TODO: donate API call
            >
              Donate
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestDetail;                                    
