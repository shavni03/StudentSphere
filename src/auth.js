/**
 * StudentSphere Centralized Firebase Authentication Layer
 * 
 * Strict Architecture:
 * - 100% Vanilla JavaScript (ES Modules)
 * - Firebase Authentication SDK (Email/Password, Email Verification, Password Reset)
 * - Protected Page Guard with Authentication Loading States
 * - Zero plaintext password storage in localStorage or Supabase
 * - Persistent redirect preservation (e.g. ?redirect=/notes.html)
 */

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  sendEmailVerification,
  updateProfile,
  onAuthStateChanged,
  reload,
  deleteUser
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db, isFirebaseConfigured } from './firebase-config.js';
import { appState } from './state.js';
import { router } from './router.js';

export const STORAGE_KEY_AUTH_USER = 'studentsphere_auth_user';

let authInitResolver = null;
export const authInitPromise = new Promise((resolve) => {
  authInitResolver = resolve;
});

/**
 * Wait until initial auth state is resolved by Firebase
 */
export async function waitForAuthInit() {
  if (appState.isAuthInitialized) return;
  await authInitPromise;
}

/**
 * Get current active user from Firebase or local state
 */
export function getCurrentUser() {
  if (isFirebaseConfigured && auth?.currentUser) {
    const u = auth.currentUser;
    return {
      uid: u.uid,
      id: u.uid,
      name: u.displayName || u.email?.split('@')[0] || appState.currentUser?.name || 'Student',
      email: u.email,
      photoURL: u.photoURL || appState.currentUser?.photoURL || null,
      isEmailVerified: Boolean(u.emailVerified || appState.currentUser?.isEmailVerified),
      role: appState.currentUser?.role || 'user',
      university: appState.currentUser?.university || 'Graphic Era (Deemed to be University) - GEU Dehradun',
      branch: appState.currentUser?.branch || 'CSE',
      semester: appState.currentUser?.semester || '5',
      credits: appState.currentUser?.credits ?? 100
    };
  }

  return appState.currentUser || null;
}

/**
 * Retrieve user profile document from Firestore collection 'users'
 * @param {string|null} uid - Target Firebase UID. Defaults to active user.
 * @returns {Promise<object|null>}
 */
export async function getUserProfile(uid = null) {
  const targetUid = uid || auth?.currentUser?.uid || appState.currentUser?.uid;
  if (!targetUid) return null;

  if (isFirebaseConfigured && db) {
    try {
      const userDoc = await getDoc(doc(db, 'users', targetUid));
      if (userDoc.exists()) {
        return userDoc.data();
      }
      return null;
    } catch (err) {
      console.error('Failed to get user profile from Firestore:', err);
      return null;
    }
  }

  return appState.currentUser || null;
}

/**
 * Retrieve raw JWT ID Token for authenticating backend API requests
 * @param {boolean} forceRefresh - Force token refresh from Firebase servers
 * @returns {Promise<string|null>}
 */
export async function getIdToken(forceRefresh = false) {
  if (isFirebaseConfigured && auth?.currentUser) {
    try {
      return await auth.currentUser.getIdToken(forceRefresh);
    } catch (err) {
      console.error('Failed to get Firebase ID token:', err);
      return null;
    }
  }
  return null;
}

/**
 * Retrieve IdTokenResult containing Custom Claims from Firebase
 * @param {boolean} forceRefresh - Force token refresh to fetch newly assigned claims
 * @returns {Promise<import('firebase/auth').IdTokenResult|null>}
 */
export async function getIdTokenResult(forceRefresh = false) {
  if (isFirebaseConfigured && auth?.currentUser) {
    try {
      return await auth.currentUser.getIdTokenResult(forceRefresh);
    } catch (err) {
      console.error('Failed to get Firebase ID token result:', err);
      return null;
    }
  }
  return null;
}

