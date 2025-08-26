'use server';

import { draftMessage, type DraftMessageInput } from '@/ai/flows/draft-message';
import { z } from 'zod';
import nodemailer from 'nodemailer';

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

  const { name, email, message } = validation.data;

  // Create a transporter object using SMTP transport
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    // Send mail with defined transport object
    await transporter.sendMail({
      from: `"Stylish Marble Art" <${process.env.SMTP_FROM_EMAIL}>`, // sender address
      to: process.env.SMTP_TO_EMAIL, // list of receivers
      subject: `New message from ${name} via your website`, // Subject line
      text: message, // plain text body
      html: `<b>New message from:</b> ${name}<br/><b>Email:</b> ${email}<br/><br/><b>Message:</b><br/>${message.replace(/\n/g, '<br/>')}`, // html body
      replyTo: email,
    });
    console.log('Message sent successfully');
    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: 'Failed to send message.' };
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
