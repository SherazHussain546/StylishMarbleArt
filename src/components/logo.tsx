import Link from 'next/link';

export function Logo() {
    return (
        <Link href="/" className="flex items-center gap-2 text-xl font-semibold text-foreground" aria-label="Stylish Marble Art Home">
            <div className="flex items-center">
                <div className="rounded-lg bg-foreground px-3 py-1">
                    <span className="font-script text-3xl text-background">Stylish</span>
                </div>
                <span className="ml-3 font-body tracking-wider text-foreground">Marble Art</span>
            </div>
        </Link>
    );
}
