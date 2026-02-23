import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

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
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
