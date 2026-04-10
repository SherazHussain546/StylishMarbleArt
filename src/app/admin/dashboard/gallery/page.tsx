'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ArrowLeft, UploadCloud, ImageIcon, Trash2, Loader2, Sparkles, RefreshCcw, CheckCircle2, AlertTriangle } from 'lucide-react';
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
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  const galleryQuery = useMemoFirebase(() => {
    if (!db) return null;
    return query(collection(db, 'gallery'), orderBy('createdAt', 'desc'));
  }, [db]);

  const { data: images, isLoading: imagesLoading } = useCollection<any>(galleryQuery);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStatusMsg(null);
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.size > 2 * 1024 * 1024) {
        toast({
          variant: 'destructive',
          title: 'File too large',
          description: 'Please use an image under 2MB for faster uploading in this environment.',
        });
        e.target.value = '';
        return;
      }
      setFile(selectedFile);
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
        } catch (err) {
          toast({ variant: 'destructive', title: 'AI Error', description: 'Could not analyze image.' });
        } finally {
          setIsGeneratingAlt(false);
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      setIsGeneratingAlt(false);
    }
  };

  const handleVerifyDB = () => {
    if (!db) return;
    const mockData = {
      url: `https://picsum.photos/seed/${Math.floor(Math.random() * 1000)}/800/600`,
      alt: 'Connection Verified',
      category: 'Graves',
      path: 'mock/test',
      createdAt: serverTimestamp(),
    };
    addDoc(collection(db, 'gallery'), mockData)
      .then(() => toast({ title: 'Database Connected' }))
      .catch((err) => errorEmitter.emit('permission-error', new FirestorePermissionError({ path: 'gallery', operation: 'create', requestResourceData: mockData })));
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !category || !altText) {
      toast({ variant: 'destructive', title: 'Missing Info', description: 'Please fill all fields.' });
      return;
    }

    setIsUploading(true);
    setStatusMsg('Initiating transfer...');
    
    // Safety timeout for proxy issues
    const timeout = setTimeout(() => {
      if (isUploading) {
        setStatusMsg('Network bottleneck detected. If this continues, try a smaller file or refresh.');
      }
    }, 15000);

    try {
      const fileName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
      const storageRef = ref(storage, `gallery/${fileName}`);
      
      setStatusMsg('Uploading image to secure storage...');
      const snapshot = await uploadBytes(storageRef, file, { contentType: file.type });
      
      setStatusMsg('Image uploaded. Getting public link...');
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      setStatusMsg('Saving to website gallery...');
      const imageData = {
        url: downloadURL,
        alt: altText,
        category: category,
        path: snapshot.ref.fullPath,
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, 'gallery'), imageData);
      
      clearTimeout(timeout);
      toast({ title: 'Successfully Published!' });
      setFile(null);
      setCategory('');
      setAltText('');
      setStatusMsg(null);
      const input = document.getElementById('image-file') as HTMLInputElement;
      if (input) input.value = '';
    } catch (error: any) {
      clearTimeout(timeout);
      console.error(error);
      setStatusMsg(`Upload failed: ${error.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: string, path: string) => {
    if (!confirm('Permanently delete this item?')) return;
    try {
      if (path && path !== 'mock/test') {
        const storageRef = ref(storage, path);
        await deleteObject(storageRef).catch(e => console.warn('File already gone'));
      }
      await deleteDoc(doc(db, 'gallery', id));
      toast({ title: 'Item removed' });
    } catch (error: any) {
       toast({ variant: 'destructive', title: 'Error', description: error.message });
    }
  };

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" asChild>
            <Link href="/admin/dashboard">
                <ArrowLeft className="h-4 w-4" />
            </Link>
            </Button>
            <h1 className="text-3xl font-bold tracking-tight">Gallery Management</h1>
        </div>
        <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleVerifyDB}>
                <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                Verify Database
            </Button>
            <Button variant="ghost" size="sm" onClick={() => window.location.reload()}>
                <RefreshCcw className="mr-2 h-4 w-4" />
                Reset UI
            </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-1 h-fit">
          <CardHeader>
            <CardTitle>Add New Work</CardTitle>
            <CardDescription>Upload a photo to appear in the gallery.</CardDescription>
          </CardHeader>
          <CardContent>
            {statusMsg && (
              <Alert className="mb-4 bg-primary/5 border-primary/20">
                <AlertTriangle className="h-4 w-4 text-primary" />
                <AlertTitle>Status</AlertTitle>
                <AlertDescription className="text-xs">{statusMsg}</AlertDescription>
              </Alert>
            )}
            
            <form onSubmit={handleUpload} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="image-file">1. Select Image</Label>
                <Input id="image-file" type="file" required accept="image/*" onChange={handleFileChange} disabled={isUploading} />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">2. Choose Category</Label>
                <Select required onValueChange={setCategory} value={category} disabled={isUploading}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category..." />
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
                      placeholder="e.g., Ziarat White Grave" 
                      value={altText} 
                      onChange={(e) => setAltText(e.target.value)} 
                      required 
                      disabled={isUploading} 
                  />
                  <Button 
                      type="button" 
                      variant="secondary" 
                      size="icon" 
                      onClick={handleGenerateAlt} 
                      disabled={!file || isUploading || isGeneratingAlt}
                  >
                      {isGeneratingAlt ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                  </Button>
                 </div>
              </div>

              <Button type="submit" className="w-full" disabled={isUploading}>
                  {isUploading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Uploading...</> : <><UploadCloud className="mr-2 h-4 w-4" /> Publish Now</>}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Live Gallery Items</CardTitle>
            <CardDescription>Current photos displayed on the site.</CardDescription>
          </CardHeader>
          <CardContent>
             {imagesLoading ? (
               <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[...Array(6)].map((_, i) => <Skeleton key={i} className="aspect-square rounded-md" />)}
               </div>
             ) : images && images.length > 0 ? (
               <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                 {images.map((img: any) => (
                   <div key={img.id} className="group relative aspect-square overflow-hidden rounded-md border bg-muted">
                      <Image src={img.url} alt={img.alt} fill className="object-cover" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                         <Button variant="destructive" size="icon" onClick={() => handleDelete(img.id, img.path)}>
                            <Trash2 className="h-4 w-4" />
                         </Button>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2 text-[10px] text-white uppercase font-bold">
                         {img.category}
                      </div>
                   </div>
                 ))}
               </div>
             ) : (
               <div className="py-20 text-center border-2 border-dashed rounded-lg">
                  <ImageIcon className="h-12 w-12 mx-auto mb-4 opacity-20" />
                  <p className="text-muted-foreground">No images found. Verify database or upload your first photo.</p>
               </div>
             )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
