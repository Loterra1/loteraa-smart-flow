
import React, { useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import * * THREE from 'three';

function AnimatedContractsImage() {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useLoader(TextureLoader, '/lovable-uploads/1afc8000-8c67-4cbc-83b7-f287e45c650a.png');
  
  useFrame((state) => {
    if (meshRef.current) {
      // Bold rotation in opposite direction
      meshRef.current.rotation.z -= 0.006;
      
      // Dynamic movement
      meshRef.current.position.y = Math.cos(state.clock.elapsedTime * 1.0) * 0.25;
      meshRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.7) * 0.15;
      
      // Bold scaling pulse with different timing
      const scale = 1 + Math.cos(state.clock.elapsedTime * 1.3) * 0.12;
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

function ContractConnections() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y -= 0.004;
      groupRef.current.rotation.z += 0.001;
    }
  });

  // Create connection lines and nodes
  const connections = [];
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2;
    const radius = 3.2;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    
    // Connection nodes
    connections.push(
      <mesh key={i} position={[x, y, 0.3]}>
        <boxGeometry args={[0.15, 0.15, 0.15]} />
        <meshBasicMaterial 
          color="#0CCCBC" 
          transparent={true} 
          opacity={0.9}
        />
      </mesh>
    );
    
    // Connecting lines (using cylinders)
    const nextAngle = ((i + 1) / 8) * Math.PI * 2;
    const nextX = Math.cos(nextAngle) * radius;
    const nextY = Math.sin(nextAngle) * radius;
    const midX = (x + nextX) / 2;
    const midY = (y + nextY) / 2;
    
    connections.push(
      <mesh key={`line-${i}`} position={[midX, midY, 0.2]} rotation={[0, 0, angle + Math.PI / 8]}>
        <cylinderGeometry args={[0.02, 0.02, radius * 0.7, 4]} />
        <meshBasicMaterial 
          color="#ffffff" 
          transparent={true} 
          opacity={0.4}
        />
      </mesh>
    );
  }

  return <group ref={groupRef}>{connections}</group>;
}

export default function Web3ContractsAnimation() {
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
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#0CCCBC" />
        
        <AnimatedContractsImage />
        <ContractConnections />
      </Canvas>
    </div>
  );
}
