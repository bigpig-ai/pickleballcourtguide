import Link from "next/link";
import { MapPin, Home, ArrowRight, Search } from "lucide-react";

const topStates = [
  { name: "Florida", slug: "florida" },
  { name: "California", slug: "california" },
  { name: "Arizona", slug: "arizona" },
  { name: "Texas", slug: "texas" },
  { name: "Colorado", slug: "colorado" },
  { name: "North Carolina", slug: "north-carolina" },
  { name: "Georgia", slug: "georgia" },
  { name: "Tennessee", slug: "tennessee" },
  { name: "New York", slug: "new-york" },
  { name: "Ohio", slug: "ohio" },
];

export default function NotFound() {
  return (
    <>
      <section className="relative hero-mesh text-white overflow-hidden">
        <div className="absolute inset-0 hero-pattern" />
        <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-28 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mb-6">
            <MapPin className="w-8 h-8 text-amber-400" />
          </div>
          <h1 className="text-5xl md:text-6xl font-[var(--font-outfit)] font-black tracking-tight">
            Page Not Found
          </h1>
          <p className="mt-4 text-emerald-100/80 text-base md:text-lg max-w-md leading-relaxed">
            We couldn&apos;t find that page. It may have moved, or the URL might be incorrect.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-white text-emerald-900 font-semibold px-6 py-3 rounded-xl hover:bg-emerald-50 transition-colors"
            >
              <Search className="w-4 h-4" />
              Find Courts Near You
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/20 transition-colors"
            >
              <Home className="w-4 h-4" />
              Back to Home
            </Link>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[var(--background)] to-transparent" />
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-xl md:text-2xl font-[var(--font-outfit)] font-bold text-gray-900 mb-6">
          Browse Courts by State
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
          {topStates.map((state) => (
            <Link
              key={state.slug}
              href={`/pickleball-courts/state/${state.slug}`}
              className="group flex items-center gap-3 bg-white border border-gray-100 rounded-xl px-4 py-3 hover:border-emerald-200 hover:shadow-sm transition-all"
            >
              <MapPin className="w-4 h-4 text-emerald-500 shrink-0" />
              <span className="font-semibold text-gray-700 group-hover:text-emerald-600 transition-colors text-sm">
                {state.name}
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-emerald-500 ml-auto shrink-0 group-hover:translate-x-0.5 transition-all" />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
