
'use client';

import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { initializeFirestore, getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';

let globalFirestore: Firestore | null = null;

/**
 * Standardized Firebase initialization for this environment.
 * Ensures Firestore uses long-polling to prevent 'code=unavailable' errors
 * frequently seen in restricted network environments.
 */
export function initializeFirebase() {
  const apps = getApps();
  const firebaseApp = apps.length ? apps[0] : initializeApp(firebaseConfig);

  if (!globalFirestore) {
    try {
      // Robust Firestore initialization with long-polling
      // We force long polling and disable fetch streams for maximum compatibility
      // with restricted cloud development environments.
      globalFirestore = initializeFirestore(firebaseApp, {
        experimentalForceLongPolling: true,
        useFetchStreams: false,
      });
    } catch (e) {
      // If Firestore is already initialized, initializeFirestore will throw.
      // In that case, we retrieve the existing instance.
      globalFirestore = getFirestore(firebaseApp);
    }
  }

  return {
    firebaseApp,
    auth: getAuth(firebaseApp),
    firestore: globalFirestore,
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
