
'use client';

export function GoogleMap() {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    const address = "V5HR+38 Ghazi Dawood Brohi Goth, Karachi, Pakistan";
    
    if (!apiKey) {
        return (
            <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
                Google Map cannot be displayed. API key is missing.
            </div>
        );
    }

    const embedUrl = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodeURIComponent(address)}`;

    return (
        <iframe
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={embedUrl}
            title="Stylish Marble Art Location"
        >
        </iframe>
    );
}
