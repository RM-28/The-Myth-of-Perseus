"use client";

import Link from "next/link";

interface NavigationProps {
  showBack?: boolean;
  onBack?: () => void;
  onRestart?: () => void;
}

export default function Navigation({ showBack, onBack, onRestart }: NavigationProps) {
  return (
    <nav className="nav-bar fixed top-0 left-0 right-0 z-50 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto px-6 py-3 flex items-center justify-between">
        <Link
          href="/"
          className="text-sm tracking-[0.2em] uppercase text-[#2a8870]/70 hover:text-[#2a8870] transition-colors font-sans"
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
            href="/sources"
            className="text-sm text-[#e8dcc8]/50 hover:text-[#e8dcc8]/80 transition-colors font-sans"
          >
            Sources
          </Link>
          <button
            onClick={onRestart}
            className="text-sm text-[#e8dcc8]/50 hover:text-[#e8dcc8]/80 transition-colors font-sans cursor-pointer"
          >
            Restart
          </button>
        </div>
      </div>
    </nav>
  );
}
