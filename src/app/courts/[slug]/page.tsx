import { Metadata } from "next";
import { MapEmbed } from "@/components/MapEmbed";
import { AdSlot } from "@/components/AdSlot";
import { Star, MapPin, Phone, Globe, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

type Props = { params: Promise<{ slug: string }> };

// Court detail pages are dynamic (fetched on demand, cached via ISR)
export const revalidate = 86400;

async function getCourtFromSlug(slug: string) {
  // We store court data in search params or fetch from API
  // For now, parse slug and search Google Places
  const apiKey = process.env.GOOGLE_MAPS_PLATFORM_API_KEY;
  if (!apiKey) return null;

  const query = slug.replace(/-/g, " ");
  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=pickleball+${encodeURIComponent(query)}&key=${apiKey}`;
  const res = await fetch(url);
  const data = await res.json();
  
  if (!data.results?.[0]) return null;
  const place = data.results[0];

  // Get details
  const detailUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place.place_id}&fields=name,formatted_address,formatted_phone_number,website,rating,user_ratings_total,photos,opening_hours,geometry,url,reviews&key=${apiKey}`;
  const detailRes = await fetch(detailUrl);
  const detailData = await detailRes.json();
  const detail = detailData.result || place;

  return {
    name: detail.name || place.name,
    address: detail.formatted_address || place.formatted_address,
    phone: detail.formatted_phone_number,
    website: detail.website,
    rating: detail.rating || place.rating,
    reviewCount: detail.user_ratings_total || place.user_ratings_total,
    lat: detail.geometry?.location?.lat || place.geometry?.location?.lat,
    lng: detail.geometry?.location?.lng || place.geometry?.location?.lng,
    hours: detail.opening_hours?.weekday_text,
    photos: detail.photos?.slice(0, 6).map(
      (p: { photo_reference: string }) =>
        `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=${p.photo_reference}&key=${apiKey}`
    ),
    googleMapsUrl: detail.url,
    reviews: detail.reviews?.slice(0, 5),
    placeId: place.place_id,
    slug,
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const court = await getCourtFromSlug(slug);
  if (!court) return { title: "Court Not Found" };
  return {
    title: `${court.name} - Pickleball Court | Pickleball Court Guide`,
    description: `${court.name} at ${court.address}. Rating: ${court.rating}/5 from ${court.reviewCount} reviews. Hours, photos, and directions.`,
  };
}

export default async function CourtDetailPage({ params }: Props) {
  const { slug } = await params;
  const court = await getCourtFromSlug(slug);

  if (!court) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold">Court Not Found</h1>
        <p className="text-gray-500 mt-2">We couldn&apos;t find this court. Try searching for it.</p>
        <Link href="/" className="text-emerald-600 mt-4 inline-block">← Back to search</Link>
      </div>
    );
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: court.name,
    address: court.address,
    telephone: court.phone,
    url: court.website,
    ...(court.rating && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: court.rating,
        reviewCount: court.reviewCount,
      },
    }),
    geo: { "@type": "GeoCoordinates", latitude: court.lat, longitude: court.lng },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Link href="/" className="text-sm text-gray-500 hover:text-emerald-600">← Back to search</Link>

        <div className="mt-4 grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold">{court.name}</h1>

            <div className="flex flex-wrap items-center gap-4 mt-3">
              {court.rating && (
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{court.rating}</span>
                  <span className="text-gray-500">({court.reviewCount} reviews)</span>
                </div>
              )}
              <Badge variant="secondary" className="bg-emerald-50 text-emerald-700">Pickleball</Badge>
            </div>

            <p className="flex items-center gap-2 text-gray-600 mt-3">
              <MapPin className="w-4 h-4" />
              {court.address}
            </p>

            {/* Photos */}
            {court.photos && court.photos.length > 0 && (
              <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-2 rounded-xl overflow-hidden">
                {court.photos.map((photo: string, i: number) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={i} src={photo} alt={`${court.name} photo ${i + 1}`} className="w-full h-48 object-cover" />
                ))}
              </div>
            )}

            <AdSlot slot="court-detail-mid" className="mt-6 h-24" />

            {/* Map */}
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-3">Location</h2>
              <MapEmbed lat={court.lat} lng={court.lng} zoom={15} query={court.name} />
            </div>

            {/* Reviews */}
            {court.reviews && court.reviews.length > 0 && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Reviews</h2>
                <div className="space-y-4">
                  {court.reviews.map((review: { author_name: string; rating: number; text: string; relative_time_description: string }, i: number) => (
                    <div key={i} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{review.author_name}</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">{review.rating}</span>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mt-2">{review.text}</p>
                      <p className="text-xs text-gray-400 mt-1">{review.relative_time_description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="border rounded-xl p-6">
              <h3 className="font-semibold mb-4">Details</h3>

              {court.phone && (
                <div className="flex items-center gap-2 text-sm mb-3">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <a href={`tel:${court.phone}`} className="text-emerald-600 hover:underline">{court.phone}</a>
                </div>
              )}

              {court.website && (
                <div className="flex items-center gap-2 text-sm mb-3">
                  <Globe className="w-4 h-4 text-gray-400" />
                  <a href={court.website} target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline truncate">
                    Visit Website
                  </a>
                </div>
              )}

              {court.hours && (
                <div className="mt-4">
                  <div className="flex items-center gap-2 text-sm font-medium mb-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    Hours
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {court.hours.map((h: string, i: number) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                </div>
              )}

              {court.googleMapsUrl && (
                <a
                  href={court.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 block w-full text-center bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Get Directions
                </a>
              )}
            </div>

            <AdSlot slot="court-sidebar" className="h-64" />
          </div>
        </div>
      </div>
    </>
  );
}
