import type { Metadata } from "next";
import { Outfit, DM_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import ClaimBanner from "@/components/ClaimBanner";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const gaId = process.env.NEXT_PUBLIC_GA_ID;
const gaActive = gaId && gaId !== "G-PLACEHOLDER" && gaId.startsWith("G-");

export const metadata: Metadata = {
  title: "Find Pickleball Courts Near You | Pickleball Court Guide",
  description: "Find the best pickleball courts near you. Search by city, browse ratings, hours, and photos. The most comprehensive pickleball court directory for 2026.",
  openGraph: {
    title: "Find Pickleball Courts Near You | Pickleball Court Guide",
    description: "The most comprehensive pickleball court directory. Find courts, read reviews, and play.",
    siteName: "Pickleball Court Guide",
    type: "website",
  },
  robots: { index: true, follow: true },
  verification: {
    google: "1SH3Xw8_2IoV5b5Ddzb3anKr2cBjvVhVRcZ3ERNDsTY",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Pickleball Court Guide",
    url: "https://pickleballcourtguide.com",
    description: "Find the best pickleball courts near you. Search by city, browse ratings, hours, and photos.",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://pickleballcourtguide.com/pickleball-courts/{search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Pickleball Court Guide",
    url: "https://pickleballcourtguide.com",
    logo: "https://pickleballcourtguide.com/favicon.ico",
    sameAs: [],
  };

  return (
    <html lang="en" className={`${outfit.variable} ${dmSans.variable}`}>
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        {/* Google AdSense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4031967121151682"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className={`${dmSans.className} antialiased`}>
        <Header />
        <ClaimBanner />
        <main className="min-h-screen">{children}</main>
        <Footer />

        {/* Google Analytics 4 */}
        {gaActive && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}', { page_path: window.location.pathname });
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
