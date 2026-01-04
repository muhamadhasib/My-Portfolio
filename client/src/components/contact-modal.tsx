import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useAnalytics } from "@/hooks/use-analytics";
import { sendEmail } from "@/lib/email-service";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const { toast } = useToast();
  const { trackEvent } = useAnalytics();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      return await sendEmail({
        name: data.name,
        email: data.email,
        message: data.message,
        type: 'contact'
      });
    },
    onSuccess: (response) => {
      toast({
        title: "Message sent successfully!",
        description: response.message,
      });
      trackEvent({
        action: "submit",
        category: "contact",
        label: "contact_form",
      });
      reset();
      onClose();
    },
    onError: (error) => {
      toast({
        title: "Failed to send message",
        description: error instanceof Error ? error.message : "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    contactMutation.mutate(data);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          onClick={handleBackdropClick}
        >
          {/* Apple Design Language Backdrop - Subtle blur with opacity */}
          <motion.div 
            className="absolute inset-0 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Subtle overlay - Light mode: dark overlay, Dark mode: light overlay */}
            <div className="absolute inset-0 bg-black/10 dark:bg-white/5" />
          </motion.div>

          {/* Centered Modal Container */}
          <div className="absolute inset-0 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              className="relative w-full max-w-lg pointer-events-auto"
              initial={{ scale: 0.96, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 20 }}
              transition={{ 
                type: "spring",
                stiffness: 300,
                damping: 30,
                duration: 0.4
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
                <div className="relative p-10">
                  <Button
                    onClick={onClose}
                    variant="ghost"
                    size="sm"
                    className="absolute top-5 right-5 p-2 h-9 w-9 rounded-full modal-close-button"
                    aria-label="Close modal"
                  >
                    <X className="w-4 h-4" />
                  </Button>

                  <div className="text-center mb-10">
                    <h2 className="text-[32px] font-semibold text-foreground mb-3 tracking-[-0.02em]">
                      Say Hello
                    </h2>
                    <p className="text-muted-foreground text-[15px] leading-[1.47] max-w-sm mx-auto">
                      Let's discuss your next AI project or collaboration
                    </p>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
                    <div>
                      <Input
                        id="name"
                        {...register("name")}
                        className="h-[52px] rounded-full border-border bg-background px-5 text-[15px] focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:border-primary/50 transition-all duration-200"
                        placeholder="Your full name"
                      />
                      {errors.name && (
                        <p className="text-[13px] text-destructive mt-2.5">{errors.name.message}</p>
                      )}
                    </div>

                    <div>
                      <Input
                        id="email"
                        type="email"
                        {...register("email")}
                        className="h-[52px] rounded-full border-border bg-background px-5 text-[15px] focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:border-primary/50 transition-all duration-200"
                        placeholder="Your email"
                      />
                      {errors.email && (
                        <p className="text-[13px] text-destructive mt-2.5">{errors.email.message}</p>
                      )}
                    </div>

                    <div>
                      <Textarea
                        id="message"
                        {...register("message")}
                        rows={5}
                        className="rounded-[1.5rem] border-border bg-background px-5 py-4 text-[15px] focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:border-primary/50 transition-all duration-200 resize-none"
                        placeholder="Tell me about your project or idea..."
                      />
                      {errors.message && (
                        <p className="text-[13px] text-destructive mt-2.5">{errors.message.message}</p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      disabled={contactMutation.isPending}
                      className="w-full h-[52px] rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium text-[15px] transition-all duration-200 shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)] active:scale-[0.98]"
                    >
                      {contactMutation.isPending ? (
                        <div className="flex items-center justify-center space-x-2.5">
                          <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                          <span>Sending...</span>
                        </div>
                      ) : (
                        <span>Send Message</span>
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
