'use client';

import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'
import { getRemoteConfig } from 'firebase/remote-config';

// Safe initialization for both local, App Hosting, and CI environments like Netlify
export function initializeFirebase() {
  if (getApps().length) {
    return getSdks(getApp());
  }

  let firebaseApp: FirebaseApp;
  
  // Basic check for config validity
  const hasConfig = firebaseConfig && firebaseConfig.apiKey;

  try {
    // Only attempt automatic init if we're likely in a Google environment
    if (!hasConfig || process.env.FIREBASE_CONFIG || process.env.K_SERVICE) {
      firebaseApp = initializeApp();
    } else {
      firebaseApp = initializeApp(firebaseConfig);
    }
  } catch (e) {
    // Final fallback to provided config
    if (hasConfig) {
      firebaseApp = initializeApp(firebaseConfig);
    } else {
      // If no config and auto-init fails, we still return SDKs but they might fail at runtime
      // This allows the build to proceed if Firebase isn't strictly needed for static generation
      firebaseApp = initializeApp({ apiKey: "placeholder-for-build" });
    }
  }

  return getSdks(firebaseApp);
}

export function getSdks(firebaseApp: FirebaseApp) {
  return {
    firebaseApp,
    auth: getAuth(firebaseApp),
    firestore: getFirestore(firebaseApp),
    remoteConfig: typeof window !== 'undefined' ? getRemoteConfig(firebaseApp) : null
  };
}

export * from './provider';
export * from './client-provider';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
export * from './remote-config/use-variant';
export * from './non-blocking-updates';
export * from './non-blocking-login';
export * from './errors';
export * from './error-emitter';
