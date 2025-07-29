
import { useEffect, useRef } from 'react';
import p5 from 'p5';

export default function GrainyNoiseAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const p5Instance = useRef<p5 | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const sketch = (p: p5) => {
      let noiseScale = 0.01;
      let time = 0;
      let particles: any[] = [];

      p.setup = () => {
        const canvas = p.createCanvas(containerRef.current!.offsetWidth, containerRef.current!.offsetHeight);
        canvas.parent(containerRef.current!);
        
        // Initialize noise particles
        for (let i = 0; i < 150; i++) {
          particles.push({
            x: p.random(p.width),
            y: p.random(p.height),
            size: p.random(1, 3),
            speedX: p.random(-0.5, 0.5),
            speedY: p.random(-0.5, 0.5),
            opacity: p.random(0.1, 0.4),
            noiseOffset: p.random(1000)
          });
        }
      };

      p.draw = () => {
        // Dark background with slight transparency for layering effect
        p.background(0, 0, 0, 15);
        time += 0.005;

        // Create grainy noise texture
        p.loadPixels();
        for (let x = 0; x < p.width; x += 3) {
          for (let y = 0; y < p.height; y += 3) {
            const noiseValue = p.noise(x * noiseScale, y * noiseScale, time);
            const brightness = p.map(noiseValue, 0, 1, 0, 30);
            
            if (p.random() > 0.95) {
              p.fill(brightness + 20, brightness + 20, brightness + 25, 40);
              p.noStroke();
              p.rect(x, y, 2, 2);
            }
          }
        }

        // Animated noise particles
        particles.forEach((particle, index) => {
          // Update position with noise influence
          const noiseInfluenceX = p.noise(particle.x * 0.01, particle.y * 0.01, time + particle.noiseOffset) - 0.5;
          const noiseInfluenceY = p.noise(particle.y * 0.01, particle.x * 0.01, time + particle.noiseOffset + 100) - 0.5;
          
          particle.x += particle.speedX + noiseInfluenceX * 0.3;
          particle.y += particle.speedY + noiseInfluenceY * 0.3;
          
          // Wrap around edges
          if (particle.x < 0) particle.x = p.width;
          if (particle.x > p.width) particle.x = 0;
          if (particle.y < 0) particle.y = p.height;
          if (particle.y > p.height) particle.y = 0;
          
          // Dynamic opacity based on noise
          const dynamicOpacity = particle.opacity + p.sin(time * 2 + index) * 0.1;
          
          // Draw particle with glow
          p.fill(255, 255, 255, dynamicOpacity * 255);
          p.noStroke();
          p.ellipse(particle.x, particle.y, particle.size, particle.size);
          
          // Add subtle glow
          p.fill(200, 200, 255, dynamicOpacity * 80);
          p.ellipse(particle.x, particle.y, particle.size * 2, particle.size * 2);
        });

        // Create flowing noise lines
        p.stroke(255, 255, 255, 30);
        p.strokeWeight(0.5);
        p.noFill();
        
        for (let i = 0; i < 8; i++) {
          p.beginShape();
          for (let x = 0; x <= p.width; x += 20) {
            const y = p.height/2 + p.sin(x * 0.01 + time * 2 + i) * 50 + p.noise(x * 0.005, time + i) * 100;
            p.vertex(x, y);
          }
          p.endShape();
        }

        // Add random grain bursts
        if (p.random() > 0.98) {
          const burstX = p.random(p.width);
          const burstY = p.random(p.height);
          
          for (let i = 0; i < 20; i++) {
            const angle = p.random(p.TWO_PI);
            const distance = p.random(10, 40);
            const x = burstX + p.cos(angle) * distance;
            const y = burstY + p.sin(angle) * distance;
            
            p.fill(255, 255, 255, p.random(50, 150));
            p.noStroke();
            p.ellipse(x, y, p.random(1, 3), p.random(1, 3));
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
  }, []);

  return <div ref={containerRef} className="w-full h-full absolute inset-0" />;
}
