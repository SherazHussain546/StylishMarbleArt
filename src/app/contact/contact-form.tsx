'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useLanguage } from '@/contexts/language-context';
import { content } from '@/lib/content';
import { submitContactForm } from './actions';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

export function ContactForm() {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const t = content.contactPage.form;

  const formSchema = z.object({
    name: z.string().min(2, { message: language === 'en' ? 'Name must be at least 2 characters.' : 'نام کم از کم 2 حروف کا ہونا چاہیے۔' }),
    email: z.string().email({ message: language === 'en' ? 'Please enter a valid email.' : 'براہ کرم ایک درست ای میل درج کریں۔' }),
    message: z.string().min(10, { message: language === 'en' ? 'Message must be at least 10 characters.' : 'پیغام کم از کم 10 حروف کا ہونا چاہیے۔' }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', email: '', message: '' },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      const result = await submitContactForm(values);
      if (result.success) {
        setShowSuccessDialog(true);
        form.reset();
      } else {
        toast({
          variant: 'destructive',
          title: language === 'en' ? 'Submission Failed' : 'جمع کرانے میں ناکام',
          description: language === 'en' ? 'Please check the form and try again.' : 'براہ کرم فارم چیک کریں اور دوبارہ کوشش کریں۔',
        });
      }
    });
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t.name[language]}</FormLabel>
                <FormControl><Input placeholder={t.name[language]} {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t.email[language]}</FormLabel>
                <FormControl><Input type="email" placeholder={t.email[language]} {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t.message[language]}</FormLabel>
                <FormControl><Textarea placeholder={t.message[language]} className="min-h-[150px]" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isPending}>
             {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
             {t.submit[language]}
          </Button>
        </form>
      </Form>

      <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t.successTitle[language]}</AlertDialogTitle>
            <AlertDialogDescription>{t.successMessage[language]}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogAction onClick={() => setShowSuccessDialog(false)}>{t.close[language]}</AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
