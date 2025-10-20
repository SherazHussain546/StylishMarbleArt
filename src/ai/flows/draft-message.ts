'use server';
/**
 * @fileOverview A flow for drafting a contact message using AI.
 *
 * - draftMessage - A function that takes a topic and language to generate a message draft.
 * - DraftMessageInput - The input type for the draftMessage function.
 * - DraftMessageOutput - The output type for the draftMessage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {content} from '@/lib/content';

const topics = Object.keys(content.contactPage.form.topics) as (keyof typeof content.contactPage.form.topics)[];

const DraftMessageInputSchema = z.object({
  topic: z.enum(topics).describe('The subject of the message.'),
  language: z.enum(['en', 'ur']).describe("The language for the AI-generated draft ('en' for English, 'ur' for Urdu)."),
});
export type DraftMessageInput = z.infer<typeof DraftMessageInputSchema>;

const DraftMessageOutputSchema = z.object({
  message: z.string().describe('The AI-generated message draft.'),
});
export type DraftMessageOutput = z.infer<typeof DraftMessageOutputSchema>;

export async function draftMessage(input: DraftMessageInput): Promise<DraftMessageOutput> {
  return draftMessageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'draftMessagePrompt',
  input: {schema: DraftMessageInputSchema},
  output: {schema: DraftMessageOutputSchema},
  prompt: `You are a helpful assistant for a marble and gravestone business in Karachi, Pakistan called 'Stylish Marble Art'. Your task is to draft a polite and professional contact message for a customer based on their chosen topic and language.

- **Topic**: {{{topic}}}
- **Language**: {{{language}}}
- **Business Name**: Stylish Marble Art
- **Location**: Karachi, Pakistan

Instructions:
1.  Generate a message in the specified language (English or Urdu).
2.  The message should be a friendly and clear starting point for an inquiry.
3.  If the topic is about pricing, ask for details about their project.
4.  If the topic is about grave services, be respectful and empathetic.
5.  If the topic is a general inquiry, keep it open-ended.
6.  If the topic is scheduling an appointment, ask for their preferred time.

Examples:
- (English, Pricing): "Hello, I would like to inquire about the pricing for a project. Could you please provide more information?"
- (Urdu, Grave Services): "السلام علیکم، میں قبر کی خدمات اور یادگاروں کے بارے میں معلومات حاصل کرنا چاہتا ہوں۔ برائے مہربانی تفصیلات فراہم کریں۔"

Draft the message now.`,
});

const draftMessageFlow = ai.defineFlow(
  {
    name: 'draftMessageFlow',
    inputSchema: DraftMessageInputSchema,
    outputSchema: DraftMessageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
