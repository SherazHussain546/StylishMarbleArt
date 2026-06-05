'use client';

import { useLanguage } from '@/contexts/language-context';
import { content } from '@/lib/content';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldCheck, Lock, UserCheck, BarChart3 } from 'lucide-react';

const icons = [ShieldCheck, UserCheck, Lock, BarChart3];

export default function PrivacyPageClient() {
  const { language } = useLanguage();
  const pageContent = content.privacyPage;

  return (
    <div className="bg-secondary/20 min-h-screen py-16 md:py-24">
      <div className="container mx-auto px-4">
        <header className="mx-auto max-w-4xl text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-primary">{pageContent.title[language]}</h1>
          <p className="mt-4 text-xl text-muted-foreground">{pageContent.lastUpdated[language]}</p>
        </header>

        <div className="max-w-4xl mx-auto space-y-8">
            {pageContent.sections.map((section, index) => {
                const Icon = icons[index];
                return (
                    <Card key={index} className="border-none shadow-lg">
                        <CardHeader className="flex flex-row items-center gap-4">
                            <div className="bg-primary/10 p-3 rounded-xl">
                                <Icon className="h-6 w-6 text-primary" />
                            </div>
                            <CardTitle className="text-2xl">{section.title[language]}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                {section.content[language]}
                            </p>
                        </CardContent>
                    </Card>
                );
            })}

            <div className="bg-primary text-primary-foreground p-12 rounded-[2rem] text-center shadow-2xl">
                <h2 className="text-2xl font-bold mb-4">
                    {language === 'en' ? 'Our Commitment to Integrity' : 'دیانتداری کے لیے ہمارا عزم'}
                </h2>
                <p className="text-lg opacity-90 leading-relaxed max-w-2xl mx-auto">
                    {language === 'en' 
                        ? 'At Stylish Marble Art, we understand the sensitive nature of the information shared in our memorial registry. We pledge to handle every record with the highest level of respect and professional care.' 
                        : 'سٹائلش ماربل آرٹ میں، ہم اپنی یادگاری رجسٹری میں شیئر کی گئی معلومات کی حساس نوعیت کو سمجھتے ہیں۔ ہم ہر ریکارڈ کو احترام اور پیشہ ورانہ دیکھ بھال کے اعلیٰ ترین درجے کے ساتھ سنبھالنے کا عہد کرتے ہیں۔'}
                </p>
            </div>
        </div>
      </div>
    </div>
  );
}