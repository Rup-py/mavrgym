import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Use — MAVR" },
      { name: "description", content: "Terms governing your use of the MAVR athlete operating system." },
      { property: "og:title", content: "Terms of Use — MAVR" },
      { property: "og:description", content: "Terms governing your use of the MAVR athlete operating system." },
    ],
    links: [{ rel: "canonical", href: "https://mavr.in/terms" }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <main className="bg-[#0A0A0A] text-white min-h-screen px-6 py-24">
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="text-[#CC0000] text-sm font-mono">← BACK</Link>
        <h1 className="font-display text-4xl md:text-6xl mt-6 mb-8">Terms of Use</h1>
        <div className="space-y-6 text-[#cccccc] text-[15px] leading-relaxed">
          <p>By accessing or using MAVR you agree to these Terms. If you do not agree, do not use the service.</p>
          <h2 className="font-display text-2xl text-white pt-4">Eligibility</h2>
          <p>You must be 16 or older, or have parental consent, to create a MAVR account.</p>
          <h2 className="font-display text-2xl text-white pt-4">Your Account</h2>
          <p>You are responsible for activity under your account and for keeping your credentials secure.</p>
          <h2 className="font-display text-2xl text-white pt-4">Acceptable Use</h2>
          <p>No harassment, no impersonation, no illegal content, no reverse engineering. We may suspend accounts that violate these rules.</p>
          <h2 className="font-display text-2xl text-white pt-4">Subscriptions</h2>
          <p>MAVR Pro is billed in advance and renews automatically until cancelled. Apparel product codes grant 6 months of Pro at the time of redemption.</p>
          <h2 className="font-display text-2xl text-white pt-4">Disclaimer</h2>
          <p>MAVR is not medical advice. Consult a qualified professional before starting any training or nutrition programme.</p>
          <h2 className="font-display text-2xl text-white pt-4">Contact</h2>
          <p>hello@mavr.in</p>
        </div>
      </div>
    </main>
  );
}
