"use client";

interface ChoiceButtonProps {
  text: string;
  onClick: () => void;
  delay?: number;
}

export default function ChoiceButton({ text, onClick, delay = 0 }: ChoiceButtonProps) {
  return (
    <button
      onClick={onClick}
      className="choice-fill w-full text-left px-6 py-4 border border-[#2a8870]/30 rounded-sm
        text-[#e8dcc8]/90 font-serif text-base leading-relaxed
        hover:border-[#2a8870]/70 hover:shadow-[inset_3px_0_0_rgba(42,136,112,0.6)]
        hover:text-[#e8dcc8]
        transition-colors duration-200 ease-in-out
        opacity-0 animate-[slideUp_0.5s_ease_forwards]
        cursor-pointer"
      style={{ animationDelay: `${delay}ms` }}
    >
      <span className="italic">{text}</span>
    </button>
  );
}
