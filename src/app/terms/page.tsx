export const metadata = {
  title: "Terms of Service | Pickleball Court Guide",
  description: "Terms of Service for Pickleball Court Guide.",
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 prose prose-emerald">
      <h1>Terms of Service</h1>
      <p>Last updated: {new Date().toLocaleDateString()}</p>

      <h2>1. Acceptance of Terms</h2>
      <p>
        By accessing or using https://pickleballcourtguide.com (the "Site"), you agree to be bound by these Terms. If you do not agree, do not use the Site.
      </p>

      <h2>2. Use of the Site</h2>
      <ul>
        <li>You may use the Site only for lawful purposes and in accordance with these Terms.</li>
        <li>We may modify, suspend, or discontinue any part of the Site at any time without notice.</li>
      </ul>

      <h2>3. Content</h2>
      <p>
        The Site provides informational content about pickleball courts, equipment, and related topics. We strive for accuracy but do not warrant that content is complete, current, or error-free. Use at your own risk.
      </p>

      <h2>4. Affiliate Links and Advertising</h2>
      <p>
        We include affiliate links and display ads. As an Amazon Associate, we earn from qualifying purchases. Advertisers and affiliate partners are responsible for their own offers and sites.
      </p>

      <h2>5. Third-Party Links</h2>
      <p>
        The Site may contain links to third-party websites. We are not responsible for the content, policies, or practices of any third-party sites or services.
      </p>

      <h2>6. Payments</h2>
      <p>
        If you purchase a listing or subscription (e.g., claim a court), payments are processed by Stripe. You agree to Stripe's terms and our refund/cancellation policies displayed at checkout.
      </p>

      <h2>7. Intellectual Property</h2>
      <p>
        All Site content, trademarks, and design are owned by Pickleball Court Guide or its licensors. You may not copy, modify, distribute, or create derivative works without permission, except as permitted by law.
      </p>

      <h2>8. Disclaimers</h2>
      <p>
        THE SITE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND. WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
      </p>

      <h2>9. Limitation of Liability</h2>
      <p>
        TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES.
      </p>

      <h2>10. Changes</h2>
      <p>
        We may update these Terms from time to time. Continued use of the Site after changes constitutes acceptance of the new Terms.
      </p>

      <h2>11. Contact</h2>
      <p>Questions? Email: support@pickleballcourtguide.com</p>
    </div>
  );
}
