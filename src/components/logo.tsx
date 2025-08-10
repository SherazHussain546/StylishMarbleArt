import Link from 'next/link';
import { Gem } from 'lucide-react';

export function Logo() {
    const companyName = "Stylish Marble Art";
    return (
        <Link href="/" className="flex items-center gap-2 text-xl font-semibold text-foreground" aria-label={`${companyName} Home`}>
        <Gem className="h-6 w-6 text-primary" />
        <span className="font-headline tracking-wide">{companyName}</span>
        </Link>
    );
}
