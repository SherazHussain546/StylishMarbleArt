'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { ArrowLeft, UploadCloud, ImageIcon, Trash2, Loader2, RefreshCw, Zap, Edit2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, addDoc, deleteDoc, updateDoc, doc, serverTimestamp, query, orderBy } from 'firebase/firestore';
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
  const { toast } = useToast();
  
  const [file, setFile] = useState<File | null>(null);
  const [category, setCategory] = useState('');
  const [altText, setAltText] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  // Edit State
  const [editingImage, setEditingImage] = useState<any | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  // Real-time synchronization
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

    // Direct database storage limit (Firestore 1MB limit)
    if (file.size > 800000) {
        toast({ 
            variant: 'destructive', 
            title: 'File Too Large', 
            description: 'Please use an image under 800KB for direct storage.' 
        });
        return;
    }

    setIsUploading(true);
    
    try {
      const reader = new FileReader();
      const dataUrl = await new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      const imageData = {
        url: dataUrl,
        alt: altText,
        category: category,
        createdAt: serverTimestamp(),
      };

      const galleryRef = collection(db, 'gallery');
      
      addDoc(galleryRef, imageData)
        .catch(async (error) => {
          const permissionError = new FirestorePermissionError({
            path: galleryRef.path,
            operation: 'create',
            requestResourceData: imageData,
          });
          errorEmitter.emit('permission-error', permissionError);
        });
      
      toast({ title: 'Success', description: 'Image added to database.' });
      
      setFile(null);
      setCategory('');
      setAltText('');
      const input = document.getElementById('image-file') as HTMLInputElement;
      if (input) input.value = '';

    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Process Failed', description: error.message });
    } finally {
      setIsUploading(false);
    }
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingImage) return;

    setIsUpdating(true);
    const imageRef = doc(db, 'gallery', editingImage.id);
    const updateData = {
      category: editingImage.category,
      alt: editingImage.alt,
    };

    updateDoc(imageRef, updateData)
      .catch(async (error) => {
        const permissionError = new FirestorePermissionError({
          path: imageRef.path,
          operation: 'update',
          requestResourceData: updateData,
        });
        errorEmitter.emit('permission-error', permissionError);
      });

    toast({ title: 'Updated', description: 'Image details updated in real-time.' });
    setEditingImage(null);
    setIsUpdating(false);
  };

  const handleDelete = (id: string) => {
    if (!window.confirm('Are you sure you want to permanently delete this image? It will be removed from the database and the live site immediately.')) return;
    
    const imageRef = doc(db, 'gallery', id);
    
    // Direct, non-blocking deletion
    deleteDoc(imageRef)
      .catch(async (error) => {
        const permissionError = new FirestorePermissionError({
          path: imageRef.path,
          operation: 'delete',
        });
        errorEmitter.emit('permission-error', permissionError);
      });

    toast({ title: 'Deleting...', description: 'Removing entry from database.' });
  };

  const handleVerify = () => {
    const galleryRef = collection(db, 'gallery');
    const seedData = {
      url: `https://picsum.photos/seed/${Math.random()}/800/600`,
      alt: 'Verification Test Entry',
      category: 'Graves',
      createdAt: serverTimestamp()
    };

    addDoc(galleryRef, seedData)
      .catch(async (error) => {
        const permissionError = new FirestorePermissionError({
          path: galleryRef.path,
          operation: 'create',
          requestResourceData: seedData,
        });
        errorEmitter.emit('permission-error', permissionError);
      });

    toast({ title: 'Verifying', description: 'Sending test document to Firestore...' });
  };

  return (
    <div className="p-4 md:p-8 bg-secondary/10 min-h-screen">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" asChild>
            <Link href="/admin/dashboard">
                <ArrowLeft className="h-4 w-4" />
            </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Gallery Workshop</h1>
              <p className="text-sm text-muted-foreground">Manage your portfolio in real-time.</p>
            </div>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
            <Button variant="outline" size="sm" onClick={handleVerify} className="flex-1 md:flex-none">
                <Zap className="mr-2 h-4 w-4 text-yellow-500" />
                Verify Connection
            </Button>
            <Button variant="ghost" size="sm" onClick={() => window.location.reload()} className="flex-1 md:flex-none">
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh
            </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-1 shadow-md border-primary/20 h-fit">
          <CardHeader>
            <CardTitle>Direct Upload</CardTitle>
            <CardDescription>Instant database storage for your work.</CardDescription>
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
                />
                <p className="text-[10px] text-muted-foreground uppercase font-bold">Max size: 800KB</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">2. Category</Label>
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
                <Label htmlFor="alt-text">3. Description</Label>
                <Input 
                    id="alt-text" 
                    placeholder="e.g. Black Granite Headstone" 
                    value={altText} 
                    onChange={(e) => setAltText(e.target.value)} 
                    required 
                    disabled={isUploading} 
                />
              </div>

              <Button type="submit" className="w-full py-6 text-lg" disabled={isUploading}>
                  {isUploading ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Saving...</> : <><UploadCloud className="mr-2 h-5 w-5" /> Add to Gallery</>}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 shadow-md">
          <CardHeader>
            <CardTitle>Live Portfolio</CardTitle>
            <CardDescription>All images currently synced from Firestore.</CardDescription>
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
                      <Image 
                        src={img.url} 
                        alt={img.alt} 
                        fill 
                        className="object-cover" 
                        unoptimized={img.url.startsWith('data:')} 
                      />
                      <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60">
                         <Button variant="secondary" size="icon" onClick={() => setEditingImage(img)}>
                            <Edit2 className="h-4 w-4" />
                         </Button>
                         <Button variant="destructive" size="icon" onClick={() => handleDelete(img.id)}>
                            <Trash2 className="h-4 w-4" />
                         </Button>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-1 text-[9px] text-white uppercase font-bold text-center">
                         {img.category}
                      </div>
                   </div>
                 ))}
               </div>
             ) : (
               <div className="py-24 text-center border-2 border-dashed rounded-xl bg-muted/30">
                  <ImageIcon className="h-16 w-16 mx-auto mb-4 opacity-20 text-primary" />
                  <p className="text-muted-foreground font-medium">Your gallery is empty.</p>
                  <p className="text-xs text-muted-foreground">Upload a photo or verify the connection above.</p>
               </div>
             )}
          </CardContent>
        </Card>
      </div>

      {/* Edit Dialog */}
      <Dialog open={!!editingImage} onOpenChange={() => setEditingImage(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Image Details</DialogTitle>
            <DialogDescription>Update the category or description for this project.</DialogDescription>
          </DialogHeader>
          {editingImage && (
            <form onSubmit={handleUpdate} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Category</Label>
                <Select 
                  value={editingImage.category} 
                  onValueChange={(val) => setEditingImage({...editingImage, category: val})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Input 
                  value={editingImage.alt} 
                  onChange={(e) => setEditingImage({...editingImage, alt: e.target.value})}
                  required
                />
              </div>
              <DialogFooter className="pt-4">
                <DialogClose asChild>
                  <Button variant="ghost">Cancel</Button>
                </DialogClose>
                <Button type="submit" disabled={isUpdating}>
                  {isUpdating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Save Changes'}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
