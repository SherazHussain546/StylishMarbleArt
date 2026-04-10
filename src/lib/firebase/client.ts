
'use client';

/**
 * DEPRECATED: Redirecting to standardized Firebase hooks.
 */
import { initializeFirebase } from '@/firebase';
const { auth, firestore: db, storage } = initializeFirebase();
export { auth, db, storage };
