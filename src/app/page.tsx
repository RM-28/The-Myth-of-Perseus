import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <div className="max-w-[600px]">
        <p
          className="text-sm tracking-[0.3em] uppercase text-[#c9a84c]/60 font-sans mb-6 opacity-0"
          style={{ animation: "fadeSlideUp 0.6s ease 0.2s forwards" }}
        >
          A Branching Myth
        </p>

        <h1 className="text-5xl md:text-6xl font-serif font-normal mb-4 leading-tight">
          <span
            className="shimmer-title inline-block opacity-0"
            style={{ animation: "fadeSlideUp 0.7s ease 0.4s forwards, shimmer 2.2s ease 0.8s 1 forwards" }}
          >
            The Myth of Perseus
          </span>
        </h1>

        <div
          className="mx-auto w-20 h-px bg-[#c9a84c]/40 my-8"
          style={{
            animation: "expandLine 0.8s ease 1s forwards, pulseGlow 3.5s ease-in-out 1.8s infinite",
            transform: "scaleX(0)",
            transformOrigin: "center",
            opacity: 0,
          }}
        />

        <p
          className="text-[17px] leading-[1.8] text-[#e8dcc8]/70 font-serif mb-12 opacity-0"
          style={{ animation: "fadeSlideUp 0.6s ease 1.1s forwards" }}
        >
          The myth has been told a thousand times: by Hesiod, Pindar,
          Apollodorus, Ovid. Each telling reflects a different truth. In this
          retelling, the path is yours to choose. Different sources, different
          readings, different meanings.
        </p>

        <div
          className="opacity-0"
          style={{ animation: "fadeSlideUp 0.6s ease 1.3s forwards" }}
        >
          <Link
            href="/story"
            className="inline-block px-10 py-4 border border-[#c9a84c]/40 text-[#c9a84c] hover:bg-[#c9a84c]/10 hover:border-[#c9a84c]/80 transition-all duration-300 text-sm font-sans tracking-[0.2em] uppercase"
          >
            Begin
          </Link>
        </div>

        {/* Author's Note link — commented out for now
        <div
          className="mt-16 opacity-0"
          style={{ animation: "fadeSlideUp 0.6s ease 1.5s forwards" }}
        >
          <Link
            href="/authors-note"
            className="text-sm text-[#e8dcc8]/30 hover:text-[#e8dcc8]/60 transition-colors font-sans"
          >
            Author&rsquo;s Note
          </Link>
        </div>
        */}
      </div>
    </main>
  );
}
