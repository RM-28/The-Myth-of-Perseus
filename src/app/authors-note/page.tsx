import Link from "next/link";

export default function AuthorsNote() {
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
            Read the Story
          </Link>
        </div>
      </nav>

      <main className="min-h-screen pt-20 pb-16 px-6">
        <div className="max-w-[650px] mx-auto">
          <div className="mb-10 text-center">
            <p className="text-sm tracking-[0.3em] uppercase text-[#c9a84c]/70 font-sans mb-1">
              Companion
            </p>
            <h1 className="text-3xl md:text-4xl font-serif text-[#e8dcc8] font-normal">
              Author&rsquo;s Note
            </h1>
            <div className="mt-4 mx-auto w-16 h-px bg-[#c9a84c]/30" />
          </div>

          <div className="font-serif text-[17px] leading-[1.8] text-[#e8dcc8]/90 space-y-6">
            <p className="text-[#c9a84c]/60 text-sm font-sans uppercase tracking-wider">
              [PLACEHOLDER — REPLACE WITH YOUR WRITING]
            </p>

            <h2 className="text-xl font-serif text-[#e8dcc8] mt-10 mb-4">
              Interpretive Framework
            </h2>
            <p>
              [PLACEHOLDER — Explain the interpretive argument your branching
              structure represents. Why did you design the choices the way you
              did? What does the branching structure itself argue about how myths
              work, how they get retold, and why different versions exist?]
            </p>

            <h2 className="text-xl font-serif text-[#e8dcc8] mt-10 mb-4">
              Sources &amp; Paths
            </h2>
            <p>
              [PLACEHOLDER — Explain which ancient sources informed which paths.
              For example: &ldquo;The heroic path draws primarily on Apollodorus&rsquo;s
              Library 2.4.2&ndash;4, which presents Perseus as a straightforward
              hero-figure...&rdquo; Map out how different source traditions led to
              different branching choices.]
            </p>

            <h2 className="text-xl font-serif text-[#e8dcc8] mt-10 mb-4">
              Design Decisions
            </h2>
            <p>
              [PLACEHOLDER — Discuss specific choices you made in designing the
              branches. Why does the Graeae scene offer three options? Why does
              the feminist path converge with certain other readings at the
              Andromeda episode? What does it mean that all paths must end with
              Medusa&rsquo;s death?]
            </p>

            <h2 className="text-xl font-serif text-[#e8dcc8] mt-10 mb-4">
              Works Cited
            </h2>
            <div className="text-[15px] leading-[1.9] text-[#e8dcc8]/70 space-y-3 pl-8 -indent-8">
              <p>
                [PLACEHOLDER — Full bibliography in MLA, Chicago, or your
                professor&rsquo;s preferred format. Include all ancient sources and
                modern scholarship referenced.]
              </p>
              <p className="text-[#e8dcc8]/40 italic">Example entries:</p>
              <p>
                Apollodorus. <em>The Library of Greek Mythology</em>. Translated
                by Robin Hard, Oxford University Press, 1997.
              </p>
              <p>
                Cixous, H&eacute;l&egrave;ne. &ldquo;The Laugh of the Medusa.&rdquo;{" "}
                <em>Signs</em>, vol. 1, no. 4, 1976, pp. 875&ndash;93.
              </p>
              <p>
                Hesiod. <em>Theogony</em>. Translated by M.L. West, Oxford
                University Press, 1988.
              </p>
              <p>
                Ovid. <em>Metamorphoses</em>. Translated by Charles Martin, W.W.
                Norton, 2004.
              </p>
              <p>
                Pindar. <em>Pythian Odes</em>. Translated by William H. Race,
                Harvard University Press, 1997.
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
