import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FormData {
  client: string;
  phone: string;
  industry: string;
  useCase: string;
  summary: string;
}

const WEBHOOK_URL = "https://lazyy.app.n8n.cloud/webhook-test/658c2247-8afa-493f-a0c0-5ab1da6275a8";

const VoiceAgentModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const [form, setForm] = useState<FormData>({ client: "", phone: "", industry: "", useCase: "", summary: "" });
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.client.trim() || !form.phone.trim() || !form.industry.trim() || !form.useCase.trim()) return;

    setSubmitting(true);
    const payload = { ...form, timestamp: new Date().toISOString() };

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      toast({ title: "Request Sent ✓", description: "Our AI agent will reach out to you shortly." });
      setForm({ client: "", phone: "", industry: "", useCase: "", summary: "" });
      onClose();
    } catch (err) {
      console.error("Webhook error:", err);
      toast({ title: "Submission Failed", description: "Something went wrong. Please try again.", variant: "destructive" });
    }

    setSubmitting(false);
  };

  const inputClass =
    "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-colors";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-center justify-center p-4"
        >
          <div className="absolute inset-0 bg-background/80 backdrop-blur-md" onClick={onClose} />

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25 }}
            className="glass-panel-strong relative w-full max-w-lg p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-lg font-semibold">Let's Talk</h2>
              <button onClick={onClose} className="p-2 rounded-xl hover:bg-muted/50 transition-colors">
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="client"
                value={form.client}
                onChange={handleChange}
                placeholder="Name / Email"
                required
                maxLength={200}
                className={inputClass}
              />
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone Number (e.g. +1234567890)"
                required
                maxLength={20}
                type="tel"
                className={inputClass}
              />
              <input
                name="industry"
                value={form.industry}
                onChange={handleChange}
                placeholder="Industry"
                required
                maxLength={100}
                className={inputClass}
              />
              <input
                name="useCase"
                value={form.useCase}
                onChange={handleChange}
                placeholder="Use Case (Sales, Support, Booking…)"
                required
                maxLength={200}
                className={inputClass}
              />
              <textarea
                name="summary"
                value={form.summary}
                onChange={handleChange}
                placeholder="Brief summary of your requirements"
                rows={3}
                maxLength={1000}
                className={inputClass + " resize-none"}
              />

              <button
                type="submit"
                disabled={submitting}
                className="btn-glass-cyan w-full flex items-center justify-center gap-2 text-base disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                {submitting ? "Sending…" : "Submit"}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VoiceAgentModal;
