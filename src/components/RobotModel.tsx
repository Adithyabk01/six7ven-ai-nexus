import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, Torus, Cylinder, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

const RobotModel = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.15;
  });

  return (
    <group ref={groupRef}>
      {/* Core orb */}
      <Sphere args={[0.8, 64, 64]} position={[0, 0.2, 0]}>
        <MeshDistortMaterial
          color="#00d4ff"
          emissive="#00d4ff"
          emissiveIntensity={0.3}
          roughness={0.1}
          metalness={0.9}
          distort={0.15}
          speed={2}
          transparent
          opacity={0.85}
        />
      </Sphere>

      {/* Inner glow */}
      <Sphere args={[0.5, 32, 32]} position={[0, 0.2, 0]}>
        <meshStandardMaterial
          color="#7c3aed"
          emissive="#7c3aed"
          emissiveIntensity={0.8}
          transparent
          opacity={0.4}
        />
      </Sphere>

      {/* Orbital ring 1 */}
      <Torus args={[1.2, 0.02, 16, 100]} position={[0, 0.2, 0]} rotation={[Math.PI / 3, 0, 0]}>
        <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={0.5} transparent opacity={0.6} />
      </Torus>

      {/* Orbital ring 2 */}
      <Torus args={[1.4, 0.015, 16, 100]} position={[0, 0.2, 0]} rotation={[-Math.PI / 4, Math.PI / 6, 0]}>
        <meshStandardMaterial color="#7c3aed" emissive="#7c3aed" emissiveIntensity={0.5} transparent opacity={0.4} />
      </Torus>

      {/* Base pedestal */}
      <Cylinder args={[0.4, 0.6, 0.1, 32]} position={[0, -0.8, 0]}>
        <meshStandardMaterial color="#1a1a2e" emissive="#00d4ff" emissiveIntensity={0.15} metalness={0.8} roughness={0.2} />
      </Cylinder>

      {/* Eye dots */}
      <Sphere args={[0.08, 16, 16]} position={[-0.25, 0.35, 0.7]}>
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1} />
      </Sphere>
      <Sphere args={[0.08, 16, 16]} position={[0.25, 0.35, 0.7]}>
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1} />
      </Sphere>
    </group>
  );
};

export default RobotModel;
