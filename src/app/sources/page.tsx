import Link from "next/link";

export default function Sources() {
  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1a1f2e]/90 backdrop-blur-sm border-b border-[#c9a84c]/10">
        <div className="max-w-4xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link
            href="/"
            className="text-sm tracking-[0.2em] uppercase text-[#c9a84c]/70 hover:text-[#c9a84c] transition-colors font-sans"
          >
            Perseus
          </Link>
          <Link
            href="/story"
            className="text-sm text-[#e8dcc8]/50 hover:text-[#e8dcc8]/80 transition-colors font-sans"
          >
            Restart
          </Link>
        </div>
      </nav>

      <main className="min-h-screen pt-20 pb-16 px-6">
        <div className="max-w-[650px] mx-auto">
          <div className="mb-10 text-center">
            <p className="text-sm tracking-[0.3em] uppercase text-[#c9a84c]/70 font-sans mb-1">
              Further Reading
            </p>
            <h1 className="text-3xl md:text-4xl font-serif text-[#e8dcc8] font-normal">
              Sources
            </h1>
            <div className="mt-4 mx-auto w-16 h-px bg-[#c9a84c]/30" />
          </div>

          <div className="font-serif text-[17px] leading-[1.8] text-[#e8dcc8]/90 space-y-10">
            <div className="border-b border-[#c9a84c]/10 pb-8">
              <h2 className="text-lg font-serif text-[#c9a84c]/80 mb-2">
                Perseus — Theoi Greek Mythology
              </h2>
              <p className="text-[15px] text-[#e8dcc8]/60 mb-4">
                Draws directly from Apollodorus, Ovid, Hesiod, and Pindar.
                Covers the full myth: Danaë, Polydectes&rsquo;s feast, the
                Graeae, the nymphs&rsquo; gifts, Medusa&rsquo;s lair,
                Andromeda, and the Acrisius prophecy.
              </p>
              <a
                href="https://www.theoi.com/Heros/Perseus.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-sans tracking-[0.15em] uppercase text-[#c9a84c]/70 hover:text-[#c9a84c] transition-colors border-b border-[#c9a84c]/30 hover:border-[#c9a84c]/70 pb-px"
              >
                theoi.com/Heros/Perseus.html →
              </a>
            </div>

            <div className="pb-8">
              <h2 className="text-lg font-serif text-[#c9a84c]/80 mb-2">
                Medusa — World History Encyclopedia
              </h2>
              <p className="text-[15px] text-[#e8dcc8]/60 mb-4">
                Academic article covering the evolution of the Medusa myth,
                including Ovid&rsquo;s introduction of the Poseidon assault
                narrative and Athena&rsquo;s punishment.
              </p>
              <a
                href="https://www.worldhistory.org/Medusa/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-sans tracking-[0.15em] uppercase text-[#c9a84c]/70 hover:text-[#c9a84c] transition-colors border-b border-[#c9a84c]/30 hover:border-[#c9a84c]/70 pb-px"
              >
                worldhistory.org/Medusa →
              </a>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/story"
              className="inline-block px-10 py-4 border border-[#c9a84c]/40 text-[#c9a84c] hover:bg-[#c9a84c]/10 hover:border-[#c9a84c]/80 transition-all duration-300 text-sm font-sans tracking-[0.2em] uppercase"
            >
              Restart the Story
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
