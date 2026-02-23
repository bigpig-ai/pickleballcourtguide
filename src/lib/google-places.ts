export interface Court {
  id: string;
  name: string;
  slug: string;
  address: string;
  lat: number;
  lng: number;
  rating?: number;
  reviewCount?: number;
  phone?: string;
  website?: string;
  photos?: string[];
  hours?: string[];
  types?: string[];
  priceLevel?: number;
  businessStatus?: string;
  placeId: string;
  city: string;
  state: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function searchPickleballCourts(
  lat: number,
  lng: number,
  cityName: string,
  stateCode: string
): Promise<Court[]> {
  const apiKey = process.env.GOOGLE_MAPS_PLATFORM_API_KEY;
  if (!apiKey) throw new Error("Missing GOOGLE_MAPS_PLATFORM_API_KEY");

  const courts: Court[] = [];
  let pageToken: string | undefined;

  // Search with multiple queries for better coverage
  const queries = [
    "pickleball courts",
    "pickleball club",
  ];

  for (const query of queries) {
    pageToken = undefined;
    do {
      const params = new URLSearchParams({
        query: `${query} in ${cityName}, ${stateCode}`,
        location: `${lat},${lng}`,
        radius: "30000",
        key: apiKey,
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
            slug: slugify(`${place.name}-${cityName}-${stateCode}`),
            address: place.formatted_address || "",
            lat: place.geometry?.location?.lat || lat,
            lng: place.geometry?.location?.lng || lng,
            rating: place.rating,
            reviewCount: place.user_ratings_total,
            photos: place.photos?.slice(0, 3).map(
              (p: { photo_reference: string }) =>
                `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=${p.photo_reference}&key=${apiKey}`
            ),
            types: place.types,
            priceLevel: place.price_level,
            businessStatus: place.business_status,
            placeId: place.place_id,
            city: cityName,
            state: stateCode,
          });
        }
      }

      pageToken = data.next_page_token;
      if (pageToken) await new Promise((r) => setTimeout(r, 2000));
    } while (pageToken);
  }

  return courts;
}

export async function getCourtDetails(placeId: string): Promise<Partial<Court> & Record<string, unknown>> {
  const apiKey = process.env.GOOGLE_MAPS_PLATFORM_API_KEY;
  if (!apiKey) throw new Error("Missing GOOGLE_MAPS_PLATFORM_API_KEY");

  const fields = "name,formatted_address,formatted_phone_number,website,rating,user_ratings_total,photos,opening_hours,geometry,types,price_level,reviews,url";
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=${fields}&key=${apiKey}`;
  
  const res = await fetch(url);
  const data = await res.json();
  const place = data.result;
  
  if (!place) return {};

  return {
    name: place.name,
    address: place.formatted_address,
    phone: place.formatted_phone_number,
    website: place.website,
    rating: place.rating,
    reviewCount: place.user_ratings_total,
    lat: place.geometry?.location?.lat,
    lng: place.geometry?.location?.lng,
    hours: place.opening_hours?.weekday_text,
    photos: place.photos?.slice(0, 6).map(
      (p: { photo_reference: string }) =>
        `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=${p.photo_reference}&key=${apiKey}`
    ),
    types: place.types,
    priceLevel: place.price_level,
    placeId,
    googleMapsUrl: place.url,
    reviews: place.reviews?.slice(0, 5),
  };
}
