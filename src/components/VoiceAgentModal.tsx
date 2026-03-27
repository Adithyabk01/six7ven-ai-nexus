import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback, useEffect, useRef } from "react";
import { X, Mic, MicOff } from "lucide-react";

interface Message {
  role: "agent" | "user";
  text: string;
}

const AGENT_FLOW = [
  "Hi! This is 6IX7VEN AI. Let's build something powerful for your business.",
  "What industry are you in?",
  "What would you like the AI to handle? Sales, Support, or Booking?",
  "Great! Any specific requirements you'd like to share?",
  "Thank you! We'll prepare a custom solution for you. Our team will reach out shortly.",
];

const VoiceAgentModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [flowIdx, setFlowIdx] = useState(0);
  const [listening, setListening] = useState(false);
  const [isAgentSpeaking, setIsAgentSpeaking] = useState(false);
  const recognitionRef = useRef<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const responsesRef = useRef<Record<string, string>>({});

  const speakAgent = useCallback((text: string) => {
    setIsAgentSpeaking(true);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    utterance.onend = () => setIsAgentSpeaking(false);
    speechSynthesis.speak(utterance);
  }, []);

  const addAgentMessage = useCallback((idx: number) => {
    if (idx >= AGENT_FLOW.length) return;
    const text = AGENT_FLOW[idx];
    setMessages((prev) => [...prev, { role: "agent", text }]);
    speakAgent(text);
  }, [speakAgent]);

  useEffect(() => {
    if (open) {
      setMessages([]);
      setFlowIdx(0);
      responsesRef.current = {};
      const t = setTimeout(() => addAgentMessage(0), 600);
      return () => clearTimeout(t);
    } else {
      speechSynthesis.cancel();
      if (recognitionRef.current) recognitionRef.current.stop();
      setListening(false);
    }
  }, [open, addAgentMessage]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const startListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      // Fallback: use prompt
      const response = prompt("Type your response:");
      if (response) handleUserResponse(response);
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";
    recognition.onresult = (e: SpeechRecognitionEvent) => {
      const transcript = e.results[0][0].transcript;
      handleUserResponse(transcript);
    };
    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);
    recognitionRef.current = recognition;
    recognition.start();
    setListening(true);
  };

  const handleUserResponse = (text: string) => {
    setListening(false);
    setMessages((prev) => [...prev, { role: "user", text }]);

    const keys = ["name", "industry", "use_case", "requirements_summary"];
    const nextIdx = flowIdx + 1;
    if (flowIdx > 0 && flowIdx - 1 < keys.length) {
      responsesRef.current[keys[flowIdx - 1]] = text;
    }

    setFlowIdx(nextIdx);
    setTimeout(() => addAgentMessage(nextIdx), 800);

    // If last question answered, send webhook
    if (nextIdx >= AGENT_FLOW.length - 1) {
      responsesRef.current[keys[Math.min(flowIdx - 1, keys.length - 1)]] = text;
      // TODO: send to n8n webhook
      console.log("Captured data:", responsesRef.current);
    }
  };

  const isConversationDone = flowIdx >= AGENT_FLOW.length;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-background/80 backdrop-blur-md" onClick={onClose} />

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25 }}
            className="glass-panel-strong relative w-full max-w-lg p-6 max-h-[80vh] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${isAgentSpeaking ? "bg-primary pulse-glow" : "bg-primary/50"}`} />
                <h2 className="font-display text-lg font-semibold">6IX7VEN AI Agent</h2>
              </div>
              <button onClick={onClose} className="p-2 rounded-xl hover:bg-muted/50 transition-colors">
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            {/* Waveform visualizer */}
            {(isAgentSpeaking || listening) && (
              <div className="flex items-center justify-center gap-1 h-8 mb-3">
                {Array.from({ length: 12 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className={`w-1 rounded-full ${listening ? "bg-accent" : "bg-primary"}`}
                    animate={{
                      height: [4, Math.random() * 24 + 8, 4],
                    }}
                    transition={{
                      duration: 0.5 + Math.random() * 0.3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.05,
                    }}
                  />
                ))}
              </div>
            )}

            {/* Transcript */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-3 mb-4 pr-2 min-h-[200px]">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm ${
                      msg.role === "user"
                        ? "bg-accent/20 border border-accent/30 text-foreground"
                        : "bg-primary/10 border border-primary/20 text-foreground"
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Mic button */}
            {!isConversationDone && (
              <div className="flex justify-center">
                <button
                  onClick={listening ? () => recognitionRef.current?.stop() : startListening}
                  disabled={isAgentSpeaking}
                  className={`p-4 rounded-full transition-all duration-300 ${
                    listening
                      ? "bg-accent/30 border border-accent/50 pulse-glow"
                      : "bg-primary/10 border border-primary/30 hover:bg-primary/20"
                  } disabled:opacity-40 disabled:cursor-not-allowed`}
                >
                  {listening ? <MicOff className="w-6 h-6 text-accent" /> : <Mic className="w-6 h-6 text-primary" />}
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VoiceAgentModal;
