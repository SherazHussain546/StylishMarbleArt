
'use client';

import { useState, useEffect } from 'react';

export function GoogleMap() {
    const [apiKey, setApiKey] = useState<string | undefined>(undefined);

    useEffect(() => {
        // This ensures the environment variable is only read on the client-side,
        // preventing server-side rendering errors if the key is missing.
        setApiKey(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY);
    }, []);

    const address = "V5HR+38 Ghazi Dawood Brohi Goth, Karachi, Pakistan";
    
    if (apiKey === undefined) {
        // This shows a loading state while we wait for the client-side to mount.
        return (
            <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
                Loading Map...
            </div>
        );
    }
    
    if (!apiKey) {
        return (
            <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground p-4 text-center">
                Google Map cannot be displayed. The API key is missing from the environment configuration.
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
