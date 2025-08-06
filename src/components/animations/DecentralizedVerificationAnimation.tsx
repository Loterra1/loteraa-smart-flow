
import React, { useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import * as THREE from 'three';

function AnimatedVerificationImage() {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useLoader(TextureLoader, '/lovable-uploads/70c0b3c4-dfb2-47a6-8fe5-684b32e91409.png');
  
  useFrame((state) => {
    if (meshRef.current) {
      // Bold rotation
      meshRef.current.rotation.z += 0.008;
      
      // Dynamic floating motion
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.2) * 0.3;
      meshRef.current.position.x = Math.cos(state.clock.elapsedTime * 0.8) * 0.2;
      
      // Bold scaling pulse
      const scale = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.15;
      meshRef.current.scale.setScalar(scale);
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <planeGeometry args={[6, 6]} />
      <meshBasicMaterial 
        map={texture} 
        transparent={true}
        opacity={1.0}
      />
    </mesh>
  );
}

function VerificationNodes() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
      groupRef.current.rotation.x += 0.002;
    }
  });

  // Create verification nodes around the image
  const nodes = [];
  for (let i = 0; i < 12; i++) {
    const angle = (i / 12) * Math.PI * 2;
    const radius = 3.5;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    const z = Math.sin(angle * 2) * 0.5;
    
    nodes.push(
      <mesh key={i} position={[x, y, z]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshBasicMaterial 
          color="#7142F6" 
          transparent={true} 
          opacity={0.8}
        />
      </mesh>
    );
  }

  return <group ref={groupRef}>{nodes}</group>;
}

export default function DecentralizedVerificationAnimation() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <Canvas
        className="w-full h-full"
        camera={{ position: [0, 0, 8], fov: 50 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight 
          position={[5, 5, 5]} 
          intensity={1.0} 
          color="#ffffff"
        />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#7142F6" />
        
        <AnimatedVerificationImage />
        <VerificationNodes />
      </Canvas>
    </div>
  );
}
