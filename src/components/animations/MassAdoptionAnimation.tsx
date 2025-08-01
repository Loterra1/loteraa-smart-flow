
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function AnimatedOverlay() {
  const meshRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const linesGroupRef = useRef<THREE.Group>(null);
  
  // Create flowing particles
  const particlePositions = useMemo(() => {
    const positions = new Float32Array(100 * 3);
    
    for (let i = 0; i < 100; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 4;
      positions[i * 3 + 2] = Math.random() * 2;
    }
    
    return positions;
  }, []);
  
  // Create flowing lines using proper Three.js Line geometry
  const lineGeometries = useMemo(() => {
    const geometries = [];
    for (let i = 0; i < 15; i++) {
      const points = [];
      for (let j = 0; j < 20; j++) {
        const angle = (j / 20) * Math.PI * 2;
        const radius = 1 + i * 0.2;
        points.push(new THREE.Vector3(
          Math.cos(angle) * radius,
          Math.sin(angle) * radius * 0.5 + (i - 7.5) * 0.3,
          Math.sin(j * 0.5) * 0.5
        ));
      }
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      geometries.push(geometry);
    }
    return geometries;
  }, []);
  
  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.002;
      particlesRef.current.rotation.x += 0.001;
      
      // Animate particle positions
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 2] += Math.sin(state.clock.elapsedTime + i) * 0.002;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
    
    if (meshRef.current) {
      meshRef.current.rotation.z += 0.001;
      // Add pulsing effect
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.2;
      meshRef.current.scale.setScalar(scale);
    }

    if (linesGroupRef.current) {
      linesGroupRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group>
      {/* Animated particles */}
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
          size={0.02} 
          color="#ffffff" 
          transparent={true} 
          opacity={0.6}
          sizeAttenuation={true}
        />
      </points>
      
      {/* Flowing lines using proper Line components */}
      <group ref={linesGroupRef}>
        {lineGeometries.map((geometry, index) => (
          <line key={index}>
            <primitive object={geometry} attach="geometry" />
            <lineBasicMaterial 
              color="#cccccc" 
              transparent={true} 
              opacity={0.3}
            />
          </line>
        ))}
      </group>
      
      {/* Central pulsing sphere */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshBasicMaterial 
          color="#ffffff" 
          transparent={true} 
          opacity={0.8}
        />
      </mesh>
    </group>
  );
}

export default function MassAdoptionAnimation() {
  return (
    <div className="relative w-full h-full">
      <img 
        src="/lovable-uploads/97d07f05-f7fa-4358-9d8e-dc7a7a778458.png" 
        alt="Mass Adoption Illustration"
        className="w-full h-full object-contain opacity-80"
      />
      <div className="absolute inset-0">
        <Canvas
          className="w-full h-full"
          camera={{ position: [0, 0, 5], fov: 50 }}
          style={{ background: 'transparent' }}
          gl={{ alpha: true, antialias: true }}
          onCreated={({ gl }) => {
            gl.setClearColor('#000000', 0);
          }}
        >
          <ambientLight intensity={0.4} />
          <pointLight position={[2, 2, 2]} intensity={0.5} color="#ffffff" />
          <pointLight position={[-2, -2, -2]} intensity={0.3} color="#cccccc" />
          
          <AnimatedOverlay />
        </Canvas>
      </div>
    </div>
  );
}
