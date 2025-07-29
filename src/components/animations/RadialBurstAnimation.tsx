
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
        
        // Reduced particles for better performance
        const centerDotsCount = isMobile ? 15 : 25;
        for (let i = 0; i < centerDotsCount; i++) {
          const angle = p.random(0, p.TWO_PI);
          const radius = p.random(8, isMobile ? 15 : 20);
          centerDots.push({
            x: centerX + p.cos(angle) * radius,
            y: centerY + p.sin(angle) * radius,
            size: p.random(1, isMobile ? 1.5 : 2),
            alpha: p.random(0.4, 0.8),
            offset: p.random(0, p.TWO_PI)
          });
        }
        
        // Fewer radial burst lines for performance
        const angleStep = isMobile ? p.PI / 12 : p.PI / 16;
        for (let angle = 0; angle < p.TWO_PI; angle += angleStep) {
          const lineLength = p.random(50, isMobile ? 80 : 100);
          const segments = Math.floor(lineLength / (isMobile ? 10 : 8));
          
          for (let i = 0; i < segments; i++) {
            const distance = 30 + (i * (isMobile ? 10 : 8));
            particles.push({
              x: centerX + p.cos(angle) * distance,
              y: centerY + p.sin(angle) * distance,
              angle: angle,
              distance: distance,
              size: p.random(0.5, isMobile ? 1.2 : 1.5),
              alpha: p.map(distance, 30, 130, 0.8, 0.2),
              speed: p.random(0.005, 0.025), // Faster animation
              offset: p.random(0, p.TWO_PI)
            });
          }
        }
      };

      p.draw = () => {
        p.background(0, 0, 0, isMobile ? 50 : 40);
        time += 0.015; // Faster time progression
        
        const centerX = p.width / 2;
        const centerY = p.height / 2;
        
        // Draw faster center dots
        centerDots.forEach(dot => {
          const pulse = p.sin(time * 2 + dot.offset) * 0.3 + 0.7; // Faster pulse
          p.fill(255, 255, 255, (dot.alpha + pulse * 0.2) * 255);
          p.noStroke();
          p.circle(dot.x, dot.y, dot.size + pulse * 0.5);
        });
        
        // Draw faster radial particles
        particles.forEach((particle, i) => {
          const wave = p.sin(time + particle.offset) * 3; // Larger wave amplitude
          const x = centerX + p.cos(particle.angle) * (particle.distance + wave);
          const y = centerY + p.sin(particle.angle) * (particle.distance + wave);
          
          p.fill(255, 255, 255, particle.alpha * 255);
          p.noStroke();
          p.circle(x, y, particle.size);
        });
        
        // Faster pulsing effect
        const globalPulse = p.sin(time * 0.5) * 0.1 + 0.9; // Faster global pulse
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
