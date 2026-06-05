'use client';

import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'
import { getRemoteConfig } from 'firebase/remote-config';

// IMPORTANT: DO NOT MODIFY THIS FUNCTION UNLESS NECESSARY FOR BUILD RESILIENCE
export function initializeFirebase() {
  if (getApps().length) {
    return getSdks(getApp());
  }

  let firebaseApp;
  try {
    // Attempt automatic initialization first (Firebase App Hosting)
    firebaseApp = initializeApp();
  } catch (e) {
    // Silently fall back to provided config for non-App Hosting environments (like local or Netlify builds)
    firebaseApp = initializeApp(firebaseConfig);
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