/**
 * Verifies whether the active user has administrator authorization in Firestore.
 * 
 * Strict Flow:
 * 1. Checks Firebase Auth login.
 * 2. Checks user.emailVerified.
 * 3. Reads Firestore document: users/{currentUser.uid}.
 * 4. Checks role === "admin".
 * 
 * Error Handling:
 * - If user not logged in: { allowed: false, status: 'LOGIN_REQUIRED', message: 'Login required' }
 * - If email unverified: { allowed: false, status: 'EMAIL_UNVERIFIED', message: 'Admin account email must be verified first.' }
 * - If Firestore document does not exist: { allowed: false, status: 'PROFILE_NOT_FOUND', message: 'User profile not found.' }
 * - If role !== 'admin': { allowed: false, status: 'NOT_ADMIN', message: 'Access Denied. Administrator permissions are required.' }
 * - If Firestore request fails / db unavailable: { allowed: false, status: 'FIRESTORE_ERROR', message: 'Unable to verify administrator permissions. Please try again.' }
 * 
 * @returns {Promise<{ allowed: boolean, status: string, message?: string, data?: object }>}
 */
export async function verifyAdminStatus() {
  await waitForAuthInit();

  if (!isLoggedIn()) {
    return {
      allowed: false,
      status: 'LOGIN_REQUIRED',
      message: 'Login required'
    };
  }

  const user = auth?.currentUser;
  if (!user) {
    return {
      allowed: false,
      status: 'LOGIN_REQUIRED',
      message: 'Login required'
    };
  }

  // Email verification check
  if (!user.emailVerified) {
    return {
      allowed: false,
      status: 'EMAIL_UNVERIFIED',
      message: 'Admin account email must be verified first.'
    };
  }

  if (!isFirebaseConfigured || !db) {
    return {
      allowed: false,
      status: 'FIRESTORE_ERROR',
      message: 'Unable to verify administrator permissions. Please try again.'
    };
  }

  try {
    const userDocRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      return {
        allowed: false,
        status: 'PROFILE_NOT_FOUND',
        message: 'User profile not found.'
      };
    }

    const userData = userDoc.data();
    if (userData && userData.role === 'admin') {
      // Sync appState for UI display
      if (appState.currentUser) {
        appState.currentUser.role = 'admin';
        localStorage.setItem(STORAGE_KEY_AUTH_USER, JSON.stringify(appState.currentUser));
        appState.notify();
      }
      return {
        allowed: true,
        status: 'AUTHORIZED',
        data: userData
      };
    } else {
      if (appState.currentUser && appState.currentUser.role !== 'user') {
        appState.currentUser.role = 'user';
        localStorage.setItem(STORAGE_KEY_AUTH_USER, JSON.stringify(appState.currentUser));
        appState.notify();
      }
      return {
        allowed: false,
        status: 'NOT_ADMIN',
        message: 'Access Denied. Administrator permissions are required.'
      };
    }
  } catch (err) {
    console.error('Firestore admin verification error:', err);
    return {
      allowed: false,
      status: 'FIRESTORE_ERROR',
      message: 'Unable to verify administrator permissions. Please try again.'
    };
  }
}

/**
 * Check if current user is an administrator via Firestore users/{uid} document.
 * Returns true only when role === "admin" and email is verified.
 * 
 * @returns {Promise<boolean>}
 */
export async function isAdmin() {
  const result = await verifyAdminStatus();
  return result.allowed === true;
}

/**
 * Guard requiring authenticated user session.
 * Navigates to /auth/login.html if unauthenticated.
 */
export function requireAuth() {
  const currentPathWithQuery = window.location.pathname + window.location.search;
  if (!isLoggedIn()) {
    const redirectUrl = `/auth/login.html?redirect=${encodeURIComponent(currentPathWithQuery)}`;
    router.navigate(redirectUrl);
    return false;
  }
  return true;
}

/**
 * Guard requiring verified email address.
 * Navigates to /auth/verify-email.html if unverified.
 */
export function requireVerifiedEmail() {
  const currentPathWithQuery = window.location.pathname + window.location.search;
  if (!requireAuth()) return false;
  if (!isEmailVerified()) {
    const verifyUrl = `/auth/verify-email.html?redirect=${encodeURIComponent(currentPathWithQuery)}`;
    router.navigate(verifyUrl);
    return false;
  }
  return true;
}

/**
 * Guard function for admin routes
 * @returns {Promise<boolean>}
 */
export async function requireAdmin() {
  await waitForAuthInit();
  const currentPath = window.location.pathname + window.location.search;

  if (!isLoggedIn()) {
    router.navigate(`/auth/login.html?redirect=${encodeURIComponent(currentPath)}`);
    return false;
  }

  if (!isEmailVerified()) {
    router.navigate(`/auth/verify-email.html?redirect=${encodeURIComponent(currentPath)}`);
    return false;
  }

  const result = await verifyAdminStatus();
  return result.allowed === true;
}

