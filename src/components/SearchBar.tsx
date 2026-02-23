"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin } from "lucide-react";

export function SearchBar({ large = false }: { large?: boolean }) {
  const [query, setQuery] = useState("");
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

  return (
    <form onSubmit={handleSearch} className={`flex gap-2 w-full ${large ? "max-w-2xl" : "max-w-md"}`}>
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          placeholder="Enter city or zip code..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={`pl-10 ${large ? "h-14 text-lg rounded-xl" : "h-10"}`}
        />
      </div>
      <Button type="submit" className={`bg-emerald-600 hover:bg-emerald-700 ${large ? "h-14 px-8 rounded-xl text-lg" : ""}`}>
        Search
      </Button>
      <Button type="button" variant="outline" onClick={handleGeolocate} className={`${large ? "h-14 rounded-xl" : ""}`}>
        <MapPin className="w-4 h-4" />
      </Button>
    </form>
  );
}
