import Link from 'next/link';

export function Logo() {
    return (
        <Link href="/" className="flex items-center gap-2 text-xl font-semibold text-foreground" aria-label="Stylish Marble Art Home">
            <div>
                <span className="font-script text-3xl">Stylish</span>
                <span className="font-body tracking-wider"> Marble Art</span>
            </div>
        </Link>
    );
}
