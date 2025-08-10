// src/ai/flows/draft-message.ts
'use server';
/**
 * @fileOverview A flow for generating draft messages on the Contact Us page in either English or Urdu.
 *
 * - draftMessage - A function that generates a draft message based on the provided language and topic.
 * - DraftMessageInput - The input type for the draftMessage function, specifying language and topic.
 * - DraftMessageOutput - The output type for the draftMessage function, containing the generated message.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DraftMessageInputSchema = z.object({
  language: z.enum(['English', 'Urdu']).describe('The language for the draft message.'),
  topic: z.string().describe('The topic or subject of the message.'),
});
export type DraftMessageInput = z.infer<typeof DraftMessageInputSchema>;

const DraftMessageOutputSchema = z.object({
  message: z.string().describe('The generated draft message.'),
});
export type DraftMessageOutput = z.infer<typeof DraftMessageOutputSchema>;

export async function draftMessage(input: DraftMessageInput): Promise<DraftMessageOutput> {
  return draftMessageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'draftMessagePrompt',
  input: {schema: DraftMessageInputSchema},
  output: {schema: DraftMessageOutputSchema},
  prompt: `You are a helpful assistant that crafts polite and respectful draft messages for users contacting a memorial service. The user will specify the language and the topic of their message.  Use a formal tone.

Language: {{{language}}}
Topic: {{{topic}}}

Draft Message:`,
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
