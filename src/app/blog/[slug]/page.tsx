import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { states, cities } from "@/data/cities";
import { AdSlot } from "@/components/AdSlot";
import { getTopProducts } from "@/data/affiliate-products";
import { ProductCard } from "@/components/ProductCard";
import { getBlogPost, getBlogPostSlugs } from "@/data/blog-posts";
import { RelatedPosts } from "@/components/RelatedPosts";
import { ShareButtons } from "@/components/ShareButtons";
import { BookOpen, ArrowRight, ChevronDown } from "lucide-react";

type Props = { params: Promise<{ slug: string }> };

const stateGuides = states.map((state) => ({
  state,
  slug: `best-pickleball-courts-${state.toLowerCase().replace(/\s+/g, "-")}`,
  cities: cities.filter((c) => c.state === state),
}));

export function generateStaticParams() {
  const stateParams = stateGuides.map((g) => ({ slug: g.slug }));
  const blogParams = getBlogPostSlugs().map((slug) => ({ slug }));
  return [...stateParams, ...blogParams];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = stateGuides.find((g) => g.slug === slug);
  if (guide) {
    return {
      title: `Best Pickleball Courts in ${guide.state} | 2026 Guide`,
      description: `Complete guide to the best pickleball courts in ${guide.state}. Find courts in ${guide.cities.map((c) => c.name).join(", ")} and more.`,
      openGraph: {
        title: `Best Pickleball Courts in ${guide.state} | 2026 Guide`,
        description: `Complete guide to the best pickleball courts in ${guide.state}.`,
        url: `https://pickleballcourtguide.com/blog/${slug}`,
        type: "article",
        images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: `Pickleball Courts in ${guide.state}` }],
      },
      twitter: {
        card: "summary_large_image",
        title: `Best Pickleball Courts in ${guide.state} | 2026 Guide`,
        description: `Complete guide to the best pickleball courts in ${guide.state}.`,
        images: ["/opengraph-image"],
      },
    };
  }
  const post = getBlogPost(slug);
  if (post) {
    return {
      title: `${post.title} | Pickleball Court Guide`,
      description: post.description,
      openGraph: {
        title: post.title,
        description: post.description,
        url: `https://pickleballcourtguide.com/blog/${slug}`,
        type: "article",
        images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: post.title }],
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: post.description,
        images: ["/opengraph-image"],
      },
    };
  }
  return {};
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const guide = stateGuides.find((g) => g.slug === slug);
  const blogPost = !guide ? getBlogPost(slug) : null;
  if (!guide && !blogPost) notFound();

  // Blog post rendering
  if (blogPost) {
    const breadcrumbJsonLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://pickleballcourtguide.com" },
        { "@type": "ListItem", position: 2, name: "Blog", item: "https://pickleballcourtguide.com/blog" },
        { "@type": "ListItem", position: 3, name: blogPost.title, item: `https://pickleballcourtguide.com/blog/${slug}` },
      ],
    };

    const blogPostJsonLd = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: blogPost.title,
      description: blogPost.description,
      datePublished: blogPost.publishedDate,
      dateModified: blogPost.publishedDate,
      author: {
        "@type": "Organization",
        name: "Pickleball Court Guide",
        url: "https://pickleballcourtguide.com",
      },
      publisher: {
        "@type": "Organization",
        name: "Pickleball Court Guide",
        url: "https://pickleballcourtguide.com",
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `https://pickleballcourtguide.com/blog/${slug}`,
      },
      articleSection: blogPost.category.charAt(0).toUpperCase() + blogPost.category.slice(1),
    };

    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostJsonLd) }}
        />
        {blogPost.faqs && blogPost.faqs.length > 0 && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: blogPost.faqs.map((faq) => ({
                  "@type": "Question",
                  name: faq.question,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: faq.answer,
                  },
                })),
              }),
            }}
          />
        )}
        <section className="relative hero-mesh text-white overflow-hidden">
          <div className="absolute inset-0 hero-pattern" />
          <div className="relative max-w-4xl mx-auto px-4 py-14 md:py-18">
            <div className="flex items-center gap-2 text-sm text-emerald-200/60 mb-4">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
              <span>/</span>
              <span className="text-emerald-100">{blogPost.title}</span>
            </div>
            <span className="inline-block text-xs font-bold px-2.5 py-1 rounded-full bg-white/10 text-emerald-200 mb-3">
              {blogPost.category.charAt(0).toUpperCase() + blogPost.category.slice(1)}
            </span>
            <h1 className="text-3xl md:text-4xl font-[var(--font-outfit)] font-black leading-tight">
              {blogPost.title}
            </h1>
            <p className="text-emerald-200/70 mt-3 text-sm">
              {blogPost.publishedDate} &bull; {blogPost.readingTime}
            </p>
            <div className="mt-4">
              <ShareButtons
                url={`https://pickleballcourtguide.com/blog/${slug}`}
                title={blogPost.title}
              />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[var(--background)] to-transparent" />
        </section>

        <article className="max-w-4xl mx-auto px-4 py-10">
          <AdSlot slot="blog-top" className="mb-8 h-24" />
          <div className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8">
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: blogPost.content }}
            />
          </div>
          {blogPost.faqs && blogPost.faqs.length > 0 && (
            <div className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 mt-6">
              <h2 className="text-xl font-[var(--font-outfit)] font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <div className="divide-y divide-gray-100">
                {blogPost.faqs.map((faq, i) => (
                  <details key={i} className="group py-4 first:pt-0 last:pb-0">
                    <summary className="flex items-center justify-between cursor-pointer list-none font-semibold text-gray-800 text-sm leading-relaxed">
                      {faq.question}
                      <ChevronDown className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0 ml-4" />
                    </summary>
                    <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          )}

          <AdSlot slot="blog-bottom" className="mt-8 h-24" />

          <RelatedPosts currentSlug={slug} category={blogPost.category} />

          <div className="mt-10 border-t pt-10">
            <div className="flex items-end justify-between mb-6">
              <div>
                <h2 className="text-xl font-[var(--font-outfit)] font-bold text-gray-900">
                  Recommended Gear
                </h2>
                <p className="text-sm text-gray-500 mt-0.5">
                  Top-rated pickleball equipment to up your game.
                </p>
              </div>
              <Link
                href="/gear"
                className="hidden sm:flex items-center gap-1 text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
              >
                All gear
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {getTopProducts(3).map((product, i) => (
                <div key={product.name} className={`animate-fade-in-up stagger-${i + 1}`}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-4">
              As an Amazon Associate, we earn from qualifying purchases.
            </p>
          </div>
        </article>
      </>
    );
  }

  // State guide rendering (guide is guaranteed non-null here)
  const stateGuide = guide!;
  return (
    <>
      {/* Article Hero */}
      <section className="relative hero-mesh text-white overflow-hidden">
        <div className="absolute inset-0 hero-pattern" />
        <div className="relative max-w-4xl mx-auto px-4 py-14 md:py-18">
          <div className="flex items-center gap-2 text-sm text-emerald-200/60 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-emerald-100">{stateGuide.state}</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-[var(--font-outfit)] font-black leading-tight">
            Best Pickleball Courts in {stateGuide.state}
          </h1>
          <p className="text-emerald-200/70 mt-3 text-sm">Updated for 2026 &bull; Complete Directory</p>
          <div className="mt-4">
            <ShareButtons
              url={`https://pickleballcourtguide.com/blog/${slug}`}
              title={`Best Pickleball Courts in ${stateGuide.state}`}
            />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[var(--background)] to-transparent" />
      </section>

      <article className="max-w-4xl mx-auto px-4 py-10">
        <AdSlot slot="blog-top" className="mb-8 h-24" />

        <div className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8">
          <div className="prose max-w-none">
            <p>
              {stateGuide.state} is one of the top states for pickleball in the US, with a growing number of
              dedicated courts, recreation centers, and pickleball clubs. Whether you&apos;re a beginner
              or a tournament player, you&apos;ll find plenty of options across the state.
            </p>

            <h2>Top Cities for Pickleball in {stateGuide.state}</h2>

            {stateGuide.cities.length > 0 ? (
              <>
                {stateGuide.cities.map((city) => (
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
              <p>We&apos;re expanding our coverage in {stateGuide.state}. Check back soon for court listings.</p>
            )}

            <AdSlot slot="blog-mid" className="my-6 h-24" />

            <h2>Tips for Playing Pickleball in {stateGuide.state}</h2>
            <ul>
              <li>Check local parks and recreation departments for free public courts</li>
              <li>Many YMCAs and community centers offer indoor pickleball during winter months</li>
              <li>Join local pickleball Facebook groups to find pickup games and tournaments</li>
              <li>Consider visiting during off-peak hours (early morning or weekday afternoons) for the best court availability</li>
            </ul>

            <h2>Finding More Courts</h2>
            <p>
              Use our <Link href="/" className="text-emerald-600 hover:underline">court finder</Link> to
              search for pickleball courts in any city across {stateGuide.state}. We pull data from Google Maps
              to give you the most up-to-date information on ratings, hours, and directions.
            </p>
          </div>
        </div>

        <AdSlot slot="blog-bottom" className="mt-8 h-24" />

        {/* Recommended Gear */}
        <div className="mt-10 border-t pt-10">
          <div className="flex items-end justify-between mb-6">
            <div>
              <h2 className="text-xl font-[var(--font-outfit)] font-bold text-gray-900">
                Recommended Gear
              </h2>
              <p className="text-sm text-gray-500 mt-0.5">
                Top-rated pickleball equipment to up your game.
              </p>
            </div>
            <Link
              href="/gear"
              className="hidden sm:flex items-center gap-1 text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
            >
              All gear
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {getTopProducts(3).map((product, i) => (
              <div key={product.name} className={`animate-fade-in-up stagger-${i + 1}`}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-4">
            As an Amazon Associate, we earn from qualifying purchases.
          </p>
        </div>
      </article>
    </>
  );
}
