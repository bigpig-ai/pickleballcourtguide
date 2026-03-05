export const metadata = {
  title: "Contact | Pickleball Court Guide",
  description: "Contact Pickleball Court Guide.",
};

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 prose prose-emerald">
      <h1>Contact</h1>
      <p>
        Have a question, found an issue with a court listing, or want to advertise? Email us and we'll get back to you.
      </p>
      <ul>
        <li>Email: support@pickleballcourtguide.com</li>
        <li>Advertising & Listings: advertise@pickleballcourtguide.com</li>
      </ul>
      <p>
        If you're a court owner or facility manager, you can <a href="/claim">claim your listing</a> to manage details, add photos, and feature your venue.
      </p>
    </div>
  );
}
