import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import logo from "@/assets/mavr-logo.png";
import {
  WaitlistForm, Ticker, ShareRow,
  Reveal, InvestorModal, CookieBanner, track,
} from "@/components/mavr/parts";
import { CinematicNavbar, CinematicHero } from "@/components/mavr/hero-cinematic";
import {
  ProblemSection, FoodSearchSection, CalculatorSection,
  LeaderboardSection, TrainerSection, BetaSection, FAQSection, PressSection,
} from "@/components/mavr/sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MAVR — India's First Athlete Operating System" },
      { name: "description", content: "India's athlete operating system — the fitness app Indian gym-goers have been waiting for. Track macros for dal, paneer, poha. Join 847+ athletes today." },
      { name: "keywords", content: "fitness app India, Indian food macro tracker, personal trainer app India, workout tracking app, athlete operating system" },
      { property: "og:title", content: "MAVR — India's First Athlete Operating System" },
      { property: "og:description", content: "India's athlete operating system — the fitness app Indian gym-goers have been waiting for." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://mavr.in" },
      { property: "og:image", content: "https://www.mavr.in/assets/og-banner.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "MAVR — India's First Athlete Operating System" },
      { name: "twitter:description", content: "India's athlete operating system — the fitness app Indian gym-goers have been waiting for." },
      { name: "twitter:image", content: "https://www.mavr.in/assets/og-banner.png" },
    ],
    links: [
      { rel: "canonical", href: "https://mavr.in" },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
    ],
  }),
  component: Index,
});

function Section({ id, children, alt = false, className = "" }: { id?: string; children: React.ReactNode; alt?: boolean; className?: string }) {
  return (
    <section id={id} className={`relative w-full ${alt ? "bg-[#050505]" : "bg-[#0A0A0A]"} py-24 md:py-32 px-6 ${className}`}>
      <div className="max-w-7xl mx-auto">{children}</div>
    </section>
  );
}

function Overline({ children }: { children: React.ReactNode }) { return <div className="overline mb-4">{children}</div>; }
function H2({ children }: { children: React.ReactNode }) { return <h2 className="font-display text-4xl md:text-6xl text-white leading-[0.95] mb-4">{children}</h2>; }

