"use client";

interface ChapterHeaderProps {
  chapter: string;
  title: string;
}

export default function ChapterHeader({ chapter, title }: ChapterHeaderProps) {
  return (
    <div className="mb-8 text-center">
      <p
        className="text-sm tracking-[0.3em] uppercase text-[#2a8870]/70 font-sans mb-1 opacity-0"
        style={{ animation: "fadeSlideUp 0.5s ease 0.2s forwards" }}
      >
        Chapter {chapter}
      </p>
      <h2
        className="shimmer-title text-2xl md:text-3xl font-serif font-normal opacity-0"
        style={{ animation: "fadeSlideUp 0.55s ease 0.35s forwards, shimmer 1.8s ease 0.6s 1 forwards" }}
      >
        {title}
      </h2>
      <div
        className="mt-4 mx-auto w-16 h-px bg-[#2a8870]/30"
        style={{
          animation: "expandLine 0.6s ease 0.55s forwards, pulseGlow 3s ease-in-out 1.2s infinite",
          transform: "scaleX(0)",
          transformOrigin: "center",
          opacity: 0,
        }}
      />
    </div>
  );
}
