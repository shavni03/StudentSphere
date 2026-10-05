/**
 * StudentSphere Express Server
 * 
 * Secure backend API server for StudentSphere.
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const adminRoutes = require('./routes/adminRoutes');
const { initFirebaseAdmin } = require('./firebaseAdmin');

const app = express();
const PORT = process.env.PORT || 5001;

// CORS configuration (allow frontend origin)
app.use(cors({
  origin: process.env.FRONTEND_URL || ['http://localhost:5173', 'http://localhost:4173', 'http://127.0.0.1:5173', 'http://127.0.0.1:4173'],
  credentials: true
}));

app.use(express.json());

// Public health check
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'StudentSphere API',
    timestamp: new Date().toISOString()
  });
});

// Admin Protected Routes
app.use('/api/admin', adminRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Start Server
if (require.main === module) {
  try {
    initFirebaseAdmin();
    console.log('Firebase Admin SDK initialized successfully.');
  } catch (err) {
    console.warn('Warning on server startup:', err.message);
  }

  app.listen(PORT, () => {
    console.log(`StudentSphere backend server listening on port ${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/health`);
  });
}

module.exports = app;
