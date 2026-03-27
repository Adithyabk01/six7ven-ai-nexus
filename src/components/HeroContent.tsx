import { motion } from "framer-motion";

interface HeroContentProps {
  onHireClick: () => void;
}

const HeroContent = ({ onHireClick }: HeroContentProps) => {
  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-4"
      >
        Welcome to{" "}
        <span className="glow-text-cyan">6IX7VEN</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.7 }}
        className="text-xl md:text-2xl lg:text-3xl font-display font-light text-secondary-foreground mb-2"
      >
        Build Your Own AI Workforce
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="text-base md:text-lg text-muted-foreground mb-2 max-w-2xl"
      >
        Voice Agents for Sales, Support & Automation
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="text-xs tracking-[0.2em] uppercase text-muted-foreground/60 mb-12"
      >
        Powered by Intelligent Automation
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3, duration: 0.6 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <button className="btn-glass-cyan text-lg">
          Get a Demo
        </button>
        <button className="btn-glass-purple text-lg" onClick={onHireClick}>
          Hire 6IX7VEN AI Agent
        </button>
      </motion.div>
    </div>
  );
};

export default HeroContent;
