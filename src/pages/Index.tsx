import { useState, useCallback } from "react";
import HeroScene from "@/components/HeroScene";
import HeroContent from "@/components/HeroContent";
import VoiceAgentModal from "@/components/VoiceAgentModal";
import Chatbot from "@/components/Chatbot";
import CursorGlow from "@/components/CursorGlow";
import IntroOverlay from "@/components/IntroOverlay";

const Index = () => {
  const [introComplete, setIntroComplete] = useState(false);
  const [voiceModalOpen, setVoiceModalOpen] = useState(false);

  const handleIntroComplete = useCallback(() => setIntroComplete(true), []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Gradient background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background" />
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px]" />
      </div>

      <IntroOverlay onComplete={handleIntroComplete} />

      {introComplete && (
        <>
          <CursorGlow />
          <HeroScene />
          <HeroContent onHireClick={() => setVoiceModalOpen(true)} />
          <VoiceAgentModal open={voiceModalOpen} onClose={() => setVoiceModalOpen(false)} />
          <Chatbot />
        </>
      )}
    </div>
  );
};

export default Index;
