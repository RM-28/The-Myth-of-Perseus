"use client";

import React, { useCallback, useEffect, useState } from "react";
import { getNode, getStartNode, StoryNode } from "@/data/story-nodes";
import ChapterHeader from "./ChapterHeader";
import ChapterIllustration from "./ChapterIllustration";
import ChoiceButton from "./ChoiceButton";
import TransitionWrapper from "./TransitionWrapper";
import Navigation from "./Navigation";

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

  useEffect(() => {
    document.body.dataset.chapter = currentNode.chapter;
    const themes: Record<string, { bg: string; glow: string }> = {
      I:    { bg: "#1c0c12", glow: "rgba(140,20,20,0.18)" },
      II:   { bg: "#080e22", glow: "rgba(100,130,220,0.15)" },
      III:  { bg: "#0a0c14", glow: "rgba(80,90,120,0.12)" },
      IV:   { bg: "#081412", glow: "rgba(40,120,100,0.14)" },
      V:    { bg: "#070808", glow: "rgba(30,60,10,0.18)" },
      VI:   { bg: "#040e1e", glow: "rgba(20,60,160,0.16)" },
      VII:  { bg: "#060c14", glow: "rgba(50,100,160,0.14)" },
      VIII: { bg: "#0e0c10", glow: "rgba(120,8,8,0.16)" },
      IX:   { bg: "#180808", glow: "rgba(160,20,20,0.20)" },
    };
    const t = themes[currentNode.chapter];
    if (t) {
      document.body.style.backgroundColor = t.bg;
      document.body.style.backgroundImage = `radial-gradient(ellipse at 50% 0%, ${t.glow} 0%, transparent 65%)`;
    }
    return () => {
      delete document.body.dataset.chapter;
      document.body.style.backgroundColor = "";
      document.body.style.backgroundImage = "";
    };
  }, [currentNode.chapter]);

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

  const resetStory = useCallback(() => {
    setHistory([]);
    setCurrentNode(getStartNode());
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <Navigation showBack={history.length > 0} onBack={goBack} onRestart={resetStory} />
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
              className="w-full mb-8 opacity-0 block rounded-sm overflow-hidden border border-[#2a8870]/20"
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
                <div className="mb-8 mx-auto w-16 h-px bg-[#2a8870]/30" />
                <p className="text-sm text-[#2a8870]/60 font-sans tracking-wide uppercase mb-6">
                  End of Path
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={resetStory}
                    className="inline-block px-6 py-3 border border-[#2a8870]/30 text-[#2a8870]/80 hover:border-[#2a8870]/60 hover:text-[#2a8870] transition-all text-sm font-sans tracking-wide cursor-pointer"
                  >
                    Begin Again
                  </button>
                  {/* Author's Note — commented out for now
                  <Link
                    href="/authors-note"
                    className="inline-block px-6 py-3 border border-[#2a8870]/30 text-[#2a8870]/80 hover:border-[#2a8870]/60 hover:text-[#2a8870] transition-all text-sm font-sans tracking-wide"
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
