"use client";

import React, { useState, useRef, useEffect } from "react";

interface FitTextProps {
  children: React.ReactNode;
  maxFontSize?: number;
  minFontSize?: number;
  className?: string;
}

const FitText = ({ children, maxFontSize = 100, minFontSize = 8, className }: FitTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [fontSize, setFontSize] = useState(maxFontSize);

  useEffect(() => {
    const adjustTextSize = () => {
      const container = containerRef.current;
      const text = textRef.current;

      if (!container || !text) return;

      let currentFontSize = maxFontSize;
      text.style.fontSize = `${currentFontSize}px`;

      while (
        (text.scrollWidth > container.offsetWidth || text.scrollHeight > container.offsetHeight) &&
        currentFontSize > minFontSize
      ) {
        currentFontSize -= 1;
        text.style.fontSize = `${currentFontSize}px`;
      }

      setFontSize(currentFontSize);
    };

    adjustTextSize();
    window.addEventListener("resize", adjustTextSize);

    return () => window.removeEventListener("resize", adjustTextSize);
  }, [maxFontSize, minFontSize, children]);

  return (
    <div ref={containerRef} className={className}>
      <div ref={textRef} className="whitespace-pre-line" style={{ fontSize: `${fontSize}px` }}>
        {children}
      </div>
    </div>
  );
};

export default FitText;
