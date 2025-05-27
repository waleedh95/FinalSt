// src/components/Home.jsx
import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <h1>Give the Gift of Life</h1>
          <p>Whether you’re a hospital in need or a willing donor, we’ve got you covered.</p>
          <div className="cta-buttons">
            <button className="hospital-btn">I’m a Hospital</button>
            <button className="donor-btn">I’m a Donor</button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats">
        <div className="stat-card">
          <h2>120</h2>
          <p>Hospitals</p>
        </div>
        <div className="stat-card">
          <h2>500</h2>
          <p>Donors</p>
        </div>
        <div className="stat-card">
          <h2>350</h2>
          <p>Requests</p>
        </div>
        <div className="stat-card">
          <h2>280</h2>
          <p>Donations Completed</p>
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <div className="feature-card">
          <h3>Search Requests</h3>
          <p>Easily find blood requests in need.</p>
        </div>
        <div className="feature-card">
          <h3>Create Request</h3>
          <p>Hospitals can create and manage their needed units.</p>
        </div>
        <div className="feature-card">
          <h3>Commit to Donate</h3>
          <p>Donors can quickly pledge blood donations.</p>
        </div>
        <div className="feature-card">
          <h3>Track Status</h3>
          <p>See real-time updates on your requests and donations.</p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <div className="testimonial">
          <p>"Thanks to this platform, we found donors within hours!"</p>
          <h4>- City Hospital</h4>
        </div>
        <div className="testimonial">
          <p>"I’ve donated three times already. It’s so easy."</p>
          <h4>- Sarah D.</h4>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>
          &copy; 2025 BloodConnect. All rights reserved.{' '}
          <a href="/contact">Contact Us</a>
        </p>
      </footer>
    </div>
  );
};

export default Home;
