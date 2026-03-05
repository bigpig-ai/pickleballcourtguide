import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cities, getCityBySlug, stateSlugMap } from "@/data/cities";
import { getCachedCourts } from "@/lib/courts-cache";
import { CourtCard } from "@/components/CourtCard";
import { MapEmbed } from "@/components/MapEmbed";
import { SearchBar } from "@/components/SearchBar";
import { AdSlot } from "@/components/AdSlot";
import { getTopProducts } from "@/data/affiliate-products";
import { ProductCard } from "@/components/ProductCard";
import { MapPin, Star, ArrowRight } from "lucide-react";
import Link from "next/link";

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

  const stateInfo = Object.values(stateSlugMap).find((s) => s.code === city.stateCode);

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

      {/* City Hero */}
      <section className="relative hero-mesh text-white overflow-hidden">
        <div className="absolute inset-0 hero-pattern" />
        <div className="relative max-w-7xl mx-auto px-4 py-14 md:py-20">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-emerald-200/60 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            {stateInfo ? (
              <>
                <Link href={`/pickleball-courts/state/${stateInfo.slug}`} className="hover:text-white transition-colors">
                  {stateInfo.name}
                </Link>
                <span>/</span>
              </>
            ) : null}
            <span className="text-emerald-100">
              {city.name}, {city.stateCode}
            </span>
          </div>

          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <MapPin className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-[var(--font-outfit)] font-black">
                Pickleball Courts in {city.name}
              </h1>
            </div>
          </div>

          <p className="text-emerald-100/80 text-sm md:text-base max-w-lg">
            {courts.length} pickleball courts and facilities found in {city.name}, {city.stateCode}
          </p>

          <div className="mt-5">
            <SearchBar />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[var(--background)] to-transparent" />
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <AdSlot slot="city-top" className="mb-6 h-24" />

        {/* Map */}
        <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
          <MapEmbed lat={city.lat} lng={city.lng} query={`pickleball courts in ${city.name}, ${city.stateCode}`} />
        </div>

        {/* Court List */}
        <div className="mt-10">
          <div className="flex items-end justify-between mb-6">
            <h2 className="text-xl md:text-2xl font-[var(--font-outfit)] font-bold text-gray-900">
              All Pickleball Courts in {city.name}
            </h2>
            <span className="text-sm text-gray-400 font-medium">
              {courts.length} results
            </span>
          </div>

          {courts.length === 0 ? (
            <div className="text-center py-16 bg-gray-50 rounded-2xl">
              <MapPin className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 font-medium">
                No courts found yet. Try searching a nearby city.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {courts.map((court, i) => (
                <div key={court.id} className={`animate-fade-in-up stagger-${Math.min((i % 8) + 1, 8)}`}>
                  <CourtCard court={court} />
                </div>
              ))}
            </div>
          )}
        </div>

        <AdSlot slot="city-bottom" className="mt-8 h-24" />

        {/* SEO Content */}
        <section className="mt-12 bg-white border border-gray-100 rounded-2xl p-6 md:p-8">
          <div className="prose max-w-none">
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
              <li>Check court hours &mdash; popular locations fill up quickly during peak times</li>
              <li>Bring your own paddle and balls unless visiting a dedicated pickleball facility</li>
            </ul>
          </div>
        </section>

        {/* Recommended Gear */}
        <section className="mt-12">
          <div className="flex items-end justify-between mb-6">
            <div>
              <h2 className="text-xl font-[var(--font-outfit)] font-bold text-gray-900">Recommended Gear</h2>
              <p className="text-sm text-gray-500 mt-0.5">
                Top-rated pickleball equipment to bring to courts in {city.name}.
              </p>
            </div>
            <Link
              href="/gear"
              className="hidden sm:flex items-center gap-1 text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
            >
              All gear
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {getTopProducts(3).map((product, i) => (
              <div key={product.name} className={`animate-fade-in-up stagger-${i + 1}`}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-4">
            As an Amazon Associate, we earn from qualifying purchases.
          </p>
        </section>
      </div>
    </>
  );
}
