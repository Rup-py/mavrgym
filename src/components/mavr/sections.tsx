import { useMemo, useState } from "react";
import { Reveal } from "@/components/mavr/parts";

/* ============ Shared atoms ============ */
function Overline({ children }: { children: React.ReactNode }) {
  return <div className="overline mb-4">{children}</div>;
}
function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="font-display text-4xl md:text-6xl text-white leading-[0.95] mb-4">{children}</h2>;
}
function Section({ id, alt, children, className = "" }: { id?: string; alt?: boolean; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={`relative w-full ${alt ? "bg-[#050505]" : "bg-[#0A0A0A]"} py-24 md:py-32 px-6 ${className}`}>
      <div className="max-w-7xl mx-auto relative">{children}</div>
    </section>
  );
}

/* ============ 1. PROBLEM STATS ============ */
export function ProblemSection() {
  const stats = [
    ["87%", "of Indian gym-goers cannot accurately track what they eat — because every fitness app was built for Western diets, not dal, paneer, or poha."],
    ["5 Cr+", "active gym-goers in India managed by trainers using WhatsApp voice notes, paper registers, and verbal instructions. No tracking. No data. No system."],
    ["₹0", "spent building a fitness platform from scratch specifically for the Indian athlete — until now. MAVR is the first."],
  ];
  return (
    <Section alt id="problem">
      <Reveal><Overline>THE PROBLEM</Overline></Reveal>
      <Reveal delay={100}><H2>India Has 5 Crore Gym-Goers.<br/>One Fitness App Built Entirely For Them.</H2></Reveal>
      <div className="mt-12 space-y-5">
        {stats.map(([n, d], i) => (
          <Reveal key={n} delay={i * 120}>
            <div className="mavr-card flex flex-col md:flex-row md:items-center gap-6 p-8 md:p-10 border-l-4 border-l-[#CC0000]">
              <div className="font-display text-[#CC0000] text-6xl md:text-8xl leading-none min-w-[180px]">{n}</div>
              <p className="text-white text-base md:text-lg leading-relaxed">{d}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ============ 2. INDIAN FOOD DATABASE SEARCH ============ */
type Food = { name: string; serving: string; cal: number; p: number; c: number; f: number; veg: boolean };
const FOODS: Food[] = [
  { name: "Dal Makhani", serving: "1 bowl · 250g", cal: 340, p: 14, c: 38, f: 14, veg: true },
  { name: "Paneer Bhurji", serving: "150g", cal: 280, p: 18, c: 6, f: 20, veg: true },
  { name: "Poha", serving: "1 plate · 200g", cal: 250, p: 5, c: 48, f: 4, veg: true },
  { name: "Rajma Chawal", serving: "1 plate · 350g", cal: 420, p: 16, c: 72, f: 8, veg: true },
  { name: "Chicken Curry", serving: "200g", cal: 310, p: 28, c: 8, f: 18, veg: false },
  { name: "Egg Bhurji", serving: "3 eggs · 180g", cal: 290, p: 22, c: 4, f: 20, veg: false },
  { name: "Upma", serving: "1 bowl · 200g", cal: 220, p: 6, c: 40, f: 5, veg: true },
  { name: "Idli", serving: "4 pieces · 200g", cal: 200, p: 6, c: 40, f: 1, veg: true },
  { name: "Masoor Dal", serving: "1 bowl · 250g", cal: 230, p: 16, c: 36, f: 2, veg: true },
  { name: "Chole", serving: "1 bowl · 200g", cal: 270, p: 14, c: 40, f: 6, veg: true },
  { name: "Paratha", serving: "1 piece · 100g", cal: 260, p: 6, c: 36, f: 10, veg: true },
  { name: "Oats with Milk", serving: "1 bowl · 300g", cal: 280, p: 12, c: 44, f: 6, veg: true },
  { name: "Sprouts Salad", serving: "1 bowl · 150g", cal: 120, p: 8, c: 20, f: 1, veg: true },
  { name: "Banana", serving: "1 medium · 120g", cal: 105, p: 1, c: 27, f: 0, veg: true },
  { name: "Paneer", serving: "100g raw", cal: 265, p: 18, c: 3, f: 20, veg: true },
  { name: "Bhuna Chana", serving: "50g", cal: 180, p: 10, c: 28, f: 3, veg: true },
  { name: "Buttermilk Chaas", serving: "1 glass · 250ml", cal: 60, p: 3, c: 8, f: 1, veg: true },
  { name: "Protein Shake (Whey)", serving: "30g powder", cal: 120, p: 24, c: 4, f: 2, veg: true },
  { name: "White Rice", serving: "1 cup cooked · 200g", cal: 260, p: 5, c: 56, f: 0, veg: true },
  { name: "Roti / Chapati", serving: "1 piece · 40g", cal: 100, p: 3, c: 20, f: 1, veg: true },
  { name: "Dosa", serving: "1 large · 100g", cal: 170, p: 4, c: 30, f: 5, veg: true },
  { name: "Sambhar", serving: "1 bowl · 200g", cal: 120, p: 6, c: 20, f: 2, veg: true },
  { name: "Fish Curry (Rohu)", serving: "200g", cal: 240, p: 30, c: 4, f: 12, veg: false },
  { name: "Peanut Butter", serving: "2 tbsp · 32g", cal: 190, p: 8, c: 6, f: 16, veg: true },
  { name: "Coconut Water", serving: "1 glass · 250ml", cal: 45, p: 0, c: 10, f: 0, veg: true },
  { name: "Green Tea", serving: "1 cup · 240ml", cal: 2, p: 0, c: 0, f: 0, veg: true },
  { name: "Khichdi", serving: "1 bowl · 250g", cal: 280, p: 10, c: 48, f: 5, veg: true },
  { name: "Dry Fruits Mix", serving: "30g", cal: 180, p: 4, c: 14, f: 13, veg: true },
  { name: "Dahi / Yogurt", serving: "1 cup · 200g", cal: 120, p: 8, c: 10, f: 5, veg: true },
  { name: "Soya Chunks", serving: "50g dry", cal: 175, p: 25, c: 12, f: 1, veg: true },
];

export function FoodSearchSection() {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<"all" | "veg" | "protein">("all");

  const results = useMemo(() => {
    let r = FOODS;
    if (filter === "veg") r = r.filter(f => f.veg);
    if (filter === "protein") r = r.filter(f => f.p >= 15);
    if (q.trim()) r = r.filter(f => f.name.toLowerCase().includes(q.toLowerCase().trim()));
    return r.slice(0, 6);
  }, [q, filter]);

  const filters: { k: typeof filter; l: string }[] = [
    { k: "all", l: "All" }, { k: "veg", l: "Vegetarian" }, { k: "protein", l: "High Protein" },
  ];

  return (
    <Section alt id="food">
      <Reveal><Overline>THE FOOD DATABASE</Overline></Reveal>
      <Reveal delay={100}><H2>India's Largest Indian Food Calorie and Macro Tracker</H2></Reveal>
      <Reveal delay={200}>
        <p className="text-[#888] max-w-2xl text-base md:text-lg mb-10">
          Type any Indian food below and see exactly what MAVR shows your athletes. Dal makhani. Poha. Butter chicken. Protein shake. It is all here. This is not a demo — this is the real database.
        </p>
      </Reveal>

      <Reveal delay={250}>
        <div className="relative">
          <input
            value={q} onChange={e => setQ(e.target.value)}
            placeholder="Search any Indian food... (try poha, paneer, dal)"
            className="w-full bg-[#111] border border-[#2A2A2A] rounded px-5 py-4 font-mono text-base text-white placeholder:text-[#444] focus:border-[#CC0000] focus:outline-none transition-colors"
          />
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#CC0000" strokeWidth="2" className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
          </svg>
        </div>
      </Reveal>

      <Reveal delay={300}>
        <div className="flex gap-2 mt-4">
          {filters.map(f => (
            <button key={f.k} onClick={() => setFilter(f.k)}
              className={`px-4 py-2 text-xs font-bold tracking-wider rounded transition-all ${filter === f.k ? "bg-[#CC0000] text-white" : "bg-transparent border border-[#2A2A2A] text-[#888] hover:border-[#CC0000] hover:text-white"}`}>
              {f.l.toUpperCase()}
            </button>
          ))}
        </div>
      </Reveal>

      <div className="mt-8 grid gap-3">
        {results.length === 0 ? (
          <div className="mavr-card p-8 text-center text-[#888]">Not in database yet — we add 50 new Indian foods every week.</div>
        ) : results.map((f, i) => (
          <Reveal key={f.name} delay={Math.min(i * 60, 240)}>
            <div className="mavr-card p-5 flex flex-col md:flex-row md:items-center gap-4 hover:border-[#CC0000]/50 transition-colors">
              <div className="flex-1">
                <div className="font-bold text-white text-[15px]">{f.name}</div>
                <div className="text-xs text-[#888] mt-1 font-mono">{f.serving}</div>
              </div>
              <div className="grid grid-cols-4 gap-2 md:gap-3">
                {[
                  { label: "CAL", val: f.cal, bg: "bg-[#CC0000]/20", border: "border-[#CC0000]/40", text: "text-[#FF6666]" },
                  { label: "PROTEIN", val: `${f.p}g`, bg: "bg-[#1A4A1A]/40", border: "border-[#22c55e]/30", text: "text-[#4ade80]" },
                  { label: "CARBS", val: `${f.c}g`, bg: "bg-[#1A2A4A]/40", border: "border-[#3b82f6]/30", text: "text-[#60a5fa]" },
                  { label: "FAT", val: `${f.f}g`, bg: "bg-[#3A2A1A]/60", border: "border-amber-700/40", text: "text-amber-400" },
                ].map(p => (
                  <div key={p.label} className={`${p.bg} ${p.border} border rounded px-3 py-2 text-center min-w-[60px]`}>
                    <div className={`font-bold text-sm ${p.text}`}>{p.val}</div>
                    <div className="text-[9px] text-[#888] tracking-wider mt-0.5">{p.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-6 font-mono text-xs text-[#555]">12,400+ Indian foods in the complete MAVR database at launch.</div>
    </Section>
  );
}

/* ============ 3. ACHIEVEMENT CALCULATOR ============ */
type CalcResult = { unlocked: { name: string; tier: string; xp: number; color: string }[]; totalXp: number; level: string };

function calculateAchievements(daysPerWeek: number, months: number, tracksMeals: boolean, gym: boolean): CalcResult {
  const total = daysPerWeek * 4 * months;
  const streak = daysPerWeek >= 5 ? 60 : daysPerWeek >= 3 ? 30 : 14;
  const checkins = gym ? total : 0;
  const unlocked: CalcResult["unlocked"] = [];
  const add = (name: string, tier: string, xp: number, color: string, cond: boolean) => { if (cond) unlocked.push({ name, tier, xp, color }); };

  add("First Step", "Bronze", 50, "#CD7F32", total >= 1);
  add("First Workout", "Bronze", 50, "#CD7F32", total >= 1);
  add("3-Day Warrior", "Bronze", 100, "#CD7F32", streak >= 3);
  add("Week Conqueror", "Bronze", 150, "#CD7F32", streak >= 7);
  add("10 Workouts Done", "Bronze", 150, "#CD7F32", total >= 10);
  add("Iron Discipline", "Silver", 400, "#C0C0C0", streak >= 30);
  add("Half Century", "Silver", 500, "#C0C0C0", total >= 50);
  add("Century Club", "Gold", 1200, "#FFD700", total >= 100);
  add("Triple Century", "Platinum", 3000, "#E5E4E2", total >= 300);
  add("First Meal Log", "Bronze", 75, "#CD7F32", tracksMeals);
  add("Macro Master", "Silver", 350, "#C0C0C0", tracksMeals && total >= 30);
  add("Gym Rat", "Bronze", 100, "#CD7F32", checkins >= 1);
  add("Gym Regular", "Silver", 450, "#C0C0C0", checkins >= 50);
  add("Gym Legend", "Gold", 1500, "#FFD700", checkins >= 200);

  const totalXp = unlocked.reduce((s, a) => s + a.xp, 0);
  let level = "Rookie";
  if (totalXp >= 30000) level = "Legend";
  else if (totalXp >= 15000) level = "Champion";
  else if (totalXp >= 7000) level = "Elite Athlete";
  else if (totalXp >= 3500) level = "Competitor";
  else if (totalXp >= 1500) level = "Athlete";
  else if (totalXp >= 500) level = "Trainee";
  return { unlocked, totalXp, level };
}

export function CalculatorSection() {
  const [days, setDays] = useState(4);
  const [months, setMonths] = useState(8);
  const [meals, setMeals] = useState(false);
  const [gym, setGym] = useState(true);
  const [result, setResult] = useState<CalcResult | null>(null);

  const onCalc = () => setResult(calculateAchievements(days, months, meals, gym));

  return (
    <Section id="calculator">
      <Reveal><Overline>THE ACHIEVEMENT ENGINE</Overline></Reveal>
      <Reveal delay={100}><H2>See What You Would Have Already Earned.</H2></Reveal>
      <Reveal delay={200}>
        <p className="text-[#888] max-w-2xl text-base md:text-lg mb-12">
          Enter your current training habits below. MAVR calculates which achievements you would have already unlocked if you had been using the app from day one.
        </p>
      </Reveal>

      <Reveal delay={250}>
        <div className="mavr-card p-6 md:p-10">
          {/* Slider 1 */}
          <div className="mb-8">
            <div className="flex items-baseline justify-between mb-3">
              <label className="text-white text-sm md:text-base">How many days per week do you train?</label>
              <span className="font-mono text-[#CC0000] text-base font-bold">{days} {days === 1 ? "day" : "days"} / week</span>
            </div>
            <input type="range" min={1} max={7} value={days} onChange={e => setDays(+e.target.value)} className="mavr-range w-full" />
          </div>
          {/* Slider 2 */}
          <div className="mb-8">
            <div className="flex items-baseline justify-between mb-3">
              <label className="text-white text-sm md:text-base">How many months have you been training?</label>
              <span className="font-mono text-[#CC0000] text-base font-bold">{months} {months === 1 ? "month" : "months"}</span>
            </div>
            <input type="range" min={1} max={36} value={months} onChange={e => setMonths(+e.target.value)} className="mavr-range w-full" />
          </div>
          {/* Toggle 1 */}
          <div className="grid sm:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="text-white text-sm md:text-base block mb-3">Do you track your meals?</label>
              <div className="flex gap-2">
                {[true, false].map(v => (
                  <button key={String(v)} onClick={() => setMeals(v)}
                    className={`px-6 py-2.5 text-sm font-bold tracking-wider rounded transition-all ${meals === v ? "bg-[#CC0000] text-white" : "border border-[#2A2A2A] text-[#888] hover:border-[#CC0000]"}`}>
                    {v ? "YES" : "NO"}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-white text-sm md:text-base block mb-3">Do you train at a gym?</label>
              <div className="flex gap-2">
                {[true, false].map(v => (
                  <button key={String(v)} onClick={() => setGym(v)}
                    className={`px-6 py-2.5 text-sm font-bold tracking-wider rounded transition-all ${gym === v ? "bg-[#CC0000] text-white" : "border border-[#2A2A2A] text-[#888] hover:border-[#CC0000]"}`}>
                    {v ? "YES" : "NO"}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <button onClick={onCalc} className="btn-red w-full text-base py-3">CALCULATE MY ACHIEVEMENTS</button>

          {result && (
            <div className="mt-10 pt-8 border-t border-[#1A1A1A] animate-fade-in">
              <div className="flex flex-wrap items-baseline justify-between gap-4 mb-6">
                <div className="font-display text-3xl text-white">You unlocked <span className="text-[#CC0000]">{result.unlocked.length}</span> achievements</div>
                <div className="font-mono text-[#888] text-sm">Total XP: <span className="text-white">{result.totalXp.toLocaleString()}</span> · Level: <span className="text-[#CC0000]">{result.level}</span></div>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {result.unlocked.map(a => (
                  <div key={a.name} className="bg-[#0A0A0A] border border-[#1A1A1A] p-4 rounded flex items-center gap-3" style={{ borderLeftWidth: 3, borderLeftColor: a.color }}>
                    <div className="w-10 h-10 rounded-full grid place-items-center font-bold text-black flex-shrink-0" style={{ background: a.color, boxShadow: `0 0 12px ${a.color}55` }}>★</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-white text-sm font-bold truncate">{a.name}</div>
                      <div className="text-[10px] text-[#888] tracking-wider">{a.tier.toUpperCase()} · {a.xp} XP</div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-8 text-[#888] text-sm">These achievements are waiting for you in MAVR. Every one unlocks a fullscreen celebration.</p>
              <a href="#waitlist-final" className="btn-red inline-flex mt-4">JOIN THE WAITLIST →</a>
            </div>
          )}
        </div>
      </Reveal>
    </Section>
  );
}

/* ============ 4. LEADERBOARD ============ */
export function LeaderboardSection() {
  const rows = [
    [1, "MAVR_IronWolf2847", 47, "FOUNDING CAPTAIN"],
    [2, "MAVR_SteelHawk0391", 38, "TOP 10"],
    [3, "MAVR_GoldLion5512", 31, "TOP 10"],
    [4, "MAVR_FireBull7734", 28, ""],
    [5, "MAVR_ApexBear1293", 24, ""],
    [6, "MAVR_TitanEagle4421", 19, ""],
    [7, "MAVR_BlazeFalcon8872", 16, ""],
    [8, "MAVR_SwiftPanther3301", 12, ""],
    [9, "MAVR_FierceShark9945", 9, ""],
    [10, "MAVR_BoldDragon2267", 7, ""],
  ] as const;
  return (
    <Section alt id="leaderboard">
      <Reveal><Overline>THE LEADERBOARD</Overline></Reveal>
      <Reveal delay={100}><H2>Refer More. Rank Higher. Win More.</H2></Reveal>
      <Reveal delay={200}>
        <p className="text-[#888] max-w-2xl text-base md:text-lg mb-10">
          Every athlete who joins using your referral link moves you up the founding leaderboard. Top 10 referrers get founding member status locked in permanently, first-batch MAVR Compression at cost price, and a direct call with the founder before launch.
        </p>
      </Reveal>
      <Reveal delay={250}>
        <div className="mavr-card overflow-hidden border-t-2 border-t-[#CC0000]">
          <div className="grid grid-cols-[60px_1fr_100px_140px] md:grid-cols-[80px_1fr_120px_180px] gap-3 px-4 md:px-6 py-3 border-b border-[#1A1A1A] font-mono text-[10px] md:text-xs text-[#888] tracking-wider">
            <div>RANK</div><div>MAVR ID</div><div className="text-right">REFERRALS</div><div className="text-right">STATUS</div>
          </div>
          {rows.map(([rank, id, refs, status]) => (
            <div key={id} className={`grid grid-cols-[60px_1fr_100px_140px] md:grid-cols-[80px_1fr_120px_180px] gap-3 px-4 md:px-6 py-4 items-center border-b border-[#1A1A1A] last:border-0 ${rank === 1 ? "bg-[#1A0000] border-l-4 border-l-[#CC0000]" : ""}`}>
              <div className={`font-display text-2xl ${rank === 1 ? "text-[#CC0000]" : "text-white"}`}>{rank}</div>
              <div className="font-mono text-xs md:text-sm text-white truncate">{id}</div>
              <div className="text-right font-bold text-white text-sm md:text-base">{refs}</div>
              <div className="text-right">
                {status && (
                  <span className={`text-[9px] md:text-[10px] px-2 py-1 rounded border font-bold tracking-wider ${status === "FOUNDING CAPTAIN" ? "bg-[#FFD700]/15 text-[#FFD700] border-[#FFD700]/40" : "bg-[#CC0000]/15 text-[#CC0000] border-[#CC0000]/40"}`}>
                    {status}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-[#555] font-mono">Updated in real time. Your position appears after you share your referral link.</p>
      </Reveal>
    </Section>
  );
}

/* ============ 5. TRAINER SIGNUP ============ */
export function TrainerSection() {
  const [done, setDone] = useState(false);
  const features = [
    "Real-time plan editing — student sees changes in under 500ms",
    "Full diet and workout compliance tracking per student",
    "Earnings dashboard — session fees, settlements, payment history",
    "Student feedback and rating system built in",
    "First 3 months of Coach Connect completely free",
  ];
  return (
    <Section id="trainers">
      <Reveal><Overline>FOR TRAINERS</Overline></Reveal>
      <Reveal delay={100}><H2>Fitness App for Personal Trainers in India —<br/>Manage Students in Real Time.</H2></Reveal>
      <Reveal delay={200}>
        <p className="text-[#888] max-w-2xl text-base md:text-lg mb-12">
          Coach Connect gives you a real-time dashboard to manage every student — assign plans, track diet compliance, monitor streaks, and edit programmes live. Your students see your changes instantly. The first 3 months are free.
        </p>
      </Reveal>
      <div className="grid lg:grid-cols-2 gap-10">
        <Reveal>
          <ul className="space-y-4">
            {features.map(f => (
              <li key={f} className="flex gap-3 items-start">
                <span className="w-2 h-2 rounded-full bg-[#CC0000] mt-2 flex-shrink-0 ring-4 ring-[#CC0000]/15" />
                <span className="text-white text-[15px] leading-relaxed">{f}</span>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={150}>
          <form onSubmit={e => { e.preventDefault(); setDone(true); }} className="mavr-card p-6 md:p-8 space-y-4">
            <h3 className="font-bold text-lg text-white mb-2">Register as a Trainer</h3>
            {done ? (
              <div className="py-8 text-center">
                <div className="text-[#22c55e] text-4xl mb-3">✓</div>
                <p className="text-white">Registered. We will contact you within 48 hours with early trainer access.</p>
              </div>
            ) : (
              <>
                <input required placeholder="Full Name" className="mavr-input" />
                <input required placeholder="City" className="mavr-input" />
                <select required defaultValue="" className="mavr-input">
                  <option value="" disabled>Number of current students</option>
                  <option>1–10</option><option>11–25</option><option>26–50</option><option>50+</option>
                </select>
                <input placeholder="Primary Gym Name (optional)" className="mavr-input" />
                <input required placeholder="WhatsApp Number" className="mavr-input" />
                <button type="submit" className="btn-red w-full">REGISTER INTEREST</button>
              </>
            )}
          </form>
        </Reveal>
      </div>
    </Section>
  );
}

/* ============ 6. BETA APPLICATION ============ */
export function BetaSection() {
  const [done, setDone] = useState(false);
  return (
    <Section alt id="beta">
      <Reveal><Overline>CLOSED BETA</Overline></Reveal>
      <Reveal delay={100}><H2>100 Spots. Serious Athletes Only.</H2></Reveal>
      <Reveal delay={200}>
        <p className="text-[#888] max-w-2xl text-base md:text-lg mb-8">
          The closed beta is not for everyone. It is for athletes who will actually use every feature, report every bug, and help shape the final product. Apply below.
        </p>
      </Reveal>
      <Reveal delay={250}>
        <div className="max-w-2xl mb-8">
          <div className="flex justify-between text-xs text-[#888] mb-2"><span>67 of 100 beta spots claimed</span><span className="text-[#CC0000]">67%</span></div>
          <div className="h-2 bg-[#111] border border-[#1A1A1A] rounded overflow-hidden">
            <div className="h-full" style={{ width: "67%", background: "linear-gradient(135deg,#CC0000,#FF4444)" }} />
          </div>
        </div>
      </Reveal>
      <Reveal delay={300}>
        <form onSubmit={e => { e.preventDefault(); setDone(true); }} className="mavr-card p-6 md:p-8 max-w-2xl space-y-4">
          {done ? (
            <div className="py-10 text-center">
              <div className="text-[#22c55e] text-4xl mb-3">✓</div>
              <p className="text-white text-lg">Application received.</p>
              <p className="text-[#888] mt-2">We review every application manually and respond within 7 days. Only 100 spots available.</p>
            </div>
          ) : (
            <>
              <input required placeholder="Full Name" className="mavr-input" />
              <input required placeholder="Current Gym Name & City" className="mavr-input" />
              <select required defaultValue="" className="mavr-input">
                <option value="" disabled>Training frequency</option>
                <option>3–4 days / week</option><option>5–6 days / week</option><option>Every day</option><option>Less than 3 days</option>
              </select>
              <input required placeholder="Primary sport or goal" className="mavr-input" />
              <textarea required minLength={50} rows={4} placeholder="What is the single most frustrating thing about tracking your fitness right now? (min 50 chars)" className="mavr-input resize-y" />
              <button type="submit" className="btn-red w-full">APPLY FOR BETA</button>
            </>
          )}
        </form>
      </Reveal>
    </Section>
  );
}

/* ============ 7. FAQ ============ */
const FAQS: [string, string][] = [
  ["When does MAVR launch?", "MAVR is targeting a public launch in late 2025. Founding members on the waitlist receive early access before the public launch and a guaranteed Founding Athlete badge."],
  ["Is the MAVR app free to download?", "Yes. MAVR is free to download on Android and iOS. A Pro subscription from ₹199/month unlocks advanced features including diet tracking, AI plans, and trainer connection. Every MAVR compression garment includes a product code for 6 months of Pro — worth ₹2,394 — completely free."],
  ["What is a MAVR ID?", "Every athlete gets a unique auto-generated MAVR ID in the format MAVR_IronWolf2847. It is your permanent athlete identity — used to find training partners, send requests, co-plan sessions, and build your public athletic profile."],
  ["Can any trainer use Coach Connect?", "Yes. Both certified and independent trainers can register. Trainers get a full real-time dashboard to assign plans, track student progress, and edit programmes. The first 3 months are free for registered trainers."],
  ["Is my data private and secure?", "Yes. MAVR uses AES-256 encryption for all chat messages. You have granular control over every piece of your data — workouts, check-ins, stats, and profile visibility. You can block any user at any time. MAVR is compliant with the Indian DPDP Act 2023."],
  ["What is the product code from apparel?", "Every MAVR compression garment ships with a unique product code inside the tag. Redeem it in the app and receive 6 months of MAVR Pro instantly — worth ₹2,394 — plus the exclusive Founding Athlete badge."],
  ["What are Superpowers?", "Superpowers are real advantages unlocked by Pro and Elite subscribers — XP Booster (2× XP for 7 days), Stealth Mode, Nutrition Oracle, Recovery Advisor, and more. Not cosmetic. Actual competitive advantages."],
  ["How does the referral leaderboard work?", "Every waitlist signup gets a unique referral link. Share it. Every person who signs up using your link moves you up the leaderboard. Top 10 referrers get founding member status locked in, first-batch compression at cost price, and a direct call with the founder."],
];

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Section alt id="faq">
      <Reveal><Overline>FAQ</Overline></Reveal>
      <Reveal delay={100}><H2>Common Questions.</H2></Reveal>
      <div className="mt-10 max-w-3xl">
        {FAQS.map(([q, a], i) => {
          const isOpen = open === i;
          return (
            <Reveal key={q} delay={Math.min(i * 50, 250)}>
              <div className="border-b border-[#1A1A1A]">
                <button onClick={() => setOpen(isOpen ? null : i)} className="w-full text-left py-5 flex items-center justify-between gap-4 group">
                  <span className="font-bold text-white text-[15px] md:text-base group-hover:text-[#CC0000] transition-colors">{q}</span>
                  <span className={`text-[#CC0000] text-2xl transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}>+</span>
                </button>
                <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden">
                    <p className="text-[#888] text-sm md:text-[15px] leading-relaxed">{a}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}

/* ============ 8. PRESS & MEDIA ============ */
export function PressSection() {
  return (
    <Section id="press" className="!py-16 md:!py-20">
      <Reveal><Overline>PRESS & MEDIA</Overline></Reveal>
      <Reveal delay={100}><H2>Brand Resources.</H2></Reveal>
      <div className="grid md:grid-cols-2 gap-5 mt-10">
        <Reveal>
          <div className="mavr-card p-6 hover:border-[#CC0000]/50 transition-colors">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#CC0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
            <h3 className="font-bold text-white text-lg mt-4">Download Brand Kit</h3>
            <p className="text-[#888] text-sm mt-2">Logos, colours, typography, usage guidelines.</p>
            <a href="#" className="btn-ghost inline-flex mt-4 text-xs">DOWNLOAD →</a>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="mavr-card p-6 hover:border-[#CC0000]/50 transition-colors">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#CC0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>
            <h3 className="font-bold text-white text-lg mt-4">Media Enquiries</h3>
            <p className="font-mono text-[#CC0000] text-sm mt-2">hello@mavr.in</p>
            <p className="text-[#888] text-xs mt-2">We respond to press within 24 hours.</p>
          </div>
        </Reveal>
      </div>
      <Reveal delay={200}>
        <div className="mt-8 mavr-card p-6 text-[#888] text-sm leading-relaxed max-w-4xl">
          <span className="text-[#CC0000] font-mono text-[10px] tracking-wider">BOILERPLATE</span>
          <p className="mt-2">MAVR is India's first Athlete Operating System — a mobile platform for workout tracking, Indian nutrition, real-time coach-student connection, gamified achievements, and athlete community. Built for the 5 crore active gym-goers in India who have never had technology designed specifically for them. Launching late 2025 on Android and iOS. mavr.in</p>
        </div>
      </Reveal>
    </Section>
  );
}
