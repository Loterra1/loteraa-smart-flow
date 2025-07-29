
import { useEffect, useRef } from 'react';
import p5 from 'p5';

export default function RadialBurstAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const p5Instance = useRef<p5 | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const sketch = (p: p5) => {
      let particles: any[] = [];
      let centerDots: any[] = [];
      let time = 0;

      p.setup = () => {
        const canvas = p.createCanvas(containerRef.current!.offsetWidth, containerRef.current!.offsetHeight);
        canvas.parent(containerRef.current!);
        
        // Create center dots pattern
        const centerX = p.width / 2;
        const centerY = p.height / 2;
        
        for (let i = 0; i < 50; i++) {
          const angle = p.random(0, p.TWO_PI);
          const radius = p.random(10, 30);
          centerDots.push({
            x: centerX + p.cos(angle) * radius,
            y: centerY + p.sin(angle) * radius,
            size: p.random(1, 3),
            alpha: p.random(0.5, 1),
            offset: p.random(0, p.TWO_PI)
          });
        }
        
        // Create radial burst lines
        for (let angle = 0; angle < p.TWO_PI; angle += p.PI / 24) {
          const lineLength = p.random(80, 150);
          const segments = Math.floor(lineLength / 5);
          
          for (let i = 0; i < segments; i++) {
            const distance = 50 + (i * 5);
            particles.push({
              x: centerX + p.cos(angle) * distance,
              y: centerY + p.sin(angle) * distance,
              angle: angle,
              distance: distance,
              size: p.random(0.5, 2),
              alpha: p.map(distance, 50, 200, 1, 0.2),
              speed: p.random(0.005, 0.02),
              offset: p.random(0, p.TWO_PI)
            });
          }
        }
      };

      p.draw = () => {
        p.background(0, 0, 0, 30);
        time += 0.01;
        
        const centerX = p.width / 2;
        const centerY = p.height / 2;
        
        // Draw animated center dots
        centerDots.forEach(dot => {
          const pulse = p.sin(time * 2 + dot.offset) * 0.5 + 0.5;
          p.fill(255, 255, 255, (dot.alpha + pulse * 0.3) * 255);
          p.noStroke();
          p.circle(dot.x, dot.y, dot.size + pulse);
        });
        
        // Draw animated radial particles
        particles.forEach(particle => {
          const wave = p.sin(time + particle.offset) * 3;
          const x = centerX + p.cos(particle.angle) * (particle.distance + wave);
          const y = centerY + p.sin(particle.angle) * (particle.distance + wave);
          
          p.fill(255, 255, 255, particle.alpha * 255);
          p.noStroke();
          p.circle(x, y, particle.size);
          
          // Connect nearby particles
          particles.forEach(other => {
            if (particle !== other) {
              const otherX = centerX + p.cos(other.angle) * (other.distance + p.sin(time + other.offset) * 3);
              const otherY = centerY + p.sin(other.angle) * (other.distance + p.sin(time + other.offset) * 3);
              const distance = p.dist(x, y, otherX, otherY);
              
              if (distance < 15) {
                p.stroke(255, 255, 255, 30);
                p.strokeWeight(0.5);
                p.line(x, y, otherX, otherY);
              }
            }
          });
        });
        
        // Add subtle pulsing effect to the whole animation
        const globalPulse = p.sin(time * 0.5) * 0.1 + 0.9;
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
  }, []);

  return <div ref={containerRef} className="w-full h-full" />;
}
