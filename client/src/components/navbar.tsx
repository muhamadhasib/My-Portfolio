import { Moon, Sun, Mail } from "lucide-react";
import { useTheme } from "./theme-provider";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

const THEME_ICON_MS = 0.12;

function usePrefersHover() {
  const [prefersHover, setPrefersHover] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover)");
    const update = () => setPrefersHover(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return prefersHover;
}

interface NavbarProps {
  onNewsletterClick: () => void;
}

export function Navbar({ onNewsletterClick }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const prefersHover = usePrefersHover();
  const [newsletterRotation, setNewsletterRotation] = useState(0);
  const [themeRotation, setThemeRotation] = useState(0);

  const handleThemeIconEnter = useCallback(() => {
    if (prefersHover) setThemeRotation(180);
  }, [prefersHover]);

  const handleThemeIconLeave = useCallback(() => {
    if (prefersHover) setThemeRotation(-180);
  }, [prefersHover]);

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
                  <Mail className="nav-action-icon" />
                </motion.div>
                <span>Newsletter</span>
              </Button>
            </motion.div>

            {/* Apple Design Language Theme Toggle */}
            <motion.div
              whileHover={prefersHover ? { scale: 1.02 } : undefined}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                onClick={toggleTheme}
                onMouseEnter={handleThemeIconEnter}
                onMouseLeave={handleThemeIconLeave}
                variant="ghost"
                size="icon"
                aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
                className="apple-theme-toggle theme-switch-skip relative flex items-center justify-center overflow-hidden"
              >
                <motion.div
                  className="relative z-10 flex items-center justify-center"
                  animate={{
                    rotate: theme === "light" ? 0 : 180,
                    opacity: theme === "light" ? 1 : 0,
                    scale: theme === "light" ? 1 : 0
                  }}
                  transition={{
                    duration: THEME_ICON_MS,
                    ease: [0.4, 0, 0.2, 1]
                  }}
                >
                  <motion.div
                    animate={{ rotate: themeRotation }}
                    onAnimationComplete={() => {
                      if (themeRotation === -180) {
                        setThemeRotation(0);
                      }
                    }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    style={{ display: "inline-flex" }}
                  >
                    <Moon className="nav-action-icon" />
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
                    duration: THEME_ICON_MS,
                    ease: [0.4, 0, 0.2, 1]
                  }}
                >
                  <motion.div
                    animate={{ rotate: themeRotation }}
                    onAnimationComplete={() => {
                      if (themeRotation === -180) {
                        setThemeRotation(0);
                      }
                    }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    style={{ display: "inline-flex" }}
                  >
                    <Sun className="nav-action-icon" />
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
