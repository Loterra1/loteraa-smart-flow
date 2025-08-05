
import { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005;
      meshRef.current.rotation.y += 0.01;
    }
    
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.002;
    }
  });

  // Create particle system
  const particlesGeometry = new THREE.BufferGeometry();
  const particleCount = 1000;
  const positions = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 8;
  }
  
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  return (
    <group>
      {/* Animated sphere with texture */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <sphereGeometry args={[2, 64, 32]} />
        <meshStandardMaterial
          color="#ffffff"
          transparent={true}
          opacity={0.8}
          wireframe={false}
        />
      </mesh>
      
      {/* Particle system */}
      <points ref={particlesRef}>
        <bufferGeometry attach="geometry" {...particlesGeometry} />
        <pointsMaterial
          color="#ffffff"
          size={0.02}
          transparent={true}
          opacity={0.6}
        />
      </points>
      
      {/* Rotating rings */}
      <mesh rotation={[0, 0, 0]} position={[0, 0, 0]}>
        <torusGeometry args={[2.5, 0.05, 8, 100]} />
        <meshBasicMaterial color="#0CCCBC" transparent={true} opacity={0.5} />
      </mesh>
      
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <torusGeometry args={[2.8, 0.05, 8, 100]} />
        <meshBasicMaterial color="#7142F6" transparent={true} opacity={0.5} />
      </mesh>
    </group>
  );
}

export default function AnimatedCircleThreeJS() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        className="w-full h-full"
        camera={{ position: [0, 0, 8], fov: 50 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={0.8} />
        <pointLight position={[-10, -10, -5]} intensity={0.3} />
        <AnimatedSphere />
      </Canvas>
      
      {/* Overlay the original image with animation */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div 
          className="w-80 h-80 bg-cover bg-center bg-no-repeat rounded-full opacity-30"
          style={{ 
            backgroundImage: "url('/lovable-uploads/65fbc473-18dc-48fe-bf9a-e67eca657446.png')",
            animation: 'pulse 3s ease-in-out infinite'
          }}
        />
      </div>
    </div>
  );
}
