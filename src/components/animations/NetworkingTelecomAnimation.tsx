
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function NetworkingFigure() {
  const groupRef = useRef<THREE.Group>(null);
  const linesRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
    }
    
    if (linesRef.current) {
      linesRef.current.children.forEach((line, index) => {
        line.rotation.z = Math.sin(state.clock.elapsedTime + index) * 0.3;
        line.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2 + index) * 0.2);
      });
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central wireframe figure */}
      <mesh position={[0, -0.5, 0]}>
        <capsuleGeometry args={[0.3, 1.5, 8, 16]} />
        <meshBasicMaterial 
          color="#ffffff" 
          transparent={true} 
          opacity={0.3}
          wireframe={true}
        />
      </mesh>
      
      {/* Head area with network lines */}
      <group ref={linesRef} position={[0, 0.8, 0]}>
        {Array.from({ length: 15 }).map((_, i) => (
          <mesh
            key={i}
            position={[
              (Math.random() - 0.5) * 1.5,
              (Math.random() - 0.5) * 1,
              (Math.random() - 0.5) * 1.5
            ]}
            rotation={[
              Math.random() * Math.PI,
              Math.random() * Math.PI,
              Math.random() * Math.PI
            ]}
          >
            <cylinderGeometry args={[0.005, 0.005, 0.8, 4]} />
            <meshBasicMaterial 
              color="#ffffff" 
              transparent={true} 
              opacity={0.4}
            />
          </mesh>
        ))}
        
        {/* Scribbled effect particles */}
        {Array.from({ length: 30 }).map((_, i) => (
          <mesh
            key={`particle-${i}`}
            position={[
              (Math.random() - 0.5) * 2,
              (Math.random() - 0.5) * 1.2,
              (Math.random() - 0.5) * 2
            ]}
          >
            <sphereGeometry args={[0.02, 4, 4]} />
            <meshBasicMaterial 
              color="#ffffff" 
              transparent={true} 
              opacity={0.6}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

export default function NetworkingTelecomAnimation() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      <Canvas
        className="w-full h-full"
        camera={{ position: [0, 0, 6], fov: 50 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.4} />
        <NetworkingFigure />
      </Canvas>
    </div>
  );
}
