import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/refund-policy")({
  head: () => ({
    meta: [
      { title: "Refund Policy — MAVR" },
      { name: "description", content: "Refund and cancellation policy for MAVR Pro subscriptions and MAVR Compression apparel." },
      { property: "og:title", content: "Refund Policy — MAVR" },
      { property: "og:description", content: "Refund and cancellation policy for MAVR Pro subscriptions and MAVR Compression apparel." },
    ],
    links: [{ rel: "canonical", href: "https://mavr.in/refund-policy" }],
  }),
  component: RefundPage,
});

function RefundPage() {
  return (
    <main className="bg-[#0A0A0A] text-white min-h-screen px-6 py-24">
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="text-[#CC0000] text-sm font-mono">← BACK</Link>
        <h1 className="font-display text-4xl md:text-6xl mt-6 mb-8">Refund Policy</h1>
        <div className="space-y-6 text-[#cccccc] text-[15px] leading-relaxed">
          <h2 className="font-display text-2xl text-white pt-4">MAVR Pro Subscriptions</h2>
          <p>You can cancel anytime from the app. Cancellation stops future renewals. Paid subscription periods are non-refundable except where required by Indian consumer law.</p>
          <h2 className="font-display text-2xl text-white pt-4">MAVR Compression Apparel</h2>
          <p>Unworn, unwashed apparel with original tags can be returned within 7 days of delivery for a full refund of the product price. Return shipping is at the customer's cost unless the item was defective or incorrectly shipped.</p>
          <h2 className="font-display text-2xl text-white pt-4">Redeemed Product Codes</h2>
          <p>If an apparel product code has already been redeemed for 6 months of MAVR Pro, the cash refund will be reduced by the pro-rata value of any used subscription time.</p>
          <h2 className="font-display text-2xl text-white pt-4">How to Request a Refund</h2>
          <p>Email hello@mavr.in with your order ID. We respond within 48 hours.</p>
        </div>
      </div>
    </main>
  );
}
