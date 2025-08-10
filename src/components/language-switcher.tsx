'use client';
import { useLanguage } from '@/contexts/language-context';
import { Button } from '@/components/ui/button';
import { Languages } from 'lucide-react';
import { content } from '@/lib/content';

export function LanguageSwitcher() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <Button variant="ghost" onClick={toggleLanguage} className="flex items-center gap-2">
      <Languages className="h-5 w-5" />
      <span className="font-semibold">{language === 'en' ? 'اردو' : 'EN'}</span>
      <span className="sr-only">
        {language === 'en' ? 'Switch to Urdu' : 'Switch to English'}
      </span>
    </Button>
  );
}
