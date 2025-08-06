
import React, { useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import * as THREE from 'three';

function AnimatedAnalyticsImage() {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useLoader(TextureLoader, '/lovable-uploads/0651cda4-5c7a-4273-abee-63fba484c8e5.png');
  
  useFrame((state) => {
    if (meshRef.current) {
      // Bold rotation with variation
      meshRef.current.rotation.z += 0.007 + Math.sin(state.clock.elapsedTime * 0.5) * 0.002;
      
      // Complex movement pattern
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.1) * 0.2 + Math.cos(state.clock.elapsedTime * 0.6) * 0.1;
      meshRef.current.position.x = Math.cos(state.clock.elapsedTime * 0.9) * 0.18;
      
      // Bold scaling with complex timing
      const scale = 1 + Math.sin(state.clock.elapsedTime * 1.4) * 0.1 + Math.cos(state.clock.elapsedTime * 0.8) * 0.05;
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

function AnalyticsParticles() {
  const groupRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);
  
  const particlePositions = React.useMemo(() => {
    const positions = new Float32Array(100 * 3);
    
    for (let i = 0; i < 100; i++) {
      const radius = 2 + Math.random() * 4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    
    return positions;
  }, []);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.003;
      groupRef.current.rotation.x += 0.001;
    }
    
    if (particlesRef.current) {
      particlesRef.current.rotation.z += 0.002;
    }
  });

  return (
    <group ref={groupRef}>
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={100}
            array={particlePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial 
          size={0.05} 
          color="#3182F4" 
          transparent={true} 
          opacity={0.7}
          sizeAttenuation={true}
        />
      </points>
    </group>
  );
}

export default function AdvancedAnalyticsAnimation() {
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
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#3182F4" />
        
        <AnimatedAnalyticsImage />
        <AnalyticsParticles />
      </Canvas>
    </div>
  );
}
