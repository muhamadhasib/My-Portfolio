import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, MapPin } from "lucide-react";
import { useAnalytics } from "@/hooks/use-analytics";

interface SocialIconsProps {
  className?: string;
}

export function SocialIcons({ className = "" }: SocialIconsProps) {
  const { trackEvent } = useAnalytics();

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/muhamadhasib",
      label: "GitHub",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/muhammadhasib/",
      label: "LinkedIn",
    },
    {
      icon: Twitter,
      href: "https://x.com/hasib_me_",
      label: "Twitter",
    },
    {
      icon: Mail,
      href: "mailto:muhammadhasib.me@gmail.com",
      label: "Gmail",
    },
    {
      icon: MapPin,
      href: "https://maps.google.com/?q=Dhaka,Bangladesh",
      label: "Location",
    },
  ];

  const handleSocialClick = (label: string, href: string) => {
    trackEvent({
      action: "click",
      category: "social",
      label: label.toLowerCase(),
    });
  };

  return (
    <div className={`flex space-x-[clamp(1rem,2vw,1.5rem)] ${className} overflow-visible`}>
      {socialLinks.map(({ icon: Icon, href, label }, index) => (
        <motion.a
          key={label}
          href={href}
          target={label === "Gmail" ? "_self" : "_blank"}
          rel={label === "Gmail" ? undefined : "noopener noreferrer"}
          onClick={() => handleSocialClick(label, href)}
          className={`p-[clamp(0.75rem,1.5vw,1rem)] rounded-full group relative social-icon-adaptive will-change-transform`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 + index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Icon className="w-[clamp(1.25rem,2vw,1.5rem)] h-[clamp(1.25rem,2vw,1.5rem)] social-icon-color" />
          <span className="sr-only">{label}</span>
        </motion.a>
      ))}
    </div>
  );
}
