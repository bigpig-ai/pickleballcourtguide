import { Metadata } from "next";
import Link from "next/link";
import { states } from "@/data/cities";
import { blogPosts } from "@/data/blog-posts";
import { BookOpen, ArrowRight } from "lucide-react";

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
  equipment: "bg-emerald-50 text-emerald-700 border-emerald-200",
  rules: "bg-blue-50 text-blue-700 border-blue-200",
  tips: "bg-amber-50 text-amber-700 border-amber-200",
  guide: "bg-purple-50 text-purple-700 border-purple-200",
};

export default function BlogPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative hero-mesh text-white overflow-hidden">
        <div className="absolute inset-0 hero-pattern" />
        <div className="relative max-w-7xl mx-auto px-4 py-14 md:py-20">
          <div className="flex items-center gap-2 text-sm text-emerald-200/60 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-emerald-100">Blog</span>
          </div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-amber-400" />
            </div>
            <h1 className="text-3xl md:text-4xl font-[var(--font-outfit)] font-black">
              Pickleball Blog
            </h1>
          </div>
          <p className="text-emerald-100/80 text-sm md:text-base max-w-lg">
            Equipment reviews, rules explained, and expert tips for every level
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[var(--background)] to-transparent" />
      </section>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Featured Posts */}
        <section>
          <h2 className="text-xl font-[var(--font-outfit)] font-bold text-gray-900 mb-6">
            Latest Guides
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {blogPosts.map((post, i) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className={`animate-fade-in-up stagger-${Math.min(i + 1, 8)} card-hover bg-white border border-gray-100 rounded-2xl p-6 flex flex-col group`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
                      categoryColors[post.category] || "bg-gray-50 text-gray-600 border-gray-200"
                    }`}
                  >
                    {categoryLabels[post.category] || post.category}
                  </span>
                  <span className="text-xs text-gray-400">{post.readingTime}</span>
                </div>
                <h3 className="font-[var(--font-outfit)] font-bold text-base text-gray-900 group-hover:text-emerald-600 transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-500 mt-2 flex-1 line-clamp-3 leading-relaxed">
                  {post.description}
                </p>
                <span className="flex items-center gap-1 text-sm text-emerald-600 mt-4 font-semibold group-hover:gap-2 transition-all">
                  Read guide
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* State Guides Section */}
        <section className="mt-16">
          <h2 className="text-xl font-[var(--font-outfit)] font-bold text-gray-900 mb-2">
            Court Guides by State
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            State-by-state directories with every court, club, and facility
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {states.map((state, i) => {
              const slug = `best-pickleball-courts-${state.toLowerCase().replace(/\s+/g, "-")}`;
              return (
                <Link
                  key={state}
                  href={`/blog/${slug}`}
                  className={`animate-fade-in-up stagger-${Math.min((i % 8) + 1, 8)} card-hover bg-white border border-gray-100 rounded-xl p-4 group flex items-center justify-between`}
                >
                  <div>
                    <h3 className="font-[var(--font-outfit)] font-bold text-sm text-gray-900 group-hover:text-emerald-600 transition-colors">
                      Best Courts in {state}
                    </h3>
                    <p className="text-xs text-gray-400 mt-0.5">2026 Complete Guide</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all shrink-0" />
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
}
