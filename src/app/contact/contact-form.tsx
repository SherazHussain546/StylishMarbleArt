
'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useLanguage } from '@/contexts/language-context';
import { content } from '@/lib/content';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { saveMessage } from './actions';

const createFormSchema = (language: 'en' | 'ur') => z.object({
  name: z.string().min(2, { message: language === 'en' ? 'Name must be at least 2 characters.' : 'نام کم از کم 2 حروف کا ہونا چاہیے۔' }),
  email: z.string().email({ message: language === 'en' ? 'Please enter a valid email.' : 'براہ کرم ایک درست ای میل درج کریں۔' }),
  message: z.string().min(10, { message: language === 'en' ? 'Message must be at least 10 characters.' : 'پیغام کم از کم 10 حروف کا ہونا چاہیے۔' }),
});


export function ContactForm() {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const formSchema = createFormSchema(language);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', email: '', message: '' },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      const result = await saveMessage(values);
      if (result.success) {
        toast({
          title: content.contactPage.form.successTitle[language],
          description: content.contactPage.form.successMessage[language],
        });
        form.reset();
      } else {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: result.error || 'Failed to send message.',
        });
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{content.contactPage.form.name[language]}</FormLabel>
              <FormControl>
                <Input placeholder={content.contactPage.form.name[language]} {...field} disabled={isPending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{content.contactPage.form.email[language]}</FormLabel>
              <FormControl>
                <Input placeholder={content.contactPage.form.email[language]} {...field} disabled={isPending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{content.contactPage.form.message[language]}</FormLabel>
              <FormControl>
                <Textarea placeholder={content.contactPage.form.message[language]} {...field} disabled={isPending} rows={5} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {language === 'en' ? 'Sending...' : 'بھیج رہا ہے...'}
            </>
          ) : (
            content.contactPage.form.submit[language]
          )}
        </Button>
      </form>
    </Form>
  );
}
