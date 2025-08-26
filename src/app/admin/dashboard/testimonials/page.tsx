
'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, Trash2, Loader2, Star, PlusCircle, ExternalLink, Inbox, RefreshCw } from 'lucide-react';
import { getTestimonials, deleteTestimonial, addTestimonial, type Testimonial } from './actions';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const testimonialSchema = z.object({
  name: z.string().min(2, 'Name is required.'),
  text: z.string().min(10, 'Testimonial text is required.'),
  sourceUrl: z.string().url('Please enter a valid URL.').optional().or(z.literal('')),
});

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof testimonialSchema>>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: { name: '', text: '', sourceUrl: '' },
  });

  async function loadTestimonials() {
    setIsLoading(true);
    try {
      const fetchedTestimonials = await getTestimonials();
      setTestimonials(fetchedTestimonials);
    } catch (error) {
       toast({ variant: 'destructive', title: 'Error', description: 'Could not fetch testimonials. Check permissions.' });
    } finally {
        setIsLoading(false);
        setHasLoaded(true);
    }
  }

  const handleDelete = async (id: string) => {
    startTransition(async () => {
      const result = await deleteTestimonial(id);
      if (result.success) {
        setTestimonials(prev => prev.filter(t => t.id !== id));
        toast({ title: 'Success', description: 'Testimonial deleted successfully.' });
      } else {
        toast({ variant: 'destructive', title: 'Error', description: result.error });
      }
    });
  };
  
  async function onSubmit(values: z.infer<typeof testimonialSchema>) {
    startTransition(async () => {
        const result = await addTestimonial(values);
        if(result.success && result.newTestimonial) {
            setTestimonials(prev => [result.newTestimonial!, ...prev]);
            toast({ title: 'Success', description: 'Testimonial added.' });
            setIsDialogOpen(false);
            form.reset();
        } else {
            toast({ variant: 'destructive', title: 'Error', description: result.error });
        }
    })
  }

  const renderSkeleton = () => (
    [...Array(3)].map((_, i) => (
      <TableRow key={i}>
        <TableCell><Skeleton className="h-5 w-32" /></TableCell>
        <TableCell className="hidden md:table-cell"><Skeleton className="h-5 w-48" /></TableCell>
        <TableCell className="text-right"><Skeleton className="h-8 w-20" /></TableCell>
      </TableRow>
    ))
  );

  return (
    <div className="p-4 md:p-8">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="outline" size="icon" asChild>
          <Link href="/admin/dashboard">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to Dashboard</span>
          </Link>
        </Button>
        <div className='flex-grow flex justify-between items-center'>
            <h1 className="text-3xl font-bold tracking-tight">Testimonials</h1>
            <div className="flex items-center gap-2">
                <Button onClick={loadTestimonials} disabled={isLoading} variant="outline">
                    <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                    {isLoading ? 'Loading...' : 'Load'}
                </Button>
                <Button onClick={() => setIsDialogOpen(true)}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Testimonial
                </Button>
            </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Manage Testimonials</CardTitle>
          <CardDescription>Add, view, or remove client testimonials.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client Name</TableHead>
                <TableHead>Testimonial (Excerpt)</TableHead>
                <TableHead className="hidden md:table-cell">Source</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? renderSkeleton() : hasLoaded && testimonials.length > 0 ? testimonials.map(t => (
                <TableRow key={t.id}>
                  <TableCell className="font-medium">{t.name}</TableCell>
                  <TableCell className="max-w-xs truncate">{t.text}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {t.sourceUrl ? <Link href={t.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1"><ExternalLink className="h-4 w-4" /> View</Link> : 'N/A'}
                  </TableCell>
                  <TableCell className="text-right">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" disabled={isPending}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will permanently delete this testimonial. This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(t.id)} disabled={isPending}>
                            {isPending ? <Loader2 className="animate-spin" /> : "Delete"}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                     <div className="flex flex-col items-center justify-center text-muted-foreground">
                        <Inbox className="h-12 w-12 mb-4" />
                        <h3 className="font-semibold text-lg">{hasLoaded ? 'No Testimonials Yet' : 'Ready to Load'}</h3>
                        <p className="text-sm">{hasLoaded ? 'Click "Add Testimonial" to get started.' : 'Click "Load" to see testimonials.'}</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Testimonial</DialogTitle>
                    <DialogDescription>
                        Enter the client's feedback below. Linking to the source is recommended for authenticity.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
                        <FormField control={form.control} name="name" render={({field}) => (
                            <FormItem>
                                <FormLabel>Client Name</FormLabel>
                                <FormControl><Input placeholder="e.g., John Doe" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="text" render={({field}) => (
                            <FormItem>
                                <FormLabel>Testimonial Text</FormLabel>
                                <FormControl><Textarea placeholder="Enter the testimonial here..." {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="sourceUrl" render={({field}) => (
                            <FormItem>
                                <FormLabel>Source URL (Optional)</FormLabel>
                                <FormControl><Input placeholder="e.g., https://g.co/kgs/xyz" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                         <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline" type="button">Cancel</Button>
                            </DialogClose>
                            <Button type="submit" disabled={isPending}>
                                {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Save Testimonial"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    </div>
  );
}
