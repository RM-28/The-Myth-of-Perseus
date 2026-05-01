import Link from "next/link";

export default function Sources() {
  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1a1f2e]/90 backdrop-blur-sm border-b border-[#2a8870]/10">
        <div className="max-w-4xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link
            href="/"
            className="text-sm tracking-[0.2em] uppercase text-[#2a8870]/70 hover:text-[#2a8870] transition-colors font-sans"
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
            <p className="text-sm tracking-[0.3em] uppercase text-[#2a8870]/70 font-sans mb-1">
              Further Reading
            </p>
            <h1 className="text-3xl md:text-4xl font-serif text-[#e8dcc8] font-normal">
              Sources
            </h1>
            <div className="mt-4 mx-auto w-16 h-px bg-[#2a8870]/30" />
          </div>

          <div className="mb-14">
            <h2 className="text-xs tracking-[0.3em] uppercase text-[#2a8870]/60 font-sans mb-6">
              Works Cited
            </h2>
            <ol className="font-serif text-[16px] leading-[1.85] text-[#e8dcc8]/80 space-y-5 list-decimal list-outside ml-6">
              <li className="pl-2">
                Atsma, Aaron J. &ldquo;Perseus.&rdquo; <em>Theoi Greek Mythology</em>,{" "}
                <a
                  href="https://www.theoi.com/Heros/Perseus.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#2a8870]/70 hover:text-[#2a8870] transition-colors border-b border-[#2a8870]/30 hover:border-[#2a8870]/70"
                >
                  www.theoi.com/Heros/Perseus.html
                </a>
                . Accessed 30 Apr. 2026.
              </li>
              <li className="pl-2">
                &ldquo;Medusa.&rdquo; <em>World History Encyclopedia</em>,{" "}
                <a
                  href="https://www.worldhistory.org/Medusa/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#2a8870]/70 hover:text-[#2a8870] transition-colors border-b border-[#2a8870]/30 hover:border-[#2a8870]/70"
                >
                  www.worldhistory.org/Medusa/
                </a>
                . Accessed 30 Apr. 2026.
              </li>
              <li className="pl-2">
                Ovid. <em>Metamorphoses</em>. Translated by Stephanie McCarter, Penguin Classics, 2022.
              </li>
            </ol>
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/story"
              className="inline-block px-10 py-4 border border-[#2a8870]/40 text-[#2a8870] hover:bg-[#2a8870]/10 hover:border-[#2a8870]/80 transition-all duration-300 text-sm font-sans tracking-[0.2em] uppercase"
            >
              Restart the Story
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
