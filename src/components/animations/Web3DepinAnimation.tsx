
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function MultipleFigures() {
  const groupRef = useRef<THREE.Group>(null);
  
  const figures = React.useMemo(() => [
    { position: [[-1.5, -0.3, 0]] as const, scale: 0.8, pose: 'standing' },
    { position: [[0, 0, -0.5]] as const, scale: 1, pose: 'standing' },
    { position: [[1.2, -0.5, 0.3]] as const, scale: 0.9, pose: 'sitting' },
    { position: [[-0.8, 0.2, 1]] as const, scale: 0.7, pose: 'standing' },
    { position: [[1.8, 0.1, -0.8]] as const, scale: 0.6, pose: 'sitting' }
  ], []);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
    }
    
    // Animate individual figures
    groupRef.current?.children.forEach((figure, index) => {
      const offset = index * 0.5;
      figure.position.y += Math.sin(state.clock.elapsedTime + offset) * 0.002;
    });
  });

  return (
    <group ref={groupRef}>
      {figures.map((fig, index) => (
        <group key={index} position={fig.position[0]} scale={fig.scale}>
          {/* Body */}
          <mesh position={[0, fig.pose === 'sitting' ? -0.2 : 0, 0]}>
            <capsuleGeometry 
              args={[
                0.15, 
                fig.pose === 'sitting' ? 0.8 : 1.2, 
                6, 
                12
              ]} 
            />
            <meshBasicMaterial 
              color="#ffffff" 
              transparent={true} 
              opacity={0.3}
              wireframe={true}
            />
          </mesh>
          
          {/* Head */}
          <mesh position={[0, fig.pose === 'sitting' ? 0.5 : 0.8, 0]}>
            <sphereGeometry args={[0.12, 8, 8]} />
            <meshBasicMaterial 
              color="#ffffff" 
              transparent={true} 
              opacity={0.4}
              wireframe={true}
            />
          </mesh>
          
          {/* Arms */}
          <mesh position={[-0.25, fig.pose === 'sitting' ? 0.1 : 0.3, 0]} rotation={[0, 0, 0.3]}>
            <capsuleGeometry args={[0.05, 0.6, 4, 8]} />
            <meshBasicMaterial 
              color="#ffffff" 
              transparent={true} 
              opacity={0.3}
              wireframe={true}
            />
          </mesh>
          <mesh position={[0.25, fig.pose === 'sitting' ? 0.1 : 0.3, 0]} rotation={[0, 0, -0.3]}>
            <capsuleGeometry args={[0.05, 0.6, 4, 8]} />
            <meshBasicMaterial 
              color="#ffffff" 
              transparent={true} 
              opacity={0.3}
              wireframe={true}
            />
          </mesh>
          
          {/* Legs */}
          <mesh position={[-0.1, fig.pose === 'sitting' ? -0.7 : -0.8, 0]} rotation={fig.pose === 'sitting' ? [1.2, 0, 0] : [0, 0, 0]}>
            <capsuleGeometry args={[0.06, 0.7, 4, 8]} />
            <meshBasicMaterial 
              color="#ffffff" 
              transparent={true} 
              opacity={0.3}
              wireframe={true}
            />
          </mesh>
          <mesh position={[0.1, fig.pose === 'sitting' ? -0.7 : -0.8, 0]} rotation={fig.pose === 'sitting' ? [1.2, 0, 0] : [0, 0, 0]}>
            <capsuleGeometry args={[0.06, 0.7, 4, 8]} />
            <meshBasicMaterial 
              color="#ffffff" 
              transparent={true} 
              opacity={0.3}
              wireframe={true}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export default function Web3DepinAnimation() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      <Canvas
        className="w-full h-full"
        camera={{ position: [0, 0, 6], fov: 60 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.4} />
        <MultipleFigures />
      </Canvas>
    </div>
  );
}
