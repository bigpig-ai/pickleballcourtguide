export const metadata = {
  title: "Affiliate Disclosure | Pickleball Court Guide",
  description: "Affiliate disclosure for Pickleball Court Guide.",
};

export default function AffiliateDisclosurePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 prose prose-emerald">
      <h1>Affiliate Disclosure</h1>
      <p>Last updated: {new Date().toLocaleDateString()}</p>

      <p>
        Some links on Pickleball Court Guide are affiliate links. If you click an affiliate link and make a purchase, we may earn a commission at no additional cost to you. This helps support our work creating guides and maintaining our court directory.
      </p>

      <h2>Amazon Associates Program</h2>
      <p>
        Pickleball Court Guide is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn fees by linking to Amazon.com and affiliated sites.
        As an Amazon Associate, we earn from qualifying purchases.
      </p>

      <h2>Editorial Independence</h2>
      <p>
        Our product recommendations are based on research and hands-on testing when possible. Affiliate relationships do not influence the products we cover or our opinions.
      </p>

      <h2>Questions</h2>
      <p>
        If you have any questions about this disclosure, contact us at support@pickleballcourtguide.com.
      </p>
    </div>
  );
}
