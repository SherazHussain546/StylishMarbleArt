
'use server';

import { z } from 'zod';
import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, doc, deleteDoc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { revalidatePath } from 'next/cache';

const testimonialSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  text: z.string().min(1, 'Testimonial text is required'),
  sourceUrl: z.string().url().optional().or(z.literal('')),
});

export interface Testimonial {
    id: string;
    name: string;
    text: string;
    sourceUrl?: string;
    createdAt: {
        seconds: number;
        nanoseconds: number;
    };
}

// Action to add a new testimonial
export async function addTestimonial(data: z.infer<typeof testimonialSchema>) {
  try {
    const validation = testimonialSchema.safeParse(data);
    if (!validation.success) {
      throw new Error(validation.error.flatten().fieldErrors.toString());
    }
    
    const docRef = await addDoc(collection(db, 'testimonials'), {
      ...validation.data,
      createdAt: serverTimestamp(),
    });

    revalidatePath('/');
    revalidatePath('/admin/dashboard/testimonials');

    const newTestimonial: Testimonial = {
        id: docRef.id,
        ...validation.data,
        createdAt: { seconds: Date.now() / 1000, nanoseconds: 0} // Approximate timestamp
    }

    return { success: true, newTestimonial };
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to add testimonial.' };
  }
}

// Action to get all testimonials
export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const q = query(collection(db, 'testimonials'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const testimonials = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Testimonial[];
    return testimonials;
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return [];
  }
}

// Action to delete a testimonial
export async function deleteTestimonial(id: string) {
  try {
    await deleteDoc(doc(db, 'testimonials', id));
    revalidatePath('/');
    revalidatePath('/admin/dashboard/testimonials');
    return { success: true };
  } catch (error: any) {
    console.error("Deletion error:", error);
    return { success: false, error: error.message || 'Failed to delete testimonial.' };
  }
}
