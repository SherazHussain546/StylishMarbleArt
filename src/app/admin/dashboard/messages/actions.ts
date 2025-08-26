
'use server';

import { db } from '@/lib/firebase';
import { collection, getDocs, doc, deleteDoc, orderBy, query } from 'firebase/firestore';
import { revalidatePath } from 'next/cache';

export interface ContactMessage {
    id: string;
    name: string;
    email: string;
    message: string;
    createdAt: {
        seconds: number;
        nanoseconds: number;
    };
    read: boolean;
}

// Action to get all messages
export async function getMessages(): Promise<ContactMessage[]> {
  try {
    const q = query(collection(db, 'contact-messages'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const messages = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as ContactMessage[];
    return messages;
  } catch (error) {
    console.error("Error fetching messages:", error);
    return [];
  }
}

// Action to delete a message
export async function deleteMessage(id: string) {
  try {
    await deleteDoc(doc(db, 'contact-messages', id));
    revalidatePath('/admin/dashboard/messages');
    return { success: true };
  } catch (error: any) {
    console.error("Deletion error:", error);
    return { success: false, error: error.message || 'Failed to delete message.' };
  }
}
