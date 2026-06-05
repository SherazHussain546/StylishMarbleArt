
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
  const hasConfig = firebaseConfig && firebaseConfig.apiKey && firebaseConfig.apiKey !== "placeholder-for-build";

  try {
    // Priority 1: Use provided config if it looks valid
    if (hasConfig) {
      firebaseApp = initializeApp(firebaseConfig);
    } 
    // Priority 2: Try automatic init if in Google environment (App Hosting)
    else if (process.env.FIREBASE_CONFIG || process.env.K_SERVICE) {
      firebaseApp = initializeApp();
    } 
    // Fallback for build time environments where config might be injected later
    else {
      firebaseApp = initializeApp(firebaseConfig || { apiKey: "placeholder-for-build" });
    }
  } catch (e) {
    // Final fallback to ensure the build worker doesn't crash
    if (!getApps().length) {
      firebaseApp = initializeApp({ apiKey: "placeholder-for-build" });
    } else {
      firebaseApp = getApp();
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
