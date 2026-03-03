import { readFileSync, existsSync } from "fs";
import { join } from "path";
import type { Court } from "./google-places";

const CACHE_DIR = join(process.cwd(), "src", "data", "cache");

/**
 * Load courts from local JSON cache (no API calls).
 * Falls back to empty array if cache doesn't exist.
 */
export function getCachedCourts(citySlug: string): Court[] {
  const cachePath = join(CACHE_DIR, `${citySlug}.json`);
  
  if (!existsSync(cachePath)) {
    console.warn(`No cache for ${citySlug}. Run: npx tsx scripts/refresh-courts.ts ${citySlug}`);
    return [];
  }

  try {
    const raw = readFileSync(cachePath, "utf-8");
    const courts = JSON.parse(raw);

    // Use static placeholder instead of paid Google Places Photos API
    return courts.map((court: any) => ({
      ...court,
      photos: court.photos?.length ? ["/images/court-placeholder.jpg"] : [],
    }));
  } catch (err) {
    console.error(`Failed to read cache for ${citySlug}:`, err);
    return [];
  }
}
