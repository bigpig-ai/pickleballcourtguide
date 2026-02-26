import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cities, getCityBySlug } from "@/data/cities";
import { getCachedCourts } from "@/lib/courts-cache";
import { CourtCard } from "@/components/CourtCard";
import { MapEmbed } from "@/components/MapEmbed";
import { SearchBar } from "@/components/SearchBar";
import { AdSlot } from "@/components/AdSlot";

type Props = { params: Promise<{ cityState: string }> };

export async function generateStaticParams() {
  return cities.map((city) => ({ cityState: city.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { cityState } = await params;
  const city = getCityBySlug(cityState);
  if (!city) return {};
  return {
    title: `Best Pickleball Courts in ${city.name}, ${city.stateCode} | 2026 Guide`,
    description: `Find the best pickleball courts in ${city.name}, ${city.state}. Browse ratings, photos, hours, and directions for all ${city.name} pickleball facilities.`,
    openGraph: {
      title: `Pickleball Courts in ${city.name}, ${city.stateCode}`,
      description: `Complete guide to pickleball courts in ${city.name}. Find indoor & outdoor courts, ratings, and more.`,
    },
  };
}

export const revalidate = 86400; // ISR: revalidate daily

export default async function CityPage({ params }: Props) {
  const { cityState } = await params;
  const city = getCityBySlug(cityState);
  if (!city) notFound();

  // Load from local cache (no API calls at build time)
  const courts = getCachedCourts(city.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Pickleball Courts in ${city.name}, ${city.stateCode}`,
    itemListElement: courts.slice(0, 10).map((court, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "LocalBusiness",
        name: court.name,
        address: court.address,
        ...(court.rating && { aggregateRating: { "@type": "AggregateRating", ratingValue: court.rating, reviewCount: court.reviewCount } }),
      },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="bg-emerald-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold">
            Pickleball Courts in {city.name}, {city.stateCode}
          </h1>
          <p className="mt-2 text-emerald-100">
            {courts.length} pickleball courts and facilities found
          </p>
          <div className="mt-4">
            <SearchBar />
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <AdSlot slot="city-top" className="mb-6 h-24" />

        {/* Map */}
        <MapEmbed lat={city.lat} lng={city.lng} query={`pickleball courts in ${city.name}, ${city.stateCode}`} />

        {/* Court List */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">
            All Pickleball Courts in {city.name}
          </h2>
          {courts.length === 0 ? (
            <p className="text-gray-500 py-8 text-center">
              No courts found yet. Try searching a nearby city or check back later.
            </p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courts.map((court) => (
                <CourtCard key={court.id} court={court} />
              ))}
            </div>
          )}
        </div>

        <AdSlot slot="city-bottom" className="mt-8 h-24" />

        {/* SEO Content */}
        <section className="mt-12 prose max-w-none">
          <h2>Playing Pickleball in {city.name}, {city.stateCode}</h2>
          <p>
            {city.name} is a fantastic place to play pickleball, with {courts.length} courts and facilities available
            for players of all skill levels. Whether you&apos;re looking for competitive play or casual games,
            {city.name} has options for everyone.
          </p>
          <h3>Tips for Finding Courts in {city.name}</h3>
          <ul>
            <li>Many public parks offer free outdoor pickleball courts</li>
            <li>Recreation centers often have indoor courts available for a small fee</li>
            <li>Check court hours — popular locations fill up quickly during peak times</li>
            <li>Bring your own paddle and balls unless visiting a dedicated pickleball facility</li>
          </ul>
        </section>
      </div>
    </>
  );
}
