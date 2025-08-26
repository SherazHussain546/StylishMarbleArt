
'use server';
/**
 * @fileOverview A flow for generating SEO-friendly alt text for an image.
 *
 * - generateAltText - A function that takes an image data URI and returns alt text.
 * - GenerateAltTextInput - The input type for the generateAltText function.
 * - GenerateAltTextOutput - The output type for the generateAltText function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAltTextInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a marble product or project, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type GenerateAltTextInput = z.infer<typeof GenerateAltTextInputSchema>;

const GenerateAltTextOutputSchema = z.object({
  altText: z.string().describe('The generated SEO-friendly alt text for the image.'),
});
export type GenerateAltTextOutput = z.infer<typeof GenerateAltTextOutputSchema>;

export async function generateAltText(input: GenerateAltTextInput): Promise<GenerateAltTextOutput> {
  return generateAltTextFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateAltTextPrompt',
  input: {schema: GenerateAltTextInputSchema},
  output: {schema: GenerateAltTextOutputSchema},
  prompt: `You are an SEO expert for a marble and gravestone business in Karachi, Pakistan called 'Stylish Marble Art'. Your task is to write a descriptive, SEO-optimized alt text for the provided image.

Instructions:
1.  **Describe the image accurately:** What is the main subject? (e.g., marble gravestone, granite kitchen countertop, memorial plaque).
2.  **Include relevant keywords:** Use terms like "marble", "granite", "gravestone", "headstone", "memorial", "kitchen", "engraving", "custom work".
3.  **Mention the location/brand context:** Include "Stylish Marble Art" and "Karachi" or "Pakistan" naturally in the description.
4.  **Keep it concise:** Aim for a descriptive sentence, not a paragraph.

Example Output: "An elegant white marble gravestone with detailed floral engraving, a custom memorial by Stylish Marble Art in Karachi, Pakistan."

Image to analyze: {{media url=photoDataUri}}`,
});

const generateAltTextFlow = ai.defineFlow(
  {
    name: 'generateAltTextFlow',
    inputSchema: GenerateAltTextInputSchema,
    outputSchema: GenerateAltTextOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