/**
 * Update current user profile photo (data URL / remote URL)
 */
export async function updateUserPhoto(photoURL) {
  if (isFirebaseConfigured && auth?.currentUser) {
    try {
      await updateProfile(auth.currentUser, { photoURL });
    } catch (err) {
      console.warn('Firebase photoURL update warning:', err);
    }
  }

  if (appState.currentUser) {
    appState.currentUser.photoURL = photoURL;
    localStorage.setItem(STORAGE_KEY_AUTH_USER, JSON.stringify(appState.currentUser));
    appState.notify();
  }

  return { success: true };
}

export function getCurrentAuthUser() {
  return getCurrentUser();
}

/**
 * Check if a user is currently logged in
 */
export function isLoggedIn() {
  return Boolean(getCurrentUser());
}

/**
 * Check if the active user has a verified email
 */
export function isEmailVerified() {
  const user = getCurrentUser();
  return Boolean(user && user.isEmailVerified);
}

/**
 * Register a new student account
 */
export async function register({ name, email, password, confirmPassword, termsAccepted = false, branch = 'CSE', semester = '5', university = 'Graphic Era (Deemed to be University) - GEU Dehradun' }) {
  if (!name || !email || !password) {
    throw new Error('Please fill in all required fields.');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error('Please enter a valid email address.');
  }

  if (!termsAccepted) {
    throw new Error('You must accept the Terms & Conditions and Privacy Policy to register.');
  }

  if (password.length < 6) {
    throw new Error('Password must be at least 6 characters long.');
  }

  if (password !== confirmPassword) {
    throw new Error('Passwords do not match. Please verify your password confirmation.');
  }

  if (isFirebaseConfigured && auth) {
    // 1. Create account via official Firebase SDK
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    const user = credential.user;

    // 2. Set user display name
    await updateProfile(user, { displayName: name });

    // 3. Dispatch official Firebase verification email
    await sendEmailVerification(user);

    // 4. Initialize Firestore user record
    if (db) {
      try {
        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          email: user.email,
          name,
          role: 'user',
          emailVerified: false,
          university: university || 'Graphic Era (Deemed to be University) - GEU Dehradun',
          branch,
          semester,
          credits: 100,
          createdAt: new Date().toISOString()
        }, { merge: true });
      } catch (fsErr) {
        console.warn('Could not write user to Firestore on register:', fsErr.message);
      }
    }

    const userProfile = {
      uid: user.uid,
      id: user.uid,
      name,
      email: user.email,
      branch,
      semester,
      university: university || 'Graphic Era (Deemed to be University) - GEU Dehradun',
      role: 'user',
      isEmailVerified: false,
      credits: 100
    };

    localStorage.setItem(STORAGE_KEY_AUTH_USER, JSON.stringify(userProfile));
    appState.currentUser = userProfile;
    appState.notify();

    return {
      success: true,
      user: userProfile,
      message: 'Account created successfully. Please verify your email before accessing StudentSphere.'
    };
  } else {
    // Developer Fallback Mode when Firebase API key is unconfigured
    const newUid = `usr-${Date.now()}`;
    const userProfile = {
      uid: newUid,
      id: newUid,
      name,
      email,
      branch,
      semester,
      university: university || 'Graphic Era (Deemed to be University) - GEU Dehradun',
      role: 'user',
      isEmailVerified: false,
      credits: 100
    };

    localStorage.setItem(STORAGE_KEY_AUTH_USER, JSON.stringify(userProfile));
    appState.currentUser = userProfile;
    appState.notify();

    return {
      success: true,
      user: userProfile,
      message: 'Account created successfully. Please verify your email before accessing StudentSphere.'
    };
  }
}

export const registerUser = register;

/**
 * Log in with email and password
 */
