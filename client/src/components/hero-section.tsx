import { motion } from "framer-motion";
import { Send, FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Typewriter } from "@/components/typewriter";
import { Avatar3D } from "@/components/avatar-3d";
import { SocialIcons } from "@/components/social-icons";
import { useAnalytics } from "@/hooks/use-analytics";

interface HeroSectionProps {
  onContactClick: () => void;
}

export function HeroSection({ onContactClick }: HeroSectionProps) {
  const { trackEvent } = useAnalytics();

  const roles = ["Software Engineer", "Problem Solver"];

  const handleResumeDownload = () => {
    trackEvent({
      action: "download",
      category: "resume",
      label: "hero_section",
    });

    const link = document.createElement("a");
    link.href = "/assets/documents/Muhammad_Hasib_Resume.pdf";
    link.download = "Muhammad_Hasib_Resume.pdf";
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const bioText = `I'm a Computer Science & Engineering student and passionate AI & ML Engineer. I architect intelligent systems with Python and JavaScript, solved 500+ LeetCode problems, and push the boundaries of human-machine creativity.`;

  return (
    <article className="content-section overflow-visible" role="article" aria-labelledby="hero-heading">
      <motion.div
        className="content-width-limit max-container overflow-visible w-full"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfilePage",
              mainEntity: {
                "@type": "Person",
                name: "Muhammad Hasib",
                jobTitle: "AI & ML Engineer",
                description: bioText,
                url: "https://muhammadhasib.dev",
                knowsAbout: [
                  "Artificial Intelligence",
                  "Machine Learning",
                  "Neural Networks",
                  "Deep Learning",
                  "Python Programming",
                  "JavaScript Development",
                  "Algorithm Design",
                  "Computer Science",
                  "LeetCode Problem Solving",
                  "Software Engineering",
                ],
                sameAs: [
                  "https://github.com/muhamadhasib",
                  "https://linkedin.com/in/muhammad-hasib",
                  "https://twitter.com/hasib_me_",
                ],
              },
            }),
          }}
        />

        {/* Desktop layout — unchanged */}
        <motion.div
          className="desktop-grid overflow-visible foldable-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <motion.div
            className="home-section-spacing overflow-visible text-content-isolated"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              isolation: "isolate",
              transform: "translateZ(0)",
              contain: "layout style",
            }}
          >
            <motion.div
              className="home-section-spacing bio-full-width"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <motion.h1
                id="hero-heading"
                className="responsive-name font-bold name-single-line will-change-transform"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              >
                Muhammad Hasib
              </motion.h1>
              <motion.div
                className="responsive-role font-medium text-foreground opacity-80 typing-container-isolated"
                aria-label="Professional roles"
              >
                <Typewriter texts={roles} className="typing-animation-isolated" />
              </motion.div>
            </motion.div>

            <motion.p
              className="responsive-bio text-muted-foreground bio-full-width desktop-content-block bio-text-isolation will-change-transform"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              style={{ isolation: "isolate", transform: "translateZ(0)" }}
            >
              {bioText}
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-[clamp(0.75rem,2vw,1.25rem)] will-change-transform bio-full-width desktop-content-block"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              role="group"
              aria-label="Contact and resume actions"
            >
              <Button
                onClick={onContactClick}
                className="contact-button responsive-button flex items-center justify-center space-x-[clamp(0.5rem,1vw,0.75rem)] font-medium"
              >
                <Send className="w-[clamp(1rem,2vw,1.25rem)] h-[clamp(1rem,2vw,1.25rem)]" />
                <span>Contact Me</span>
              </Button>

              <Button
                onClick={handleResumeDownload}
                className="resume-button responsive-button flex items-center justify-center space-x-[clamp(0.5rem,1vw,0.75rem)] font-medium"
              >
                <FileDown className="w-[clamp(1rem,2vw,1.25rem)] h-[clamp(1rem,2vw,1.25rem)]" />
                <span>Resume</span>
              </Button>
            </motion.div>

            <SocialIcons className="bio-full-width desktop-content-block" />
          </motion.div>

          <motion.div
            className="flex justify-center items-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Avatar3D />
          </motion.div>
        </motion.div>

        {/* Mobile / tablet layout — responsive fixes scoped here */}
        <div className="mobile-layout">
          <motion.div
            className="avatar-container shrink-0"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Avatar3D />
          </motion.div>

          <motion.div
            className="home-section-spacing w-full min-w-0 max-w-full overflow-visible mobile-text-column"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="home-section-spacing text-center w-full min-w-0">
              <h1 className="responsive-name font-bold name-single-line w-full">Muhammad Hasib</h1>
              <motion.div
                className="responsive-role font-medium text-foreground/80 typing-container-isolated w-full"
                aria-label="Professional roles"
              >
                <Typewriter texts={roles} className="typing-animation-isolated" />
              </motion.div>
            </div>

            <p className="responsive-bio text-muted-foreground bio-full-width tablet-content-block bio-text-isolation text-justify-mobile text-center max-w-lg mx-auto">
              {bioText}
            </p>

            <motion.div
              className="flex flex-col md:flex-row gap-[clamp(0.75rem,2vw,1.25rem)] bio-full-width tablet-content-block max-w-lg mx-auto w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              role="group"
              aria-label="Contact and resume actions"
            >
              <Button
                onClick={onContactClick}
                className="contact-button responsive-button flex items-center justify-center gap-[clamp(0.5rem,1vw,0.75rem)] font-medium w-full"
              >
                <Send className="w-[clamp(1rem,2vw,1.25rem)] h-[clamp(1rem,2vw,1.25rem)]" aria-hidden />
                <span>Contact Me</span>
              </Button>

              <Button
                onClick={handleResumeDownload}
                className="resume-button responsive-button flex items-center justify-center gap-[clamp(0.5rem,1vw,0.75rem)] font-medium w-full"
              >
                <FileDown className="w-[clamp(1rem,2vw,1.25rem)] h-[clamp(1rem,2vw,1.25rem)]" aria-hidden />
                <span>Resume</span>
              </Button>
            </motion.div>

            <SocialIcons className="bio-full-width tablet-content-block social-icons-mobile" />
          </motion.div>
        </div>
      </motion.div>
    </article>
  );
}
