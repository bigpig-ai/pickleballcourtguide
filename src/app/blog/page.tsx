import { Metadata } from "next";
import Link from "next/link";
import { states } from "@/data/cities";

export const metadata: Metadata = {
  title: "Pickleball Court Guides by State | Pickleball Court Guide",
  description: "Browse our comprehensive pickleball court guides for every state. Find the best courts, clubs, and facilities near you.",
};

export default function BlogPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold">Pickleball Court Guides</h1>
      <p className="text-gray-500 mt-2 text-lg">State-by-state guides to the best pickleball courts in America</p>

      <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {states.map((state) => {
          const slug = `best-pickleball-courts-${state.toLowerCase().replace(/\s+/g, "-")}`;
          return (
            <Link
              key={state}
              href={`/blog/${slug}`}
              className="border rounded-xl p-6 hover:shadow-lg hover:border-emerald-200 transition-all group"
            >
              <h2 className="text-lg font-semibold group-hover:text-emerald-600 transition-colors">
                Best Pickleball Courts in {state}
              </h2>
              <p className="text-sm text-gray-500 mt-1">2026 Complete Guide</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
