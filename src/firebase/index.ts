
'use client';

import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { initializeFirestore, getFirestore, Firestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

/**
 * Standardized Firebase initialization for this environment.
 * Ensures Firestore uses long-polling to prevent 'code=unavailable' errors.
 */
export function initializeFirebase() {
  const apps = getApps();
  let firebaseApp: FirebaseApp;

  if (!apps.length) {
    try {
      firebaseApp = initializeApp(firebaseConfig);
    } catch (e) {
      // Fallback for environments where config is provided differently
      firebaseApp = initializeApp();
    }
  } else {
    firebaseApp = getApp();
  }

  // Robust Firestore initialization with long-polling
  let firestore: Firestore;
  try {
    firestore = initializeFirestore(firebaseApp, {
      experimentalForceLongPolling: true,
    });
  } catch (e) {
    // If Firestore is already initialized, initializeFirestore will throw.
    // In that case, we retrieve the existing instance.
    firestore = getFirestore(firebaseApp);
  }

  return {
    firebaseApp,
    auth: getAuth(firebaseApp),
    firestore,
    storage: getStorage(firebaseApp),
  };
}

export * from './provider';
export * from './client-provider';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
export * from './non-blocking-updates';
export * from './non-blocking-login';
export * from './errors';
export * from './error-emitter';
