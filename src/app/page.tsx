import Link from "next/link";
import { SearchBar } from "@/components/SearchBar";
import { AdSlot } from "@/components/AdSlot";
import { popularCities, cities } from "@/data/cities";
import { MapPin, Star, Users, Zap } from "lucide-react";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-900 text-white">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 py-24 md:py-32 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Find Pickleball Courts
            <br />
            <span className="text-emerald-200">Near You</span>
          </h1>
          <p className="mt-4 text-lg md:text-xl text-emerald-100 max-w-2xl">
            Search {cities.length}+ cities for the best pickleball courts. Ratings, hours, photos, and directions — all in one place.
          </p>
          <div className="mt-8 w-full flex justify-center">
            <SearchBar large />
          </div>
        </div>
      </section>

      <AdSlot slot="homepage-top" className="max-w-7xl mx-auto px-4 mt-6 h-24" />

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-3 gap-6 text-center">
          {[
            { icon: MapPin, label: "Cities Covered", value: `${cities.length}+` },
            { icon: Star, label: "Courts Listed", value: "5,000+" },
            { icon: Users, label: "Players Monthly", value: "Growing" },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="p-6">
              <Icon className="w-8 h-8 text-emerald-600 mx-auto" />
              <div className="text-2xl font-bold mt-2">{value}</div>
              <div className="text-sm text-gray-500">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Cities */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">Popular Cities for Pickleball</h2>
        <p className="text-gray-500 text-center mb-8">Browse courts in the most popular pickleball destinations</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {popularCities.map((city) => (
            <Link
              key={city.slug}
              href={`/pickleball-courts/${city.slug}`}
              className="group relative bg-white border rounded-xl p-6 hover:shadow-lg hover:border-emerald-200 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                  <MapPin className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-semibold group-hover:text-emerald-600 transition-colors">{city.name}</h3>
                  <p className="text-sm text-gray-500">{city.state}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* All Cities */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6">All Cities</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2">
          {cities.map((city) => (
            <Link
              key={city.slug}
              href={`/pickleball-courts/${city.slug}`}
              className="text-sm text-gray-600 hover:text-emerald-600 py-1"
            >
              {city.name}, {city.stateCode}
            </Link>
          ))}
        </div>
      </section>

      {/* Why Use Us */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Why Pickleball Court Guide?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: "Always Updated", desc: "Court data pulled fresh from Google Maps. Ratings, hours, and photos always current." },
              { icon: MapPin, title: "Comprehensive", desc: "We cover 50+ cities with every pickleball court, club, and recreation center." },
              { icon: Star, title: "Real Reviews", desc: "See what other players think. Real ratings from real pickleball enthusiasts." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-xl p-6 border">
                <Icon className="w-8 h-8 text-emerald-600" />
                <h3 className="font-semibold text-lg mt-3">{title}</h3>
                <p className="text-gray-500 mt-2">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AdSlot slot="homepage-bottom" className="max-w-7xl mx-auto px-4 my-8 h-24" />
    </>
  );
}
