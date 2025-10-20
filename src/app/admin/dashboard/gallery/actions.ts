
'use server';

import { z } from 'zod';
import { db, storage } from '@/lib/firebase/client';
import { collection, addDoc, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { generateAltText } from '@/ai/flows/generate-alt-text';
import { revalidatePath } from 'next/cache';

const ImageSchema = z.object({
  category: z.string(),
  alt: z.string(),
});

export interface GalleryImage {
    id: string;
    url: string;
    alt: string;
    category: string;
    path: string;
}

// Action to upload an image
export async function uploadImage(formData: FormData) {
  try {
    const file = formData.get('file') as File;
    const category = formData.get('category') as string;
    const alt = formData.get('alt') as string;

    // Validate with Zod
    ImageSchema.parse({ category, alt });
    if (!file) throw new Error('No file provided.');

    // Upload file to Firebase Storage
    const storageRef = ref(storage, `gallery/${Date.now()}_${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    
    // Get the download URL
    const downloadURL = await getDownloadURL(snapshot.ref);

    // Add image metadata to Firestore
    await addDoc(collection(db, 'gallery'), {
      url: downloadURL,
      alt: alt,
      category: category,
      path: snapshot.ref.fullPath, // Store path for deletion
      createdAt: new Date(),
    });

    revalidatePath('/gallery');
    revalidatePath('/admin/dashboard/gallery');

    return { success: true };
  } catch (error: any) {
    console.error("Upload error:", error);
    return { success: false, error: error.message || 'Failed to upload image.' };
  }
}

// Action to get all images
export async function getImages(): Promise<GalleryImage[]> {
  try {
    const querySnapshot = await getDocs(collection(db, 'gallery'));
    const images = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as GalleryImage[];
    return images;
  } catch (error) {
    console.error("Error fetching images:", error);
    return [];
  }
}

// Action to delete an image
export async function deleteImage(id: string, path: string) {
  try {
    // Delete from Firestore
    await deleteDoc(doc(db, 'gallery', id));
    
    // Delete from Storage
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);

    revalidatePath('/gallery');
    revalidatePath('/admin/dashboard/gallery');

    return { success: true };
  } catch (error: any) {
    console.error("Deletion error:", error);
    return { success: false, error: error.message || 'Failed to delete image.' };
  }
}

// Action to generate alt text
export async function generateAltTextAction(photoDataUri: string) {
    if (!photoDataUri) {
        return { success: false, error: 'No image data provided.' };
    }
    try {
        const result = await generateAltText({ photoDataUri });
        return { success: true, altText: result.altText };
    } catch (error: any) {
        return { success: false, error: 'AI failed to generate description.' };
    }
}
