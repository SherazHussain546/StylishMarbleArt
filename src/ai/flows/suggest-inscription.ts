
'use server';
/**
 * @fileOverview A flow for suggesting respectful memorial inscriptions/Duas.
 *
 * - suggestInscription - A function that suggests a memorial text based on relationship and language.
 * - SuggestInscriptionInput - The input type for the suggestInscription function.
 * - SuggestInscriptionOutput - The output type for the suggestInscription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestInscriptionInputSchema = z.object({
  relationship: z.string().describe('The relationship to the deceased (e.g., Father, Mother, Brother).'),
  language: z.enum(['en', 'ur']).describe("The language for the suggestion ('en' for English, 'ur' for Urdu)."),
  tone: z.enum(['poetic', 'religious', 'simple']).describe('The desired tone of the inscription.'),
});
export type SuggestInscriptionInput = z.infer<typeof SuggestInscriptionInputSchema>;

const SuggestInscriptionOutputSchema = z.object({
  inscription: z.string().describe('The AI-suggested memorial inscription or Dua.'),
});
export type SuggestInscriptionOutput = z.infer<typeof SuggestInscriptionOutputSchema>;

export async function suggestInscription(input: SuggestInscriptionInput): Promise<SuggestInscriptionOutput> {
  return suggestInscriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestInscriptionPrompt',
  input: {schema: SuggestInscriptionInputSchema},
  output: {schema: SuggestInscriptionOutputSchema},
  prompt: `You are an expert in Islamic memorials and calligraphy for 'Stylish Marble Art' in Karachi. Your task is to suggest a respectful and beautiful memorial inscription or Dua for a gravestone.

- **Relationship**: {{{relationship}}}
- **Language**: {{{language}}}
- **Tone**: {{{tone}}}

Instructions:
1. Generate a short, profound inscription suitable for engraving on marble or granite.
2. If the tone is 'religious', include a common Islamic Dua or verse (in the specified language).
3. If the tone is 'poetic', use gentle and honoring language.
4. If the tone is 'simple', keep it brief and classic (e.g., "In Loving Memory").
5. The output must be in the requested language (English or Urdu).

Draft the inscription now.`,
});

const suggestInscriptionFlow = ai.defineFlow(
  {
    name: 'suggestInscriptionFlow',
    inputSchema: SuggestInscriptionInputSchema,
    outputSchema: SuggestInscriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
