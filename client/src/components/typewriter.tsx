import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TypewriterProps {
  texts: string[];
  className?: string;
}

export function Typewriter({ texts, className = "" }: TypewriterProps) {
  const longestText = texts.reduce(
    (longest, text) => (text.length > longest.length ? text : longest),
    texts[0] ?? ""
  );
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    const currentText = texts[currentTextIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (currentCharIndex < currentText.length) {
          setDisplayText(currentText.substring(0, currentCharIndex + 1));
          setCurrentCharIndex((prev) => prev + 1);
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (currentCharIndex > 0) {
          setDisplayText(currentText.substring(0, currentCharIndex - 1));
          setCurrentCharIndex((prev) => prev - 1);
        } else {
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [currentCharIndex, currentTextIndex, isDeleting, texts]);

  return (
    <motion.div
      className={`${className} inline-grid justify-items-center lg:justify-items-start typing-animation-container`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      aria-live="polite"
    >
      {/* Reserve width/height for the longest role so text never clips */}
      <span className="invisible col-start-1 row-start-1 whitespace-nowrap pointer-events-none select-none" aria-hidden="true">
        {longestText}
      </span>
      <span className="col-start-1 row-start-1 whitespace-nowrap text-center lg:text-left typing-text-isolated">
        {displayText}
        <span className="inline-block w-[2px] h-[0.9em] ml-0.5 bg-foreground/60 align-middle animate-pulse" aria-hidden="true" />
      </span>
    </motion.div>
  );
}
