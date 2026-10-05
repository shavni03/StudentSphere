/**
 * Firebase Client Configuration (Project: studentsphere-71a6a)
 * 
 * Securely initializes the Firebase App and Firebase Authentication SDK
 * using Vite environment variables.
 * 
 * Never hardcode private service keys or backend tokens in this file.
 */

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const env = (typeof import.meta !== 'undefined' && import.meta.env) ? import.meta.env : (typeof process !== 'undefined' ? process.env : {});

export const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY || '',
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || 'studentsphere-71a6a.firebaseapp.com',
  projectId: env.VITE_FIREBASE_PROJECT_ID || 'studentsphere-71a6a',
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET || 'studentsphere-71a6a.firebasestorage.app',
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID || '958383056579',
  appId: env.VITE_FIREBASE_APP_ID || '1:958383056579:web:e9c3def42f5ca2fb74e476',
  measurementId: env.VITE_FIREBASE_MEASUREMENT_ID || 'G-E9J982XCL0'
};

export const isFirebaseConfigured = Boolean(firebaseConfig.apiKey && firebaseConfig.apiKey.trim() !== '');

let appInstance = null;
let authInstance = null;

if (isFirebaseConfigured) {
  try {
    appInstance = getApps().length ? getApp() : initializeApp(firebaseConfig);
    authInstance = getAuth(appInstance);
  } catch (err) {
    console.warn('Firebase initialization warning:', err.message);
  }
} else {
  // Graceful fallback when VITE_FIREBASE_API_KEY is not yet populated
  console.info(
    'ℹ️ StudentSphere: Firebase API key not detected in .env. Running with local auth state persistence. Provide VITE_FIREBASE_API_KEY to connect live Firebase Authentication.'
  );
}

export const app = appInstance;
export const auth = authInstance;
