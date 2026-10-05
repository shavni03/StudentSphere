/**
 * StudentSphere Administrator Status Verification Utility
 * 
 * Inspects a user's Firebase Authentication profile and current Custom Claims without modifying them.
 */

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const { getAuth } = require('../src/firebaseAdmin');

async function run() {
  const targetUid = process.env.ADMIN_FIREBASE_UID || process.argv[2];
  const targetEmail = process.env.ADMIN_FIREBASE_EMAIL || 'shavni.390@gmail.com';

  const auth = getAuth();
  let userRecord = null;

  try {
    if (targetUid) {
      userRecord = await auth.getUser(targetUid);
    } else {
      userRecord = await auth.getUserByEmail(targetEmail);
    }
  } catch (err) {
    console.error('Error fetching user:', err.message);
    process.exit(1);
  }

  console.log('==================================================');
  console.log('Firebase User Verification');
  console.log('==================================================');
  console.log(`UID:            ${userRecord.uid}`);
  console.log(`Email:          ${userRecord.email}`);
  console.log(`Email Verified: ${userRecord.emailVerified ? 'YES (✓)' : 'NO (✗)'}`);
  console.log(`Disabled:       ${userRecord.disabled ? 'YES' : 'NO'}`);
  console.log(`Custom Claims:  ${JSON.stringify(userRecord.customClaims || {}, null, 2)}`);
  console.log(`Is Admin:       ${userRecord.customClaims?.admin === true ? 'YES (🛡️)' : 'NO'}`);
  console.log('==================================================');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
