
import { useEffect, useRef } from 'react';
import p5 from 'p5';
import { useIsMobile } from '@/hooks/use-mobile';

export default function RadialBurstAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const p5Instance = useRef<p5 | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!containerRef.current) return;

    const sketch = (p: p5) => {
      let particles: any[] = [];
      let centerDots: any[] = [];
      let time = 0;

      p.setup = () => {
        const canvas = p.createCanvas(containerRef.current!.offsetWidth, containerRef.current!.offsetHeight);
        canvas.parent(containerRef.current!);
        
        const centerX = p.width / 2;
        const centerY = p.height / 2;
        
        // Reduce particles on mobile
        const centerDotsCount = isMobile ? 25 : 40;
        for (let i = 0; i < centerDotsCount; i++) {
          const angle = p.random(0, p.TWO_PI);
          const radius = p.random(8, isMobile ? 20 : 25);
          centerDots.push({
            x: centerX + p.cos(angle) * radius,
            y: centerY + p.sin(angle) * radius,
            size: p.random(1, isMobile ? 2 : 2.5),
            alpha: p.random(0.4, 0.8),
            offset: p.random(0, p.TWO_PI)
          });
        }
        
        // Optimized radial burst lines
        const angleStep = isMobile ? p.PI / 16 : p.PI / 20;
        for (let angle = 0; angle < p.TWO_PI; angle += angleStep) {
          const lineLength = p.random(60, isMobile ? 100 : 120);
          const segments = Math.floor(lineLength / (isMobile ? 8 : 6));
          
          for (let i = 0; i < segments; i++) {
            const distance = 40 + (i * (isMobile ? 8 : 6));
            particles.push({
              x: centerX + p.cos(angle) * distance,
              y: centerY + p.sin(angle) * distance,
              angle: angle,
              distance: distance,
              size: p.random(0.5, isMobile ? 1.5 : 1.8),
              alpha: p.map(distance, 40, 160, 0.8, 0.2),
              speed: p.random(0.003, 0.015),
              offset: p.random(0, p.TWO_PI)
            });
          }
        }
      };

      p.draw = () => {
        p.background(0, 0, 0, isMobile ? 40 : 30);
        time += 0.008;
        
        const centerX = p.width / 2;
        const centerY = p.height / 2;
        
        // Draw optimized center dots
        centerDots.forEach(dot => {
          const pulse = p.sin(time * 1.5 + dot.offset) * 0.3 + 0.7;
          p.fill(255, 255, 255, (dot.alpha + pulse * 0.2) * 255);
          p.noStroke();
          p.circle(dot.x, dot.y, dot.size + pulse * 0.5);
        });
        
        // Draw optimized radial particles
        particles.forEach((particle, i) => {
          const wave = p.sin(time + particle.offset) * 2;
          const x = centerX + p.cos(particle.angle) * (particle.distance + wave);
          const y = centerY + p.sin(particle.angle) * (particle.distance + wave);
          
          p.fill(255, 255, 255, particle.alpha * 255);
          p.noStroke();
          p.circle(x, y, particle.size);
          
          // Reduced connections for performance
          if (!isMobile && i % 3 === 0) {
            particles.forEach((other, j) => {
              if (particle !== other && j % 3 === 0) {
                const otherX = centerX + p.cos(other.angle) * (other.distance + p.sin(time + other.offset) * 2);
                const otherY = centerY + p.sin(other.angle) * (other.distance + p.sin(time + other.offset) * 2);
                const distance = p.dist(x, y, otherX, otherY);
                
                if (distance < 12) {
                  p.stroke(255, 255, 255, 20);
                  p.strokeWeight(0.3);
                  p.line(x, y, otherX, otherY);
                }
              }
            });
          }
        });
        
        // Simplified pulsing effect
        const globalPulse = p.sin(time * 0.3) * 0.05 + 0.95;
        p.tint(255, globalPulse * 255);
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
