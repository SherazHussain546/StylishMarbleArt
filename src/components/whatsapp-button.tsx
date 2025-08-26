'use client';

import { WhatsappStickyIcon } from './icons/whatsapp-sticky-icon';
import { usePathname } from 'next/navigation';

interface WhatsAppButtonProps {
  phoneNumber: string;
}

export function WhatsAppButton({ phoneNumber }: WhatsAppButtonProps) {
  const pathname = usePathname();

  if (pathname.startsWith('/admin')) {
    return null;
  }

  const openWhatsApp = () => {
    const internationalNumber = phoneNumber.replace('+', '').replace(/\s/g, '');
    window.open(`https://wa.me/${internationalNumber}`, '_blank');
  };

  return (
    <button
      onClick={openWhatsApp}
      className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-[#00D95F] text-white shadow-lg transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
      aria-label="Chat on WhatsApp"
    >
      <WhatsappStickyIcon className="h-12 w-12" />
    </button>
  );
}
