import { useEffect, useRef, useState, type CSSProperties } from "react";
import { motion, useInView } from "framer-motion";
import logo from "@/assets/mavr-logo.png";
import { Countdown, WaitlistForm, Counter, ShareRow } from "@/components/mavr/parts";

/* ---------------- FadingVideo (rAF crossfade) ---------------- */
const FADE_MS = 500;
const FADE_OUT_LEAD = 0.55;

function FadingVideo({ src, className, style }: { src: string; className?: string; style?: CSSProperties }) {
  const ref = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number | null>(null);
  const fadingOutRef = useRef(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    const fadeTo = (target: number, duration = FADE_MS) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      const start = performance.now();
      const from = parseFloat(v.style.opacity || "0");
      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / duration);
        v.style.opacity = String(from + (target - from) * p);
        if (p < 1) rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
    };

    const onLoaded = () => {
      v.style.opacity = "0";
      v.play().catch(() => {});
      fadeTo(1);
    };
    const onTime = () => {
      if (!fadingOutRef.current && v.duration > 0 && v.duration - v.currentTime <= FADE_OUT_LEAD && v.duration - v.currentTime > 0) {
        fadingOutRef.current = true;
        fadeTo(0);
      }
    };
    const onEnded = () => {
      v.style.opacity = "0";
      setTimeout(() => {
        v.currentTime = 0;
        v.play().catch(() => {});
        fadingOutRef.current = false;
        fadeTo(1);
      }, 100);
    };

    v.style.opacity = "0";
    v.addEventListener("loadeddata", onLoaded);
    v.addEventListener("timeupdate", onTime);
    v.addEventListener("ended", onEnded);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      v.removeEventListener("loadeddata", onLoaded);
      v.removeEventListener("timeupdate", onTime);
      v.removeEventListener("ended", onEnded);
    };
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      autoPlay
      muted
      playsInline
      preload="auto"
      className={className}
      style={{ opacity: 0, ...style }}
    />
  );
}

/* ---------------- BlurText (word-by-word blur-in) ---------------- */
function BlurText({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { amount: 0.1, once: true });
  const words = text.split(" ");
  return (
    <p ref={ref} className={className} style={{ textAlign: "center" }}>
      {words.map((w, i) => (
        <motion.span
          key={i}
          initial={{ filter: "blur(10px)", opacity: 0, y: 50 }}
          animate={
            inView
              ? {
                  filter: ["blur(10px)", "blur(5px)", "blur(0px)"],
                  opacity: [0, 0.5, 1],
                  y: [50, -5, 0],
                }
              : {}
          }
          transition={{ duration: 0.7, times: [0, 0.5, 1], ease: "easeOut", delay: (i * 100) / 1000 }}
          style={{ display: "inline-block", marginRight: "0.25em" }}
        >
          {w}
        </motion.span>
      ))}
    </p>
  );
}

/* ---------------- Icons ---------------- */
const ArrowUpRight = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M7 17L17 7" /><path d="M7 7h10v10" />
  </svg>
);
const Play = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}><polygon points="6 4 20 12 6 20 6 4" /></svg>
);

/* ---------------- Cinematic Navbar ---------------- */
export function CinematicNavbar({ onJoin }: { onJoin: () => void }) {
  const [open, setOpen] = useState(false);
  const links = [
    { l: "About", h: "#about" },
    { l: "Ecosystem", h: "#ecosystem" },
    { l: "Build Log", h: "#buildlog" },
    { l: "Investors", h: "#investors" },
  ];
  return (
    <>
      <nav className="fixed top-4 inset-x-0 z-50 px-4 md:px-8 lg:px-16">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#top" className="liquid-glass rounded-full h-12 w-12 grid place-items-center">
            <img src={logo} alt="MAVR" className="h-7 w-7 object-contain" />
          </a>

          {/* Desktop nav pill */}
          <div className="hidden md:flex liquid-glass rounded-full px-1.5 py-1.5 items-center gap-1">
            {links.map((l) => (
              <a key={l.l} href={l.h} className="px-3 py-2 text-sm font-medium text-white/90 font-body-barlow hover:text-white transition-colors">
                {l.l}
              </a>
            ))}
            <button
              onClick={onJoin}
              className="ml-1 bg-white text-black rounded-full pl-4 pr-3 py-2 text-sm font-semibold font-body-barlow flex items-center gap-1 whitespace-nowrap hover:bg-white/90 transition"
            >
              Join Waitlist <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>

          {/* Mobile menu trigger (kept same style as before) */}
          <button onClick={() => setOpen(true)} className="md:hidden liquid-glass rounded-full h-12 w-12 grid place-items-center" aria-label="Menu">
            <div className="flex flex-col gap-1.5">
              <span className="w-5 h-0.5 bg-[#CC0000]" />
              <span className="w-5 h-0.5 bg-[#CC0000]" />
              <span className="w-5 h-0.5 bg-[#CC0000]" />
            </div>
          </button>

          {/* spacer for desktop balance */}
          <div className="hidden md:block h-12 w-12" />
        </div>
      </nav>

      {open && (
        <div className="fixed inset-0 z-[60] bg-[#0A0A0A] flex flex-col items-center justify-center gap-8 md:hidden">
          <button onClick={() => setOpen(false)} className="absolute top-6 right-6 text-3xl text-white">×</button>
          {links.map((l) => (
            <a key={l.l} href={l.h} onClick={() => setOpen(false)} className="text-2xl font-display tracking-wider">{l.l}</a>
          ))}
          <button onClick={() => { setOpen(false); onJoin(); }} className="btn-red">JOIN WAITLIST</button>
        </div>
      )}
    </>
  );
}

