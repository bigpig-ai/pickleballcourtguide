import { AffiliateProduct } from "@/data/affiliate-products";
import { ExternalLink, Star } from "lucide-react";

export function ProductCard({ product }: { product: AffiliateProduct }) {
  const categoryEmoji = {
    paddle: "🏓",
    ball: "⚪",
    shoe: "👟",
    equipment: "🎒",
  };

  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-white">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">{categoryEmoji[product.category]}</span>
            <span className="text-xs font-medium uppercase text-gray-400">
              {product.category}
            </span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
          <p className="text-sm text-gray-600 mb-2">{product.description}</p>
          <div className="flex items-center gap-3 mb-3">
            <span className="font-bold text-emerald-600">{product.priceRange}</span>
            <span className="flex items-center gap-1 text-sm text-yellow-600">
              <Star className="w-3.5 h-3.5 fill-yellow-400 stroke-yellow-500" />
              {product.rating}
            </span>
          </div>
        </div>
      </div>
      <a
        href={product.amazonUrl}
        target="_blank"
        rel="nofollow noopener sponsored"
        className="inline-flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-emerald-700 transition-colors w-full justify-center"
      >
        Check Price on Amazon
        <ExternalLink className="w-3.5 h-3.5" />
      </a>
    </div>
  );
}

export function ProductGrid({ products }: { products: AffiliateProduct[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => (
        <ProductCard key={product.name} product={product} />
      ))}
    </div>
  );
}
