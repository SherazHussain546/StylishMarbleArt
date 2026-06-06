'use client';

import { useEffect } from 'react';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { useToast } from '@/hooks/use-toast';

/**
 * An invisible component that listens for globally emitted 'permission-error' events.
 * It provides rich debugging info in development and user-friendly alerts in production.
 */
export function FirebaseErrorListener() {
  const { toast } = useToast();

  useEffect(() => {
    const handleError = (error: FirestorePermissionError) => {
      // In development, throw the error to trigger the rich Next.js error overlay.
      // This is vital for debugging Security Rules with contextual JSON data.
      if (process.env.NODE_ENV === 'development') {
        // We throw in a timeout to ensure it's not caught by the emitter itself
        // but by the global error boundary.
        setTimeout(() => { throw error; }, 0);
      } else {
        // In production, we show a graceful notification instead of crashing the app.
        toast({
          variant: 'destructive',
          title: 'Database Access Denied',
          description: 'Your account does not have administrative write permissions. Please check the dashboard for setup instructions.',
        });
      }
    };

    errorEmitter.on('permission-error', handleError);

    return () => {
      errorEmitter.off('permission-error', handleError);
    };
  }, [toast]);

  return null;
}
