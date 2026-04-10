
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { initializeFirestore, Firestore, terminate } from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';
import { getStorage, FirebaseStorage } from 'firebase/storage';
import { firebaseConfig } from './config';

let app: FirebaseApp;
let db: Firestore;
let auth: Auth;
let storage: FirebaseStorage;

/**
 * Initializes Firebase services with standardized configuration.
 * Uses experimentalForceLongPolling to ensure connectivity in Cloud Workstation environments.
 */
export function initializeFirebase() {
  if (getApps().length > 0) {
    app = getApp();
  } else {
    app = initializeApp(firebaseConfig);
  }

  if (!db) {
    // We use a robust initialization for Firestore with long polling forced
    // to bypass potential gRPC/WebSocket blocks in development environments.
    db = initializeFirestore(app, {
      experimentalForceLongPolling: true,
      useFetchStreams: false, // Ensure maximum compatibility
    });
  }

  if (!auth) auth = getAuth(app);
  if (!storage) storage = getStorage(app);

  return { firebaseApp: app, firestore: db, auth, storage };
}

export * from './provider';
export * from './client-provider';
export * from './auth/use-user';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
