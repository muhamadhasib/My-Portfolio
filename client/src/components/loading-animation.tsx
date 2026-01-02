import { motion } from "framer-motion";

export function LoadingAnimation() {
  const fullText = "CONNECTING.......";
  const characters = fullText.split("");

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        background: `
          radial-gradient(circle at 20% 50%, hsla(270, 85%, 60%, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, hsla(188, 95%, 44%, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 40% 80%, hsla(328, 85%, 70%, 0.1) 0%, transparent 50%),
          var(--background)
        `,
        backgroundAttachment: 'fixed',
        backgroundSize: '100% 100%'
      }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="relative z-10 text-center">
        <motion.div
          className="flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ 
            duration: 0.35, 
            ease: [0.16, 1, 0.3, 1]
          }}
        >
          <div className="flex items-center">
            {characters.map((char, index) => (
              <motion.span
                key={index}
                className="text-2xl lg:text-3xl font-medium text-gray-800 dark:text-gray-200 tracking-wide inline-block"
                style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}
                initial={{ opacity: 0, transform: "translateY(4px) scale(0.95)" }}
                animate={{ opacity: 1, transform: "translateY(0px) scale(1)" }}
                transition={{
                  duration: 0.35,
                  delay: index * 0.035,
                  ease: [0.16, 1, 0.3, 1],
                  opacity: { 
                    duration: 0.25, 
                    delay: index * 0.035,
                    ease: [0.16, 1, 0.3, 1] 
                  }
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}