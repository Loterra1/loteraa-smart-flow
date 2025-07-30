
import { useEffect, useRef } from 'react';
import p5 from 'p5';
import { useIsMobile } from '@/hooks/use-mobile';

export default function CubeGenerativeAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const p5Instance = useRef<p5 | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!containerRef.current) return;

    const sketch = (p: p5) => {
      let time = 0;
      let cubes: any[] = [];
      let rotationX = 0;
      let rotationY = 0;

      p.setup = () => {
        const canvas = p.createCanvas(
          containerRef.current!.offsetWidth, 
          containerRef.current!.offsetHeight, 
          p.WEBGL
        );
        canvas.parent(containerRef.current!);
        
        // Create multiple cubes with different properties
        const numCubes = isMobile ? 15 : 25;
        for (let i = 0; i < numCubes; i++) {
          cubes.push({
            x: p.random(-150, 150),
            y: p.random(-150, 150),
            z: p.random(-150, 150),
            size: p.random(10, 30),
            rotSpeed: {
              x: p.random(-0.02, 0.02),
              y: p.random(-0.02, 0.02),
              z: p.random(-0.02, 0.02)
            },
            rotation: { x: 0, y: 0, z: 0 },
            phase: p.random(0, p.TWO_PI),
            floatSpeed: p.random(0.01, 0.03)
          });
        }
      };

      p.draw = () => {
        p.background(0, 0, 0, 0);
        time += 0.01;
        
        // Smooth automatic rotation
        rotationX += 0.003;
        rotationY += 0.005;
        
        // Set up lighting for 3D effect
        p.ambientLight(60, 60, 60);
        p.directionalLight(255, 255, 255, -1, 0.5, -1);
        p.pointLight(255, 255, 255, 100, -100, 100);
        
        // Apply global rotations
        p.rotateX(rotationX);
        p.rotateY(rotationY);
        
        // Draw animated cubes
        cubes.forEach((cube, index) => {
          p.push();
          
          // Floating animation
          const floatY = p.sin(time * cube.floatSpeed + cube.phase) * 20;
          const floatX = p.cos(time * cube.floatSpeed * 0.7 + cube.phase) * 10;
          
          p.translate(
            cube.x + floatX,
            cube.y + floatY,
            cube.z + p.sin(time + cube.phase) * 15
          );
          
          // Individual cube rotations
          cube.rotation.x += cube.rotSpeed.x;
          cube.rotation.y += cube.rotSpeed.y;
          cube.rotation.z += cube.rotSpeed.z;
          
          p.rotateX(cube.rotation.x);
          p.rotateY(cube.rotation.y);
          p.rotateZ(cube.rotation.z);
          
          // Pulsing size effect
          const pulse = p.sin(time * 2 + cube.phase) * 0.2 + 1;
          const currentSize = cube.size * pulse;
          
          // Color variation based on position and time
          const colorOffset = p.sin(time + index * 0.1) * 50 + 205;
          p.fill(colorOffset, colorOffset, 255, 180);
          p.stroke(255, 255, 255, 120);
          p.strokeWeight(0.5);
          
          // Draw the cube
          p.box(currentSize);
          
          // Add wireframe overlay for tech aesthetic
          if (!isMobile) {
            p.stroke(255, 255, 255, 80);
            p.strokeWeight(1);
            p.noFill();
            p.box(currentSize * 1.1);
          }
          
          p.pop();
        });
        
        // Draw connecting lines between nearby cubes
        if (!isMobile) {
          p.stroke(255, 255, 255, 30);
          p.strokeWeight(0.5);
          
          for (let i = 0; i < cubes.length; i++) {
            for (let j = i + 1; j < cubes.length; j++) {
              const cube1 = cubes[i];
              const cube2 = cubes[j];
              
              const distance = p.dist(cube1.x, cube1.y, cube1.z, cube2.x, cube2.y, cube2.z);
              
              // Only connect nearby cubes
              if (distance < 80) {
                const opacity = p.map(distance, 0, 80, 50, 5);
                p.stroke(255, 255, 255, opacity);
                
                const floatY1 = p.sin(time * cube1.floatSpeed + cube1.phase) * 20;
                const floatY2 = p.sin(time * cube2.floatSpeed + cube2.phase) * 20;
                
                p.line(
                  cube1.x, cube1.y + floatY1, cube1.z,
                  cube2.x, cube2.y + floatY2, cube2.z
                );
              }
            }
          }
        }
        
        // Add particle effects
        p.stroke(255, 255, 255, 100);
        p.strokeWeight(2);
        
        for (let i = 0; i < (isMobile ? 20 : 40); i++) {
          const particlePhase = time + i * 0.1;
          const radius = 200 + p.sin(particlePhase) * 50;
          const angle = i * 0.3 + time * 0.5;
          
          const x = p.cos(angle) * radius;
          const y = p.sin(particlePhase * 0.3) * 100;
          const z = p.sin(angle) * radius;
          
          p.point(x, y, z);
        }
      };

      p.windowResized = () => {
        if (containerRef.current) {
          p.resizeCanvas(containerRef.current.offsetWidth, containerRef.current.offsetHeight);
        }
      };
    };

    p5Instance.current = new p5(sketch);

    return () => {
      if (p5Instance.current) {
        p5Instance.current.remove();
      }
    };
  }, [isMobile]);

  return <div ref={containerRef} className="w-full h-full" />;
}
