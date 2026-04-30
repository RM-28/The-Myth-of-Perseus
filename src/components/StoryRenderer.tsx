"use client";

import React, { useCallback, useState } from "react";
import { getNode, getStartNode, StoryNode } from "@/data/story-nodes";
import ChapterHeader from "./ChapterHeader";
import ChapterIllustration from "./ChapterIllustration";
import ChoiceButton from "./ChoiceButton";
import TransitionWrapper from "./TransitionWrapper";
import Navigation from "./Navigation";
import Link from "next/link";

export default function StoryRenderer() {
  const [history, setHistory] = useState<string[]>([]);
  const [currentNode, setCurrentNode] = useState<StoryNode>(getStartNode());

  const navigate = useCallback(
    (nextId: string) => {
      const next = getNode(nextId);
      if (next) {
        setHistory((prev) => [...prev, currentNode.id]);
        setCurrentNode(next);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    [currentNode.id]
  );

  const goBack = useCallback(() => {
    if (history.length === 0) return;
    const prevId = history[history.length - 1];
    const prev = getNode(prevId);
    if (prev) {
      setHistory((h) => h.slice(0, -1));
      setCurrentNode(prev);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [history]);

  return (
    <>
      <Navigation showBack={history.length > 0} onBack={goBack} />
      <main className="min-h-screen pt-20 pb-16 px-6">
        <div className="max-w-[650px] mx-auto">
          <TransitionWrapper nodeId={currentNode.id}>
            <ChapterHeader
              key={currentNode.id}
              chapter={currentNode.chapter}
              title={currentNode.chapterTitle}
            />

            <ChapterIllustration
              key={`illustration-${currentNode.id}`}
              chapter={currentNode.chapter}
              className="w-full mb-8 opacity-0 block rounded-sm overflow-hidden border border-[#c9a84c]/20"
              style={{ animation: "fadeSlideUp 0.6s ease 0.42s forwards" } as React.CSSProperties}
            />

            <div
              key={`prose-${currentNode.id}`}
              className="prose-story font-serif text-[17px] leading-[1.8] text-[#e8dcc8]/90 opacity-0"
              style={{ animation: "fadeSlideUp 0.6s ease 0.5s forwards" }}
              dangerouslySetInnerHTML={{ __html: currentNode.text }}
            />

            {currentNode.isEnding ? (
              <div className="mt-12 text-center">
                <div className="mb-8 mx-auto w-16 h-px bg-[#c9a84c]/30" />
                <p className="text-sm text-[#c9a84c]/60 font-sans tracking-wide uppercase mb-6">
                  End of Path
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/story"
                    className="inline-block px-6 py-3 border border-[#c9a84c]/30 text-[#c9a84c]/80 hover:border-[#c9a84c]/60 hover:text-[#c9a84c] transition-all text-sm font-sans tracking-wide"
                  >
                    Begin Again
                  </Link>
                  {/* Author's Note — commented out for now
                  <Link
                    href="/authors-note"
                    className="inline-block px-6 py-3 border border-[#c9a84c]/30 text-[#c9a84c]/80 hover:border-[#c9a84c]/60 hover:text-[#c9a84c] transition-all text-sm font-sans tracking-wide"
                  >
                    Author&rsquo;s Note
                  </Link>
                  */}
                </div>
              </div>
            ) : (
              <div className="mt-10 flex flex-col gap-3">
                {currentNode.choices.map((choice, i) => (
                  <ChoiceButton
                    key={`${currentNode.id}-${i}`}
                    text={choice.text}
                    onClick={() => navigate(choice.next)}
                    delay={600 + i * 150}
                  />
                ))}
              </div>
            )}

            {currentNode.sourceNote && (
              <p className="mt-10 text-xs text-[#e8dcc8]/30 font-sans border-t border-[#e8dcc8]/10 pt-4">
                Source: {currentNode.sourceNote}
              </p>
            )}
          </TransitionWrapper>
        </div>
      </main>
    </>
  );
}
