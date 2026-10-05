/**
 * StudentSphere Backend - Protected Admin Endpoints
 */

const express = require('express');
const router = express.Router();
const { verifyFirebaseToken, requireAdminRole } = require('../middleware/authMiddleware');
const { getAuth } = require('../firebaseAdmin');

// Apply token verification and admin role check across all /api/admin/* routes
router.use(verifyFirebaseToken);
router.use(requireAdminRole);

/**
 * GET /api/admin/verify-status
 * Health & claim confirmation endpoint for admin UI
 */
router.get('/verify-status', (req, res) => {
  res.json({
    status: 'authorized',
    message: 'User is a verified StudentSphere administrator.',
    user: {
      uid: req.user.uid,
      email: req.user.email,
      emailVerified: req.user.email_verified,
      claims: {
        admin: req.user.admin
      }
    }
  });
});

/**
 * GET /api/admin/users
 * List users from Firebase Auth
 */
router.get('/users', async (req, res) => {
  try {
    const auth = getAuth();
    const listResult = await auth.listUsers(50);
    const users = listResult.users.map(u => ({
      uid: u.uid,
      email: u.email,
      displayName: u.displayName,
      emailVerified: u.emailVerified,
      disabled: u.disabled,
      customClaims: u.customClaims || {},
      creationTime: u.metadata.creationTime,
      lastSignInTime: u.metadata.lastSignInTime
    }));
    res.json({ success: true, count: users.length, users });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users', details: err.message });
  }
});

module.exports = router;
