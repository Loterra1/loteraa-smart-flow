
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function RadialBurstElements() {
  const groupRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);
  
  // Create radial burst particles
  const particlePositions = React.useMemo(() => {
    const positions = new Float32Array(120 * 3);
    
    for (let i = 0; i < 120; i++) {
      const angle = (i / 120) * Math.PI * 2;
      const radius = 1 + Math.random() * 4;
      const height = (Math.random() - 0.5) * 2;
      
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = height;
      positions[i * 3 + 2] = Math.sin(angle) * radius;
    }
    
    return positions;
  }, []);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.003;
    }
    
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        const radius = Math.sqrt(positions[i] ** 2 + positions[i + 2] ** 2);
        positions[i + 1] += Math.sin(state.clock.elapsedTime + radius) * 0.002;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central figure */}
      <mesh position={[0, 0, 0]}>
        <capsuleGeometry args={[0.2, 1.2, 8, 16]} />
        <meshBasicMaterial 
          color="#ffffff" 
          transparent={true} 
          opacity={0.4}
          wireframe={true}
        />
      </mesh>
      
      {/* Radiating lines */}
      {Array.from({ length: 24 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.cos(i * 0.26) * 2.5,
            (Math.random() - 0.5) * 0.5,
            Math.sin(i * 0.26) * 2.5
          ]}
          rotation={[0, i * 0.26, 0]}
        >
          <cylinderGeometry args={[0.01, 0.01, 2, 4]} />
          <meshBasicMaterial 
            color="#ffffff" 
            transparent={true} 
            opacity={0.6}
          />
        </mesh>
      ))}
      
      {/* Floating particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={120}
            array={particlePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial 
          size={0.02} 
          color="#ffffff" 
          transparent={true} 
          opacity={0.5}
          sizeAttenuation={true}
        />
      </points>
    </group>
  );
}

export default function AIModelTrainingAnimation() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      <Canvas
        className="w-full h-full"
        camera={{ position: [0, 0, 8], fov: 50 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.4} />
        <RadialBurstElements />
      </Canvas>
    </div>
  );
}
