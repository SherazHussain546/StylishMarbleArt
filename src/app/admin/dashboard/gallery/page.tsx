
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, UploadCloud, Trash2, Loader2, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

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
  const [isUploading, setIsUploading] = useState(false);
  const [isGeneratingAlt, setIsGeneratingAlt] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [category, setCategory] = useState('');
  const [altText, setAltText] = useState('');
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
        setAltText(''); 
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateAltText = async () => {
    toast({ title: 'Info', description: 'This feature is currently disabled.' });
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: 'Info', description: 'This feature is currently disabled.' });
  };
  
  const handleDelete = async (id: string, path: string) => {
    toast({ title: 'Info', description: 'This feature is currently disabled.' });
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
              <CardDescription>This feature is currently disabled.</CardDescription>
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
                  <Input id="image-file" type="file" onChange={handleFileChange} required accept="image/*" disabled />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">2. Choose Category</Label>
                  <Select onValueChange={setCategory} value={category} required disabled>
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
                    <Input id="alt-text" placeholder="AI will generate this..." value={altText} onChange={(e) => setAltText(e.target.value)} required disabled />
                    <Button type="button" variant="outline" onClick={handleGenerateAltText} disabled>
                      {'AI'}
                    </Button>
                  </div>
                </div>
                <Button type="submit" className="w-full" disabled>
                  <UploadCloud className="mr-2 h-4 w-4" />
                  Upload Image
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
               <div className="flex flex-col items-center justify-center text-center text-muted-foreground p-8 border-2 border-dashed rounded-lg">
                  <ImageIcon className="h-12 w-12 mb-4" />
                  <h3 className="font-semibold text-lg">No Images Found</h3>
                  <p className="text-sm">Image fetching is currently disabled.</p>
               </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
