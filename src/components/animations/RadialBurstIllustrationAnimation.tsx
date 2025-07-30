
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
      let time = 0;
      let lines: any[] = [];

      p.setup = () => {
        const canvas = p.createCanvas(containerRef.current!.offsetWidth, containerRef.current!.offsetHeight);
        canvas.parent(containerRef.current!);
        
        const centerX = p.width / 2;
        const centerY = p.height / 2;
        
        // Create radial lines similar to the uploaded image
        const numLines = isMobile ? 60 : 100;
        for (let i = 0; i < numLines; i++) {
          const angle = (i / numLines) * p.TWO_PI;
          const length = p.random(isMobile ? 40 : 60, isMobile ? 80 : 120);
          
          lines.push({
            angle: angle,
            length: length,
            baseLength: length,
            thickness: p.random(1, 3),
            offset: p.random(0, p.TWO_PI)
          });
        }
      };

      p.draw = () => {
        p.background(0, 0, 0, 0);
        time += 0.02;
        
        const centerX = p.width / 2;
        const centerY = p.height / 2;
        
        // Draw central black circle
        p.fill(0, 0, 0, 200);
        p.noStroke();
        p.circle(centerX, centerY, isMobile ? 30 : 40);
        
        // Draw animated radial lines
        lines.forEach((line, i) => {
          const wave = p.sin(time * 2 + line.offset) * 10;
          const currentLength = line.baseLength + wave;
          
          const startRadius = isMobile ? 15 : 20;
          const startX = centerX + p.cos(line.angle) * startRadius;
          const startY = centerY + p.sin(line.angle) * startRadius;
          
          const endX = centerX + p.cos(line.angle) * currentLength;
          const endY = centerY + p.sin(line.angle) * currentLength;
          
          // Varying opacity based on position
          const alpha = p.map(currentLength, 40, 120, 255, 100);
          
          p.stroke(255, 255, 255, alpha);
          p.strokeWeight(line.thickness);
          
          // Draw main line
          p.line(startX, startY, endX, endY);
          
          // Add branching lines for organic feel
          if (i % 3 === 0) {
            const branchAngle = line.angle + p.sin(time + i) * 0.2;
            const branchLength = currentLength * 0.7;
            const branchEndX = centerX + p.cos(branchAngle) * branchLength;
            const branchEndY = centerY + p.sin(branchAngle) * branchLength;
            
            p.stroke(255, 255, 255, alpha * 0.6);
            p.strokeWeight(line.thickness * 0.5);
            p.line(startX, startY, branchEndX, branchEndY);
          }
        });
        
        // Add subtle glow effect around center
        for (let radius = 20; radius < 50; radius += 5) {
          const alpha = p.map(radius, 20, 50, 30, 5);
          p.stroke(255, 255, 255, alpha);
          p.strokeWeight(1);
          p.noFill();
          p.circle(centerX, centerY, radius);
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
