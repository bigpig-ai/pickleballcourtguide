import Link from "next/link";
import { popularCities, states } from "@/data/cities";
import { MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-emerald-950 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 pt-16 pb-8">
        {/* Top row: brand + columns */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <span className="font-[var(--font-outfit)] font-extrabold text-xl tracking-tight">
                Pickleball<span className="text-emerald-400">Guide</span>
              </span>
            </Link>
            <p className="text-emerald-300/70 text-sm mt-4 leading-relaxed max-w-xs">
              The most comprehensive pickleball court directory. Find courts, read reviews, compare gear, and play. Updated for 2026.
            </p>
          </div>

          {/* Popular Cities */}
          <div>
            <h3 className="font-[var(--font-outfit)] font-bold text-sm uppercase tracking-wider text-emerald-400 mb-4">
              Popular Cities
            </h3>
            <ul className="space-y-2.5 text-sm text-emerald-200/70">
              {popularCities.slice(0, 6).map((city) => (
                <li key={city.slug}>
                  <Link
                    href={`/pickleball-courts/${city.slug}`}
                    className="hover:text-white transition-colors"
                  >
                    {city.name}, {city.stateCode}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* State Guides */}
          <div>
            <h3 className="font-[var(--font-outfit)] font-bold text-sm uppercase tracking-wider text-emerald-400 mb-4">
              State Guides
            </h3>
            <ul className="space-y-2.5 text-sm text-emerald-200/70">
              {states.slice(0, 6).map((state) => (
                <li key={state}>
                  <Link
                    href={`/blog/best-pickleball-courts-${state.toLowerCase().replace(/\s+/g, "-")}`}
                    className="hover:text-white transition-colors"
                  >
                    {state}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-[var(--font-outfit)] font-bold text-sm uppercase tracking-wider text-emerald-400 mb-4">
              Resources
            </h3>
            <ul className="space-y-2.5 text-sm text-emerald-200/70">
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  Court Guides
                </Link>
              </li>
              <li>
                <Link href="/gear" className="hover:text-white transition-colors">
                  Best Gear 2026
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/affiliate-disclosure" className="hover:text-white transition-colors">
                  Affiliate Disclosure
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-emerald-800/50 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-emerald-400/50">
            © {new Date().getFullYear()} PickleballCourtGuide.com. All rights reserved.
          </p>
          <p className="text-xs text-emerald-400/40">
            As an Amazon Associate, we earn from qualifying purchases.
          </p>
        </div>
      </div>
    </footer>
  );
}
