import Link from "next/link";
import { SearchBar } from "@/components/SearchBar";
import { AdSlot } from "@/components/AdSlot";
import { popularCities, cities, stateSlugMap } from "@/data/cities";
import { MapPin, Star, Users, Zap, ArrowRight, Trophy, TrendingUp } from "lucide-react";
import { getTopProducts } from "@/data/affiliate-products";
import { ProductCard } from "@/components/ProductCard";

export default function HomePage() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative hero-mesh text-white overflow-hidden">
        <div className="absolute inset-0 hero-pattern" />

        {/* Decorative floating elements */}
        <div className="absolute top-20 left-[10%] w-32 h-32 bg-emerald-400/10 rounded-full blur-2xl" />
        <div className="absolute bottom-10 right-[15%] w-40 h-40 bg-amber-400/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-32 lg:py-36 flex flex-col items-center text-center">
          {/* Badge */}
          <div className="animate-fade-in-up inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-sm font-medium text-emerald-100">
              {cities.length}+ cities covered across the US
            </span>
          </div>

          <h1 className="animate-fade-in-up stagger-1 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-[var(--font-outfit)] font-black tracking-tight leading-[0.95]">
            Find Pickleball Courts
            <br />
            <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-300 bg-clip-text text-transparent">
              Near You
            </span>
          </h1>

          <p className="animate-fade-in-up stagger-2 mt-5 text-base md:text-lg text-emerald-100/80 max-w-xl leading-relaxed">
            Ratings, hours, photos, and directions for every court. The most comprehensive pickleball directory for 2026.
          </p>

          <div className="animate-fade-in-up stagger-3 mt-8 w-full flex justify-center">
            <SearchBar large />
          </div>

          {/* Quick links */}
          <div className="animate-fade-in-up stagger-4 mt-6 flex flex-wrap justify-center gap-2">
            {popularCities.slice(0, 5).map((city) => (
              <Link
                key={city.slug}
                href={`/pickleball-courts/${city.slug}`}
                className="text-xs text-emerald-200/60 hover:text-white border border-white/10 hover:border-white/25 rounded-full px-3 py-1 transition-all"
              >
                {city.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom edge shape */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[var(--background)] to-transparent" />
      </section>

      <AdSlot slot="homepage-top" className="max-w-7xl mx-auto px-4 mt-6 h-24" />

      {/* ===== STATS ===== */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid grid-cols-3 gap-4 md:gap-8">
          {[
            { icon: MapPin, label: "Cities Covered", value: `${cities.length}+`, color: "text-emerald-600 bg-emerald-50" },
            { icon: Trophy, label: "Courts Listed", value: "5,000+", color: "text-amber-600 bg-amber-50" },
            { icon: TrendingUp, label: "Players Monthly", value: "Growing", color: "text-blue-600 bg-blue-50" },
          ].map(({ icon: Icon, label, value, color }, i) => (
            <div key={label} className={`animate-fade-in-up stagger-${i + 1} text-center p-4 md:p-6`}>
              <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center mx-auto`}>
                <Icon className="w-6 h-6" />
              </div>
              <div className="text-2xl md:text-3xl font-[var(--font-outfit)] font-black mt-3 text-gray-900">
                {value}
              </div>
              <div className="text-xs md:text-sm text-gray-500 font-medium mt-0.5">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== POPULAR CITIES ===== */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-[var(--font-outfit)] font-black text-gray-900">
              Popular Cities
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Top pickleball destinations across the US
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {popularCities.map((city, i) => (
            <Link
              key={city.slug}
              href={`/pickleball-courts/${city.slug}`}
              className={`animate-fade-in-up stagger-${Math.min(i + 1, 8)} card-hover group relative bg-white border border-gray-100 rounded-2xl p-5 flex items-center gap-4`}
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100 flex items-center justify-center shrink-0 group-hover:from-emerald-100 group-hover:to-emerald-200 transition-all">
                <MapPin className="w-5 h-5 text-emerald-600" />
              </div>
              <div className="min-w-0">
                <h3 className="font-[var(--font-outfit)] font-bold text-gray-900 group-hover:text-emerald-600 transition-colors truncate">
                  {city.name}
                </h3>
                <p className="text-sm text-gray-400">{city.state}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all ml-auto shrink-0" />
            </Link>
          ))}
        </div>
      </section>

      {/* ===== BROWSE BY STATE ===== */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-[var(--font-outfit)] font-black text-gray-900">
              Browse by State
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Find courts in every state we cover
            </p>
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-1.5">
            {Object.values(stateSlugMap)
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((state) => (
                <Link
                  key={state.slug}
                  href={`/pickleball-courts/state/${state.slug}`}
                  className="text-sm text-gray-500 hover:text-emerald-600 py-1 transition-colors truncate"
                >
                  {state.name}
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* ===== ALL CITIES ===== */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-xl font-[var(--font-outfit)] font-bold text-gray-900 mb-4">
          All Cities
        </h2>
        <div className="bg-white border border-gray-100 rounded-2xl p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-1.5">
            {cities.map((city) => (
              <Link
                key={city.slug}
                href={`/pickleball-courts/${city.slug}`}
                className="text-sm text-gray-500 hover:text-emerald-600 py-1 transition-colors truncate"
              >
                {city.name}, {city.stateCode}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TOP GEAR ===== */}
      <section className="bg-gradient-to-b from-gray-50/80 to-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-[var(--font-outfit)] font-black text-gray-900">
                Top Pickleball Gear
              </h2>
              <p className="text-gray-500 text-sm mt-1">Our expert picks for 2026</p>
            </div>
            <Link
              href="/gear"
              className="hidden sm:flex items-center gap-1 text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
            >
              View all gear
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

          <Link
            href="/gear"
            className="sm:hidden flex items-center justify-center gap-2 mt-6 py-3 bg-emerald-50 text-emerald-700 rounded-xl font-semibold text-sm hover:bg-emerald-100 transition-colors"
          >
            View all gear
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ===== WHY USE US ===== */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-[var(--font-outfit)] font-black text-center text-gray-900 mb-3">
            Why Pickleball Court Guide?
          </h2>
          <p className="text-gray-500 text-center text-sm max-w-md mx-auto mb-10">
            Built by players, for players. Here&apos;s what makes us different.
          </p>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                icon: Zap,
                title: "Always Updated",
                desc: "Court data from Google Maps. Ratings, hours, and photos are always current.",
                accent: "from-amber-50 to-amber-100 text-amber-600",
              },
              {
                icon: MapPin,
                title: "Comprehensive",
                desc: "We cover 50+ cities with every pickleball court, club, and recreation center.",
                accent: "from-emerald-50 to-emerald-100 text-emerald-600",
              },
              {
                icon: Star,
                title: "Real Reviews",
                desc: "See what other players think. Real ratings from real pickleball enthusiasts.",
                accent: "from-blue-50 to-blue-100 text-blue-600",
              },
            ].map(({ icon: Icon, title, desc, accent }, i) => (
              <div
                key={title}
                className={`animate-fade-in-up stagger-${i + 1} card-hover bg-white border border-gray-100 rounded-2xl p-6`}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${accent} flex items-center justify-center`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-[var(--font-outfit)] font-bold text-lg text-gray-900 mt-4">
                  {title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mt-2">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AdSlot slot="homepage-bottom" className="max-w-7xl mx-auto px-4 my-8 h-24" />
    </>
  );
}
