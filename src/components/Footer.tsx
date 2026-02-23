import Link from "next/link";
import { popularCities, states } from "@/data/cities";

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Popular Cities</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              {popularCities.slice(0, 8).map((city) => (
                <li key={city.slug}>
                  <Link href={`/pickleball-courts/${city.slug}`} className="hover:text-emerald-600">
                    {city.name}, {city.stateCode}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">State Guides</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              {states.slice(0, 8).map((state) => (
                <li key={state}>
                  <Link href={`/blog/best-pickleball-courts-${state.toLowerCase().replace(/\s+/g, "-")}`} className="hover:text-emerald-600">
                    {state}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Resources</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/blog" className="hover:text-emerald-600">Court Guides</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">About</h3>
            <p className="text-sm text-gray-600">
              Pickleball Court Guide helps you find the best pickleball courts near you. Updated for 2026.
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-gray-500">
          © {new Date().getFullYear()} PickleballCourtGuide.com. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
