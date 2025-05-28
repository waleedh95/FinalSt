// src/components/CreateRequest.jsx

import React, { useState } from 'react';           // 1. Import React and the useState hook for local component state
import './CreateRequest.css';                      // 2. Import the CSS file specific to this component

const CreateRequest = () => {                      // 3. Define the CreateRequest functional component
  // 4. State hooks for each form field:
  const [bloodType, setBloodType] = useState('A+');    // - Selected blood type, default A+
  const [units, setUnits] = useState(1);               // - Number of units needed, default 1
  const [location, setLocation] = useState('');        // - Text input for location details
  const [deadline, setDeadline] = useState('');        // - Date string for request deadline
  const [notes, setNotes] = useState('');              // - Optional notes textarea

  // 5. Form submission handler
  const handleSubmit = e => {
    e.preventDefault();                               // 6. Prevent browser reload on form submit
    // 7. TODO: replace console.log with an API call to create the request
    console.log({ bloodType, units, location, deadline, notes });
  };

  return (
    // 8. Outer container centers the card
    <div className="create-request-container">
      {/* 9. Card wrapper with padding and shadow */}
      <div className="create-request-card">
        {/* 10. Section title */}
        <h2 className="title">New Blood Request</h2>

        {/* 11. The form element */}
        <form onSubmit={handleSubmit} className="form">
          {/* 12. Blood Type selector */}
          <div className="form-group">
            <label htmlFor="bloodType">Blood Type</label>
            <select
              id="bloodType"
              value={bloodType}                     // 13. Controlled select value
              onChange={e => setBloodType(e.target.value)} // 14. Update state on change
            >
              {/* 15. Map over options array */}
              {['A+', 'A–', 'B+', 'B–', 'O+', 'O–', 'AB+', 'AB–'].map(type => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* 16. Units needed input */}
          <div className="form-group">
            <label htmlFor="units">Units Needed</label>
            <input
              type="number"
              id="units"
              min="1"
              value={units}                         // 17. Controlled number value
              onChange={e => setUnits(e.target.value)} // 18. Update state
            />
          </div>

          {/* 19. Location text input */}
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={e => setLocation(e.target.value)}
              placeholder="City, Hospital Ward…"
            />
          </div>

          {/* 20. Deadline date picker */}
          <div className="form-group">
            <label htmlFor="deadline">Deadline</label>
            <input
              type="date"
              id="deadline"
              value={deadline}
              onChange={e => setDeadline(e.target.value)}
            />
          </div>

          {/* 21. Optional notes textarea */}
          <div className="form-group">
            <label htmlFor="notes">Notes (optional)</label>
            <textarea
              id="notes"
              rows="4"
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Additional details…"
            />
          </div>

          {/* 22. Submit button */}
          <button type="submit" className="btn submit-btn">
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateRequest;                      // 23. Export component for routing in App.jsx
