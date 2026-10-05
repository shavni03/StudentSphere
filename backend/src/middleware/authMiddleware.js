/**
 * StudentSphere Backend Authentication & Admin Authorization Middleware
 * 
 * Cryptographically verifies Firebase ID Tokens and Custom Claims on all protected API routes.
 */

const { getAuth } = require('../firebaseAdmin');

/**
 * Verify Firebase ID Token from Authorization header
 */
async function verifyFirebaseToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Missing or malformed Authorization header. Expected Bearer <token>'
    });
  }

  const idToken = authHeader.split('Bearer ')[1].trim();

  try {
    const auth = getAuth();
    // checkRevoked = true to immediately reject logged out or revoked tokens
    const decodedToken = await auth.verifyIdToken(idToken, true);
    req.user = decodedToken;
    next();
  } catch (err) {
    if (err.code === 'auth/id-token-revoked') {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Firebase token has been revoked. Please sign in again.'
      });
    }
    if (err.code === 'auth/id-token-expired') {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Firebase token expired. Please refresh your token.'
      });
    }
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Invalid Firebase authentication token.'
    });
  }
}

/**
 * Require Verified Administrator Role
 * Checks:
 * 1. User is authenticated
 * 2. Email is verified
 * 3. Custom Claim `admin === true` is present
 */
function requireAdminRole(req, res, next) {
  if (!req.user) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Authentication required'
    });
  }

  if (!req.user.email_verified) {
    return res.status(403).json({
      error: 'Forbidden',
      message: 'Admin email address must be verified.'
    });
  }

  if (req.user.admin !== true) {
    return res.status(403).json({
      error: 'Forbidden',
      message: 'Access Denied: Requires administrator privileges ({ admin: true }).'
    });
  }

  next();
}

module.exports = {
  verifyFirebaseToken,
  requireAdminRole
};
