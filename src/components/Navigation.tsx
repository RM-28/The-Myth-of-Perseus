"use client";

import Link from "next/link";

interface NavigationProps {
  showBack?: boolean;
  onBack?: () => void;
}

export default function Navigation({ showBack, onBack }: NavigationProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1a1f2e]/90 backdrop-blur-sm border-b border-[#c9a84c]/10">
      <div className="max-w-4xl mx-auto px-6 py-3 flex items-center justify-between">
        <Link
          href="/"
          className="text-sm tracking-[0.2em] uppercase text-[#c9a84c]/70 hover:text-[#c9a84c] transition-colors font-sans"
        >
          Perseus
        </Link>
        <div className="flex items-center gap-6">
          {showBack && onBack && (
            <button
              onClick={onBack}
              className="text-sm text-[#e8dcc8]/50 hover:text-[#e8dcc8]/80 transition-colors font-sans cursor-pointer"
            >
              Go Back
            </button>
          )}
          {/* Author's Note — commented out for now
          <Link
            href="/authors-note"
            className="text-sm text-[#e8dcc8]/50 hover:text-[#e8dcc8]/80 transition-colors font-sans"
          >
            Author&rsquo;s Note
          </Link>
          */}
          <Link
            href="/story"
            className="text-sm text-[#e8dcc8]/50 hover:text-[#e8dcc8]/80 transition-colors font-sans"
          >
            Restart
          </Link>
        </div>
      </div>
    </nav>
  );
}
