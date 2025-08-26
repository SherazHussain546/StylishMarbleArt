
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, UploadCloud, Trash2 } from 'lucide-react';
import Link from 'next/link';

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
  // Placeholder state
  const isLoading = true;
  const images = {
    Headstones: [
      { id: '1', src: 'https://placehold.co/600x400', alt: 'Sample' },
      { id: '2', src: 'https://placehold.co/600x400', alt: 'Sample' },
    ],
    Graves: [
      { id: '3', src: 'https://placehold.co/600x400', alt: 'Sample' },
    ]
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
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="image-file">Image File</Label>
                  <Input id="image-file" type="file" disabled={isLoading} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                   <Select disabled={isLoading}>
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
                  <Label htmlFor="alt-text">Alt Text (for SEO)</Label>
                  <Input id="alt-text" placeholder="E.g., 'Black granite headstone'" disabled={isLoading} />
                </div>
                <Button className="w-full" disabled={isLoading}>
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
                {isLoading ? (
                    Object.keys(categories).map((key) => (
                        <div key={key}>
                            <Skeleton className="h-6 w-1/4 mb-4" />
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                <Skeleton className="aspect-square rounded-md" />
                                <Skeleton className="aspect-square rounded-md" />
                                <Skeleton className="aspect-square rounded-md" />
                            </div>
                        </div>
                    ))
                ) : (
                    Object.entries(images).map(([category, imageList]) => (
                        <div key={category}>
                            <h3 className="text-xl font-semibold mb-4">{category}</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {imageList.map(image => (
                                    <div key={image.id} className="relative group">
                                        <img src={image.src} alt={image.alt} className="aspect-square w-full rounded-md object-cover" />
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <Button variant="destructive" size="icon" disabled={isLoading}>
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