/* ---------------- Cinematic Hero ---------------- */
const HERO_VIDEO = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_080021_d598092b-c4c2-4e53-8e46-94cf9064cd50.mp4";

const fadeUp = {
  initial: { filter: "blur(10px)", opacity: 0, y: 20 },
  animate: { filter: "blur(0px)", opacity: 1, y: 0 },
};

export function CinematicHero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Background video */}
      <FadingVideo
        src={HERO_VIDEO}
        className="absolute left-1/2 top-0 -translate-x-1/2 object-cover object-center z-0 h-full w-full md:h-[120%] md:w-[120%] md:object-top"
      />
      {/* Stronger vignette on mobile for readability */}
      <div className="absolute inset-0 z-[1] pointer-events-none" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.1) 30%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0.85) 100%)" }} />

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Hero content */}
        <div className="flex-1 flex flex-col items-center text-center pt-24 sm:pt-28 md:pt-32 px-4 pb-10">
          {/* Badge */}
          <motion.div {...fadeUp} transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }} className="max-w-full">
            <div className="liquid-glass rounded-full pl-1 pr-3 py-1 flex items-center gap-2 flex-wrap justify-center">
              <span className="bg-white text-black rounded-full px-3 py-1 text-[11px] sm:text-xs font-semibold font-body-barlow">New</span>
              <span className="text-[11px] sm:text-sm text-white/90 font-body-barlow text-center">India's Athlete Operating System — Est. 2025</span>
            </div>
          </motion.div>

          {/* Headline */}
          <div className="mt-6 w-full">
            <BlurText
              text="THE SYSTEM IS LOADING."
              className="font-serif-i text-white leading-[0.9] tracking-tight md:tracking-[-3px] text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] max-w-3xl mx-auto"
            />
          </div>

          {/* Subheading */}
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.8 }}
            className="mt-4 text-sm md:text-base text-white max-w-2xl font-body-barlow font-light leading-snug px-2"
          >
            Training. Nutrition. Coach Connect. Achievements. Community. One platform built entirely for the Indian athlete.
          </motion.p>

          {/* CTAs */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.7, ease: "easeOut", delay: 1.1 }}
            className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-7"
          >
            <a
              href="#waitlist-final"
              className="liquid-glass-strong rounded-full px-5 py-2.5 text-sm font-medium text-white font-body-barlow flex items-center gap-2"
            >
              Join the Waitlist <ArrowUpRight className="h-5 w-5" />
            </a>
            <a href="#ecosystem" className="text-white text-sm font-body-barlow flex items-center gap-2 hover:opacity-80">
              Explore Ecosystem <Play className="h-4 w-4" />
            </a>
          </motion.div>

          {/* Countdown */}
          <motion.div {...fadeUp} transition={{ duration: 0.7, ease: "easeOut", delay: 1.2 }} className="mt-10 w-full">
            <div className="text-[11px] tracking-[0.3em] text-white/70 mb-3 font-body-barlow">PUBLIC LAUNCH IN</div>
            <Countdown />
          </motion.div>

          {/* Stats row */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.7, ease: "easeOut", delay: 1.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 w-full max-w-[480px]"
          >
            <div className="liquid-glass p-5 rounded-[1.25rem] text-left">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" strokeLinecap="round" /></svg>
              <div className="font-serif-i text-white text-4xl tracking-[-1px] leading-none mt-3">
                <Counter to={847} />+
              </div>
              <div className="text-xs text-white font-body-barlow font-light mt-2">Founding Athletes Joined</div>
            </div>
            <div className="liquid-glass p-5 rounded-[1.25rem] text-left">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" /></svg>
              <div className="font-serif-i text-white text-4xl tracking-[-1px] leading-none mt-3">1.4B+</div>
              <div className="text-xs text-white font-body-barlow font-light mt-2">Indians. One System. Built for All.</div>
            </div>
          </motion.div>

          {/* Waitlist inline */}
          <motion.div {...fadeUp} transition={{ duration: 0.7, ease: "easeOut", delay: 1.35 }} className="mt-8 w-full flex flex-col items-center gap-3 px-2">
            <WaitlistForm />
            <div className="text-[11px] text-white/70 font-body-barlow text-center">No spam. No noise. Only updates that matter.</div>
            <ShareRow />
          </motion.div>
        </div>

        {/* Partners */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.7, ease: "easeOut", delay: 1.4 }}
          className="flex flex-col items-center gap-4 pb-10 px-4"
        >
          <div className="liquid-glass rounded-full px-3.5 py-1 text-[11px] sm:text-xs font-medium text-white font-body-barlow text-center">
            Built for India's Athletes, Trainers, and Champions
          </div>
          <div className="flex items-center justify-center flex-wrap gap-4 sm:gap-8 md:gap-16 font-serif-i text-white text-xl sm:text-2xl md:text-3xl tracking-tight">
            <span>Train</span><span>·</span><span>Track</span><span>·</span><span>Coach</span><span>·</span><span>Compete</span><span>·</span><span>Dominate</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
