// src/components/Dashboard.jsx

import React, { useEffect, useState } from 'react'; // 1. Import React and hooks for managing state and side effects
import { Link } from 'react-router-dom';             // 2. Import Link for client-side routing
import './HospitalDashboard.css';                     // 3. Import the corresponding CSS for styling

const Dashboard = () => {                            // 4. Define the Dashboard component
  const [role, setRole] = useState(null);            // 5. State to hold the user's role (“hospital” or “donor”)
  const [name, setName] = useState('');              // 6. State to hold the user's display name

  useEffect(() => {                                  // 7. useEffect runs on component mount
    const fetchUser = async () => {                  // 8. Async function to fetch/mock user data
      // TODO: replace this mock with real auth/context logic
      const userRole = await Promise.resolve('hospital'); // 9. Mock: pretend API returned “hospital”
      const userName = await Promise.resolve(         // 10. Mock: choose name based on role
        userRole === 'hospital' ? 'City Hospital' : 'Jane Doe'
      );
      setRole(userRole);                              // 11. Update role state
      setName(userName);                              // 12. Update name state
    };
    fetchUser();                                      // 13. Invoke the mock fetch
  }, []);                                            // 14. Empty dependency array ensures this runs once

  if (!role) {                                       // 15. While role is loading...
    return <div className="loading">Loading...</div>; // 16. ...show a loading indicator
  }

  return (                                           // 17. Once loaded, render the dashboard UI
    <div className="dashboard-container">            {/*18. Wrapper for the whole dashboard*/}
      <header className="dashboard-header">          {/*// 19. Header section with welcome message*/}
        <h2>Welcome back, {name}</h2>               {/*// 20. Personalized greeting*/}
      </header>

      <div className="dashboard-cards">             
        {role === 'hospital' ? (                     // 22. If user is a hospital...*/}
          <>                                     {/*    // 23. React fragment to group multiple cards*/}
            <div className="dashboard-card">       {/*     // 24. Card: Create Request*/}
              <div className="icon">🏥</div>        {/* // 25. Icon representing a hospital*/}
              <h3>Create Request</h3>              {/* // 26. Card title*/}
              <p>Define new blood unit requirements.</p> {/*// 27. Card description*/}
              <Link to="/hospital/requests/new" className="btn card-btn"> {/*// 28. Link to the “New Request” form*/}
                Get Started
              </Link>
            </div>

            <div className="dashboard-card">         {/*   // 29. Card: Manage Requests*/}
              <div className="icon">📋</div>       {/*     // 30. Icon representing a clipboard/list*/}
              <h3>Manage Requests</h3>             {/*    // 31. Card title*/}
              <p>View and update your active requests.</p>  {/*  // 32. Card description*/}
              <Link to="/hospital/requests" className="btn card-btn"> 
                Manage
              </Link>
            </div>
          </>
        ) : (                                       // 34. Otherwise (role is “donor”)...
          <>
            <div className="dashboard-card">      {/*   // 35. Donor Card: Browse Requests*/}
              <div className="icon">🔍</div>       {/*  // 36. Icon representing search*/}
              <h3>Browse Requests</h3>             {/* // 37. Card title*/}
              <p>Find hospitals in need of donors.</p>  {/* // 38. Card description*/}
              <Link to="/requests" className="btn card-btn">  {/* // 39. Link to public requests listing*/}
                Browse
              </Link>
            </div>

            <div className="dashboard-card">        {/* // 40. Donor Card: My Donations*/}
              <div className="icon">❤️</div>       {/*  // 41. Icon representing heart/donation*/}
              <h3>My Donations</h3>                {/*  // 42. Card title*/}
              <p>Track your donation history.</p>  {/*  // 43. Card description*/}
              <Link to="/donor/donations" className="btn card-btn">  {/* // 44. Link to donor’s donation history*/}
                View
              </Link>
            </div>
          </>
        )}
      </div>                                       {/*  // 45. End of cards container*/}
    </div>                                         // 46. End of dashboard wrapper
  );                                               
};

export default Dashboard;                          // 47. Export the component for use in App.jsx
