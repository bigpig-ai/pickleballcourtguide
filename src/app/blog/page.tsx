import { Metadata } from "next";
import Link from "next/link";
import { states } from "@/data/cities";
import { blogPosts } from "@/data/blog-posts";

export const metadata: Metadata = {
  title: "Pickleball Blog: Guides, Equipment Reviews & Court Tips | Pickleball Court Guide",
  description:
    "Expert pickleball guides covering equipment reviews, rules, tips for beginners, and court-finding resources. State-by-state court directories for all 50 states.",
};

const categoryLabels: Record<string, string> = {
  equipment: "Equipment",
  rules: "Rules",
  tips: "Tips & Strategy",
  guide: "Guide",
};

const categoryColors: Record<string, string> = {
  equipment: "bg-emerald-100 text-emerald-800",
  rules: "bg-blue-100 text-blue-800",
  tips: "bg-orange-100 text-orange-800",
  guide: "bg-purple-100 text-purple-800",
};

export default function BlogPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Featured Posts */}
      <section>
        <h1 className="text-3xl md:text-4xl font-bold">Pickleball Blog</h1>
        <p className="text-gray-500 mt-2 text-lg">
          Equipment reviews, rules explained, and expert tips for every level
        </p>

        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="border rounded-xl p-6 hover:shadow-lg hover:border-emerald-200 transition-all group flex flex-col"
            >
              <div className="flex items-center gap-2 mb-3">
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full ${
                    categoryColors[post.category] || "bg-gray-100 text-gray-700"
                  }`}
                >
                  {categoryLabels[post.category] || post.category}
                </span>
                <span className="text-xs text-gray-400">{post.readingTime}</span>
              </div>
              <h2 className="text-lg font-semibold group-hover:text-emerald-600 transition-colors leading-snug">
                {post.title}
              </h2>
              <p className="text-sm text-gray-500 mt-2 flex-1 line-clamp-3">
                {post.description}
              </p>
              <span className="text-sm text-emerald-600 mt-4 font-medium group-hover:underline">
                Read guide →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* State Guides Section */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold">Pickleball Court Guides by State</h2>
        <p className="text-gray-500 mt-1">
          State-by-state directories with every court, club, and facility
        </p>
        <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {states.map((state) => {
            const slug = `best-pickleball-courts-${state.toLowerCase().replace(/\s+/g, "-")}`;
            return (
              <Link
                key={state}
                href={`/blog/${slug}`}
                className="border rounded-xl p-5 hover:shadow-md hover:border-emerald-200 transition-all group"
              >
                <h3 className="text-base font-semibold group-hover:text-emerald-600 transition-colors">
                  Best Pickleball Courts in {state}
                </h3>
                <p className="text-sm text-gray-500 mt-1">2026 Complete Guide</p>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
