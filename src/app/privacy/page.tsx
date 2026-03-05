export const metadata = {
  title: "Privacy Policy | Pickleball Court Guide",
  description: "Privacy policy for Pickleball Court Guide. Learn what data we collect, how we use it, and your choices.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 prose prose-emerald">
      <h1>Privacy Policy</h1>
      <p>Last updated: {new Date().toLocaleDateString()}</p>

      <p>
        Pickleball Court Guide ("we", "us", or "our") operates https://pickleballcourtguide.com (the "Site"). This page informs you of our
        policies regarding the collection, use, and disclosure of personal information when you use our Site and the choices you have associated with that data.
      </p>

      <h2>Information We Collect</h2>
      <ul>
        <li>
          Usage data: pages visited, links clicked, time on site, and device/browser info (via Google Analytics/GA4).
        </li>
        <li>
          Contact data: if you submit a form (e.g., advertise/claim a listing), we collect your name, email, and any message you provide.
        </li>
        <li>
          Cookies: we use cookies and similar technologies to measure usage and improve our Site. Ad partners (e.g., Google AdSense) may also set cookies to serve personalized or non-personalized ads.
        </li>
      </ul>

      <h2>How We Use Information</h2>
      <ul>
        <li>Operate, maintain, and improve the Site and our content</li>
        <li>Measure performance and understand how visitors use the Site</li>
        <li>Respond to inquiries and provide customer support</li>
        <li>Show advertisements and affiliate product links</li>
      </ul>

      <h2>Advertising and Affiliates</h2>
      <p>
        We display ads via Google AdSense and include affiliate links (e.g., Amazon). As an Amazon Associate, we earn from qualifying purchases.
        These partners may use cookies or similar technologies to measure performance and personalize content. You can manage ad personalization in your Google account.
      </p>

      <h2>Cookies</h2>
      <p>
        You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. Some parts of the Site may not function properly if you disable cookies.
      </p>

      <h2>Data Retention</h2>
      <p>
        We retain analytics data in accordance with our analytics provider defaults (e.g., Google Analytics standard retention) and retain contact submissions as long as necessary to fulfill your request.
      </p>

      <h2>Third-Party Services</h2>
      <ul>
        <li>Google Analytics (GA4) for usage analytics</li>
        <li>Google AdSense for advertising</li>
        <li>Stripe for payment processing on claim/checkout pages (we do not store card details)</li>
      </ul>

      <h2>Your Choices</h2>
      <ul>
        <li>Opt out of Google Analytics via browser add-on</li>
        <li>Manage Google ad personalization in your Google account</li>
        <li>Contact us to request deletion of contact submissions you have sent</li>
      </ul>

      <h2>Children's Privacy</h2>
      <p>
        Our Site is not directed to children under 13. We do not knowingly collect personal information from children under 13.
      </p>

      <h2>Changes</h2>
      <p>
        We may update this policy from time to time. We will post the new policy on this page with the updated date.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy? Email: support@pickleballcourtguide.com
      </p>
    </div>
  );
}
