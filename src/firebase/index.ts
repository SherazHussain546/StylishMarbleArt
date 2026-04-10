
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { initializeFirestore, Firestore } from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';
import { getStorage, FirebaseStorage } from 'firebase/storage';
import { firebaseConfig } from './config';

let app: FirebaseApp;
let db: Firestore;
let auth: Auth;
let storage: FirebaseStorage;

/**
 * Initializes Firebase services with standardized configuration.
 * Uses experimentalForceLongPolling and disables fetch streams to ensure 
 * connectivity in Cloud Workstation and restricted network environments.
 */
export function initializeFirebase() {
  if (getApps().length > 0) {
    app = getApp();
  } else {
    app = initializeApp(firebaseConfig);
  }

  if (!db) {
    // Force long polling to bypass proxy/workstation blocks
    db = initializeFirestore(app, {
      experimentalForceLongPolling: true,
      // @ts-ignore
      useFetchStreams: false, 
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
