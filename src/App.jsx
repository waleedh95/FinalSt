import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import HospitalDashboard from './components/HospitalDashboard'
import DonorDashboard from './components/DonorDashboard'
import NotFound from './components/NotFound'

function App() {
  return (
    <Router>
      <nav className="p-3 bg-light">
        <Link className="me-3" to="/">Home</Link>
        <Link className="me-3" to="/hospital">Hospital</Link>
        <Link className="me-3" to="/donor">Donor</Link>
        <Link className="me-3" to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
      </nav>

      <div className="p-4">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/hospital/*' element={<HospitalDashboard />} />
          <Route path='/donor/*' element={<DonorDashboard />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App