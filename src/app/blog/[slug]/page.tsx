import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { states, cities } from "@/data/cities";
import { AdSlot } from "@/components/AdSlot";

type Props = { params: Promise<{ slug: string }> };

const stateGuides = states.map((state) => ({
  state,
  slug: `best-pickleball-courts-${state.toLowerCase().replace(/\s+/g, "-")}`,
  cities: cities.filter((c) => c.state === state),
}));

export function generateStaticParams() {
  return stateGuides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = stateGuides.find((g) => g.slug === slug);
  if (!guide) return {};
  return {
    title: `Best Pickleball Courts in ${guide.state} | 2026 Guide`,
    description: `Complete guide to the best pickleball courts in ${guide.state}. Find courts in ${guide.cities.map((c) => c.name).join(", ")} and more.`,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const guide = stateGuides.find((g) => g.slug === slug);
  if (!guide) notFound();

  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      <Link href="/blog" className="text-sm text-gray-500 hover:text-emerald-600">← All Guides</Link>

      <h1 className="text-3xl md:text-4xl font-bold mt-4">
        Best Pickleball Courts in {guide.state}
      </h1>
      <p className="text-gray-500 mt-2">Updated for 2026 • Complete Directory</p>

      <AdSlot slot="blog-top" className="mt-6 h-24" />

      <div className="prose max-w-none mt-8">
        <p>
          {guide.state} is one of the top states for pickleball in the US, with a growing number of
          dedicated courts, recreation centers, and pickleball clubs. Whether you&apos;re a beginner
          or a tournament player, you&apos;ll find plenty of options across the state.
        </p>

        <h2>Top Cities for Pickleball in {guide.state}</h2>

        {guide.cities.length > 0 ? (
          <>
            {guide.cities.map((city) => (
              <div key={city.slug}>
                <h3>
                  <Link href={`/pickleball-courts/${city.slug}`} className="text-emerald-600 hover:underline">
                    {city.name}, {city.stateCode}
                  </Link>
                </h3>
                <p>
                  {city.name} offers a variety of pickleball courts for all skill levels.
                  Browse all courts and facilities in{" "}
                  <Link href={`/pickleball-courts/${city.slug}`} className="text-emerald-600 hover:underline">
                    {city.name}
                  </Link>
                  .
                </p>
              </div>
            ))}
          </>
        ) : (
          <p>We&apos;re expanding our coverage in {guide.state}. Check back soon for court listings.</p>
        )}

        <AdSlot slot="blog-mid" className="my-6 h-24" />

        <h2>Tips for Playing Pickleball in {guide.state}</h2>
        <ul>
          <li>Check local parks and recreation departments for free public courts</li>
          <li>Many YMCAs and community centers offer indoor pickleball during winter months</li>
          <li>Join local pickleball Facebook groups to find pickup games and tournaments</li>
          <li>Consider visiting during off-peak hours (early morning or weekday afternoons) for the best court availability</li>
        </ul>

        <h2>Finding More Courts</h2>
        <p>
          Use our <Link href="/" className="text-emerald-600 hover:underline">court finder</Link> to
          search for pickleball courts in any city across {guide.state}. We pull data from Google Maps
          to give you the most up-to-date information on ratings, hours, and directions.
        </p>
      </div>

      <AdSlot slot="blog-bottom" className="mt-8 h-24" />
    </article>
  );
}
