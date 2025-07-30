
import { useEffect, useRef } from 'react';
import p5 from 'p5';
import { useIsMobile } from '@/hooks/use-mobile';

export default function RadialBurstIllustrationAnimation() {
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
        
        // Create radial arrangement of spheres
        const numRings = isMobile ? 3 : 4;
        const spheresPerRing = isMobile ? 6 : 8;
        
        spheres = [];
        for (let ring = 0; ring < numRings; ring++) {
          const radius = (ring + 1) * (isMobile ? 30 : 40);
          for (let i = 0; i < spheresPerRing; i++) {
            const angle = (i / spheresPerRing) * p.TWO_PI;
            spheres.push({
              x: p.cos(angle) * radius,
              y: p.sin(angle) * radius,
              z: p.random(-20, 20),
              baseX: p.cos(angle) * radius,
              baseY: p.sin(angle) * radius,
              baseZ: p.random(-20, 20),
              radius: p.random(isMobile ? 6 : 8, isMobile ? 12 : 16),
              phase: p.random(0, p.TWO_PI),
              ring: ring
            });
          }
        }
      };

      p.draw = () => {
        p.background(0, 0, 0, 0);
        time += 0.02;
        
        // Smooth automatic rotation
        rotationX += 0.006;
        rotationY += 0.009;
        
        // Set up lighting
        p.ambientLight(60, 60, 60);
        p.directionalLight(255, 255, 255, -1, 0.5, -1);
        
        // Apply rotations
        p.rotateX(rotationX);
        p.rotateY(rotationY);
        
        // Draw animated spheres in radial burst pattern
        spheres.forEach((sphere, index) => {
          p.push();
          
          // Radial burst animation
          const burstEffect = p.sin(time * 2 + sphere.ring * 0.5) * 10;
          const radialDistance = p.dist(0, 0, sphere.baseX, sphere.baseY);
          const normalizedX = sphere.baseX / radialDistance;
          const normalizedY = sphere.baseY / radialDistance;
          
          p.translate(
            sphere.baseX + normalizedX * burstEffect,
            sphere.baseY + normalizedY * burstEffect,
            sphere.baseZ + p.sin(time + sphere.phase) * 15
          );
          
          // Pulsing size based on ring
          const pulse = p.sin(time * 3 + sphere.ring) * 0.2 + 1;
          const currentRadius = sphere.radius * pulse;
          
          // Draw sphere with varying opacity based on distance from center
          const alpha = p.map(sphere.ring, 0, 3, 255, 150);
          p.fill(255, 255, 255, alpha);
          p.stroke(255, 255, 255, alpha * 0.7);
          p.strokeWeight(1);
          p.sphere(currentRadius);
          
          p.pop();
        });
        
        // Draw connecting lines for burst effect
        if (!isMobile) {
          p.stroke(255, 255, 255, 60);
          p.strokeWeight(0.5);
          
          // Draw lines from center to outer spheres
          spheres.forEach((sphere) => {
            if (sphere.ring > 0) {
              const burstEffect = p.sin(time * 2 + sphere.ring * 0.5) * 10;
              const radialDistance = p.dist(0, 0, sphere.baseX, sphere.baseY);
              const normalizedX = sphere.baseX / radialDistance;
              const normalizedY = sphere.baseY / radialDistance;
              
              p.line(
                0, 0, 0,
                sphere.baseX + normalizedX * burstEffect,
                sphere.baseY + normalizedY * burstEffect,
                sphere.baseZ + p.sin(time + sphere.phase) * 15
              );
            }
          });
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
