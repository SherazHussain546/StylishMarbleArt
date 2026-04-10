'use client';

import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { initializeFirestore, getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';

/**
 * Standardized Firebase initialization for this environment.
 * Ensures Firestore uses long-polling to prevent 'code=unavailable' errors
 * frequently seen in restricted network environments.
 */
export function initializeFirebase() {
  const apps = getApps();
  let firebaseApp: FirebaseApp;

  if (!apps.length) {
    firebaseApp = initializeApp(firebaseConfig);
  } else {
    firebaseApp = getApp();
  }

  // Robust Firestore initialization with long-polling
  let firestore: Firestore;
  try {
    // We force long polling and disable fetch streams for maximum compatibility
    // with restricted cloud development environments.
    firestore = initializeFirestore(firebaseApp, {
      experimentalForceLongPolling: true,
      useFetchStreams: false,
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
