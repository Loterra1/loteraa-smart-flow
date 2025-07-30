
import { useEffect, useRef } from 'react';
import p5 from 'p5';
import { useIsMobile } from '@/hooks/use-mobile';

export default function WireframeSphereIllustrationAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const p5Instance = useRef<p5 | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!containerRef.current) return;

    const sketch = (p: p5) => {
      let time = 0;
      let spheres: any[] = [];

      p.setup = () => {
        const canvas = p.createCanvas(
          containerRef.current!.offsetWidth, 
          containerRef.current!.offsetHeight
        );
        canvas.parent(containerRef.current!);
        
        // Create multiple wireframe spheres with different properties
        const numSpheres = 3;
        for (let i = 0; i < numSpheres; i++) {
          spheres.push({
            y: (i * 120) - 60,
            baseY: (i * 120) - 60,
            scale: 1 - (i * 0.2),
            rotationSpeed: 0.01 + (i * 0.005),
            phase: i * Math.PI / 3,
            opacity: 255 - (i * 60)
          });
        }
      };

      p.draw = () => {
        p.background(0, 0, 0, 0);
        time += 0.02;
        
        const centerX = p.width / 2;
        const centerY = p.height / 2;
        
        // Draw wireframe spheres
        spheres.forEach((sphere, index) => {
          p.push();
          p.translate(centerX, centerY + sphere.baseY + Math.sin(time + sphere.phase) * 15);
          p.scale(sphere.scale);
          p.rotateY(time * sphere.rotationSpeed);
          p.rotateX(time * sphere.rotationSpeed * 0.7);
          
          // Draw wireframe grid
          p.stroke(255, 255, 255, sphere.opacity);
          p.strokeWeight(1);
          p.noFill();
          
          const radius = isMobile ? 60 : 80;
          const detail = isMobile ? 12 : 16;
          
          // Horizontal circles (latitude lines)
          for (let lat = -Math.PI/2; lat <= Math.PI/2; lat += Math.PI/detail) {
            const r = radius * Math.cos(lat);
            const y = radius * Math.sin(lat);
            
            p.push();
            p.translate(0, y, 0);
            p.rotateX(Math.PI/2);
            
            p.beginShape();
            for (let lon = 0; lon <= Math.PI * 2; lon += Math.PI/16) {
              p.vertex(r * Math.cos(lon), r * Math.sin(lon));
            }
            p.endShape(p.CLOSE);
            p.pop();
          }
          
          // Vertical circles (longitude lines)
          for (let lon = 0; lon < Math.PI * 2; lon += Math.PI/8) {
            p.push();
            p.rotateY(lon);
            
            p.beginShape();
            for (let lat = -Math.PI/2; lat <= Math.PI/2; lat += Math.PI/32) {
              const x = radius * Math.cos(lat);
              const y = radius * Math.sin(lat);
              p.vertex(x, y);
            }
            p.endShape();
            p.pop();
          }
          
          p.pop();
        });
        
        // Add connecting lines between spheres
        p.stroke(255, 255, 255, 80);
        p.strokeWeight(0.5);
        
        for (let i = 0; i < spheres.length - 1; i++) {
          const sphere1 = spheres[i];
          const sphere2 = spheres[i + 1];
          const y1 = centerY + sphere1.baseY + Math.sin(time + sphere1.phase) * 15;
          const y2 = centerY + sphere2.baseY + Math.sin(time + sphere2.phase) * 15;
          
          p.line(centerX, y1, centerX, y2);
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