export async function login(email, password, options = {}) {
  if (!email || !password) {
    throw new Error('Email and password are required.');
  }

  const selectedCampus = options.university || options.campus || appState.currentUser?.university || 'Graphic Era (Deemed to be University) - GEU Dehradun';
  const selectedBranch = options.branch || appState.currentUser?.branch || 'CSE';

  if (isFirebaseConfigured && auth) {
    try {
      const credential = await signInWithEmailAndPassword(auth, email, password);
      const user = credential.user;

      // 1. Get current Firebase user
      // 2. Check user.emailVerified
      // 3. Read Firestore document: users/{currentUser.uid}
      // 4. Read the "role" field
      let userRole = 'user';
      let profileData = null;

      if (db) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            profileData = userDoc.data();
            userRole = (profileData.role === 'admin' && user.emailVerified) ? 'admin' : 'user';
          }
        } catch (fsErr) {
          console.warn('Could not read user profile from Firestore during login:', fsErr);
        }
      }

      const userProfile = {
        uid: user.uid,
        id: user.uid,
        name: user.displayName || profileData?.name || email.split('@')[0],
        email: user.email,
        photoURL: user.photoURL || profileData?.photoURL || appState.currentUser?.photoURL || null,
        role: userRole,
        isEmailVerified: Boolean(user.emailVerified),
        university: profileData?.university || selectedCampus,
        branch: profileData?.branch || selectedBranch,
        semester: profileData?.semester || appState.currentUser?.semester || '5',
        credits: profileData?.credits ?? appState.currentUser?.credits ?? 350
      };

      localStorage.setItem(STORAGE_KEY_AUTH_USER, JSON.stringify(userProfile));
      appState.currentUser = userProfile;
      appState.notify();

      return { success: true, user: userProfile };
    } catch (err) {
      let friendlyMsg = 'Login failed. Please check your credentials.';
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
        friendlyMsg = 'Invalid email or password. Please verify your login credentials.';
      } else if (err.code === 'auth/too-many-requests') {
        friendlyMsg = 'Access temporarily disabled due to many failed login attempts. Please reset your password or try again later.';
      } else if (err.message) {
        friendlyMsg = err.message;
      }
      throw new Error(friendlyMsg);
    }
  } else {
    // Developer Fallback Mode (Strictly defaults to student; admin must be granted via backend)
    const stored = localStorage.getItem(STORAGE_KEY_AUTH_USER);
    let userProfile = stored ? JSON.parse(stored) : null;

    if (!userProfile) {
      userProfile = {
        uid: 'usr-001',
        id: 'usr-001',
        name: email.split('@')[0],
        email,
        role: 'student',
        isEmailVerified: false,
        university: selectedCampus,
        branch: selectedBranch,
        semester: '5',
        credits: 350
      };
    } else {
      userProfile.university = selectedCampus;
      userProfile.branch = selectedBranch;
      userProfile.email = email;
      userProfile.role = 'student';
    }

    localStorage.setItem(STORAGE_KEY_AUTH_USER, JSON.stringify(userProfile));
    appState.currentUser = userProfile;
    appState.notify();

    return { success: true, user: userProfile };
  }
}

export const loginUser = login;

/**
 * Log out user from Firebase and clear state
 */
export async function logout() {
  if (isFirebaseConfigured && auth) {
    try {
      await signOut(auth);
    } catch (err) {
      console.warn('SignOut error:', err);
    }
  }

  localStorage.removeItem(STORAGE_KEY_AUTH_USER);
  appState.currentUser = null;
  appState.isDropdownOpen = false;
  appState.isUserMenuOpen = false;
  appState.notify();

  // Redirect to public homepage
  router.navigate('/');
}

export const logoutUser = logout;

/**
 * Permanently delete current user account from Firebase and state
 */
export async function deleteAccount() {
  if (isFirebaseConfigured && auth?.currentUser) {
    try {
      await deleteUser(auth.currentUser);
    } catch (err) {
      if (err.code === 'auth/requires-recent-login') {
        throw new Error('For security, please log out and log back in before deleting your account.');
      }
      throw err;
    }
  }

  localStorage.removeItem(STORAGE_KEY_AUTH_USER);
  appState.currentUser = null;
  appState.isDropdownOpen = false;
  appState.isUserMenuOpen = false;
  appState.notify();

  router.navigate('/');
  return { success: true, message: 'Your StudentSphere account has been permanently deleted.' };
}

/**
 * Send password reset email via Firebase
 */
export async function sendPasswordReset(email) {
  if (!email) {
    throw new Error('Please enter your registered email address.');
  }

  if (isFirebaseConfigured && auth) {
    await sendPasswordResetEmail(auth, email);
    return { success: true, message: 'Password recovery email sent via Firebase. Please check your inbox.' };
  }

  return { success: true, message: 'Password reset instructions have been dispatched to your email address.' };
}

