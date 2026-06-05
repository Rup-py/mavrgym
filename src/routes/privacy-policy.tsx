import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — MAVR" },
      { name: "description", content: "How MAVR collects, uses, and protects athlete data. Compliant with India's DPDP Act 2023." },
      { property: "og:title", content: "Privacy Policy — MAVR" },
      { property: "og:description", content: "How MAVR collects, uses, and protects athlete data. Compliant with India's DPDP Act 2023." },
    ],
    links: [{ rel: "canonical", href: "https://mavr.in/privacy-policy" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <main className="bg-[#0A0A0A] text-white min-h-screen px-6 py-24">
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="text-[#CC0000] text-sm font-mono">← BACK</Link>
        <h1 className="font-display text-4xl md:text-6xl mt-6 mb-8">Privacy Policy</h1>
        <div className="space-y-6 text-[#cccccc] text-[15px] leading-relaxed">
          <p>Last updated: 2025. MAVR Technologies Pvt. Ltd. ("MAVR", "we", "us") is committed to protecting your privacy and complying with India's Digital Personal Data Protection Act, 2023.</p>
          <h2 className="font-display text-2xl text-white pt-4">Information We Collect</h2>
          <p>Account details (name, email, phone), training logs, nutrition data, device identifiers, and information you choose to share through your MAVR ID profile.</p>
          <h2 className="font-display text-2xl text-white pt-4">How We Use It</h2>
          <p>To operate the app, sync your data across devices, personalise workouts and nutrition, connect you with trainers and partners, and improve the platform. We do not sell your data.</p>
          <h2 className="font-display text-2xl text-white pt-4">Security</h2>
          <p>All chat messages use AES-256 encryption. Data is stored on secured servers with access controls and audit logs.</p>
          <h2 className="font-display text-2xl text-white pt-4">Your Rights</h2>
          <p>You can access, correct, export, or delete your data at any time from the app, or by emailing hello@mavr.in.</p>
          <h2 className="font-display text-2xl text-white pt-4">Contact</h2>
          <p>hello@mavr.in</p>
        </div>
      </div>
    </main>
  );
}
