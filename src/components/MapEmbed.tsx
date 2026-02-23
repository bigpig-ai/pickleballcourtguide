"use client";

export function MapEmbed({ lat, lng, zoom = 13, query }: { lat: number; lng: number; zoom?: number; query?: string }) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const src = query 
    ? `https://www.google.com/maps/embed/v1/search?key=${apiKey}&q=${encodeURIComponent(query)}&center=${lat},${lng}&zoom=${zoom}`
    : `https://www.google.com/maps/embed/v1/view?key=${apiKey}&center=${lat},${lng}&zoom=${zoom}`;

  return (
    <div className="w-full h-[400px] rounded-xl overflow-hidden border">
      <iframe
        src={src}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
