"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin } from "lucide-react";

export function SearchBar({ large = false }: { large?: boolean }) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    const slug = query.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    router.push(`/pickleball-courts/${slug}`);
  };

  const handleGeolocate = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition((pos) => {
      router.push(`/api/courts?lat=${pos.coords.latitude}&lng=${pos.coords.longitude}`);
    });
  };

  if (large) {
    return (
      <form onSubmit={handleSearch} className="w-full max-w-2xl">
        <div
          className={`flex items-center gap-2 bg-white/10 backdrop-blur-sm border-2 rounded-2xl p-1.5 transition-all duration-300 ${
            focused ? "border-amber-400 bg-white/15 shadow-lg shadow-amber-400/10" : "border-white/20"
          }`}
        >
          <div className="flex items-center flex-1 gap-3 px-4">
            <Search className="w-5 h-5 text-white/60 shrink-0" />
            <input
              placeholder="Search by city or zip code..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              className="flex-1 bg-transparent text-white text-lg placeholder:text-white/40 outline-none py-3"
            />
          </div>
          <button
            type="button"
            onClick={handleGeolocate}
            className="p-3 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-all shrink-0"
            title="Use my location"
          >
            <MapPin className="w-5 h-5" />
          </button>
          <button
            type="submit"
            className="bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold px-6 py-3 rounded-xl transition-all duration-200 shadow-lg shadow-amber-500/20 hover:shadow-amber-400/30 shrink-0"
          >
            Search
          </button>
        </div>
      </form>
    );
  }

  return (
    <form onSubmit={handleSearch} className="flex gap-2 w-full max-w-md">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          placeholder="Enter city or zip code..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 h-11 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
        />
      </div>
      <button
        type="submit"
        className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-5 h-11 rounded-xl transition-colors text-sm"
      >
        Search
      </button>
      <button
        type="button"
        onClick={handleGeolocate}
        className="h-11 w-11 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors shrink-0"
      >
        <MapPin className="w-4 h-4 text-gray-500" />
      </button>
    </form>
  );
}
