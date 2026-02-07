import { Moon, Sun, Mail } from "lucide-react";
import { useTheme } from "./theme-provider";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState } from "react";

interface NavbarProps {
  onNewsletterClick: () => void;
}

export function Navbar({ onNewsletterClick }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const [newsletterRotation, setNewsletterRotation] = useState(0);
  const [themeRotation, setThemeRotation] = useState(0);

  return (
    <div className="navbar-section">
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="navbar-glass will-change-transform"
      >
        <div className="w-full flex justify-between items-center h-full">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-[clamp(1.25rem,3vw,1.5rem)] font-bold text-foreground"
          >
            MH
          </motion.div>

          <div className="flex items-center space-x-[clamp(0.75rem,2vw,1.25rem)]">
            {/* Newsletter Button - Apple Design Language */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                onClick={onNewsletterClick}
                onMouseEnter={() => setNewsletterRotation(180)}
                onMouseLeave={() => setNewsletterRotation(-180)}
                className="apple-newsletter-button flex items-center justify-center space-x-[clamp(0.5rem,1vw,0.75rem)] font-medium rounded-full"
              >
                <motion.div
                  animate={{ rotate: newsletterRotation }}
                  onAnimationComplete={() => {
                    if (newsletterRotation === -180) {
                      setNewsletterRotation(0);
                    }
                  }}
                  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                  style={{ display: "inline-flex" }}
                >
                  <Mail className="w-[clamp(1rem,2vw,1.25rem)] h-[clamp(1rem,2vw,1.25rem)]" />
                </motion.div>
                <span>Newsletter</span>
              </Button>
            </motion.div>

            {/* Apple Design Language Theme Toggle */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={toggleTheme}
                onMouseEnter={() => setThemeRotation(180)}
                onMouseLeave={() => setThemeRotation(-180)}
                variant="ghost"
                size="sm"
                className="apple-theme-toggle relative rounded-full flex items-center justify-center overflow-hidden"
              >
                <motion.div
                  className="relative z-10 flex items-center justify-center"
                  animate={{
                    rotate: theme === "light" ? 0 : 180,
                    opacity: theme === "light" ? 1 : 0,
                    scale: theme === "light" ? 1 : 0
                  }}
                  transition={{
                    duration: 0.35,
                    ease: [0.25, 0.1, 0.25, 1]
                  }}
                >
                  <motion.div
                    animate={{ rotate: themeRotation }}
                    onAnimationComplete={() => {
                      if (themeRotation === -180) {
                        setThemeRotation(0);
                      }
                    }}
                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                    style={{ display: "inline-flex" }}
                  >
                    <Moon className="w-[clamp(1.25rem,2vw,1.5rem)] h-[clamp(1.25rem,2vw,1.5rem)]" />
                  </motion.div>
                </motion.div>
                <motion.div
                  className="absolute inset-0 z-10 flex items-center justify-center"
                  animate={{
                    rotate: theme === "light" ? -180 : 0,
                    opacity: theme === "light" ? 0 : 1,
                    scale: theme === "light" ? 0 : 1
                  }}
                  transition={{
                    duration: 0.35,
                    ease: [0.25, 0.1, 0.25, 1]
                  }}
                >
                  <motion.div
                    animate={{ rotate: themeRotation }}
                    onAnimationComplete={() => {
                      if (themeRotation === -180) {
                        setThemeRotation(0);
                      }
                    }}
                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                    style={{ display: "inline-flex" }}
                  >
                    <Sun className="w-[clamp(1.25rem,2vw,1.5rem)] h-[clamp(1.25rem,2vw,1.5rem)]" />
                  </motion.div>
                </motion.div>
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.nav>
    </div>
  );
}
