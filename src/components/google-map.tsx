'use client';

interface GoogleMapProps {
    apiKey: string;
}

export function GoogleMap({ apiKey }: GoogleMapProps) {
    const address = "Stylish Marble Art, Malir 15, Main National Highway, Karachi";
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
