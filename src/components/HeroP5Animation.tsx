import { useEffect, useRef } from 'react';
import p5 from 'p5';

interface Circle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: p5.Color;
  trail: Array<{ x: number; y: number; alpha: number }>;
}

export default function HeroP5Animation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const p5Instance = useRef<p5 | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const sketch = (p: p5) => {
      let circles: Circle[] = [];
      let mouseForce = 0;
      const numCircles = 8;
      const maxTrailLength = 15;

      p.setup = () => {
        const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        canvas.parent(containerRef.current!);
        
        // Initialize circles
        for (let i = 0; i < numCircles; i++) {
          circles.push({
            x: p.random(100, p.width - 100),
            y: p.random(100, p.height - 100),
            vx: p.random(-2, 2),
            vy: p.random(-2, 2),
            radius: p.random(20, 60),
            color: p.color(255, 255, 255, 180),
            trail: []
          });
        }
      };

      p.draw = () => {
        p.background(0, 0, 0, 50);
        
        // Update and draw circles
        circles.forEach(circle => {
          // Add current position to trail
          circle.trail.push({ x: circle.x, y: circle.y, alpha: 255 });
          if (circle.trail.length > maxTrailLength) {
            circle.trail.shift();
          }

          // Mouse interaction - repulsion force
          const mouseDistance = p.dist(p.mouseX, p.mouseY, circle.x, circle.y);
          if (mouseDistance < 150) {
            const repelForce = p.map(mouseDistance, 0, 150, 0.8, 0);
            const angle = p.atan2(circle.y - p.mouseY, circle.x - p.mouseX);
            circle.vx += p.cos(angle) * repelForce;
            circle.vy += p.sin(angle) * repelForce;
            mouseForce = p.lerp(mouseForce, 1, 0.1);
          } else {
            mouseForce = p.lerp(mouseForce, 0, 0.05);
          }

          // Apply physics
          circle.x += circle.vx;
          circle.y += circle.vy;
          
          // Add slight gravity and friction
          circle.vy += 0.02;
          circle.vx *= 0.99;
          circle.vy *= 0.99;

          // Boundary collision with rolling effect
          if (circle.x + circle.radius > p.width || circle.x - circle.radius < 0) {
            circle.vx *= -0.8;
            circle.x = p.constrain(circle.x, circle.radius, p.width - circle.radius);
          }
          if (circle.y + circle.radius > p.height || circle.y - circle.radius < 0) {
            circle.vy *= -0.8;
            circle.y = p.constrain(circle.y, circle.radius, p.height - circle.radius);
          }

          // Draw trail
          circle.trail.forEach((point, index) => {
            const alpha = p.map(index, 0, circle.trail.length - 1, 0, 100);
            p.fill(255, 255, 255, alpha);
            p.noStroke();
            const size = p.map(index, 0, circle.trail.length - 1, 2, 8);
            p.ellipse(point.x, point.y, size);
          });

          // Draw main circle with glow effect
          p.push();
          p.translate(circle.x, circle.y);
          
          // Glow effect
          for (let i = 0; i < 3; i++) {
            p.fill(255, 255, 255, 30 - i * 10);
            p.noStroke();
            p.ellipse(0, 0, circle.radius * 2 + i * 10);
          }
          
          // Main circle
          p.fill(255, 255, 255, 150);
          p.stroke(255, 255, 255, 200);
          p.strokeWeight(1);
          p.ellipse(0, 0, circle.radius * 2);
          
          // Inner highlight
          p.fill(255, 255, 255, 80);
          p.noStroke();
          p.ellipse(-circle.radius * 0.3, -circle.radius * 0.3, circle.radius * 0.6);
          
          p.pop();
        });

        // Add floating particles
        for (let i = 0; i < 20; i++) {
          const x = p.random(p.width);
          const y = p.random(p.height);
          const size = p.random(1, 3);
          const alpha = p.random(50, 150);
          p.fill(255, 255, 255, alpha);
          p.noStroke();
          p.ellipse(x, y, size);
        }
      };

      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
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
    <div 
      ref={containerRef} 
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  );
}