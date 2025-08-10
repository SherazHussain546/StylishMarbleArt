'use server';

import { draftMessage, type DraftMessageInput } from '@/ai/flows/draft-message';
import { z } from 'zod';

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
  // Here you would typically send an email, save to a database, etc.
  // For this example, we'll just simulate a success response.
  console.log('Form submitted successfully:', validation.data);
  return { success: true };
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
