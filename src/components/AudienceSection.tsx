
import { useEffect, useRef } from 'react';
import p5 from 'p5';

export default function AudienceSection() {
  const p5ContainerRef = useRef<HTMLDivElement>(null);
  const p5Instance = useRef<p5 | null>(null);

  useEffect(() => {
    if (!p5ContainerRef.current) return;

    const sketch = (p: p5) => {
      let particles: any[] = [];
      let time = 0;

      p.setup = () => {
        const canvas = p.createCanvas(p5ContainerRef.current!.clientWidth, p5ContainerRef.current!.clientHeight);
        canvas.parent(p5ContainerRef.current!);
        
        // Create floating particles
        for (let i = 0; i < 50; i++) {
          particles.push({
            x: p.random(p.width),
            y: p.random(p.height),
            vx: p.random(-0.5, 0.5),
            vy: p.random(-0.5, 0.5),
            size: p.random(2, 4),
            alpha: p.random(0.2, 0.8)
          });
        }
      };

      p.draw = () => {
        p.clear();
        time += 0.01;
        
        // Update and draw particles
        particles.forEach((particle, i) => {
          particle.x += particle.vx;
          particle.y += particle.vy;
          
          // Wrap around edges
          if (particle.x < 0) particle.x = p.width;
          if (particle.x > p.width) particle.x = 0;
          if (particle.y < 0) particle.y = p.height;
          if (particle.y > p.height) particle.y = 0;
          
          // Draw particle
          p.fill(255, 255, 255, particle.alpha * 255 * (0.5 + p.sin(time + i) * 0.5));
          p.noStroke();
          p.ellipse(particle.x, particle.y, particle.size);
          
          // Draw connections
          particles.forEach((other, j) => {
            if (i !== j) {
              const dist = p.dist(particle.x, particle.y, other.x, other.y);
              if (dist < 100) {
                const alpha = p.map(dist, 0, 100, 50, 0);
                p.stroke(255, 255, 255, alpha);
                p.strokeWeight(0.5);
                p.line(particle.x, particle.y, other.x, other.y);
              }
            }
          });
        });
      };

      p.windowResized = () => {
        if (p5ContainerRef.current) {
          p.resizeCanvas(p5ContainerRef.current.clientWidth, p5ContainerRef.current.clientHeight);
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

  return (
    <section className="py-12 md:py-20 bg-black w-full overflow-hidden">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="py-8 md:py-12 relative">
          {/* P5.js Animation Background */}
          <div ref={p5ContainerRef} className="absolute inset-0 w-full h-full opacity-20 bg-black pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
}
