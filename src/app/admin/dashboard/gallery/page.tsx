'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, UploadCloud, ImageIcon, Trash2, Loader2, Sparkles } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { useFirestore, useCollection } from '@/firebase';
import { collection, addDoc, deleteDoc, doc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { generateAltText } from '@/ai/flows/generate-alt-text';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

const categories = [
    { id: 'Graves', name: 'Graves' },
    { id: 'Headstones', name: 'Headstones' },
    { id: 'Home Decors', name: 'Home Decors' },
    { id: 'Government Works', name: 'Government' },
    { id: 'Christian Memorials', name: 'Christian' },
    { id: 'Hindu Memorials', name: 'Hindu' },
];

export default function GalleryManagementPage() {
  const db = useFirestore();
  const storage = getStorage();
  const { toast } = useToast();
  
  const [file, setFile] = useState<File | null>(null);
  const [category, setCategory] = useState('');
  const [altText, setAltText] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isGeneratingAlt, setIsGeneratingAlt] = useState(false);

  const galleryQuery = useMemo(() => {
    if (!db) return null;
    return query(collection(db, 'gallery'), orderBy('createdAt', 'desc'));
  }, [db]);

  const { data: images, loading: imagesLoading } = useCollection<any>(galleryQuery);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleGenerateAlt = async () => {
    if (!file) return;
    setIsGeneratingAlt(true);
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const dataUri = e.target?.result as string;
        const result = await generateAltText({ photoDataUri: dataUri });
        setAltText(result.altText);
        setIsGeneratingAlt(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to generate description.' });
      setIsGeneratingAlt(false);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !category || !altText) {
      toast({ variant: 'destructive', title: 'Error', description: 'Please fill all fields.' });
      return;
    }

    setIsUploading(true);
    try {
      const fileName = `${Date.now()}_${file.name}`;
      const storageRef = ref(storage, `gallery/${fileName}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);

      const galleryRef = collection(db, 'gallery');
      const data = {
        url: downloadURL,
        alt: altText,
        category: category,
        path: snapshot.ref.fullPath,
        createdAt: serverTimestamp(),
      };

      addDoc(galleryRef, data)
        .then(() => {
          toast({ title: 'Success', description: 'Image uploaded to gallery.' });
          setFile(null);
          setCategory('');
          setAltText('');
          const fileInput = document.getElementById('image-file') as HTMLInputElement;
          if (fileInput) fileInput.value = '';
        })
        .catch(async (err) => {
           const permissionError = new FirestorePermissionError({
            path: galleryRef.path,
            operation: 'create',
            requestResourceData: data,
          });
          errorEmitter.emit('permission-error', permissionError);
        });

    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Upload Failed', description: error.message });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: string, path: string) => {
    const docRef = doc(db, 'gallery', id);
    try {
      const storageRef = ref(storage, path);
      await deleteObject(storageRef);

      deleteDoc(docRef)
        .then(() => {
          toast({ title: 'Deleted', description: 'Image removed from gallery.' });
        })
        .catch(async (err) => {
           const permissionError = new FirestorePermissionError({
            path: docRef.path,
            operation: 'delete',
          });
          errorEmitter.emit('permission-error', permissionError);
        });
    } catch (error: any) {
       toast({ variant: 'destructive', title: 'Delete Failed', description: error.message });
    }
  };

  return (
    <div className="p-4 md:p-8">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="outline" size="icon" asChild>
          <Link href="/admin/dashboard">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Gallery Management</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Upload New Image</CardTitle>
              <CardDescription>Add a new piece of work to your public gallery. Collections appear in your console after the first upload.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpload} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="image-file">1. Select Image</Label>
                  <Input id="image-file" type="file" required accept="image/*" onChange={handleFileChange} disabled={isUploading} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">2. Choose Category</Label>
                  <Select required onValueChange={setCategory} value={category} disabled={isUploading}>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(cat => (
                        <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="alt-text">3. Alt Text (SEO)</Label>
                   <div className="flex gap-2">
                    <Input id="alt-text" placeholder="Description of the image" value={altText} onChange={(e) => setAltText(e.target.value)} required disabled={isUploading} />
                    <Button type="button" variant="outline" size="icon" onClick={handleGenerateAlt} disabled={!file || isUploading || isGeneratingAlt} title="Generate with AI">
                        {isGeneratingAlt ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                    </Button>
                   </div>
                </div>
                <Button type="submit" className="w-full" disabled={isUploading}>
                  {isUploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <UploadCloud className="mr-2 h-4 w-4" />}
                  {isUploading ? 'Uploading...' : 'Upload Image'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Uploaded Images</CardTitle>
              <CardDescription>Images currently displayed in your gallery.</CardDescription>
            </CardHeader>
            <CardContent>
               {imagesLoading ? (
                 <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {[...Array(6)].map((_, i) => <Skeleton key={i} className="aspect-square rounded-md" />)}
                 </div>
               ) : images.length > 0 ? (
                 <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                   {images.map((img: any) => (
                     <div key={img.id} className="group relative aspect-square overflow-hidden rounded-md border">
                        <Image src={img.url} alt={img.alt} fill className="object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                           <Button variant="destructive" size="icon" onClick={() => handleDelete(img.id, img.path)}>
                              <Trash2 className="h-4 w-4" />
                           </Button>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-1 text-[10px] text-white truncate">
                           {img.category}
                        </div>
                     </div>
                   ))}
                 </div>
               ) : (
                 <div className="flex flex-col items-center justify-center text-center text-muted-foreground p-8 border-2 border-dashed rounded-lg">
                    <ImageIcon className="h-12 w-12 mb-4" />
                    <h3 className="font-semibold text-lg">No Images Found</h3>
                    <p className="text-sm">Your gallery is currently empty. Upload an image to create the collection in Firestore.</p>
                 </div>
               )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
