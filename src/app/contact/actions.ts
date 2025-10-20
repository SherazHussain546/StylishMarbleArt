
'use server';

import { z } from 'zod';
import { db } from '@/lib/firebase/client';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Please enter a valid email address.'),
  message: z.string().min(10, 'Message must be at least 10 characters.'),
});

export async function submitContactForm(data: z.infer<typeof formSchema>) {
  const validation = formSchema.safeParse(data);
  if (!validation.success) {
    return { success: false, error: validation.error.flatten() };
  }

  const { name, email, message } = validation.data;

  try {
    await addDoc(collection(db, 'contact-messages'), {
      name,
      email,
      message,
      createdAt: serverTimestamp(),
      read: false,
    });
    return { success: true };
  } catch (error) {
     console.error('Error saving message to Firestore:', error);
     return { success: false, error: { formErrors: ['Failed to save message due to a server error. Please try again later.'], fieldErrors: {} }};
  }
}