export const resetPassword = sendPasswordReset;

/**
 * Resend verification email
 */
export async function sendVerificationEmail() {
  if (isFirebaseConfigured && auth?.currentUser) {
    await sendEmailVerification(auth.currentUser);
    return { success: true, message: 'Verification email sent. Please check your inbox.' };
  }

  return { success: true, message: 'Verification email has been re-dispatched.' };
}

export const resendVerificationEmail = sendVerificationEmail;

/**
 * Reload active user state from Firebase to check updated emailVerified status
 */
export async function reloadCurrentUser() {
  if (isFirebaseConfigured && auth?.currentUser) {
    await reload(auth.currentUser);
    const u = auth.currentUser;
    if (appState.currentUser) {
      appState.currentUser.isEmailVerified = Boolean(u.emailVerified);
      localStorage.setItem(STORAGE_KEY_AUTH_USER, JSON.stringify(appState.currentUser));
      appState.notify();
    }
    return u;
  }

  return getCurrentUser();
}

/**
 * Retrieve active Firebase ID token for Authorization: Bearer <token>
 */
export async function getAuthToken() {
  if (isFirebaseConfigured && auth?.currentUser) {
    return await auth.currentUser.getIdToken();
  }
  return 'demo_firebase_id_token_' + (appState.currentUser?.id || 'usr-guest');
}

/**
 * Protected Route Guard
 * Checks:
 * 1. Is user logged in? (If no -> /auth/login.html?redirect=...)
 * 2. Is email verified? (If no -> /auth/verify-email.html?redirect=...)
 * 3. If admin route, is user admin?
 */
export function checkAuth(options = { requireVerified: true, requireAdmin: false }) {
  const currentPathWithQuery = window.location.pathname + window.location.search;

  if (!isLoggedIn()) {
    const redirectUrl = `/auth/login.html?redirect=${encodeURIComponent(currentPathWithQuery)}`;
    router.navigate(redirectUrl);
    return false;
  }

  const user = getCurrentUser();

  if (options.requireVerified && !user.isEmailVerified) {
    const verifyUrl = `/auth/verify-email.html?redirect=${encodeURIComponent(currentPathWithQuery)}`;
    router.navigate(verifyUrl);
    return false;
  }

  if (options.requireAdmin && user.role !== 'admin') {
    return false;
  }

  return true;
}

// Subscribe to Firebase Auth state listener
if (isFirebaseConfigured && auth) {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      let existing = null;
      try {
        const stored = localStorage.getItem(STORAGE_KEY_AUTH_USER);
        if (stored) existing = JSON.parse(stored);
      } catch {
        // ignore
      }

      // Read Firestore document: users/{currentUser.uid}
      let userRole = 'user';
      let profileData = null;
      if (db) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            profileData = userDoc.data();
            userRole = (profileData.role === 'admin' && user.emailVerified) ? 'admin' : 'user';
          }
        } catch (fsErr) {
          console.warn('Could not read user role from Firestore during auth state init:', fsErr);
        }
      }

      const userProfile = {
        uid: user.uid,
        id: user.uid,
        name: user.displayName || profileData?.name || user.email?.split('@')[0] || 'Student',
        email: user.email,
        photoURL: user.photoURL || profileData?.photoURL || existing?.photoURL || null,
        isEmailVerified: Boolean(user.emailVerified),
        role: userRole,
        university: profileData?.university || existing?.university || appState.currentUser?.university || 'Graphic Era (Deemed to be University) - GEU Dehradun',
        branch: profileData?.branch || existing?.branch || appState.currentUser?.branch || 'CSE',
        semester: profileData?.semester || existing?.semester || appState.currentUser?.semester || '5',
        credits: profileData?.credits ?? existing?.credits ?? appState.currentUser?.credits ?? 350
      };
      localStorage.setItem(STORAGE_KEY_AUTH_USER, JSON.stringify(userProfile));
      appState.currentUser = userProfile;
    } else {
      localStorage.removeItem(STORAGE_KEY_AUTH_USER);
      appState.currentUser = null;
    }
    appState.isAuthInitialized = true;
    if (authInitResolver) authInitResolver();
    appState.notify();
  });
} else {
  // Offline / local development auth initialization
  appState.isAuthInitialized = true;
  if (authInitResolver) authInitResolver();
}
