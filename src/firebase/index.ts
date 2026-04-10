'use client';

import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { initializeFirestore, getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

/**
 * Standardized Firebase initialization for this environment.
 * Force aggressive settings to bypass cloud workstation proxy issues.
 */
export function initializeFirebase() {
  const apps = getApps();
  const firebaseApp = apps.length ? apps[0] : initializeApp(firebaseConfig);

  let firestore;
  try {
    firestore = initializeFirestore(firebaseApp, {
      experimentalForceLongPolling: true,
      useFetchStreams: false,
    });
  } catch (e) {
    firestore = getFirestore(firebaseApp);
  }

  return {
    firebaseApp,
    auth: getAuth(firebaseApp),
    firestore: firestore,
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
