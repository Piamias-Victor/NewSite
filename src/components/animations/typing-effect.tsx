"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TypingEffectProps {
  text: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  className?: string;
}

export function TypingEffect({
  text,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDuration = 2000,
  className,
}: TypingEffectProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const handleTyping = () => {
      const currentString = text[currentIndex] || "";

      if (isDeleting) {
        setDisplayedText((prev) => prev.slice(0, -1));
      } else {
        setDisplayedText((prev) => currentString.slice(0, prev.length + 1));
      }

      if (!isDeleting && displayedText === currentString) {
        setTimeout(() => setIsDeleting(true), pauseDuration);
      } else if (isDeleting && displayedText === "") {
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % text.length);
      }
    };

    const speed = isDeleting ? deletingSpeed : typingSpeed;
    const timer = setTimeout(handleTyping, speed);

    return () => clearTimeout(timer);
  }, [
    displayedText,
    isDeleting,
    currentIndex,
    text,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
  ]);

  return (
    <span className={cn("inline-block min-h-[1.5em] max-w-full break-words whitespace-pre-wrap align-bottom", className)}>
      {displayedText}
      <span className="animate-pulse">|</span>
    </span>
  );
}
