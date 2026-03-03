export interface AffiliateProduct {
  name: string;
  category: "paddle" | "ball" | "shoe" | "equipment";
  priceRange: string;
  rating: number;
  amazonUrl: string;
  description: string;
}

const TAG = "pickleballc09-20";

function amazonSearch(query: string) {
  return `https://www.amazon.com/s?k=${encodeURIComponent(query)}&tag=${TAG}`;
}

export const affiliateProducts: AffiliateProduct[] = [
  // Paddles
  {
    name: "JOOLA Ben Johns Hyperion CAS 16",
    category: "paddle",
    priceRange: "$199-249",
    rating: 4.7,
    amazonUrl: amazonSearch("JOOLA Ben Johns Hyperion CAS 16 pickleball paddle"),
    description: "The #1 selling pro paddle. Carbon Abrasion Surface for maximum spin.",
  },
  {
    name: "Selkirk Vanguard Power Air Invikta",
    category: "paddle",
    priceRange: "$179-219",
    rating: 4.6,
    amazonUrl: amazonSearch("Selkirk Vanguard Power Air Invikta pickleball"),
    description: "Tour-level paddle with air dynamic throat for faster swings.",
  },
  {
    name: "HEAD Radical Tour EX",
    category: "paddle",
    priceRange: "$149-189",
    rating: 4.5,
    amazonUrl: amazonSearch("HEAD Radical Tour EX pickleball paddle"),
    description: "Optimized Sweet Spot technology. Great for intermediate to advanced players.",
  },
  {
    name: "Engage Pursuit Pro MX 6.0",
    category: "paddle",
    priceRange: "$159-199",
    rating: 4.5,
    amazonUrl: amazonSearch("Engage Pursuit Pro MX pickleball paddle"),
    description: "Proprietary ControlPro technology for precision placement.",
  },
  {
    name: "CRBN-1X Power Series",
    category: "paddle",
    priceRange: "$199-229",
    rating: 4.7,
    amazonUrl: amazonSearch("CRBN 1X Power Series pickleball paddle"),
    description: "Raw carbon fiber face. Maximum power with surprising control.",
  },
  // Balls
  {
    name: "Franklin X-40 Outdoor Pickleballs (12-pack)",
    category: "ball",
    priceRange: "$22-30",
    rating: 4.5,
    amazonUrl: amazonSearch("Franklin X-40 outdoor pickleballs 12 pack"),
    description: "Official ball of USA Pickleball. Most popular outdoor ball.",
  },
  {
    name: "Onix Dura Fast 40 (12-pack)",
    category: "ball",
    priceRange: "$20-28",
    rating: 4.4,
    amazonUrl: amazonSearch("Onix Dura Fast 40 outdoor pickleballs"),
    description: "Tournament-grade outdoor ball. Consistent bounce and flight.",
  },
  {
    name: "Selkirk Pro S1 Balls (12-pack)",
    category: "ball",
    priceRange: "$24-32",
    rating: 4.3,
    amazonUrl: amazonSearch("Selkirk Pro S1 pickleballs"),
    description: "Premium construction for true flight. Used in pro tournaments.",
  },
  // Shoes
  {
    name: "Nike Court Air Zoom Vapor Pro 2",
    category: "shoe",
    priceRange: "$140-160",
    rating: 4.6,
    amazonUrl: amazonSearch("Nike Court Air Zoom Vapor Pro 2 pickleball court shoes"),
    description: "Lightweight with excellent lateral support. Top pick for competitive players.",
  },
  {
    name: "ASICS Gel-Renma Pickleball Shoe",
    category: "shoe",
    priceRange: "$80-100",
    rating: 4.5,
    amazonUrl: amazonSearch("ASICS Gel Renma pickleball shoe"),
    description: "Purpose-built for pickleball. GEL cushioning for all-day comfort.",
  },
  {
    name: "K-Swiss Express Light Pickleball",
    category: "shoe",
    priceRange: "$70-90",
    rating: 4.4,
    amazonUrl: amazonSearch("K-Swiss Express Light pickleball shoe"),
    description: "Budget-friendly with great court grip. Perfect for beginners.",
  },
  // Equipment
  {
    name: "Portable Pickleball Net System (Regulation)",
    category: "equipment",
    priceRange: "$99-149",
    rating: 4.5,
    amazonUrl: amazonSearch("portable pickleball net regulation size"),
    description: "Set up a court anywhere in minutes. Regulation 22ft width.",
  },
  {
    name: "Pickleball Ball Hopper (60 balls)",
    category: "equipment",
    priceRange: "$35-50",
    rating: 4.3,
    amazonUrl: amazonSearch("pickleball ball hopper holder"),
    description: "Pick up balls without bending. Holds 60+ balls.",
  },
];

export function getProductsByCategory(category: AffiliateProduct["category"]) {
  return affiliateProducts.filter((p) => p.category === category);
}

export function getTopProducts(count: number = 3) {
  return affiliateProducts.sort((a, b) => b.rating - a.rating).slice(0, count);
}
