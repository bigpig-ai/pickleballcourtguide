import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const lat = request.nextUrl.searchParams.get("lat");
  const lng = request.nextUrl.searchParams.get("lng");

  if (!lat || !lng) {
    return NextResponse.json({ error: "lat and lng required" }, { status: 400 });
  }

  const apiKey = process.env.GOOGLE_MAPS_PLATFORM_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "API key not configured" }, { status: 500 });
  }

  // Reverse geocode to get city
  const geoUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;
  const geoRes = await fetch(geoUrl);
  const geoData = await geoRes.json();

  let city = "nearby";
  let state = "";
  if (geoData.results?.[0]) {
    const components = geoData.results[0].address_components;
    const cityComp = components.find((c: { types: string[] }) => c.types.includes("locality"));
    const stateComp = components.find((c: { types: string[] }) => c.types.includes("administrative_area_level_1"));
    if (cityComp) city = cityComp.long_name;
    if (stateComp) state = stateComp.short_name;
  }

  const slug = `${city}-${state}`.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  return NextResponse.redirect(new URL(`/pickleball-courts/${slug}`, request.url));
}
