
import { useEffect, useRef } from 'react';
import p5 from 'p5';
import { useIsMobile } from '@/hooks/use-mobile';

export default function CubeIllustrationAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const p5Instance = useRef<p5 | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!containerRef.current) return;

    const sketch = (p: p5) => {
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
      };

      p.draw = () => {
        p.background(0, 0, 0, 0);
        time += 0.01;
        
        // Smooth rotation
        rotationX += 0.005;
        rotationY += 0.008;
        
        // Set up lighting
        p.ambientLight(80, 80, 80);
        p.directionalLight(255, 255, 255, -1, 0.5, -1);
        
        p.translate(0, 0, 0);
        p.rotateX(rotationX);
        p.rotateY(rotationY);
        
        // Draw main cube structure
        p.stroke(255, 255, 255, 180);
        p.strokeWeight(1);
        p.noFill();
        
        const size = isMobile ? 40 : 60;
        
        // Draw multiple interconnected cubes
        for (let x = -1; x <= 1; x++) {
          for (let y = -1; y <= 1; y++) {
            for (let z = -1; z <= 1; z++) {
              p.push();
              p.translate(x * size, y * size, z * size);
              
              // Pulsing effect
              const pulse = p.sin(time * 2 + x + y + z) * 0.1 + 0.9;
              p.scale(pulse);
              
              // Draw wireframe cube
              p.box(size * 0.8);
              
              p.pop();
            }
          }
        }
        
        // Draw connecting lines between cubes
        p.stroke(255, 255, 255, 100);
        p.strokeWeight(0.5);
        
        // Horizontal connections
        for (let y = -1; y <= 1; y++) {
          for (let z = -1; z <= 1; z++) {
            p.line(-size, y * size, z * size, size, y * size, z * size);
          }
        }
        
        // Vertical connections
        for (let x = -1; x <= 1; x++) {
          for (let z = -1; z <= 1; z++) {
            p.line(x * size, -size, z * size, x * size, size, z * size);
          }
        }
        
        // Depth connections
        for (let x = -1; x <= 1; x++) {
          for (let y = -1; y <= 1; y++) {
            p.line(x * size, y * size, -size, x * size, y * size, size);
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
