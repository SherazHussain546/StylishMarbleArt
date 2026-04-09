
'use client';

/**
 * DEPRECATED: This file is kept for backward compatibility but is being phased out.
 * Please use the hooks from '@/firebase' instead for standardized initialization
 * and long-polling support.
 */

import { initializeFirebase } from '@/firebase';

const { auth, firestore: db, storage } = initializeFirebase();

export { auth, db, storage };