function Index() {
  const [investorOpen, setInvestorOpen] = useState(false);
  const scrollToWaitlist = () => document.getElementById("waitlist-final")?.scrollIntoView({ behavior: "smooth" });

  return (
    <main id="top" className="bg-[#0A0A0A] text-white overflow-x-hidden">
      <CinematicNavbar onJoin={scrollToWaitlist} />

      {/* HERO — Cinematic */}
      <CinematicHero />

      <Ticker />

      {/* SECTION 2 — WHAT IS MAVR */}
      {/* PROBLEM */}
      <ProblemSection />

      {/* SECTION 2 — WHAT IS MAVR */}
      <Section id="about">
        <Reveal><Overline>THE ECOSYSTEM</Overline></Reveal>
        <Reveal delay={100}><H2>One System. Three Pillars.</H2></Reveal>
        <Reveal delay={200}>
          <p className="text-[#888] max-w-2xl text-base md:text-lg mb-14">
            MAVR is not a fitness app. It is the infrastructure layer for the Indian athlete — connecting training, nutrition, coaching, and community into a single operating system.
          </p>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { t: "MAVR APP", b: "Free to download. Track every workout, every meal, every gym check-in. Earn achievements. Connect with training partners using your MAVR ID. Level up from Rookie to Legend.", tag: "FREE — ANDROID & iOS", icon: "M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm5 17h.01" },
            { t: "MAVR COMPRESSION", b: "Premium performance compression engineered for Indian body proportions and climate. Every garment ships with a product code that unlocks 6 months of MAVR Pro — worth ₹2,394 — completely free.", tag: "PRO ACCESS ₹2,394 VALUE — FREE WITH EVERY PURCHASE", icon: "M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z" },
            { t: "COACH CONNECT", b: "Trainers get a dedicated dashboard to assign workout plans, track diet charts, and monitor student streaks. Edit a student's plan and it updates in their app in under 500 milliseconds. Real-time. Always in sync.", tag: "FOR CERTIFIED AND INDEPENDENT TRAINERS", icon: "M3 3v18h18M7 14l4-4 4 4 5-5" },
          ].map((c, i) => (
            <Reveal key={c.t} delay={i * 150}>
              <div className="mavr-card mavr-card-top p-8 h-full flex flex-col hover:border-[#CC0000]/40 transition-colors">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#CC0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={c.icon} /></svg>
                <h3 className="font-display text-3xl mt-5 mb-3">{c.t}</h3>
                <p className="text-[#888] text-[15px] leading-relaxed flex-1">{c.b}</p>
                <div className="font-mono text-[11px] text-[#CC0000] mt-6 pt-4 border-t border-[#1A1A1A]">{c.tag}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* SECTION 3 — FEATURES */}
      <section id="ecosystem" className="relative w-full py-24 md:py-32 px-6 overflow-hidden bg-[#050505]">
        <video
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260429_182501_0216c2be-1b2f-40d3-8716-0d4f42e73b44.mp4"
          autoPlay muted loop playsInline preload="auto"
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-40"
        />
        <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-b from-[#050505] via-[#050505]/60 to-[#050505]" />
        <div className="absolute inset-0 z-[1] pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(5,5,5,0.85)_75%)]" />
        <div className="relative z-10 max-w-7xl mx-auto">
          <Reveal><Overline>THE PLATFORM</Overline></Reveal>
          <Reveal delay={100}><H2>Everything an Indian Athlete Actually Needs.</H2></Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
            {[
              ["DASHBOARD", "Live date, time, trainer tag, current streak, today's workout card, macro summary. Your entire athletic life visible in one glance."],
              ["WORKOUT TRACKING", "Log every set, every rep, every weight. Personal records detected automatically. Achievement unlocked the moment you break your own record."],
              ["INDIAN DIET TRACKING", "Dal makhani. Paneer bhurji. Poha. Buttermilk. A food database built for India — not a Western database with Indian items reluctantly added as an afterthought."],
              ["ACHIEVEMENTS & BADGES", "30+ achievements across Bronze, Silver, Gold, Platinum, and Diamond tiers. Every milestone triggers a fullscreen celebration. Because discipline deserves to feel like a win."],
              ["SUPERPOWERS", "Elite subscribers unlock Superpowers — XP Booster, Stealth Mode, Nutrition Oracle, Recovery Advisor, Iron Memory. Real competitive advantages, not cosmetic bonuses."],
              ["SMART WATCH SYNC", "Connect Apple Watch, WearOS, or Fitbit. Heart rate, calories, active minutes, and workout detection flow directly into your MAVR session in real time."],
              ["MAVR ID SOCIAL LAYER", "Every athlete gets a unique identity: MAVR_IronWolf2847. Send partner requests, chat, co-plan sessions, share workout activity. Instagram mechanics built for the gym."],
              ["REAL-TIME TRAINER EDIT", "A trainer edits your workout plan. You see it update live — no refresh, no reload, no delay. WebSocket sync in under 500ms. The future of coach-athlete communication."],
              ["PRIVACY AND SAFETY", "Granular privacy controls. Block and unblock any user. AES-256 encrypted chat. You decide who sees your workouts, your stats, your check-ins. Your data, your rules."],
            ].map(([t, b], i) => (
              <Reveal key={t} delay={(i % 3) * 100}>
                <div className="mavr-card p-6 h-full hover:border-[#CC0000]/50 hover:-translate-y-1 transition-all duration-300 group bg-[#0A0A0A]/70 backdrop-blur-md">
                  <div className="font-mono text-xs text-[#CC0000] mb-3">0{i + 1}</div>
                  <h3 className="font-display text-2xl mb-3 group-hover:text-[#CC0000] transition-colors">{t}</h3>
                  <p className="text-[#888] text-sm leading-relaxed">{b}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — MAVR ID */}
      <Section>
        <Reveal><Overline>YOUR IDENTITY</Overline></Reveal>
        <Reveal delay={100}><H2>Every Athlete Gets a MAVR ID.</H2></Reveal>
        <Reveal delay={200}>
          <p className="text-[#888] max-w-2xl text-lg mb-14">
            Auto-generated on signup. Find training partners, send partner requests, co-plan sessions, and chat — all inside the app. Your MAVR ID is your athlete identity. It cannot be bought. Only earned.
          </p>
        </Reveal>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div className="relative md:rotate-[3deg] mx-auto max-w-sm" style={{ boxShadow: "0 0 40px rgba(204,0,0,0.15)" }}>
              <div className="glow-ring" />
              <div className="mavr-card p-6 relative">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-[#CC0000] grid place-items-center text-white font-display text-2xl">TR</div>
                  <div>
                    <div className="font-mono text-[#CC0000] text-sm">MAVR_IronWolf2847</div>
                    <div className="font-display text-2xl">TUSHAR R.</div>
                  </div>
                </div>
                <div className="inline-block mt-4 px-3 py-1 text-xs bg-[#CC0000] text-white font-medium tracking-wider rounded">LEVEL 5 — ELITE ATHLETE</div>
                <div className="grid grid-cols-2 gap-2 mt-5 font-mono text-[11px] text-[#888]">
                  <div>Streak: <span className="text-white">47 days</span></div>
                  <div>Workouts: <span className="text-white">214</span></div>
                  <div>XP: <span className="text-white">8,420</span></div>
                  <div>Achievements: <span className="text-white">19</span></div>
                </div>
                <div className="flex gap-3 mt-5 pt-4 border-t border-[#1A1A1A]">
                  {[["#CD7F32","B"],["#C0C0C0","S"],["#FFD700","G"]].map(([c, l]) => (
                    <div key={l} className="w-10 h-10 rounded-full grid place-items-center text-xs font-bold text-black" style={{ background: c, boxShadow: `0 0 14px ${c}66` }}>{l}</div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div className="mavr-card p-6 font-mono text-[13px] leading-7 text-[#22c55e]">
              {[
                "> auto-generated on registration",
                "> format: MAVR_[Adjective][Noun][4digits]",
                "> search any athlete by MAVR ID",
                "> send partner requests — instagram style",
                "> co-plan sessions in-app",
                "> activity feed from accepted partners",
                "> chat — encrypted, real-time",
              ].map(l => <div key={l}>{l}</div>)}
              <div className="caret" />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* FOOD DATABASE — interactive */}
      <FoodSearchSection />

      {/* CALCULATOR — interactive */}
      <CalculatorSection />

      {/* SECTION 5 — ACHIEVEMENTS */}
      <Section alt>
        <Reveal><Overline>THE ACHIEVEMENT ENGINE</Overline></Reveal>
        <Reveal delay={100}><H2>Discipline Should Feel Like Unlocking a Superpower.</H2></Reveal>
        <Reveal delay={200}>
          <p className="text-[#888] max-w-2xl text-base md:text-lg mb-12">
            Every milestone you hit inside MAVR triggers a fullscreen celebration — Lottie animation, badge reveal, XP counter, haptic feedback. Bronze to Diamond. Rookie to Legend. The app makes your consistency feel cinematic.
          </p>
        </Reveal>
        <div className="flex gap-6 overflow-x-auto no-scrollbar pb-4">
          {[
            { name: "BRONZE", color: "#CD7F32", xp: "50 to 200 XP per achievement" },
            { name: "SILVER", color: "#C0C0C0", xp: "200 to 600 XP" },
            { name: "GOLD", color: "#FFD700", xp: "500 to 2,000 XP" },
            { name: "PLATINUM", color: "#E5E4E2", xp: "1,500 to 5,000 XP" },
            { name: "DIAMOND", color: "#B9F2FF", xp: "5,000+ XP — Mythic", pulse: true },
          ].map((t, i) => (
            <Reveal key={t.name} delay={i * 100}>
              <div className="flex flex-col items-center min-w-[180px]">
                <div
                  className={`w-32 h-32 rounded-full grid place-items-center ${t.pulse ? "tier-pulse" : ""}`}
                  style={{ background: `radial-gradient(circle, ${t.color}33, transparent 70%)`, boxShadow: `0 0 30px ${t.color}66`, ["--tier" as any]: `${t.color}aa` }}
                >
                  <div className="w-20 h-20 rounded-full grid place-items-center font-display text-2xl" style={{ background: "#0A0A0A", border: `2px solid ${t.color}`, color: t.color }}>★</div>
                </div>
                <div className="font-display text-xl mt-4" style={{ color: t.color }}>{t.name}</div>
                <div className="text-[11px] text-[#888] mt-1 text-center">{t.xp}</div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={300}>
          <div className="mt-14 max-w-3xl">
            <div className="font-mono text-xs text-[#888] mb-3">Your journey: Rookie → Trainee → Athlete → Competitor → Elite → Champion → Legend</div>
            <div className="h-3 bg-[#111] border border-[#1A1A1A] rounded overflow-hidden">
              <div className="h-full w-[30%]" style={{ background: "linear-gradient(135deg,#CC0000,#FF4444)" }} />
            </div>
          </div>
        </Reveal>
      </Section>

      {/* SECTION 6 — APPAREL */}
      <Section>
        <Reveal><Overline>THE APPAREL BRIDGE</Overline></Reveal>
        <Reveal delay={100}><H2>The Gear Unlocks the System.</H2></Reveal>
        <div className="grid lg:grid-cols-2 gap-12 items-center mt-10">
          <Reveal>
            <div>
              <p className="text-[#888] text-lg leading-relaxed mb-8">
                Every MAVR compression garment ships with a unique product code inside the tag. Redeem it in the app and receive 6 months of MAVR Pro — worth ₹2,394 — instantly activated. The gear is not just performance wear. It is your entry into the MAVR Pro ecosystem.
              </p>
              <div className="flex flex-col md:flex-row gap-3 items-stretch">
                {[
                  ["01", "BUY THE GEAR", "Order MAVR Compression."],
                  ["02", "REDEEM THE CODE", "Enter tag code in app."],
                  ["03", "6 MONTHS PRO", "Activated instantly."],
                ].map(([n, t, d], i, a) => (
                  <div key={n} className="flex items-center gap-3 flex-1">
                    <div className="mavr-card mavr-card-top p-4 flex-1">
                      <div className="font-mono text-[#CC0000] text-xs">{n}</div>
                      <div className="font-display text-lg mt-1">{t}</div>
                      <div className="text-[#888] text-xs">{d}</div>
                    </div>
                    {i < a.length - 1 && <div className="hidden md:block text-[#CC0000] text-xl">→</div>}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div className="mx-auto w-[280px] h-[560px] bg-black border-[10px] border-[#1A1A1A] rounded-[40px] p-5 relative" style={{ boxShadow: "0 0 50px rgba(204,0,0,0.15)" }}>
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-5 bg-[#1A1A1A] rounded-full" />
              <div className="h-full flex flex-col justify-center gap-5 pt-6">
                <img src={logo} alt="" className="h-8 w-auto mx-auto" />
                <div className="text-[10px] tracking-[0.3em] text-[#888] text-center">ENTER PRODUCT CODE</div>
                <div className="bg-[#111] border border-[#333] rounded p-3 font-mono text-[#CC0000] text-center">MAVR-FOUND-8472</div>
                <div className="text-center text-[#22c55e] text-2xl">✓</div>
                <div className="text-xs text-center text-white px-2">6 MONTHS PRO ACTIVATED<br /><span className="text-[#CC0000]">FOUNDING ATHLETE BADGE EARNED</span></div>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* SECTION 7 — BUILD LOG */}
      <Section id="buildlog" alt>
        <Reveal><Overline>BUILDING IN PUBLIC</Overline></Reveal>
        <Reveal delay={100}><H2>We Build in the Open. You Watch it Happen.</H2></Reveal>
        <Reveal delay={200}>
          <p className="text-[#888] max-w-2xl text-base md:text-lg mb-14">
            No corporate veil. No polished PR. We show every decision, every design, every rejection, every iteration. This is the raw changelog of MAVR.
          </p>
        </Reveal>
        <div className="relative pl-8">
          <div className="absolute left-2 top-0 bottom-0 w-px bg-[#CC0000]" />
          {[
            ["MAY 2025 — WEEK 01", "COMPLETE", "App Architecture Finalised", "24-section developer build guide complete. Stack confirmed: React Native + Fastify + PostgreSQL + Redis + Razorpay Route. 30+ database tables documented."],
            ["MAY 2025 — WEEK 02", "COMPLETE", "Subscription Model Updated", "Apparel QR code now triggers 6-month Pro subscription credit. App moved to freemium — open access for all. Physical apparel is now the premium upgrade path."],
            ["MAY 2025 — WEEK 03", "COMPLETE", "Achievement and Badging Engine Designed", "30 achievements across 7 categories. Bronze to Diamond tier. XP system with 7 levels from Rookie to Legend. Lottie celebration animations specced."],
            ["MAY 2025 — WEEK 04", "COMPLETE", "Real-Time Trainer Edit Architecture", "WebSocket (Socket.io) architecture designed for trainer-to-student plan sync. Target: plan changes reflect in student app in under 500ms."],
            ["JUNE 2025 — WEEK 01", "COMPLETE", "MAVR ID Social Layer Added", "Every user gets MAVR_[Adjective][Noun][4digits] identity. Partner requests, partner chat, co-workout planning, activity feed — all specced and in database schema."],
            ["JUNE 2025 — WEEK 02", "IN PROGRESS", "Compression Sample Testing", "Fabric samples in review. Standard: must survive 200 wash cycles without compression loss. 2 of 4 fabric options rejected. Testing continues."],
            ["JUNE 2025 — WEEK 03", "IN PROGRESS", "Smart Watch Integration Specced", "Apple HealthKit (iOS) and Google Health Connect (Android) integration documented. Real-time heart rate during workouts. Fitbit OAuth flow planned."],
            ["JUNE 2025 — WEEK 04", "UPCOMING", "Investor Deck Finalisation", "Unit economics, 3-year projection, and subscription model review in progress. Deck available on request from the investor section below."],
            ["JULY 2025", "UPCOMING", "Closed Beta — First 100 Athletes", "First 100 waitlist members invited to closed beta. Full app access. Direct founder feedback line. Your bug report shapes the final product."],
          ].map(([ts, status, title, body], i) => {
            const pill = status === "COMPLETE" ? "bg-[#22c55e]/15 text-[#22c55e] border-[#22c55e]/40"
                      : status === "IN PROGRESS" ? "bg-yellow-500/15 text-yellow-400 border-yellow-500/40"
                      : "bg-[#888]/10 text-[#888] border-[#888]/30";
            return (
              <Reveal key={i} delay={(i % 4) * 80}>
                <div className="relative mb-6">
                  <div className="absolute -left-[28px] top-5 w-3 h-3 rounded-full bg-[#CC0000] ring-4 ring-[#050505]" />
                  <div className="mavr-card p-5" style={{ borderLeft: "4px solid #CC0000" }}>
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <span className="font-mono text-[11px] text-[#888]">{ts}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded border ${pill}`}>{status}</span>
                    </div>
                    <h3 className="font-bold text-lg mb-1">{title}</h3>
                    <p className="text-[#888] text-sm leading-relaxed">{body}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
        <Reveal>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="btn-ghost inline-flex mt-6">FOLLOW THE FULL BUILD ON INSTAGRAM →</a>
        </Reveal>
      </Section>

      {/* LEADERBOARD */}
      <LeaderboardSection />

      {/* SECTION 8 — MARKET */}
      <Section id="investors" className="overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1/2 pointer-events-none" style={{ background: "radial-gradient(ellipse at 0% 50%, rgba(204,0,0,0.08), transparent 60%)" }} />
        <div className="relative">
          <Reveal><Overline>THE OPPORTUNITY</Overline></Reveal>
          <Reveal delay={100}><H2>India's Fitness Market is Massively Underbuilt.</H2></Reveal>
          <div className="grid md:grid-cols-3 gap-8 mt-14">
            {[
              ["₹34,000 Cr+", "Indian fitness industry market size by 2026"],
              ["5 Cr+", "Active gym-goers in India with no structured digital tracking"],
              ["₹199 / month", "MAVR Pro starting price — less than one protein bar"],
            ].map(([n, l], i) => (
              <Reveal key={n} delay={i * 120}>
                <div>
                  <div className="font-display text-5xl md:text-7xl text-white leading-none">{n}</div>
                  <div className="text-[#888] text-sm mt-3 max-w-xs">{l}</div>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="grid md:grid-cols-2 gap-8 mt-16 relative">
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-[#1A1A1A]" />
            {[
              { h: "WHAT EXISTS TODAY", items: [
                "Generic Western apps where dal makhani isn't in the database",
                "Trainers managing 40 students via WhatsApp voice notes",
                "Gym members restarting from zero every time their trainer leaves",
                "No achievement system, no community, no identity",
              ]},
              { h: "WHAT MAVR BUILDS", items: [
                "Indian food database from day one — not an afterthought",
                "Real-time trainer-student plan sync via WebSocket",
                "Achievement system that makes discipline feel like a reward",
                "MAVR ID — a permanent athlete identity that grows with you",
              ]},
            ].map((col, i) => (
              <Reveal key={col.h} delay={i * 150}>
                <div className="md:px-6">
                  <h3 className="font-display text-2xl mb-5" style={{ color: i === 0 ? "#888" : "#CC0000" }}>{col.h}</h3>
                  <ul className="space-y-3 text-[#cccccc] text-sm">
                    {col.items.map(it => <li key={it} className="flex gap-2"><span className="text-[#CC0000]">→</span>{it}</li>)}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="flex flex-wrap gap-3 mt-12">
              <button onClick={() => setInvestorOpen(true)} className="btn-red">REQUEST INVESTOR DECK</button>
              <a href="#ecosystem" className="btn-ghost">VIEW FULL ECOSYSTEM DOCS →</a>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* SECTION 9 — FOUNDER */}
      <Section alt>
        <Reveal><Overline>WHO IS MAVR</Overline></Reveal>
        <Reveal delay={100}><H2>Built by Athletes. For Athletes.</H2></Reveal>
        <div className="grid lg:grid-cols-2 gap-12 items-center mt-10">
          <Reveal>
            <div className="relative w-full max-w-sm aspect-[3/4] mx-auto">
              {/* corner accents */}
              {[
                "top-0 left-0 border-l-4 border-t-4",
                "top-0 right-0 border-r-4 border-t-4",
                "bottom-0 left-0 border-l-4 border-b-4",
                "bottom-0 right-0 border-r-4 border-b-4",
              ].map(p => <div key={p} className={`absolute ${p} w-8 h-8 border-[#CC0000]`} />)}
              <div className="absolute inset-3 bg-[#111] grid place-items-center">
                <img src={logo} alt="MAVR" className="h-20 w-auto opacity-60" />
              </div>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <blockquote className="italic text-lg md:text-xl text-white leading-relaxed">
              "India has 1.4 billion people. A generation of athletes training in gyms, on fields, in academies — all underserved by technology built for someone else. Not our food. Not our sports. Not our trainers. Not our gyms.<br /><br />
              MAVR is being built to fix that. One system. Every athlete. Built in India."
            </blockquote>
          </Reveal>
        </div>
        <div className="grid sm:grid-cols-3 gap-4 mt-12">
          {[["24 Sections", "Complete developer build guide"], ["30+ Tables", "Full database schema documented"], ["₹2,394", "Pro value included with every apparel purchase"]].map(([n, d], i) => (
            <Reveal key={n} delay={i * 100}>
              <div className="mavr-card mavr-card-top px-4 py-4 flex items-center justify-between min-h-[80px]">
                <div className="font-display text-2xl">{n}</div>
                <div className="text-[#888] text-xs text-right max-w-[60%]">{d}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* TRAINER SIGNUP */}
      <TrainerSection />

      {/* CLOSED BETA */}
      <BetaSection />

      {/* FAQ */}
      <FAQSection />

      {/* PRESS & MEDIA */}
      <PressSection />

      {/* SECTION 10 — FINAL WAITLIST */}
      <section id="waitlist-final" className="relative py-28 md:py-40 px-6" style={{ background: "radial-gradient(ellipse at center, rgba(180,0,0,0.18), #0A0A0A 70%)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <h2 className="font-display text-[60px] md:text-[96px] leading-[0.95]">THE WAITLIST<br />IS OPEN.</h2>
          </Reveal>
          <Reveal delay={150}>
            <div className="text-[#cccccc] text-base md:text-lg mt-6 space-y-1">
              <p className="text-[#888]">Be among the first 1,000 founding athletes on MAVR. Founding members get:</p>
              <p>→ Early app access before public launch</p>
              <p>→ Exclusive Founding Athlete badge — never available again</p>
              <p>→ First access to MAVR Compression at founding price</p>
              <p>→ Direct line to the founder during beta</p>
            </div>
          </Reveal>
          <Reveal delay={250}>
            <div className="mt-10 flex flex-col items-center gap-4">
              <WaitlistForm ctaLabel="JOIN THE FOUNDING 1,000" />
              <div className="w-full max-w-xl mt-2">
                <div className="text-xs text-[#888] mb-2 text-left">847 of 1,000 founding spots claimed</div>
                <div className="h-2 bg-[#111] border border-[#1A1A1A] rounded overflow-hidden">
                  <div className="h-full" style={{ width: "84.7%", background: "linear-gradient(135deg,#CC0000,#FF4444)" }} />
                </div>
              </div>
              <ShareRow />
              <div className="text-[11px] text-[#888] mt-2">No spam. No noise. Only updates that matter. Unsubscribe any time.</div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black border-t border-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2">
              <img src={logo} alt="MAVR" className="h-8 w-auto" />
              <span className="font-display text-2xl">MAVR</span>
            </div>
            <div className="text-[#888] text-[13px] mt-2">India's Athlete Operating System</div>
          </div>
          <div className="flex flex-wrap gap-4 text-[13px] text-[#888] md:justify-center">
            {["Privacy Policy", "Terms of Service", "Contact", "Instagram", "LinkedIn"].map(l => (
              <a key={l} href="#" className="hover:text-[#CC0000] transition-colors">{l}</a>
            ))}
          </div>
          <div className="text-[#888] text-[11px] md:text-right">© 2025 MAVR Technologies Pvt. Ltd. All rights reserved. Built in India.</div>
        </div>
        <Ticker slow />
      </footer>

      <InvestorModal open={investorOpen} onClose={() => setInvestorOpen(false)} />
      <CookieBanner />
      <ScrollDepth />
    </main>
  );
}

function ScrollDepth() {
  // fire scroll depth events
  if (typeof window !== "undefined") {
    // attach once
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    if (!w.__mavrScroll) {
      w.__mavrScroll = { 50: false, 100: false };
      window.addEventListener("scroll", () => {
        const h = document.documentElement;
        const pct = (h.scrollTop + window.innerHeight) / h.scrollHeight;
        if (pct >= 0.5 && !w.__mavrScroll[50]) { w.__mavrScroll[50] = true; track("scroll_50"); }
        if (pct >= 0.99 && !w.__mavrScroll[100]) { w.__mavrScroll[100] = true; track("scroll_100"); }
      }, { passive: true });
    }
  }
  return null;
}
