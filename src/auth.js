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
import { auth, isFirebaseConfigured } from './firebase-config.js';
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
      isEmailVerified: Boolean(u.emailVerified || appState.currentUser?.isEmailVerified),
      role: u.email?.includes('admin') ? 'admin' : (appState.currentUser?.role || 'student'),
      branch: appState.currentUser?.branch || 'CSE',
      semester: appState.currentUser?.semester || '5',
      credits: appState.currentUser?.credits ?? 100
    };
  }

  return appState.currentUser || null;
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
export async function register({ name, email, password, confirmPassword, termsAccepted = false, branch = 'CSE', semester = '5' }) {
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

    const userProfile = {
      uid: user.uid,
      id: user.uid,
      name,
      email: user.email,
      branch,
      semester,
      role: 'student',
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
      role: 'student',
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
export async function login(email, password) {
  if (!email || !password) {
    throw new Error('Email and password are required.');
  }

  if (isFirebaseConfigured && auth) {
    try {
      const credential = await signInWithEmailAndPassword(auth, email, password);
      const user = credential.user;

      const userProfile = {
        uid: user.uid,
        id: user.uid,
        name: user.displayName || email.split('@')[0],
        email: user.email,
        role: user.email?.includes('admin') ? 'admin' : (appState.currentUser?.role || 'student'),
        isEmailVerified: Boolean(user.emailVerified),
        branch: appState.currentUser?.branch || 'CSE',
        semester: appState.currentUser?.semester || '5',
        credits: appState.currentUser?.credits ?? 350
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
    // Developer Fallback Mode
    const stored = localStorage.getItem(STORAGE_KEY_AUTH_USER);
    let userProfile = stored ? JSON.parse(stored) : null;

    if (!userProfile) {
      userProfile = {
        uid: 'usr-001',
        id: 'usr-001',
        name: email.split('@')[0],
        email,
        role: email.includes('admin') ? 'admin' : 'student',
        isEmailVerified: false,
        branch: 'CSE',
        semester: '5',
        credits: 350
      };
    }

    userProfile.email = email;
    if (email.includes('admin')) userProfile.role = 'admin';

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

export const requireAuth = checkAuth;

// Subscribe to Firebase Auth state listener
if (isFirebaseConfigured && auth) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const userProfile = {
        uid: user.uid,
        id: user.uid,
        name: user.displayName || user.email?.split('@')[0] || 'Student',
        email: user.email,
        isEmailVerified: Boolean(user.emailVerified),
        role: user.email?.includes('admin') ? 'admin' : (appState.currentUser?.role || 'student'),
        branch: appState.currentUser?.branch || 'CSE',
        semester: appState.currentUser?.semester || '5',
        credits: appState.currentUser?.credits ?? 350
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
