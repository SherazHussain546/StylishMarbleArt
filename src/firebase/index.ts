import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { initializeFirestore, getFirestore, Firestore, terminate } from 'firebase/firestore';
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

  // We attempt to initialize Firestore with long polling. 
  // If it's already initialized, getFirestore(app) will return the existing instance.
  try {
    db = initializeFirestore(app, {
      experimentalForceLongPolling: true,
    });
  } catch (e) {
    db = getFirestore(app);
  }

  auth = getAuth(app);
  storage = getStorage(app);

  return { firebaseApp: app, firestore: db, auth, storage };
}

export * from './provider';
export * from './client-provider';
export * from './auth/use-user';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
