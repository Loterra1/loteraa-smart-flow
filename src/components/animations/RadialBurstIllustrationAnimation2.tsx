
import { useEffect, useRef } from 'react';
import p5 from 'p5';
import { useIsMobile } from '@/hooks/use-mobile';

export default function RadialBurstIllustrationAnimation2() {
  const containerRef = useRef<HTMLDivElement>(null);
  const p5Instance = useRef<p5 | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!containerRef.current) return;

    const sketch = (p: p5) => {
      let time = 0;
      let rays: any[] = [];

      p.setup = () => {
        const canvas = p.createCanvas(
          containerRef.current!.offsetWidth, 
          containerRef.current!.offsetHeight
        );
        canvas.parent(containerRef.current!);
        
        // Create radial rays
        const numRays = isMobile ? 24 : 32;
        for (let i = 0; i < numRays; i++) {
          const angle = (i / numRays) * p.TWO_PI;
          rays.push({
            angle: angle,
            baseAngle: angle,
            length: p.random(60, 120),
            width: p.random(1, 3),
            opacity: p.random(150, 255),
            phase: p.random(0, p.TWO_PI)
          });
        }
      };

      p.draw = () => {
        p.background(0, 0, 0, 0);
        time += 0.03;
        
        const centerX = p.width / 2;
        const centerY = p.height / 2;
        
        // Draw central core with dotted pattern
        p.fill(255, 255, 255, 200);
        p.noStroke();
        
        // Central dotted circle
        const coreRadius = isMobile ? 25 : 35;
        const dots = isMobile ? 16 : 24;
        
        for (let i = 0; i < dots; i++) {
          const angle = (i / dots) * p.TWO_PI;
          const dotRadius = 2 + Math.sin(time * 2 + i * 0.5) * 1;
          const x = centerX + Math.cos(angle + time * 0.5) * (coreRadius - 10);
          const y = centerY + Math.sin(angle + time * 0.5) * (coreRadius - 10);
          
          p.circle(x, y, dotRadius);
        }
        
        // Draw radiating lines/rays
        rays.forEach((ray, index) => {
          const currentAngle = ray.baseAngle + Math.sin(time + ray.phase) * 0.1;
          const currentLength = ray.length + Math.sin(time * 2 + ray.phase) * 20;
          
          // Calculate start and end points
          const startRadius = coreRadius;
          const startX = centerX + Math.cos(currentAngle) * startRadius;
          const startY = centerY + Math.sin(currentAngle) * startRadius;
          const endX = centerX + Math.cos(currentAngle) * currentLength;
          const endY = centerY + Math.sin(currentAngle) * currentLength;
          
          // Draw varying opacity lines
          const alpha = ray.opacity + Math.sin(time + ray.phase) * 50;
          p.stroke(255, 255, 255, Math.max(50, alpha));
          p.strokeWeight(ray.width);
          
          // Draw segmented lines for texture
          const segments = 5;
          for (let seg = 0; seg < segments; seg++) {
            const segmentStart = seg / segments;
            const segmentEnd = (seg + 1) / segments;
            
            if (seg % 2 === 0) { // Only draw every other segment for dashed effect
              const segStartX = p.lerp(startX, endX, segmentStart);
              const segStartY = p.lerp(startY, endY, segmentStart);
              const segEndX = p.lerp(startX, endX, segmentEnd);
              const segEndY = p.lerp(startY, endY, segmentEnd);
              
              p.line(segStartX, segStartY, segEndX, segEndY);
            }
          }
        });
        
        // Add secondary ring of shorter rays
        const shortRays = isMobile ? 16 : 20;
        for (let i = 0; i < shortRays; i++) {
          const angle = (i / shortRays) * p.TWO_PI + time * 0.3;
          const length = 40 + Math.sin(time * 3 + i) * 10;
          
          const startX = centerX + Math.cos(angle) * coreRadius;
          const startY = centerY + Math.sin(angle) * coreRadius;
          const endX = centerX + Math.cos(angle) * length;
          const endY = centerY + Math.sin(angle) * length;
          
          p.stroke(255, 255, 255, 100);
          p.strokeWeight(1);
          p.line(startX, startY, endX, endY);
        }
        
        // Draw outer ring
        p.stroke(255, 255, 255, 150);
        p.strokeWeight(1);
        p.noFill();
        const outerRadius = isMobile ? 100 : 130;
        
        p.push();
        p.translate(centerX, centerY);
        p.rotate(time * 0.5);
        
        p.beginShape();
        const points = isMobile ? 32 : 48;
        for (let i = 0; i <= points; i++) {
          const angle = (i / points) * p.TWO_PI;
          const r = outerRadius + Math.sin(angle * 6 + time * 2) * 8;
          p.vertex(Math.cos(angle) * r, Math.sin(angle) * r);
        }
        p.endShape(p.CLOSE);
        p.pop();
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
