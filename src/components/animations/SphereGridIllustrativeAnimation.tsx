
import { useEffect, useRef } from 'react';
import p5 from 'p5';
import { useIsMobile } from '@/hooks/use-mobile';

export default function SphereGridIllustrativeAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const p5Instance = useRef<p5 | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!containerRef.current) return;

    const sketch = (p: p5) => {
      let spheres: any[] = [];
      let time = 0;
      let rotationX = 0;
      let rotationY = 0;

      p.setup = () => {
        const canvas = p.createCanvas(
          containerRef.current!.offsetWidth, 
          containerRef.current!.offsetHeight, 
          p.WEBGL
        );
        canvas.parent(containerRef.current!);
        
        // Create grid of spheres - reduced for performance
        const gridSize = isMobile ? 3 : 4;
        const spacing = isMobile ? 80 : 100;
        
        spheres = [];
        for (let x = -gridSize/2; x <= gridSize/2; x++) {
          for (let y = -gridSize/2; y <= gridSize/2; y++) {
            for (let z = -gridSize/2; z <= gridSize/2; z++) {
              spheres.push({
                x: x * spacing,
                y: y * spacing,
                z: z * spacing,
                baseX: x * spacing,
                baseY: y * spacing,
                baseZ: z * spacing,
                radius: p.random(isMobile ? 8 : 10, isMobile ? 15 : 20),
                phase: p.random(0, p.TWO_PI),
                speed: p.random(0.02, 0.05)
              });
            }
          }
        }
      };

      p.draw = () => {
        p.background(0, 0, 0, 0);
        time += 0.02;
        
        // Smooth automatic rotation - illustrative only
        rotationX += 0.008;
        rotationY += 0.012;
        
        // Set up lighting
        p.ambientLight(60, 60, 60);
        p.directionalLight(255, 255, 255, -1, 0.5, -1);
        
        // Apply rotations
        p.rotateX(rotationX);
        p.rotateY(rotationY);
        
        // Draw animated spheres
        spheres.forEach((sphere, index) => {
          p.push();
          
          // Wave animation for illustrative effect
          const waveX = p.sin(time + sphere.phase) * 20;
          const waveY = p.cos(time + sphere.phase * 1.3) * 15;
          const waveZ = p.sin(time * 0.8 + sphere.phase * 0.7) * 10;
          
          p.translate(
            sphere.baseX + waveX,
            sphere.baseY + waveY,
            sphere.baseZ + waveZ
          );
          
          // Pulsing size for visual interest
          const pulse = p.sin(time * 2 + sphere.phase) * 0.3 + 1;
          const currentRadius = sphere.radius * pulse;
          
          // Draw sphere with glow effect
          p.fill(255, 255, 255, 200);
          p.stroke(255, 255, 255, 100);
          p.strokeWeight(1);
          p.sphere(currentRadius);
          
          // Add wireframe for tech aesthetic
          if (!isMobile) {
            p.stroke(255, 255, 255, 80);
            p.strokeWeight(0.5);
            p.noFill();
            
            // Draw wireframe rings
            for (let i = 0; i < 3; i++) {
              p.push();
              p.rotateY((i / 3) * p.TWO_PI);
              p.circle(0, 0, currentRadius * 1.2);
              p.pop();
            }
          }
          
          p.pop();
        });
        
        // Draw connecting lines between nearby spheres for grid effect
        if (!isMobile) {
          p.stroke(255, 255, 255, 30);
          p.strokeWeight(0.5);
          
          for (let i = 0; i < spheres.length; i++) {
            for (let j = i + 1; j < spheres.length; j++) {
              const sphere1 = spheres[i];
              const sphere2 = spheres[j];
              
              const distance = p.dist(
                sphere1.baseX, sphere1.baseY, sphere1.baseZ,
                sphere2.baseX, sphere2.baseY, sphere2.baseZ
              );
              
              // Only connect adjacent spheres
              if (distance < 120) {
                p.line(
                  sphere1.baseX, sphere1.baseY, sphere1.baseZ,
                  sphere2.baseX, sphere2.baseY, sphere2.baseZ
                );
              }
            }
          }
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
