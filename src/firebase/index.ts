import { initializeApp, getApps, getApp } from 'firebase/app';
import { initializeFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { firebaseConfig } from './config';

export function initializeFirebase() {
  const firebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  
  // Using initializeFirestore with experimentalForceLongPolling helps resolve 
  // "unavailable" errors in specific restricted network environments.
  const firestore = initializeFirestore(firebaseApp, {
    experimentalForceLongPolling: true,
  });
  
  const auth = getAuth(firebaseApp);
  const storage = getStorage(firebaseApp);

  return { firebaseApp, firestore, auth, storage };
}

export * from './provider';
export * from './client-provider';
export * from './auth/use-user';
export * from './firestore/use-collection';
export * from './firestore/use-doc';