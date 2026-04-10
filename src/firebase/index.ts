
'use client';

import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { initializeFirestore, getFirestore, Firestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// IMPORTANT: DO NOT MODIFY THIS FUNCTION
export function initializeFirebase() {
  if (!getApps().length) {
    let firebaseApp: FirebaseApp;
    try {
      firebaseApp = initializeApp();
    } catch (e) {
      firebaseApp = initializeApp(firebaseConfig);
    }

    // Standardized robust Firestore initialization for this environment
    const firestore = initializeFirestore(firebaseApp, {
      experimentalForceLongPolling: true,
    });

    return {
      firebaseApp,
      auth: getAuth(firebaseApp),
      firestore,
      storage: getStorage(firebaseApp),
    };
  }

  const app = getApp();
  return {
    firebaseApp: app,
    auth: getAuth(app),
    firestore: getFirestore(app),
    storage: getStorage(app),
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
