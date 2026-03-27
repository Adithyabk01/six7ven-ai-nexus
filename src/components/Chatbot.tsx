import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";

interface ChatMessage {
  role: "bot" | "user";
  text: string;
}

const KNOWLEDGE_BASE: Record<string, string> = {
  "what is 6ix7ven": "6IX7VEN is a premium AI Voice Agent company. We build intelligent voice assistants for sales, customer support, and booking automation.",
  "services": "We offer AI Voice Agents for: Sales automation, Customer support, Appointment booking, Lead qualification, and Custom AI workflows.",
  "pricing": "Our pricing is tailored to your business needs. Click 'Get a Demo' to discuss a custom package with our team.",
  "how does it work": "Our AI agents integrate with your existing systems. They handle calls, qualify leads, book appointments, and provide 24/7 support — all through natural voice conversations.",
  "contact": "You can reach us by clicking 'Hire 6IX7VEN AI Agent' to speak with our AI, or 'Get a Demo' for a personalized walkthrough.",
  "voice agent": "Our voice agents use cutting-edge AI to have natural conversations. They can handle inbound and outbound calls, understand context, and take action.",
  "integration": "6IX7VEN agents integrate with CRMs, calendars, helpdesks, and communication platforms. We support Slack, email, and custom webhooks.",
};

const findAnswer = (input: string): string => {
  const lower = input.toLowerCase();
  for (const [key, value] of Object.entries(KNOWLEDGE_BASE)) {
    if (lower.includes(key) || key.split(" ").some((word) => word.length > 3 && lower.includes(word))) {
      return value;
    }
  }
  return "I can help with questions about 6IX7VEN's AI voice agent services. Try asking about our services, how it works, pricing, or integrations!";
};

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "bot", text: "Hi! I'm the 6IX7VEN assistant. Ask me anything about our AI voice agent services." },
  ]);
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "bot", text: findAnswer(userMsg) }]);
    }, 500);
  };

  return (
    <>
      {/* Toggle */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-[70] w-14 h-14 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center backdrop-blur-lg pulse-glow"
      >
        {open ? <X className="w-6 h-6 text-primary" /> : <MessageCircle className="w-6 h-6 text-primary" />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-[70] w-80 glass-panel-strong flex flex-col max-h-[420px]"
          >
            <div className="p-4 border-b border-glass-border/10">
              <h3 className="font-display font-semibold text-sm">6IX7VEN Support</h3>
              <p className="text-xs text-muted-foreground">Ask about our services</p>
            </div>
            <div className="flex-1 overflow-y-auto p-3 space-y-2 min-h-[200px]">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] px-3 py-2 rounded-xl text-xs ${
                      msg.role === "user"
                        ? "bg-accent/20 border border-accent/20"
                        : "bg-primary/10 border border-primary/15"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 border-t border-glass-border/10 flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Ask about 6IX7VEN..."
                className="flex-1 bg-muted/30 border border-glass-border/10 rounded-xl px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/30"
              />
              <button onClick={send} className="p-2 rounded-xl bg-primary/20 border border-primary/30 hover:bg-primary/30 transition-colors">
                <Send className="w-4 h-4 text-primary" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
