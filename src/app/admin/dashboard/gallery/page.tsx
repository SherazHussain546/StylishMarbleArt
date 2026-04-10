'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, UploadCloud, ImageIcon, Trash2, Loader2, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { useFirestore, useCollection, useStorage, useMemoFirebase } from '@/firebase';
import { collection, addDoc, deleteDoc, doc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

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

  // Simple query for the gallery
  const galleryQuery = useMemoFirebase(() => {
    if (!db) return null;
    return query(collection(db, 'gallery'), orderBy('createdAt', 'desc'));
  }, [db]);

  const { data: images, isLoading: imagesLoading } = useCollection<any>(galleryQuery);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !category || !altText) {
      toast({ variant: 'destructive', title: 'Error', description: 'Please select a file and fill all fields.' });
      return;
    }

    setIsUploading(true);
    try {
      // 1. Simple Binary Upload to Storage
      const fileName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
      const storageRef = ref(storage, `gallery/${fileName}`);
      
      const snapshot = await uploadBytes(storageRef, file, { contentType: file.type });
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      // 2. Immediate Write to Firestore (Simplified)
      const imageData = {
        url: downloadURL,
        alt: altText,
        category: category,
        path: snapshot.ref.fullPath,
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, 'gallery'), imageData);
      
      toast({ title: 'Success', description: 'Image added to gallery.' });
      
      // Clear form
      setFile(null);
      setCategory('');
      setAltText('');
      const input = document.getElementById('image-file') as HTMLInputElement;
      if (input) input.value = '';

    } catch (error: any) {
      console.error("Upload Error:", error);
      toast({ 
        variant: 'destructive', 
        title: 'Upload Failed', 
        description: error.message || "Is your internet connection stable?" 
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: string, path: string) => {
    if (!confirm('Permanently delete this item?')) return;
    try {
      if (path) {
        const storageRef = ref(storage, path);
        deleteObject(storageRef).catch(() => {});
      }
      await deleteDoc(doc(db, 'gallery', id));
      toast({ title: 'Deleted', description: 'Item removed.' });
    } catch (error: any) {
       toast({ variant: 'destructive', title: 'Error', description: error.message });
    }
  };

  const handleResetConnection = () => {
    window.location.reload();
  };

  return (
    <div className="p-4 md:p-8 bg-secondary/10 min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" asChild>
            <Link href="/admin/dashboard">
                <ArrowLeft className="h-4 w-4" />
            </Link>
            </Button>
            <h1 className="text-3xl font-bold tracking-tight">Gallery Workshop</h1>
        </div>
        <Button variant="ghost" size="sm" onClick={handleResetConnection}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh Sync
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-1 shadow-md border-primary/20">
          <CardHeader>
            <CardTitle>Add New Work</CardTitle>
            <CardDescription>Directly upload from your device.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpload} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="image-file">1. Select Photo</Label>
                <Input 
                    id="image-file" 
                    type="file" 
                    required 
                    accept="image/*" 
                    onChange={(e) => setFile(e.target.files?.[0] || null)} 
                    disabled={isUploading} 
                    className="cursor-pointer"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">2. Workshop Category</Label>
                <Select required onValueChange={setCategory} value={category} disabled={isUploading}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Pick a category..." />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="alt-text">3. Description / Alt Text</Label>
                <Input 
                    id="alt-text" 
                    placeholder="e.g. Ziarat White Gravestone" 
                    value={altText} 
                    onChange={(e) => setAltText(e.target.value)} 
                    required 
                    disabled={isUploading} 
                />
              </div>

              <Button type="submit" className="w-full py-6 text-lg" disabled={isUploading}>
                  {isUploading ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Uploading...</> : <><UploadCloud className="mr-2 h-5 w-5" /> Save to Gallery</>}
              </Button>
              
              {isUploading && (
                  <p className="text-[10px] text-center text-muted-foreground animate-pulse">
                    Please stay on this page while the file transfers...
                  </p>
              )}
            </form>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 shadow-md">
          <CardHeader>
            <CardTitle>Live Portfolio</CardTitle>
            <CardDescription>Current photos synced to the public website.</CardDescription>
          </CardHeader>
          <CardContent>
             {imagesLoading ? (
               <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[...Array(6)].map((_, i) => <Skeleton key={i} className="aspect-square rounded-md" />)}
               </div>
             ) : images && images.length > 0 ? (
               <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                 {images.map((img: any) => (
                   <div key={img.id} className="group relative aspect-square overflow-hidden rounded-md border bg-muted shadow-sm">
                      <Image src={img.url} alt={img.alt} fill className="object-cover" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                         <Button variant="destructive" size="icon" onClick={() => handleDelete(img.id, img.path)}>
                            <Trash2 className="h-4 w-4" />
                         </Button>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-1 text-[9px] text-white uppercase font-bold text-center tracking-tighter">
                         {img.category}
                      </div>
                   </div>
                 ))}
               </div>
             ) : (
               <div className="py-24 text-center border-2 border-dashed rounded-xl bg-muted/30">
                  <ImageIcon className="h-16 w-16 mx-auto mb-4 opacity-20 text-primary" />
                  <p className="text-muted-foreground font-medium">Your gallery is empty.</p>
                  <p className="text-xs text-muted-foreground/60">Upload your first project to see it here.</p>
               </div>
             )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
