'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useLanguage, type Language } from '@/contexts/language-context';
import { content } from '@/lib/content';
import { generateDraftAction, submitContactForm } from './actions';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

type DraftLanguage = 'English' | 'Urdu';

export function ContactForm() {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [isDrafting, startDraftingTransition] = useTransition();
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [draftLang, setDraftLang] = useState<DraftLanguage>('English');
  const [draftTopic, setDraftTopic] = useState<string>('General Inquiry');

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

  function handleGenerateDraft() {
    startDraftingTransition(async () => {
        const result = await generateDraftAction({ language: draftLang, topic: draftTopic });
        if(result.success && result.message) {
            form.setValue('message', result.message);
        } else {
            toast({
                variant: 'destructive',
                title: language === 'en' ? 'Draft Failed' : 'ڈرافٹ ناکام',
                description: result.error || (language === 'en' ? 'Could not generate draft message.' : 'ڈرافٹ پیغام بنانے میں ناکام رہا۔'),
            });
        }
    });
  }

  const topics = [
    { value: 'General Inquiry', label: t.topics.inquiry[language] },
    { value: 'Service Pricing', label: t.topics.pricing[language] },
    { value: 'Schedule an Appointment', label: t.topics.appointment[language] },
    { value: 'Bereavement Support', label: t.topics.support[language] },
  ]

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
          
          <div className="space-y-2 rounded-md border p-4">
              <Label>{t.message[language]}</Label>
              <p className="text-sm text-muted-foreground">{language === 'en' ? 'Need help writing a message? Generate a draft.' : 'پیغام لکھنے میں مدد درکار ہے؟ ایک ڈرافٹ بنائیں۔'}</p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="draft-lang">{t.language[language]}</Label>
                  <RadioGroup id="draft-lang" defaultValue="English" className="mt-2 flex gap-4" onValueChange={(value) => setDraftLang(value as DraftLanguage)}>
                    <FormItem className="flex items-center space-x-2">
                        <RadioGroupItem value="English" id="lang-en" />
                        <Label htmlFor="lang-en">English</Label>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2">
                        <RadioGroupItem value="Urdu" id="lang-ur" />
                        <Label htmlFor="lang-ur">اردو</Label>
                    </FormItem>
                  </RadioGroup>
                </div>
                 <div>
                  <Label htmlFor="draft-topic">{t.topic[language]}</Label>
                    <Select onValueChange={setDraftTopic} defaultValue='General Inquiry'>
                      <SelectTrigger id="draft-topic" className="mt-2">
                        <SelectValue placeholder={t.topic[language]} />
                      </SelectTrigger>
                      <SelectContent>
                        {topics.map(topic => (
                            <SelectItem key={topic.value} value={topic.value}>{topic.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                 </div>
              </div>
               <Button type="button" variant="outline" size="sm" className="mt-2" onClick={handleGenerateDraft} disabled={isDrafting}>
                {isDrafting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isDrafting ? t.generating[language] : t.generateDraft[language]}
              </Button>
          </div>

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">{t.message[language]}</FormLabel>
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
