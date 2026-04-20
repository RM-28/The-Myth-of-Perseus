"use client";

import { useEffect, useState, ReactNode } from "react";

interface TransitionWrapperProps {
  children: ReactNode;
  nodeId: string;
}

export default function TransitionWrapper({ children, nodeId }: TransitionWrapperProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);
    const timer = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(timer);
  }, [nodeId]);

  return (
    <div
      className={`transition-all duration-500 ease-in-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      }`}
    >
      {children}
    </div>
  );
}
