
'use server';

import { draftMessage, type DraftMessageInput } from '@/ai/flows/draft-message';
import { z } from 'zod';
import { db } from '@/lib/firebase';
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

  // Save the message to Firestore
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
     return { success: false, error: 'Failed to save message.' };
  }
}

export async function generateDraftAction(input: DraftMessageInput) {
    try {
        const result = await draftMessage(input);
        return { success: true, message: result.message };
    } catch (error) {
        console.error('Error generating draft:', error);
        return { success: false, error: 'Failed to generate draft message.' };
    }
}
