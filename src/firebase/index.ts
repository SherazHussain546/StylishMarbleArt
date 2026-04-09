
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { initializeFirestore, getFirestore, Firestore } from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';
import { getStorage, FirebaseStorage } from 'firebase/storage';
import { firebaseConfig } from './config';

let app: FirebaseApp;
let db: Firestore;
let auth: Auth;
let storage: FirebaseStorage;

/**
 * Initializes Firebase services with standardized configuration.
 * Includes long-polling fix for Firestore to prevent 'unavailable' errors in restricted environments.
 */
export function initializeFirebase() {
  if (getApps().length > 0) {
    app = getApp();
    db = getFirestore(app);
    auth = getAuth(app);
    storage = getStorage(app);
  } else {
    app = initializeApp(firebaseConfig);
    // Standardizing Firestore initialization with long-polling for stability
    db = initializeFirestore(app, {
      experimentalForceLongPolling: true,
    });
    auth = getAuth(app);
    storage = getStorage(app);
  }

  return { firebaseApp: app, firestore: db, auth, storage };
}

export * from './provider';
export * from './client-provider';
export * from './auth/use-user';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
