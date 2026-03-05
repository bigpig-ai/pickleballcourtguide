import Link from "next/link";
import { BlogPost, blogPosts } from "@/data/blog-posts";
import { BookOpen } from "lucide-react";

function getRelatedPosts(currentSlug: string, category: string, count = 3): BlogPost[] {
  const others = blogPosts.filter((p) => p.slug !== currentSlug);
  const sameCategory = others.filter((p) => p.category === category);
  const diffCategory = others.filter((p) => p.category !== category);

  const result: BlogPost[] = [];
  // Pick from same category first
  for (const post of sameCategory) {
    if (result.length >= count) break;
    result.push(post);
  }
  // Fill remaining from other categories
  for (const post of diffCategory) {
    if (result.length >= count) break;
    result.push(post);
  }
  return result;
}

export function RelatedPosts({ currentSlug, category }: { currentSlug: string; category: string }) {
  const related = getRelatedPosts(currentSlug, category);
  if (related.length === 0) return null;

  const categoryColors: Record<string, string> = {
    equipment: "bg-emerald-50 text-emerald-700 border-emerald-200",
    rules: "bg-amber-50 text-amber-700 border-amber-200",
    tips: "bg-blue-50 text-blue-700 border-blue-200",
    guide: "bg-purple-50 text-purple-700 border-purple-200",
  };

  return (
    <div className="mt-10 border-t pt-10">
      <div className="mb-6">
        <h2 className="text-xl font-[var(--font-outfit)] font-bold text-gray-900">
          Related Posts
        </h2>
        <p className="text-sm text-gray-500 mt-0.5">
          Keep reading about pickleball tips, gear, and strategy.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {related.map((post, i) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className={`card-hover bg-white border border-gray-100 rounded-2xl p-5 flex flex-col animate-fade-in-up stagger-${i + 1}`}
          >
            <span
              className={`self-start text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border mb-3 ${categoryColors[post.category] || "bg-gray-50 text-gray-600 border-gray-200"}`}
            >
              {post.category}
            </span>
            <h3 className="font-[var(--font-outfit)] font-bold text-gray-900 text-base leading-tight flex-1">
              {post.title}
            </h3>
            <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-3">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{post.readingTime}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
