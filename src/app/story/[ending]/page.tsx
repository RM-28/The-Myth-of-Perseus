import React from "react";
import { getNode } from "@/data/story-nodes";
import ChapterHeader from "@/components/ChapterHeader";
import ChapterIllustration from "@/components/ChapterIllustration";
import Navigation from "@/components/Navigation";
import Link from "next/link";
import { notFound } from "next/navigation";

const ENDINGS: Record<string, string> = {
  "1": "ending_heroic",
  "2": "ending_ambiguous",
};

export function generateStaticParams() {
  return Object.keys(ENDINGS).map((n) => ({ ending: `ending=${n}` }));
}

export default async function EndingPage({
  params,
}: {
  params: Promise<{ ending: string }>;
}) {
  const { ending } = await params;
  const decoded = decodeURIComponent(ending);
  const match = decoded.match(/^ending=(\d+)$/);
  if (!match) notFound();

  const nodeId = ENDINGS[match[1]];
  if (!nodeId) notFound();

  const node = getNode(nodeId);
  if (!node) notFound();

  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-20 pb-16 px-6">
        <div className="max-w-[650px] mx-auto">
          <ChapterHeader chapter={node.chapter} title={node.chapterTitle} />

          <ChapterIllustration
            chapter={node.chapter}
            className="w-full mb-8 opacity-0 block rounded-sm overflow-hidden border border-[#c9a84c]/20"
            style={{ animation: "fadeSlideUp 0.6s ease 0.42s forwards" } as React.CSSProperties}
          />

          <div
            className="prose-story font-serif text-[17px] leading-[1.8] text-[#e8dcc8]/90 opacity-0"
            style={{ animation: "fadeSlideUp 0.6s ease 0.5s forwards" }}
            dangerouslySetInnerHTML={{ __html: node.text }}
          />

          <div className="mt-12 text-center">
            <div className="mb-8 mx-auto w-16 h-px bg-[#c9a84c]/30" />
            <p className="text-sm text-[#c9a84c]/60 font-sans tracking-wide uppercase mb-6">
              End of Path
            </p>
            <Link
              href="/story"
              className="inline-block px-6 py-3 border border-[#c9a84c]/30 text-[#c9a84c]/80 hover:border-[#c9a84c]/60 hover:text-[#c9a84c] transition-all text-sm font-sans tracking-wide"
            >
              Begin Again
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
