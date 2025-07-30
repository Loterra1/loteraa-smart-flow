
import { useEffect, useRef } from 'react';
import p5 from 'p5';
import { useIsMobile } from '@/hooks/use-mobile';

export default function VortexIllustrationAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const p5Instance = useRef<p5 | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!containerRef.current) return;

    const sketch = (p: p5) => {
      let time = 0;
      let particles: any[] = [];

      p.setup = () => {
        const canvas = p.createCanvas(containerRef.current!.offsetWidth, containerRef.current!.offsetHeight);
        canvas.parent(containerRef.current!);
        
        // Create spiral particles
        const numParticles = isMobile ? 100 : 150;
        for (let i = 0; i < numParticles; i++) {
          const angle = (i / numParticles) * p.TWO_PI * 8; // Multiple spirals
          const radius = (i / numParticles) * (isMobile ? 80 : 120);
          
          particles.push({
            angle: angle,
            radius: radius,
            baseRadius: radius,
            speed: p.random(0.01, 0.03),
            size: p.random(1, 3),
            offset: p.random(0, p.TWO_PI)
          });
        }
      };

      p.draw = () => {
        p.background(0, 0, 0, 20); // Trailing effect
        time += 0.02;
        
        const centerX = p.width / 2;
        const centerY = p.height / 2;
        
        // Update and draw particles in spiral motion
        particles.forEach((particle, i) => {
          // Update spiral motion
          particle.angle += particle.speed;
          
          // Add wave motion to radius
          const wave = p.sin(time * 2 + particle.offset) * 8;
          const currentRadius = particle.baseRadius + wave;
          
          const x = centerX + p.cos(particle.angle) * currentRadius;
          const y = centerY + p.sin(particle.angle) * currentRadius;
          
          // Draw particle with varying opacity based on distance from center
          const alpha = p.map(currentRadius, 0, 120, 255, 50);
          p.fill(255, 255, 255, alpha);
          p.noStroke();
          
          const currentSize = particle.size + p.sin(time * 3 + i) * 0.5;
          p.circle(x, y, currentSize);
          
          // Draw connecting lines between nearby particles
          if (i % 5 === 0) {
            const nextParticle = particles[(i + 1) % particles.length];
            const nextX = centerX + p.cos(nextParticle.angle) * (nextParticle.baseRadius + wave);
            const nextY = centerY + p.sin(nextParticle.angle) * (nextParticle.baseRadius + wave);
            
            p.stroke(255, 255, 255, alpha * 0.3);
            p.strokeWeight(0.5);
            p.line(x, y, nextX, nextY);
          }
        });
        
        // Draw central dark vortex core
        const coreSize = isMobile ? 20 : 30;
        p.fill(0, 0, 0, 150);
        p.noStroke();
        p.circle(centerX, centerY, coreSize);
        
        // Add swirling lines for vortex effect
        p.stroke(255, 255, 255, 100);
        p.strokeWeight(1);
        p.noFill();
        
        for (let r = coreSize; r < (isMobile ? 60 : 100); r += 10) {
          p.push();
          p.translate(centerX, centerY);
          p.rotate(time * (r / 20));
          
          p.beginShape();
          p.noFill();
          for (let a = 0; a < p.TWO_PI; a += 0.1) {
            const spiralR = r + p.sin(a * 3 + time) * 3;
            p.vertex(p.cos(a) * spiralR, p.sin(a) * spiralR);
          }
          p.endShape(p.CLOSE);
          p.pop();
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
