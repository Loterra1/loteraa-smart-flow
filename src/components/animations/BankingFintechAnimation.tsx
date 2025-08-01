
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function ScatteredFigures() {
  const groupRef = useRef<THREE.Group>(null);
  
  const figures = React.useMemo(() => [
    { position: [-2, 0.5, 0], hasCircle: true, circleRadius: 0.8 },
    { position: [1.5, -0.3, 0.5], hasCircle: false, circleRadius: 0 },
    { position: [-0.5, -0.8, -0.3], hasCircle: true, circleRadius: 0.6 },
    { position: [2.2, 0.8, -0.8], hasCircle: true, circleRadius: 0.7 },
    { position: [0.3, 1.2, 0.2], hasCircle: false, circleRadius: 0 },
    { position: [-1.8, -0.6, 0.8], hasCircle: true, circleRadius: 0.5 },
    { position: [0.8, 0.2, -0.6], hasCircle: false, circleRadius: 0 }
  ], []);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
    }
    
    // Animate circles
    groupRef.current?.children.forEach((figureGroup, index) => {
      const figure = figures[index];
      if (figure.hasCircle) {
        const circle = figureGroup.children.find(child => child.userData.isCircle);
        if (circle) {
          circle.rotation.z += 0.01;
          circle.scale.setScalar(1 + Math.sin(state.clock.elapsedTime + index) * 0.1);
        }
      }
    });
  });

  return (
    <group ref={groupRef}>
      {figures.map((fig, index) => (
        <group key={index} position={fig.position}>
          {/* Wireframe figure */}
          <mesh>
            <capsuleGeometry args={[0.12, 0.8, 6, 12]} />
            <meshBasicMaterial 
              color="#ffffff" 
              transparent={true} 
              opacity={0.4}
              wireframe={true}
            />
          </mesh>
          
          {/* Head */}
          <mesh position={[0, 0.5, 0]}>
            <sphereGeometry args={[0.08, 6, 6]} />
            <meshBasicMaterial 
              color="#ffffff" 
              transparent={true} 
              opacity={0.4}
              wireframe={true}
            />
          </mesh>
          
          {/* Circular scribbled lines around some figures */}
          {fig.hasCircle && (
            <group userData={{ isCircle: true }}>
              {Array.from({ length: 20 }).map((_, i) => {
                const angle = (i / 20) * Math.PI * 2;
                const radius = fig.circleRadius;
                return (
                  <mesh
                    key={i}
                    position={[
                      Math.cos(angle) * radius,
                      Math.sin(angle) * radius * 0.7,
                      Math.sin(angle * 2) * 0.1
                    ]}
                    rotation={[0, 0, angle]}
                  >
                    <cylinderGeometry args={[0.005, 0.005, 0.15, 3]} />
                    <meshBasicMaterial 
                      color="#ffffff" 
                      transparent={true} 
                      opacity={0.3}
                    />
                  </mesh>
                );
              })}
              
              {/* Scribbled effect */}
              {Array.from({ length: 8 }).map((_, i) => (
                <mesh
                  key={`scribble-${i}`}
                  position={[
                    (Math.random() - 0.5) * fig.circleRadius * 2,
                    (Math.random() - 0.5) * fig.circleRadius * 1.4,
                    (Math.random() - 0.5) * 0.2
                  ]}
                  rotation={[
                    Math.random() * Math.PI,
                    Math.random() * Math.PI,
                    Math.random() * Math.PI
                  ]}
                >
                  <cylinderGeometry args={[0.003, 0.003, 0.3, 3]} />
                  <meshBasicMaterial 
                    color="#ffffff" 
                    transparent={true} 
                    opacity={0.5}
                  />
                </mesh>
              ))}
            </group>
          )}
        </group>
      ))}
    </group>
  );
}

export default function BankingFintechAnimation() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      <Canvas
        className="w-full h-full"
        camera={{ position: [0, 0, 8], fov: 60 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.4} />
        <ScatteredFigures />
      </Canvas>
    </div>
  );
}
