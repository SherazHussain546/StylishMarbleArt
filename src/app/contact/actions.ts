
'use server';

import { z } from 'zod';
import { db } from '@/lib/firebase/client';
import { collection, addDoc } from 'firebase/firestore';
import { revalidatePath } from 'next/cache';

const MessageSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  message: z.string(),
});

export async function saveMessage(data: z.infer<typeof MessageSchema>) {
  try {
    const validatedData = MessageSchema.parse(data);
    await addDoc(collection(db, 'contact-messages'), {
      ...validatedData,
      createdAt: new Date(),
      read: false,
    });
    
    revalidatePath('/admin/dashboard/messages');

    return { success: true };
  } catch (error: any) {
    console.error("Save message error:", error);
    if (error instanceof z.ZodError) {
      return { success: false, error: 'Validation failed.' };
    }
    return { success: false, error: 'An unexpected error occurred.' };
  }
}
