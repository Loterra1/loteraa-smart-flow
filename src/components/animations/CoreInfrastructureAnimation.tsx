
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function FlowingDataStreams() {
  const groupRef = useRef<THREE.Group>(null);
  const streamsRef = useRef<THREE.Group>(null);
  
  // Create data flow streams
  const streams = React.useMemo(() => {
    const streamArray = [];
    const streamCount = 12;
    
    for (let i = 0; i < streamCount; i++) {
      const angle = (i / streamCount) * Math.PI * 2;
      const radius = 2.2;
      
      streamArray.push({
        startX: Math.cos(angle) * radius,
        startY: Math.sin(angle) * radius,
        startZ: 0,
        endX: 0,
        endY: 0,
        endZ: 0,
        angle: angle,
        phase: Math.random() * Math.PI * 2
      });
    }
    
    return streamArray;
  }, []);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z += 0.003;
    }
    
    if (streamsRef.current) {
      streamsRef.current.children.forEach((child, index) => {
        if (child instanceof THREE.Mesh) {
          const stream = streams[index];
          const pulseIntensity = Math.sin(state.clock.elapsedTime * 2 + stream.phase);
          child.scale.setScalar(0.8 + pulseIntensity * 0.3);
          
          // Animate position along the stream
          const t = (Math.sin(state.clock.elapsedTime * 1.5 + stream.phase) + 1) * 0.5;
          child.position.x = THREE.MathUtils.lerp(stream.startX, stream.endX, t);
          child.position.y = THREE.MathUtils.lerp(stream.startY, stream.endY, t);
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central infrastructure core */}
      <mesh position={[0, 0, 0]}>
        <octahedronGeometry args={[0.25, 1]} />
        <meshBasicMaterial 
          color="#ffffff" 
          transparent={true} 
          opacity={0.9}
          wireframe={true}
        />
      </mesh>
      
      {/* Outer ring structure */}
      <mesh position={[0, 0, 0]}>
        <torusGeometry args={[2.2, 0.05, 8, 32]} />
        <meshBasicMaterial 
          color="#888888" 
          transparent={true} 
          opacity={0.4}
        />
      </mesh>
      
      {/* Flowing data streams */}
      <group ref={streamsRef}>
        {streams.map((stream, index) => (
          <mesh
            key={index}
            position={[stream.startX, stream.startY, stream.startZ]}
          >
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshBasicMaterial 
              color="#ffffff" 
              transparent={true} 
              opacity={0.7}
            />
          </mesh>
        ))}
      </group>
      
      {/* Infrastructure pillars */}
      {[0, 1, 2, 3].map((i) => (
        <mesh
          key={i}
          position={[
            Math.cos(i * Math.PI * 0.5) * 1.5,
            Math.sin(i * Math.PI * 0.5) * 1.5,
            0
          ]}
          rotation={[0, 0, i * Math.PI * 0.5]}
        >
          <cylinderGeometry args={[0.02, 0.02, 1.2, 6]} />
          <meshBasicMaterial 
            color="#cccccc" 
            transparent={true} 
            opacity={0.6}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function CoreInfrastructureAnimation() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <Canvas
        className="w-full h-full"
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[2, 2, 2]} intensity={0.7} color="#ffffff" />
        <pointLight position={[-2, -2, -2]} intensity={0.5} color="#aaaaaa" />
        
        <FlowingDataStreams />
      </Canvas>
    </div>
  );
}
