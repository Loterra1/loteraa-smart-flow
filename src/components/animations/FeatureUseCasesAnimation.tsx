
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function FloatingElements() {
  const groupRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);
  
  // Create subtle floating particles
  const particlePositions = React.useMemo(() => {
    const positions = new Float32Array(80 * 3);
    
    for (let i = 0; i < 80; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    
    return positions;
  }, []);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.0005;
    }
    
    if (particlesRef.current) {
      // Gentle floating animation
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.001;
        positions[i] += Math.cos(state.clock.elapsedTime * 0.3 + i) * 0.0005;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Subtle floating particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={80}
            array={particlePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial 
          size={0.02} 
          color="#ffffff" 
          transparent={true} 
          opacity={0.2}
          sizeAttenuation={true}
        />
      </points>
      
      {/* Subtle geometric elements */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.cos(i * 0.8) * 6,
            Math.sin(i * 0.5) * 4,
            Math.sin(i) * 3
          ]}
        >
          <boxGeometry args={[0.1, 0.1, 0.1]} />
          <meshBasicMaterial 
            color="#ffffff" 
            transparent={true} 
            opacity={0.1}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function FeatureUseCasesAnimation() {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
      <Canvas
        className="w-full h-full"
        camera={{ position: [0, 0, 10], fov: 60 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
        onCreated={({ gl }) => {
          gl.setClearColor('#000000', 0);
        }}
      >
        <ambientLight intensity={0.2} />
        <FloatingElements />
      </Canvas>
    </div>
  );
}
