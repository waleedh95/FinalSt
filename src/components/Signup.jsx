// src/components/Signup.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
  const [role, setRole] = useState('donor');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: call Lif eLink signup API
    console.log({ role, name, email, password, confirm });
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2 className="signup-title">LifeLink Sign Up</h2>
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="role">Register as</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="hospital">Hospital</option>
              <option value="donor">Donor</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="name">
              {role === 'hospital' ? 'Hospital Name' : 'Full Name'}
            </label>
            <input
              type="text"
              id="name"
              placeholder={
                role === 'hospital' ? 'Your Hospital Name' : 'Your Full Name'
              }
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirm">Confirm Password</label>
            <input
              type="password"
              id="confirm"
              placeholder="••••••••"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn signup-btn">
            Sign Up
          </button>
        </form>
        <div className="signup-footer">
          <span>Already have an account? </span>
          <Link to="/login" className="link">
            Log in here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
