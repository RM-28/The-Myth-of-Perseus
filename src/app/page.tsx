import Link from "next/link";
import ParticleBackground from "@/components/ParticleBackground";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">

      {/* Greek night scene — temple, moon, olive trees, mountains */}
      <img
        src="/illustrations/home/bg.svg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
        style={{ opacity: 0.72 }}
      />

      {/* Gold particle dust */}
      <ParticleBackground />

      {/* Radial darkening toward edges so text stays readable */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 48%, transparent 30%, rgba(8,6,18,0.55) 100%)",
        }}
      />

      {/* Outer frame */}
      <div className="absolute inset-4 border border-[#2a8870]/12 pointer-events-none" />
      <div className="absolute inset-6 border border-[#2a8870]/06 pointer-events-none" />

      {/* Content */}
      <div className="max-w-[560px] relative z-10">

        {/* Top rule */}
        <div
          className="flex items-center justify-center gap-3 mb-8 opacity-0"
          style={{ animation: "fadeSlideUp 0.5s ease 0.1s forwards" }}
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#2a8870]/35" />
          <svg width="8" height="8" viewBox="0 0 8 8" aria-hidden="true">
            <path d="M4 0L8 4L4 8L0 4Z" fill="#2a8870" opacity="0.45"/>
          </svg>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#2a8870]/35" />
        </div>

        <p
          className="text-xs tracking-[0.35em] uppercase text-[#2a8870]/55 font-sans mb-6 opacity-0"
          style={{ animation: "fadeSlideUp 0.6s ease 0.25s forwards" }}
        >
          A Branching Myth
        </p>

        <h1 className="text-5xl md:text-6xl font-serif font-normal mb-4 leading-tight">
          <span
            className="shimmer-title inline-block opacity-0"
            style={{ animation: "fadeSlideUp 0.7s ease 0.45s forwards, shimmer 2.2s ease 0.9s 1 forwards" }}
          >
            The Myth of Perseus
          </span>
        </h1>

        <div
          className="mx-auto w-20 h-px bg-[#2a8870]/40 my-8"
          style={{
            animation: "expandLine 0.8s ease 1.05s forwards, pulseGlow 3.5s ease-in-out 1.9s infinite",
            transform: "scaleX(0)",
            transformOrigin: "center",
            opacity: 0,
          }}
        />

        <p
          className="text-[16px] leading-[1.85] text-[#e8dcc8]/65 font-serif mb-12 opacity-0"
          style={{ animation: "fadeSlideUp 0.6s ease 1.1s forwards" }}
        >
          The myth has been told a thousand times: by Hesiod, Pindar,
          Apollodorus, and Ovid. Each telling reflects a different truth. In this
          story, the path is yours to choose. Different sources, different
          readings, different meanings.
        </p>

        <div
          className="opacity-0 flex flex-col items-center gap-4"
          style={{ animation: "fadeSlideUp 0.6s ease 1.35s forwards" }}
        >
          <Link
            href="/story"
            className="inline-block px-12 py-4 border border-[#2a8870]/40 text-[#2a8870] hover:bg-[#2a8870]/10 hover:border-[#2a8870]/80 transition-all duration-300 text-sm font-sans tracking-[0.25em] uppercase"
          >
            Begin
          </Link>
          <Link
            href="/sources"
            className="text-[11px] tracking-[0.3em] uppercase text-[#2a8870]/45 hover:text-[#2a8870]/80 font-sans transition-colors duration-200"
          >
            Sources
          </Link>
        </div>

        {/* Bottom rule */}
        <div
          className="flex items-center justify-center gap-3 mt-12 opacity-0"
          style={{ animation: "fadeSlideUp 0.6s ease 1.55s forwards" }}
        >
          <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#2a8870]/25" />
          <span className="text-[9px] tracking-[0.5em] text-[#2a8870]/30 font-sans uppercase">Perseus</span>
          <div className="h-px w-10 bg-gradient-to-l from-transparent to-[#2a8870]/25" />
        </div>

      </div>
    </main>
  );
}
