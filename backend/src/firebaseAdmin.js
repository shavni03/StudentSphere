/**
 * StudentSphere Backend - Centralized Firebase Admin SDK Initialization
 * 
 * Strict Security Guardrails:
 * - Credentials must NEVER be committed to Git or exposed to the client.
 * - Supports server environment variables (Render/Railway/GCP) and local service account file.
 */

const admin = require('firebase-admin');
const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

let initialized = false;

function initFirebaseAdmin() {
  if (initialized && admin.apps.length > 0) {
    return admin;
  }

  // 1. Try JSON string from FIREBASE_SERVICE_ACCOUNT_KEY
  if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    try {
      const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        projectId: serviceAccount.project_id || process.env.FIREBASE_PROJECT_ID || 'studentsphere-71a6a'
      });
      initialized = true;
      return admin;
    } catch (err) {
      console.warn('Warning: Failed to parse FIREBASE_SERVICE_ACCOUNT_KEY as JSON:', err.message);
    }
  }

  // 2. Try file path from GOOGLE_APPLICATION_CREDENTIALS
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    const credPath = path.resolve(process.cwd(), process.env.GOOGLE_APPLICATION_CREDENTIALS);
    if (fs.existsSync(credPath)) {
      const serviceAccount = JSON.parse(fs.readFileSync(credPath, 'utf8'));
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        projectId: serviceAccount.project_id || process.env.FIREBASE_PROJECT_ID || 'studentsphere-71a6a'
      });
      initialized = true;
      return admin;
    } else {
      console.warn(`Warning: GOOGLE_APPLICATION_CREDENTIALS path not found: ${credPath}`);
    }
  }

  // 3. Try individual env variables (Render-friendly format)
  if (process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY) {
    const privateKey = process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n');
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID || 'studentsphere-71a6a',
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey
      }),
      projectId: process.env.FIREBASE_PROJECT_ID || 'studentsphere-71a6a'
    });
    initialized = true;
    return admin;
  }

  // 4. Fallback to Application Default Credentials
  try {
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      projectId: process.env.FIREBASE_PROJECT_ID || 'studentsphere-71a6a'
    });
    initialized = true;
    return admin;
  } catch (err) {
    throw new Error(
      `Firebase Admin SDK initialization failed (${err.message}): No valid server credentials found.\n` +
      'Please configure ADMIN_FIREBASE_UID and one of the following:\n' +
      '  - GOOGLE_APPLICATION_CREDENTIALS=/path/to/serviceAccountKey.json\n' +
      '  - FIREBASE_SERVICE_ACCOUNT_KEY=<json_string>\n' +
      '  - FIREBASE_CLIENT_EMAIL and FIREBASE_PRIVATE_KEY\n' +
      'Refer to backend/README.md for detailed setup instructions.'
    );
  }
}

module.exports = {
  admin,
  initFirebaseAdmin,
  getAuth: () => {
    initFirebaseAdmin();
    return admin.auth();
  }
};
