
import React, { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import * as THREE from 'three';

function GenerativeSpikes() {
  const groupRef = useRef<THREE.Group>(null);
  const texture = useLoader(TextureLoader, '/lovable-uploads/ac8f8bfc-acdd-4dd7-a0b0-76b0eca5f802.png');
  
  // Create spike positions in a radial pattern
  const spikes = useMemo(() => {
    const spikeArray = [];
    const layers = 20;
    const spikesPerLayer = 24;
    
    for (let layer = 0; layer < layers; layer++) {
      const radius = (layer + 1) * 0.3;
      const angleOffset = (layer % 2) * (Math.PI / spikesPerLayer);
      
      for (let i = 0; i < spikesPerLayer; i++) {
        const angle = (i / spikesPerLayer) * Math.PI * 2 + angleOffset;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const length = 0.8 + Math.random() * 1.2;
        
        spikeArray.push({
          position: [x, y, 0] as [number, number, number],
          rotation: [0, 0, angle] as [number, number, number],
          scale: [0.05, length, 0.05] as [number, number, number],
          baseLength: length,
          phase: Math.random() * Math.PI * 2
        });
      }
    }
    
    return spikeArray;
  }, []);
  
  useFrame((state) => {
    if (groupRef.current) {
      // Gentle rotation of the entire structure
      groupRef.current.rotation.z += 0.003;
      
      // Animate individual spikes
      groupRef.current.children.forEach((spike, index) => {
        const spikeData = spikes[index];
        if (spikeData) {
          const pulseFactor = 1 + Math.sin(state.clock.elapsedTime * 1.5 + spikeData.phase) * 0.3;
          spike.scale.setY(spikeData.baseLength * pulseFactor);
          
          // Slight individual rotation
          spike.rotation.z = spikeData.rotation[2] + Math.sin(state.clock.elapsedTime * 0.8 + spikeData.phase) * 0.1;
        }
      });
      
      // Overall breathing motion
      const breathe = 1 + Math.sin(state.clock.elapsedTime * 0.7) * 0.1;
      groupRef.current.scale.setScalar(breathe);
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Central core */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial 
          color="#ffffff" 
          emissive="#444444" 
          emissiveIntensity={0.2}
          transparent={true}
          opacity={0.9}
        />
      </mesh>
      
      {/* Radial spikes */}
      {spikes.map((spike, index) => (
        <mesh
          key={index}
          position={spike.position}
          rotation={spike.rotation}
          scale={spike.scale}
        >
          <cylinderGeometry args={[0.02, 0.01, 1, 4]} />
          <meshStandardMaterial 
            color="#cccccc"
            transparent={true}
            opacity={0.8}
            emissive="#222222"
            emissiveIntensity={0.1}
          />
        </mesh>
      ))}
      
      {/* Subtle background texture plane */}
      <mesh position={[0, 0, -1]} rotation={[0, 0, 0]}>
        <planeGeometry args={[8, 8]} />
        <meshBasicMaterial 
          map={texture}
          transparent={true}
          opacity={0.1}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

function FloatingParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  
  const particlePositions = useMemo(() => {
    const positions = new Float32Array(50 * 3);
    
    for (let i = 0; i < 50; i++) {
      const radius = 4 + Math.random() * 3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    
    return positions;
  }, []);
  
  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.002;
      particlesRef.current.rotation.x += 0.001;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={50}
          array={particlePositions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.03} 
        color="#ffffff" 
        transparent={true} 
        opacity={0.4}
        sizeAttenuation={true}
      />
    </points>
  );
}

export default function GenerativeArtAnimation() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <Canvas
        className="w-full h-full"
        camera={{ position: [0, 0, 8], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight 
          position={[5, 5, 5]} 
          intensity={0.6} 
          color="#ffffff"
        />
        <pointLight position={[-3, -3, -3]} intensity={0.4} color="#666666" />
        <pointLight position={[3, -3, 3]} intensity={0.3} color="#999999" />
        
        <GenerativeSpikes />
        <FloatingParticles />
      </Canvas>
    </div>
  );
}
