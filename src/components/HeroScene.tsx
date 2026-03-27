import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import RobotModel from "./RobotModel";
import ParticleField from "./ParticleField";

const HeroScene = () => {
  return (
    <div className="absolute inset-0 z-0 h-screen w-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
        eventSource={document.getElementById("root") || undefined}
        eventPrefix="client"
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.2} />
          <pointLight position={[5, 5, 5]} intensity={0.8} color="#00d4ff" />
          <pointLight position={[-5, -3, 3]} intensity={0.4} color="#7c3aed" />
          <spotLight position={[0, 10, 0]} intensity={0.5} color="#00d4ff" angle={0.3} penumbra={1} />
          <RobotModel />
          <ParticleField />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.3} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default HeroScene;
