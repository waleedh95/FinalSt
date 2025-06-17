const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { auth } = require('express-oauth2-jwt-bearer');
require('dotenv').config();

// Debug: Log environment variables (without sensitive values)
console.log('Environment variables loaded:');
console.log('PORT:', process.env.PORT);
console.log('FRONTEND_URL:', process.env.FRONTEND_URL);
console.log('AUTH0_ISSUER_BASE_URL:', process.env.AUTH0_ISSUER_BASE_URL);
console.log('AUTH0_CLIENT_ID exists:', !!process.env.AUTH0_CLIENT_ID);
console.log('AUTH0_SECRET exists:', !!process.env.AUTH0_SECRET);

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(helmet());
app.use(morgan('dev'));

// Auth0 configuration
const checkJwt = auth({
  audience: process.env.AUTH0_CLIENT_ID,
  issuer: process.env.AUTH0_ISSUER_BASE_URL,
  secret: process.env.AUTH0_SECRET
});

// Database connection
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

// Test database connection
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  console.log('Connected to PostgreSQL database');
  release();
});

// Auth routes
app.get('/login', (req, res) => {
  res.redirect(`${process.env.AUTH0_ISSUER_BASE_URL}/authorize?` +
    `response_type=token&` +
    `client_id=${process.env.AUTH0_CLIENT_ID}&` +
    `redirect_uri=${process.env.FRONTEND_URL}&` +
    `scope=openid%20profile%20email`);
});

app.get('/logout', (req, res) => {
  res.redirect(`${process.env.AUTH0_ISSUER_BASE_URL}/v2/logout?` +
    `client_id=${process.env.AUTH0_CLIENT_ID}&` +
    `returnTo=${process.env.FRONTEND_URL}`);
});

// Profile route
app.get('/profile', checkJwt, (req, res) => {
  res.json({
    sub: req.auth.sub,
    name: req.auth.name,
    email: req.auth.email,
    access_token: req.auth.token
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Blood requests routes
app.get('/api/requests', checkJwt, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM blood_requests WHERE hospital_id = $1', [req.auth.sub]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/requests', checkJwt, async (req, res) => {
  const { blood_type, units_needed, location, deadline, notes } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO blood_requests (hospital_id, blood_type, units_needed, location, deadline, notes, status) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [req.auth.sub, blood_type, units_needed, location, deadline, notes, 'Active']
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/api/requests/:id', checkJwt, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const result = await pool.query(
      'UPDATE blood_requests SET status = $1 WHERE id = $2 AND hospital_id = $3 RETURNING *',
      [status, id, req.auth.sub]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Request not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 