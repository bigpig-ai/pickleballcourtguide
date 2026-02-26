/**
 * Refresh court data from Google Places API and cache locally.
 * Run this ONLY when you want to update court data (not on every build).
 * Usage: npx tsx scripts/refresh-courts.ts [city-slug]
 * 
 * Without arguments: refreshes ALL cities
 * With city-slug: refreshes just that city (e.g., "naples-fl")
 */

import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";

// Import city data
const citiesModule = require("../src/data/cities");
const cities: Array<{
  slug: string;
  name: string;
  stateCode: string;
  lat: number;
  lng: number;
}> = citiesModule.cities;

const CACHE_DIR = join(__dirname, "..", "src", "data", "cache");
const API_KEY = process.env.GOOGLE_MAPS_PLATFORM_API_KEY;

if (!API_KEY) {
  console.error("Missing GOOGLE_MAPS_PLATFORM_API_KEY env var");
  process.exit(1);
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function fetchCourtsForCity(city: typeof cities[0]) {
  const courts: any[] = [];
  const queries = ["pickleball courts", "pickleball club"];

  for (const query of queries) {
    let pageToken: string | undefined;
    do {
      const params = new URLSearchParams({
        query: `${query} in ${city.name}, ${city.stateCode}`,
        location: `${city.lat},${city.lng}`,
        radius: "30000",
        key: API_KEY!,
      });
      if (pageToken) params.set("pagetoken", pageToken);

      const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?${params}`;
      const res = await fetch(url);
      const data = await res.json();

      if (data.results) {
        for (const place of data.results) {
          if (courts.find((c) => c.placeId === place.place_id)) continue;
          courts.push({
            id: place.place_id,
            name: place.name,
            slug: slugify(`${place.name}-${city.name}-${city.stateCode}`),
            address: place.formatted_address || "",
            lat: place.geometry?.location?.lat || city.lat,
            lng: place.geometry?.location?.lng || city.lng,
            rating: place.rating,
            reviewCount: place.user_ratings_total,
            photos: place.photos?.slice(0, 3).map(
              (p: any) => p.photo_reference
            ),
            types: place.types,
            priceLevel: place.price_level,
            businessStatus: place.business_status,
            placeId: place.place_id,
            city: city.name,
            state: city.stateCode,
          });
        }
      }

      pageToken = data.next_page_token;
      if (pageToken) await new Promise((r) => setTimeout(r, 2000));
    } while (pageToken);
  }

  return courts;
}

async function main() {
  if (!existsSync(CACHE_DIR)) mkdirSync(CACHE_DIR, { recursive: true });

  const targetSlug = process.argv[2];
  const citiesToRefresh = targetSlug
    ? cities.filter((c) => c.slug === targetSlug)
    : cities;

  if (targetSlug && citiesToRefresh.length === 0) {
    console.error(`City "${targetSlug}" not found`);
    process.exit(1);
  }

  console.log(`Refreshing ${citiesToRefresh.length} cities...`);
  let total = 0;

  for (const city of citiesToRefresh) {
    try {
      const courts = await fetchCourtsForCity(city);
      const cachePath = join(CACHE_DIR, `${city.slug}.json`);
      writeFileSync(cachePath, JSON.stringify(courts, null, 2));
      total += courts.length;
      console.log(`  ✅ ${city.name}, ${city.stateCode}: ${courts.length} courts`);
    } catch (err) {
      console.error(`  ❌ ${city.name}, ${city.stateCode}: ${err}`);
    }

    // Rate limit: 100ms between cities
    await new Promise((r) => setTimeout(r, 100));
  }

  // Write a manifest
  const manifest = {
    lastRefreshed: new Date().toISOString(),
    totalCourts: total,
    cities: citiesToRefresh.map((c) => c.slug),
  };
  writeFileSync(join(CACHE_DIR, "_manifest.json"), JSON.stringify(manifest, null, 2));

  console.log(`\nDone! ${total} total courts cached.`);
}

main().catch(console.error);
