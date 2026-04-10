
'use client';

import { useState } from 'react';
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
import { useFirestore, useCollection, useStorage, useMemoFirebase } from '@/firebase';
import { collection, addDoc, deleteDoc, doc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
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
  const storage = useStorage();
  const { toast } = useToast();
  
  const [file, setFile] = useState<File | null>(null);
  const [category, setCategory] = useState('');
  const [altText, setAltText] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isGeneratingAlt, setIsGeneratingAlt] = useState(false);

  // Use the specialized useMemoFirebase hook to stabilize the query
  const galleryQuery = useMemoFirebase(() => {
    if (!db) return null;
    return query(collection(db, 'gallery'), orderBy('createdAt', 'desc'));
  }, [db]);

  const { data: images, isLoading: imagesLoading } = useCollection<any>(galleryQuery);

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
        try {
          const result = await generateAltText({ photoDataUri: dataUri });
          setAltText(result.altText);
          toast({ title: 'AI Success', description: 'Alt text generated successfully.' });
        } catch (err) {
          toast({ variant: 'destructive', title: 'AI Error', description: 'Could not analyze image.' });
        } finally {
          setIsGeneratingAlt(false);
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      setIsGeneratingAlt(false);
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to read file.' });
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
      const timestamp = Date.now();
      const fileName = `${timestamp}_${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
      const storageRef = ref(storage, `gallery/${fileName}`);
      
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);

      const galleryRef = collection(db, 'gallery');
      const imageData = {
        url: downloadURL,
        alt: altText,
        category: category,
        path: snapshot.ref.fullPath,
        createdAt: serverTimestamp(),
      };

      addDoc(galleryRef, imageData)
        .then(() => {
          toast({ title: 'Success!', description: 'Image added to gallery.' });
          setFile(null);
          setCategory('');
          setAltText('');
          const fileInput = document.getElementById('image-file') as HTMLInputElement;
          if (fileInput) fileInput.value = '';
        })
        .catch(async (error: any) => {
          if (error.code === 'permission-denied') {
            const permissionError = new FirestorePermissionError({
              path: 'gallery',
              operation: 'create',
              requestResourceData: imageData,
            });
            errorEmitter.emit('permission-error', permissionError);
          } else {
            toast({ variant: 'destructive', title: 'Database Error', description: error.message || 'Failed to save metadata.' });
          }
        })
        .finally(() => {
          setIsUploading(false);
        });

    } catch (error: any) {
      toast({ 
        variant: 'destructive', 
        title: 'Upload Failed', 
        description: error.message || 'Could not upload image to storage.' 
      });
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: string, path: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;

    try {
      const storageRef = ref(storage, path);
      await deleteObject(storageRef);
      await deleteDoc(doc(db, 'gallery', id));
      toast({ title: 'Deleted', description: 'Image removed from gallery.' });
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
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Upload New Image</CardTitle>
              <CardDescription>Add a new piece of work to your public portfolio.</CardDescription>
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
                  <Label htmlFor="alt-text">3. SEO Alt Text</Label>
                   <div className="flex gap-2">
                    <Input 
                        id="alt-text" 
                        placeholder="e.g., White marble gravestone" 
                        value={altText} 
                        onChange={(e) => setAltText(e.target.value)} 
                        required 
                        disabled={isUploading} 
                    />
                    <Button 
                        type="button" 
                        variant="outline" 
                        size="icon" 
                        onClick={handleGenerateAlt} 
                        disabled={!file || isUploading || isGeneratingAlt} 
                    >
                        {isGeneratingAlt ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                    </Button>
                   </div>
                </div>

                <Button type="submit" className="w-full" disabled={isUploading}>
                  {isUploading ? (
                      <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Uploading...</>
                  ) : (
                      <><UploadCloud className="mr-2 h-4 w-4" /> Publish to Gallery</>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Current Gallery Items</CardTitle>
                <CardDescription>Visible on the public gallery page.</CardDescription>
              </div>
              <div className="text-sm font-medium text-muted-foreground bg-secondary px-3 py-1 rounded-full">
                {images?.length || 0} Total
              </div>
            </CardHeader>
            <CardContent>
               {imagesLoading ? (
                 <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {[...Array(6)].map((_, i) => <Skeleton key={i} className="aspect-square rounded-md" />)}
                 </div>
               ) : images && images.length > 0 ? (
                 <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                   {images.map((img: any) => (
                     <div key={img.id} className="group relative aspect-square overflow-hidden rounded-md border shadow-sm bg-muted">
                        <Image src={img.url} alt={img.alt} fill className="object-cover transition-opacity group-hover:opacity-75" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                           <Button variant="destructive" size="icon" onClick={() => handleDelete(img.id, img.path)}>
                              <Trash2 className="h-4 w-4" />
                           </Button>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2 text-[10px] text-white">
                           <div className="font-bold uppercase">{img.category}</div>
                        </div>
                     </div>
                   ))}
                 </div>
               ) : (
                 <div className="flex flex-col items-center justify-center text-center text-muted-foreground py-20 border-2 border-dashed rounded-lg">
                    <ImageIcon className="h-16 w-16 mb-4 opacity-10" />
                    <h3 className="font-semibold text-lg">No Gallery Data</h3>
                    <p className="text-sm">Upload images to populate the database.</p>
                 </div>
               )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
