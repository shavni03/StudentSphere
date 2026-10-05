/**
 * StudentSphere Administrator Provisioning Script
 * 
 * Sets the Firebase Custom Claim { "admin": true } for the designated administrator.
 * 
 * Safety & Security Rules:
 * 1. Checks that the user exists in Firebase Authentication.
 * 2. Checks that the email matches the designated administrator (shavni.390@gmail.com).
 * 3. Verifies that the email is verified (emailVerified === true).
 * 4. Idempotent: If admin: true already exists, preserves claims and reports "User is already an administrator."
 * 5. Merges claims safely without overwriting other custom claims (e.g. moderator: true).
 * 6. Zero private credentials or passwords printed in output.
 */

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const { getAuth, getFirestore } = require('../src/firebaseAdmin');

const TARGET_ADMIN_EMAIL = (process.env.ADMIN_FIREBASE_EMAIL || 'shavni.390@gmail.com').trim().toLowerCase();

async function run() {
  console.log('==================================================');
  console.log('StudentSphere Admin Setup');
  console.log('==================================================');

  // Parse UID from CLI argument or environment variable
  let targetUid = process.env.ADMIN_FIREBASE_UID ? process.env.ADMIN_FIREBASE_UID.trim() : null;
  const args = process.argv.slice(2);
  for (const arg of args) {
    if (arg.startsWith('--uid=')) {
      targetUid = arg.split('=')[1].trim();
    } else if (!arg.startsWith('--') && !targetUid) {
      targetUid = arg.trim();
    }
  }

  const auth = getAuth();
  let userRecord = null;

  try {
    if (targetUid) {
      // 1. Look up user by UID
      userRecord = await auth.getUser(targetUid);
    } else {
      // 2. Convenience fallback: lookup by target email if UID wasn't explicitly supplied
      console.log(`No ADMIN_FIREBASE_UID provided. Looking up by email: ${TARGET_ADMIN_EMAIL}...`);
      userRecord = await auth.getUserByEmail(TARGET_ADMIN_EMAIL);
      targetUid = userRecord.uid;
    }
  } catch (err) {
    if (err.code === 'auth/user-not-found') {
      console.error(`Error: User not found in Firebase Authentication.`);
      if (targetUid) console.error(`UID searched: ${targetUid}`);
      console.error(`Ensure the account has registered first with email: ${TARGET_ADMIN_EMAIL}`);
      process.exit(1);
    }
    console.error(`Firebase Auth lookup error:`, err.message);
    process.exit(1);
  }

  if (!userRecord) {
    console.error('Error: Could not retrieve Firebase user record.');
    process.exit(1);
  }

  const userEmail = (userRecord.email || '').trim().toLowerCase();

  // Safety Check 1: Email must match intended admin account
  if (userEmail !== TARGET_ADMIN_EMAIL) {
    console.error('--------------------------------------------------');
    console.error(`Safety Check Failed:`);
    console.error(`User email "${userRecord.email}" does NOT match the intended administrator account "${TARGET_ADMIN_EMAIL}".`);
    console.error('Aborting assignment to prevent unauthorized role escalation.');
    console.error('--------------------------------------------------');
    process.exit(1);
  }

  // Safety Check 2: Email must be verified
  if (!userRecord.emailVerified) {
    console.error('--------------------------------------------------');
    console.error('Admin account email must be verified first.');
    console.error(`Please verify ${userRecord.email} via the verification link sent to the inbox before granting administrator privileges.`);
    console.error('--------------------------------------------------');
    process.exit(1);
  }

  // Safety Check 3: Idempotent verification
  const currentClaims = userRecord.customClaims || {};
  if (currentClaims.admin === true) {
    // Ensure Firestore document is in sync even if claim was previously set
    try {
      const firestore = getFirestore();
      await firestore.collection('users').doc(userRecord.uid).set({
        uid: userRecord.uid,
        email: userRecord.email,
        role: 'admin',
        emailVerified: true
      }, { merge: true });
    } catch {
      // ignore
    }

    console.log('-------------------------');
    console.log('User is already an administrator.');
    console.log(`Email: ${userRecord.email}`);
    console.log(`UID: ${userRecord.uid}`);
    console.log(`Role: ADMIN`);
    console.log(`Status: ALREADY_ACTIVE`);
    console.log('-------------------------');
    return;
  }

  // Safe claim merge: preserve existing claims (e.g. moderator: true) while setting admin: true
  const updatedClaims = {
    ...currentClaims,
    admin: true
  };

  await auth.setCustomUserClaims(userRecord.uid, updatedClaims);

  // Synchronize Firestore users/{uid} document with role: "admin"
  try {
    const firestore = getFirestore();
    await firestore.collection('users').doc(userRecord.uid).set({
      uid: userRecord.uid,
      email: userRecord.email,
      role: 'admin',
      emailVerified: true
    }, { merge: true });
    console.log(`Firestore document users/${userRecord.uid} updated with role: "admin".`);
  } catch (fsErr) {
    console.warn('Warning: Could not update Firestore users document:', fsErr.message);
  }

  // Success Output
  console.log('-------------------------');
  console.log(`Email: ${userRecord.email}`);
  console.log(`UID: ${userRecord.uid}`);
  console.log(`Role: ADMIN`);
  console.log(`Status: SUCCESS`);
  console.log('-------------------------');
  console.log('Custom claim { admin: true } and Firestore role: "admin" have been securely assigned.');
  console.log('The user can now sign in or refresh their token to access /admin/ routes.');
}

run().catch((err) => {
  console.error('Unexpected error in admin setup:', err);
  process.exit(1);
});
