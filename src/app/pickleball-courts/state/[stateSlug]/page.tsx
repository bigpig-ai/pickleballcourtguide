import { Metadata } from "next";
import { notFound } from "next/navigation";
import { stateSlugMap, getCitiesByState, getStateBySlug } from "@/data/cities";
import { getCachedCourts } from "@/lib/courts-cache";
import { AdSlot } from "@/components/AdSlot";
import { getTopProducts } from "@/data/affiliate-products";
import { ProductCard } from "@/components/ProductCard";
import { ShareButtons } from "@/components/ShareButtons";
import { MapPin, ArrowRight, Building2 } from "lucide-react";
import Link from "next/link";

type Props = { params: Promise<{ stateSlug: string }> };

export async function generateStaticParams() {
  return Object.keys(stateSlugMap).map((slug) => ({ stateSlug: slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { stateSlug } = await params;
  const state = getStateBySlug(stateSlug);
  if (!state) return {};
  const cityCount = getCitiesByState(state.code).length;
  return {
    title: `Pickleball Courts in ${state.name} | 2026 Guide`,
    description: `Find pickleball courts across ${cityCount} cities in ${state.name}. Browse ratings, photos, and directions for every court in ${state.code}.`,
    openGraph: {
      title: `Pickleball Courts in ${state.name}`,
      description: `Complete guide to pickleball courts in ${state.name}. ${cityCount} cities covered with ratings, hours, and more.`,
      url: `https://pickleballcourtguide.com/pickleball-courts/state/${stateSlug}`,
      type: "website",
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: `Pickleball Courts in ${state.name}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `Pickleball Courts in ${state.name}`,
      description: `Complete guide to pickleball courts in ${state.name}. ${cityCount} cities covered.`,
      images: ["/opengraph-image"],
    },
  };
}

export const revalidate = 86400;

export default async function StatePage({ params }: Props) {
  const { stateSlug } = await params;
  const state = getStateBySlug(stateSlug);
  if (!state) notFound();

  const stateCities = getCitiesByState(state.code);

  const citiesWithCounts = stateCities.map((city) => {
    const courts = getCachedCourts(city.slug);
    return { ...city, courtCount: courts.length };
  });

  const totalCourts = citiesWithCounts.reduce((sum, c) => sum + c.courtCount, 0);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://pickleballcourtguide.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: state.name,
        item: `https://pickleballcourtguide.com/pickleball-courts/state/${state.slug}`,
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* State Hero */}
      <section className="relative hero-mesh text-white overflow-hidden">
        <div className="absolute inset-0 hero-pattern" />
        <div className="relative max-w-7xl mx-auto px-4 py-14 md:py-20">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-emerald-200/60 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-emerald-100">{state.name}</span>
          </div>

          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <MapPin className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-[var(--font-outfit)] font-black">
                Pickleball Courts in {state.name}
              </h1>
            </div>
          </div>

          <p className="text-emerald-100/80 text-sm md:text-base max-w-lg">
            {totalCourts} courts across {citiesWithCounts.length} cities in {state.name}
          </p>
          <div className="mt-4">
            <ShareButtons
              url={`https://pickleballcourtguide.com/pickleball-courts/state/${state.slug}`}
              title={`Pickleball Courts in ${state.name}`}
            />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[var(--background)] to-transparent" />
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <AdSlot slot="state-top" className="mb-6 h-24" />

        {/* City List */}
        <div>
          <div className="flex items-end justify-between mb-6">
            <h2 className="text-xl md:text-2xl font-[var(--font-outfit)] font-bold text-gray-900">
              Cities in {state.name}
            </h2>
            <span className="text-sm text-gray-400 font-medium">
              {citiesWithCounts.length} cities
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {citiesWithCounts.map((city, i) => (
              <Link
                key={city.slug}
                href={`/pickleball-courts/${city.slug}`}
                className={`animate-fade-in-up stagger-${Math.min((i % 8) + 1, 8)} card-hover group bg-white border border-gray-100 rounded-2xl p-5 flex items-center gap-4`}
              >
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100 flex items-center justify-center shrink-0 group-hover:from-emerald-100 group-hover:to-emerald-200 transition-all">
                  <Building2 className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-[var(--font-outfit)] font-bold text-gray-900 group-hover:text-emerald-600 transition-colors truncate">
                    {city.name}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {city.courtCount} {city.courtCount === 1 ? "court" : "courts"}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all shrink-0" />
              </Link>
            ))}
          </div>
        </div>

        <AdSlot slot="state-mid" className="mt-8 mb-8 h-24" />

        {/* Recommended Gear */}
        <section className="mt-4">
          <div className="flex items-end justify-between mb-6">
            <div>
              <h2 className="text-xl font-[var(--font-outfit)] font-bold text-gray-900">Recommended Gear</h2>
              <p className="text-sm text-gray-500 mt-0.5">
                Top-rated pickleball equipment for players in {state.name}.
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
