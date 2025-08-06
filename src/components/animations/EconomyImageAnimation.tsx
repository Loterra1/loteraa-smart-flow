
import React, { useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import * as THREE from 'three';

function AnimatedEconomyImage() {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useLoader(TextureLoader, '/lovable-uploads/857efa3a-7f7d-49b2-a2d8-a2fd2a0b1e34.png');
  
  useFrame((state) => {
    if (meshRef.current) {
      // Gentle rotation
      meshRef.current.rotation.z += 0.002;
      
      // Subtle floating motion
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.1;
      
      // Gentle scaling pulse
      const scale = 1 + Math.sin(state.clock.elapsedTime * 0.8) * 0.03;
      meshRef.current.scale.setScalar(scale);
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <planeGeometry args={[4, 4]} />
      <meshBasicMaterial 
        map={texture} 
        transparent={true}
        opacity={0.9}
      />
    </mesh>
  );
}

function FloatingElements() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
    }
  });

  // Create floating elements around the image
  const elements = [];
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2;
    const radius = 2.5;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    
    elements.push(
      <mesh key={i} position={[x, y, 0.2]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshBasicMaterial 
          color="#ffffff" 
          transparent={true} 
          opacity={0.6}
        />
      </mesh>
    );
  }

  return <group ref={groupRef}>{elements}</group>;
}

export default function EconomyImageAnimation() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <Canvas
        className="w-full h-full"
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight 
          position={[3, 3, 3]} 
          intensity={0.6} 
          color="#ffffff"
        />
        
        <AnimatedEconomyImage />
        <FloatingElements />
      </Canvas>
    </div>
  );
}
