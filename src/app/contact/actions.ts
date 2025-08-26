
'use server';

import { draftMessage, type DraftMessageInput } from '@/ai/flows/draft-message';
import { z } from 'zod';
import nodemailer from 'nodemailer';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Please enter a valid email address.'),
  message: z.string().min(10, 'Message must be at least 10 characters.'),
});

export async function submitContactForm(data: z.infer<typeof formSchema>) {
  const validation = formSchema.safeParse(data);
  if (!validation.success) {
    return { success: false, error: validation.error.flatten() };
  }

  // Check for environment variables
  if (!process.env.SMTP_HOST || !process.env.SMTP_PORT || !process.env.SMTP_USER || !process.env.SMTP_PASS || !process.env.SMTP_FROM_EMAIL || !process.env.SMTP_TO_EMAIL) {
    console.error('Missing SMTP environment variables.');
    return { success: false, error: 'Server is not configured to send emails. Please contact administrator.' };
  }

  const { name, email, message } = validation.data;

  // 1. Send the email
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_PORT === '465',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Stylish Marble Art" <${process.env.SMTP_FROM_EMAIL}>`,
      to: process.env.SMTP_TO_EMAIL,
      subject: `New message from ${name} via your website`,
      text: message,
      html: `<b>New message from:</b> ${name}<br/><b>Email:</b> ${email}<br/><br/><b>Message:</b><br/>${message.replace(/\n/g, '<br/>')}`,
      replyTo: email,
    });
  } catch (error) {
    console.error('Error sending email:', error);
    // We can choose to continue even if email fails, as the message will be in the dashboard
  }

  // 2. Save the message to Firestore
  try {
    await addDoc(collection(db, 'contact-messages'), {
      name,
      email,
      message,
      createdAt: serverTimestamp(),
      read: false,
    });
    return { success: true };
  } catch (error) {
     console.error('Error saving message to Firestore:', error);
     return { success: false, error: 'Failed to save message.' };
  }
}

export async function generateDraftAction(input: DraftMessageInput) {
    try {
        const result = await draftMessage(input);
        return { success: true, message: result.message };
    } catch (error) {
        console.error('Error generating draft:', error);
        return { success: false, error: 'Failed to generate draft message.' };
    }
}
