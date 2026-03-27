import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <section className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-20 text-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto glass-panel-strong p-10 md:p-16"
      >
        <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
          Meet <span className="glow-text-cyan">6IX7VEN</span>
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
          We build autonomous AI Voice Agents that handle your sales, support, and administrative tasks 24/7. 
          Unlike traditional chatbots, 6IX7VEN agents can engage in real-time fluid voice conversations, navigate 
          complex scenarios, and integrate directly with your CRM.
        </p>
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex-1 w-full">
            <h3 className="text-2xl font-bold mb-2">Zero Latency</h3>
            <p className="text-muted-foreground">Respond to customers instantly with fluid, human-like voice AI.</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex-1 w-full">
            <h3 className="text-2xl font-bold mb-2">Always On</h3>
            <p className="text-muted-foreground">Never miss a lead. Your 6IX7VEN agent works around the clock.</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutSection;
