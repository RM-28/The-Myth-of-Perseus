"use client";

import { useState } from "react";

interface Particle {
  id: number;
  left: string;
  top: string;
  size: number;
  floatDuration: number;
  floatDelay: number;
  twinkleDuration: number;
  twinkleDelay: number;
}

function createParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 120}%`,
    size: Math.random() * 2 + 0.5,
    floatDuration: Math.random() * 30 + 25,
    floatDelay: Math.random() * 20,
    twinkleDuration: Math.random() * 5 + 3,
    twinkleDelay: Math.random() * 8,
  }));
}

export default function ParticleBackground() {
  const [particles] = useState<Particle[]>(() => createParticles(40));

  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-[#c9a84c]"
          style={{
            left: p.left,
            top: p.top,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animation: `float ${p.floatDuration}s ease-in-out ${p.floatDelay}s infinite, twinkle ${p.twinkleDuration}s ease-in-out ${p.twinkleDelay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
