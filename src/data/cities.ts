export interface City {
  name: string;
  state: string;
  stateCode: string;
  slug: string;
  lat: number;
  lng: number;
  population?: number;
}

export const cities: City[] = [
  { name: "Naples", state: "Florida", stateCode: "FL", slug: "naples-fl", lat: 26.142, lng: -81.795 },
  { name: "The Villages", state: "Florida", stateCode: "FL", slug: "the-villages-fl", lat: 28.934, lng: -81.983 },
  { name: "Scottsdale", state: "Arizona", stateCode: "AZ", slug: "scottsdale-az", lat: 33.494, lng: -111.926 },
  { name: "Phoenix", state: "Arizona", stateCode: "AZ", slug: "phoenix-az", lat: 33.449, lng: -112.074 },
  { name: "Austin", state: "Texas", stateCode: "TX", slug: "austin-tx", lat: 30.267, lng: -97.743 },
  { name: "Denver", state: "Colorado", stateCode: "CO", slug: "denver-co", lat: 39.739, lng: -104.990 },
  { name: "San Diego", state: "California", stateCode: "CA", slug: "san-diego-ca", lat: 32.716, lng: -117.161 },
  { name: "Seattle", state: "Washington", stateCode: "WA", slug: "seattle-wa", lat: 47.606, lng: -122.332 },
  { name: "Miami", state: "Florida", stateCode: "FL", slug: "miami-fl", lat: 25.762, lng: -80.192 },
  { name: "Tampa", state: "Florida", stateCode: "FL", slug: "tampa-fl", lat: 27.951, lng: -82.459 },
  { name: "Orlando", state: "Florida", stateCode: "FL", slug: "orlando-fl", lat: 28.538, lng: -81.379 },
  { name: "Los Angeles", state: "California", stateCode: "CA", slug: "los-angeles-ca", lat: 34.052, lng: -118.244 },
  { name: "Manhattan Beach", state: "California", stateCode: "CA", slug: "manhattan-beach-ca", lat: 33.885, lng: -118.411 },
  { name: "Huntington Beach", state: "California", stateCode: "CA", slug: "huntington-beach-ca", lat: 33.661, lng: -117.999 },
  { name: "Portland", state: "Oregon", stateCode: "OR", slug: "portland-or", lat: 45.523, lng: -122.677 },
  { name: "Salt Lake City", state: "Utah", stateCode: "UT", slug: "salt-lake-city-ut", lat: 40.761, lng: -111.891 },
  { name: "Dallas", state: "Texas", stateCode: "TX", slug: "dallas-tx", lat: 32.777, lng: -96.797 },
  { name: "Houston", state: "Texas", stateCode: "TX", slug: "houston-tx", lat: 29.760, lng: -95.370 },
  { name: "San Antonio", state: "Texas", stateCode: "TX", slug: "san-antonio-tx", lat: 29.425, lng: -98.494 },
  { name: "Nashville", state: "Tennessee", stateCode: "TN", slug: "nashville-tn", lat: 36.163, lng: -86.781 },
  { name: "Charlotte", state: "North Carolina", stateCode: "NC", slug: "charlotte-nc", lat: 35.227, lng: -80.843 },
  { name: "Raleigh", state: "North Carolina", stateCode: "NC", slug: "raleigh-nc", lat: 35.780, lng: -78.639 },
  { name: "Atlanta", state: "Georgia", stateCode: "GA", slug: "atlanta-ga", lat: 33.749, lng: -84.388 },
  { name: "Chicago", state: "Illinois", stateCode: "IL", slug: "chicago-il", lat: 41.878, lng: -87.630 },
  { name: "Minneapolis", state: "Minnesota", stateCode: "MN", slug: "minneapolis-mn", lat: 44.978, lng: -93.265 },
  { name: "New York", state: "New York", stateCode: "NY", slug: "new-york-ny", lat: 40.713, lng: -74.006 },
  { name: "Boston", state: "Massachusetts", stateCode: "MA", slug: "boston-ma", lat: 42.360, lng: -71.059 },
  { name: "Philadelphia", state: "Pennsylvania", stateCode: "PA", slug: "philadelphia-pa", lat: 39.953, lng: -75.164 },
  { name: "Washington", state: "District of Columbia", stateCode: "DC", slug: "washington-dc", lat: 38.907, lng: -77.037 },
  { name: "Las Vegas", state: "Nevada", stateCode: "NV", slug: "las-vegas-nv", lat: 36.169, lng: -115.140 },
  { name: "Tucson", state: "Arizona", stateCode: "AZ", slug: "tucson-az", lat: 32.222, lng: -110.975 },
  { name: "Mesa", state: "Arizona", stateCode: "AZ", slug: "mesa-az", lat: 33.415, lng: -111.831 },
  { name: "Boise", state: "Idaho", stateCode: "ID", slug: "boise-id", lat: 43.615, lng: -116.202 },
  { name: "Jacksonville", state: "Florida", stateCode: "FL", slug: "jacksonville-fl", lat: 30.332, lng: -81.656 },
  { name: "San Francisco", state: "California", stateCode: "CA", slug: "san-francisco-ca", lat: 37.775, lng: -122.419 },
  { name: "Sacramento", state: "California", stateCode: "CA", slug: "sacramento-ca", lat: 38.582, lng: -121.494 },
  { name: "Sarasota", state: "Florida", stateCode: "FL", slug: "sarasota-fl", lat: 27.337, lng: -82.531 },
  { name: "Fort Lauderdale", state: "Florida", stateCode: "FL", slug: "fort-lauderdale-fl", lat: 26.122, lng: -80.137 },
  { name: "St. Petersburg", state: "Florida", stateCode: "FL", slug: "st-petersburg-fl", lat: 27.771, lng: -82.679 },
  { name: "Bend", state: "Oregon", stateCode: "OR", slug: "bend-or", lat: 44.058, lng: -121.315 },
  { name: "Chandler", state: "Arizona", stateCode: "AZ", slug: "chandler-az", lat: 33.303, lng: -111.841 },
  { name: "Gilbert", state: "Arizona", stateCode: "AZ", slug: "gilbert-az", lat: 33.353, lng: -111.789 },
  { name: "Omaha", state: "Nebraska", stateCode: "NE", slug: "omaha-ne", lat: 41.257, lng: -95.995 },
  { name: "Kansas City", state: "Missouri", stateCode: "MO", slug: "kansas-city-mo", lat: 39.100, lng: -94.579 },
  { name: "Columbus", state: "Ohio", stateCode: "OH", slug: "columbus-oh", lat: 39.962, lng: -83.001 },
  { name: "Indianapolis", state: "Indiana", stateCode: "IN", slug: "indianapolis-in", lat: 39.768, lng: -86.158 },
  { name: "St. Louis", state: "Missouri", stateCode: "MO", slug: "st-louis-mo", lat: 38.627, lng: -90.199 },
  { name: "Honolulu", state: "Hawaii", stateCode: "HI", slug: "honolulu-hi", lat: 21.307, lng: -157.858 },
  { name: "Palm Springs", state: "California", stateCode: "CA", slug: "palm-springs-ca", lat: 33.830, lng: -116.545 },
  { name: "Charleston", state: "South Carolina", stateCode: "SC", slug: "charleston-sc", lat: 32.777, lng: -79.932 },
];

export const popularCities = cities.slice(0, 12);

export function getCityBySlug(slug: string): City | undefined {
  return cities.find(c => c.slug === slug);
}

export const states = [
  "Florida", "California", "Arizona", "Texas", "Colorado", 
  "Washington", "Oregon", "North Carolina", "Georgia", "Tennessee",
  "New York", "Massachusetts", "Pennsylvania", "Ohio", "Illinois",
  "Minnesota", "Indiana", "Missouri", "Nevada", "South Carolina"
];
