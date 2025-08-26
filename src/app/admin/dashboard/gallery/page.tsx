
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, UploadCloud, Trash2, Loader2, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { uploadImage, getImages, deleteImage, generateAltTextAction, type GalleryImage } from './actions';

const categories = [
    { id: 'Graves', name: 'Graves' },
    { id: 'Headstones', name: 'Headstones' },
    { id: 'Charity Work', name: 'Charity' },
    { id: 'Home Decors', name: 'Home Decors' },
    { id: 'Government Works', name: 'Government' },
    { id: 'Christian Memorials', name: 'Christian' },
    { id: 'Hindu Memorials', name: 'Hindu' },
];

export default function GalleryManagementPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [isGeneratingAlt, setIsGeneratingAlt] = useState(false);
  const [images, setImages] = useState<Record<string, GalleryImage[]>>({});
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [category, setCategory] = useState('');
  const [altText, setAltText] = useState('');
  const { toast } = useToast();

  const fetchImages = async () => {
    setIsLoading(true);
    try {
      const fetchedImages = await getImages();
      const grouped = fetchedImages.reduce((acc, img) => {
        (acc[img.category] = acc[img.category] || []).push(img);
        return acc;
      }, {} as Record<string, GalleryImage[]>);
      setImages(grouped);
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to fetch images.' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
        setAltText(''); // Reset alt text when new image is selected
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateAltText = async () => {
    if (!previewUrl) {
      toast({ variant: 'destructive', title: 'Error', description: 'Please select an image first.' });
      return;
    }
    setIsGeneratingAlt(true);
    try {
      const result = await generateAltTextAction(previewUrl);
      if (result.success && result.altText) {
        setAltText(result.altText);
        toast({ title: 'Success', description: 'Alt text generated.' });
      } else {
        throw new Error(result.error || 'Failed to generate alt text');
      }
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'AI Error', description: error.message });
    } finally {
      setIsGeneratingAlt(false);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile || !category || !altText) {
      toast({ variant: 'destructive', title: 'Missing Information', description: 'Please select a file, category, and generate alt text.' });
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('category', category);
      formData.append('alt', altText);
      
      const result = await uploadImage(formData);

      if (result.success) {
        toast({ title: 'Success', description: 'Image uploaded successfully.' });
        setSelectedFile(null);
        setPreviewUrl(null);
        setCategory('');
        setAltText('');
        (document.getElementById('image-file') as HTMLInputElement).value = '';
        fetchImages(); // Refresh the gallery
      } else {
        throw new Error(result.error || 'Upload failed');
      }
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Upload Failed', description: error.message });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: string, path: string) => {
    try {
      const result = await deleteImage(id, path);
       if (result.success) {
        toast({ title: 'Success', description: 'Image deleted successfully.' });
        fetchImages(); // Refresh the gallery
      } else {
        throw new Error(result.error || 'Deletion failed');
      }
    } catch (error: any) {
        toast({ variant: 'destructive', title: 'Deletion Failed', description: error.message });
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
              <CardDescription>Add a new photo to your public gallery.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpload} className="space-y-4">
                {previewUrl && (
                  <div className="relative aspect-video w-full overflow-hidden rounded-md">
                    <img src={previewUrl} alt="Image preview" className="object-cover w-full h-full" />
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="image-file">1. Select Image</Label>
                  <Input id="image-file" type="file" onChange={handleFileChange} required accept="image/*" disabled={isUploading} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">2. Choose Category</Label>
                  <Select onValueChange={setCategory} value={category} required disabled={isUploading}>
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
                  <Label htmlFor="alt-text">3. Generate Alt Text (for SEO)</Label>
                  <div className="flex gap-2">
                    <Input id="alt-text" placeholder="AI will generate this..." value={altText} onChange={(e) => setAltText(e.target.value)} required disabled={isUploading} />
                    <Button type="button" variant="outline" onClick={handleGenerateAltText} disabled={isGeneratingAlt || !previewUrl}>
                      {isGeneratingAlt ? <Loader2 className="h-4 w-4 animate-spin" /> : 'AI'}
                    </Button>
                  </div>
                </div>
                <Button type="submit" className="w-full" disabled={isUploading || isGeneratingAlt}>
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
              <CardDescription>Images currently in your gallery.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {isLoading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <div key={i}>
                    <Skeleton className="h-6 w-1/4 mb-4" />
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      <Skeleton className="aspect-square rounded-md" />
                      <Skeleton className="aspect-square rounded-md" />
                      <Skeleton className="aspect-square rounded-md" />
                    </div>
                  </div>
                ))
              ) : Object.keys(images).length === 0 ? (
                 <div className="flex flex-col items-center justify-center text-center text-muted-foreground p-8 border-2 border-dashed rounded-lg">
                    <ImageIcon className="h-12 w-12 mb-4" />
                    <h3 className="font-semibold text-lg">No Images Found</h3>
                    <p className="text-sm">Start by uploading an image using the form on the left.</p>
                 </div>
              ) : (
                Object.entries(images).map(([category, imageList]) => (
                  <div key={category}>
                    <h3 className="text-xl font-semibold mb-4">{categories.find(c=>c.id === category)?.name || category}</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {imageList.map(image => (
                        <div key={image.id} className="relative group">
                          <img src={image.url} alt={image.alt} className="aspect-square w-full rounded-md object-cover" />
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Button variant="destructive" size="icon" onClick={() => handleDelete(image.id, image.path)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
