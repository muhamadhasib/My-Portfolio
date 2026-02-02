import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useAnalytics } from "@/hooks/use-analytics";
import { sendEmail } from "@/lib/email-service";

const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

interface NewsletterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NewsletterModal({ isOpen, onClose }: NewsletterModalProps) {
  const { toast } = useToast();
  const { trackEvent } = useAnalytics();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
  });

  const newsletterMutation = useMutation({
    mutationFn: async (data: NewsletterFormData) => {
      return await sendEmail({
        email: data.email,
        type: 'newsletter'
      });
    },
    onSuccess: (response) => {
      toast({
        title: "Welcome to the Neural Network!",
        description: response.message,
      });
      trackEvent({
        action: "subscribe",
        category: "newsletter",
        label: "newsletter_signup",
      });
      reset();
      onClose();
    },
    onError: (error) => {
      const errorMessage = error instanceof Error ? error.message : "Please try again later.";
      toast({
        title: "Subscription failed",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: NewsletterFormData) => {
    newsletterMutation.mutate(data);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          onClick={handleBackdropClick}
        >
          {/* Apple Design Language Backdrop - Subtle blur with opacity */}
          <motion.div
            className="fixed inset-0 backdrop-blur-md will-change-transform"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Subtle overlay - Light mode: dark overlay, Dark mode: light overlay */}
            <div className="absolute inset-0 bg-black/10 dark:bg-white/5" />
          </motion.div>

          {/* Centered Modal Container */}
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <motion.div
              className="relative w-full max-w-md pointer-events-auto will-change-transform text-left my-8"
              initial={{ scale: 0.85, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{
                scale: 0.85,
                opacity: 0,
                y: 40,
                transition: {
                  type: "spring",
                  stiffness: 220,
                  damping: 28,
                  mass: 1
                }
              }}
              transition={{
                type: "spring",
                stiffness: 160,
                damping: 19,
                mass: 1.2,
                restDelta: 0.001
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Apple-Style Modal Card with Website Gradient Background */}
              <div
                className="relative border border-border rounded-[2rem] shadow-[0_8px_30px_rgba(0,0,0,0.12)] overflow-hidden"
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
              >
                {/* Content Container */}
                <div className="relative p-6 md:p-10">
                  <Button
                    onClick={onClose}
                    variant="ghost"
                    size="sm"
                    className="absolute top-3 right-3 md:top-5 md:right-5 p-2 h-9 w-9 rounded-full border border-foreground/10 bg-transparent hover:bg-transparent hover:border-foreground/30 text-muted-foreground hover:text-foreground transition-all duration-200"
                    aria-label="Close modal"
                  >
                    <X className="w-4 h-4" />
                  </Button>

                  <div className="text-center mb-6 md:mb-10">
                    <h2 className="text-2xl md:text-[32px] font-semibold text-foreground mb-2 md:mb-3 tracking-[-0.02em]">
                      Newsletter
                    </h2>
                    <p className="text-muted-foreground text-sm md:text-[15px] leading-[1.47] max-w-sm mx-auto">
                      Get updates on AI insights, projects, and breakthrough discoveries
                    </p>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 md:space-y-7">
                    <div>
                      <Input
                        id="newsletter-email"
                        type="email"
                        {...register("email")}
                        className="h-[48px] md:h-[52px] rounded-full border-border bg-background px-5 text-[15px] focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:border-primary/50 transition-all duration-200"
                        placeholder="Your email"
                      />
                      {errors.email && (
                        <p className="text-[13px] text-destructive mt-2.5">{errors.email.message}</p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      disabled={newsletterMutation.isPending}
                      className="w-full h-[48px] md:h-[52px] rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium text-[15px] transition-all duration-200 shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)] active:scale-[0.98]"
                    >
                      {newsletterMutation.isPending ? (
                        <div className="flex items-center justify-center space-x-2.5">
                          <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                          <span>Subscribing...</span>
                        </div>
                      ) : (
                        <span>Subscribe</span>
                      )}
                    </Button>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
