import { useEffect, useRef } from 'react';
import p5 from 'p5';

interface Building {
  x: number;
  y: number;
  width: number;
  height: number;
  activity: number;
  connections: number[];
  pulseIntensity: number;
  data: number;
}

interface TrafficDot {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  speed: number;
  size: number;
  color: p5.Color;
  pathIndex: number;
}

interface Road {
  from: number;
  to: number;
  points: Array<{ x: number; y: number }>;
}

export default function HeroP5Animation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const p5Instance = useRef<p5 | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const sketch = (p: p5) => {
      let circles: any[] = [];
      let floatingElements: any[] = [];
      let sineWaveOffset = 0;
      
      // Physics properties
      let gravity = 0.3;
      let bounce = 0.8;
      let friction = 0.99;

      p.setup = () => {
        const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        canvas.parent(containerRef.current!);
        
        // Create 2 big rolling circles
        circles = [
          {
            x: p.width * 0.3,
            y: p.height * 0.4,
            vx: 1,
            vy: 0,
            radius: 80,
            rotation: 0,
            color: p.color(255, 255, 255, 100),
            hoverRadius: 80,
            targetRadius: 80,
            isDropping: false,
            dropStartY: 0,
            bounceCount: 0
          },
          {
            x: p.width * 0.7,
            y: p.height * 0.6,
            vx: -0.8,
            vy: 0,
            radius: 100,
            rotation: 0,
            color: p.color(200, 200, 255, 120),
            hoverRadius: 100,
            targetRadius: 100,
            isDropping: false,
            dropStartY: 0,
            bounceCount: 0
          }
        ];

        // Create floating elements
        for (let i = 0; i < 15; i++) {
          floatingElements.push({
            x: p.random(p.width),
            y: p.random(p.height),
            vx: p.random(-0.5, 0.5),
            vy: p.random(-0.5, 0.5),
            radius: p.random(5, 15),
            opacity: p.random(30, 80),
            phase: p.random(p.TWO_PI)
          });
        }
      };

      p.draw = () => {
        p.background(0, 20); // Slight trail effect
        
        // Draw animated sine wave in the middle
        p.stroke(100, 150, 255, 80);
        p.strokeWeight(3);
        p.noFill();
        
        p.beginShape();
        for (let x = 0; x < p.width; x += 5) {
          let y = p.height / 2 + p.sin((x * 0.01) + sineWaveOffset) * 50;
          p.vertex(x, y);
        }
        p.endShape();
        
        // Second sine wave with different frequency
        p.stroke(255, 100, 150, 60);
        p.strokeWeight(2);
        p.beginShape();
        for (let x = 0; x < p.width; x += 5) {
          let y = p.height / 2 + p.sin((x * 0.015) + sineWaveOffset * 1.5) * 30;
          p.vertex(x, y);
        }
        p.endShape();
        
        sineWaveOffset += 0.02;

        // Update and draw floating elements
        floatingElements.forEach((element) => {
          // Physics
          element.x += element.vx;
          element.y += element.vy;
          
          // Bounce off walls
          if (element.x <= element.radius || element.x >= p.width - element.radius) {
            element.vx *= -0.8;
            element.x = p.constrain(element.x, element.radius, p.width - element.radius);
          }
          if (element.y <= element.radius || element.y >= p.height - element.radius) {
            element.vy *= -0.8;
            element.y = p.constrain(element.y, element.radius, p.height - element.radius);
          }
          
          // Gentle floating motion
          element.vx += p.sin(p.millis() * 0.001 + element.phase) * 0.01;
          element.vy += p.cos(p.millis() * 0.001 + element.phase) * 0.01;
          
          // Apply friction
          element.vx *= 0.99;
          element.vy *= 0.99;
          
          // Draw element
          p.fill(255, 255, 255, element.opacity);
          p.noStroke();
          p.circle(element.x, element.y, element.radius * 2);
          
          // Glow effect
          p.fill(255, 255, 255, element.opacity * 0.3);
          p.circle(element.x, element.y, element.radius * 3);
        });

        // Update and draw big rolling circles
        circles.forEach((circle, index) => {
          // Check for mouse hover
          let mouseDistance = p.dist(p.mouseX, p.mouseY, circle.x, circle.y);
          if (mouseDistance < circle.radius + 50) {
            circle.targetRadius = circle.hoverRadius * 1.3;
            
            // Add interactive physics - push away from mouse
            let pushX = (circle.x - p.mouseX) * 0.02;
            let pushY = (circle.y - p.mouseY) * 0.02;
            circle.vx += pushX;
            circle.vy += pushY;
            
            // Chance to trigger water drop effect
            if (p.random() < 0.01 && !circle.isDropping) {
              circle.isDropping = true;
              circle.dropStartY = circle.y;
              circle.vy = 0;
              circle.bounceCount = 0;
            }
          } else {
            circle.targetRadius = circle.hoverRadius;
          }
          
          // Smooth radius transition
          circle.radius = p.lerp(circle.radius, circle.targetRadius, 0.1);
          
          // Water drop physics
          if (circle.isDropping) {
            circle.vy += gravity;
            circle.y += circle.vy;
            
            // Check if hit ground or bounce limit
            if (circle.y > p.height - circle.radius || circle.bounceCount > 3) {
              circle.vy *= -bounce;
              circle.y = p.height - circle.radius;
              circle.bounceCount++;
              
              if (circle.bounceCount > 3 || Math.abs(circle.vy) < 2) {
                circle.isDropping = false;
                circle.y = circle.dropStartY;
                circle.vy = 0;
              }
            }
          } else {
            // Normal rolling physics
            circle.x += circle.vx;
            circle.y += circle.vy;
            
            // Rolling rotation
            circle.rotation += circle.vx * 0.02;
            
            // Bounce off walls
            if (circle.x <= circle.radius || circle.x >= p.width - circle.radius) {
              circle.vx *= -bounce;
              circle.x = p.constrain(circle.x, circle.radius, p.width - circle.radius);
            }
            if (circle.y <= circle.radius || circle.y >= p.height - circle.radius) {
              circle.vy *= -bounce;
              circle.y = p.constrain(circle.y, circle.radius, p.height - circle.radius);
            }
            
            // Apply friction
            circle.vx *= friction;
            circle.vy *= friction;
            
            // Gentle sine wave motion
            circle.vy += p.sin(p.millis() * 0.003 + index) * 0.1;
          }
          
          // Draw circle with glow
          p.push();
          p.translate(circle.x, circle.y);
          p.rotate(circle.rotation);
          
          // Outer glow
          for (let i = 3; i >= 1; i--) {
            p.fill(p.red(circle.color), p.green(circle.color), p.blue(circle.color), 20 / i);
            p.noStroke();
            p.circle(0, 0, circle.radius * 2 * (1 + i * 0.2));
          }
          
          // Main circle
          p.fill(circle.color);
          p.stroke(255, 150);
          p.strokeWeight(2);
          p.circle(0, 0, circle.radius * 2);
          
          // Rolling pattern
          p.stroke(255, 100);
          p.strokeWeight(1);
          for (let i = 0; i < 8; i++) {
            let angle = (i / 8) * p.TWO_PI;
            let x1 = p.cos(angle) * circle.radius * 0.3;
            let y1 = p.sin(angle) * circle.radius * 0.3;
            let x2 = p.cos(angle) * circle.radius * 0.7;
            let y2 = p.sin(angle) * circle.radius * 0.7;
            p.line(x1, y1, x2, y2);
          }
          
          p.pop();
          
          // Particle trail for dropping effect
          if (circle.isDropping && circle.vy > 5) {
            for (let i = 0; i < 5; i++) {
              p.fill(255, 255, 255, 80 - i * 15);
              p.noStroke();
              let trailX = circle.x + p.random(-circle.radius/2, circle.radius/2);
              let trailY = circle.y - i * 10;
              p.circle(trailX, trailY, 8 - i);
            }
          }
        });
        
        // Interaction between circles and floating elements
        circles.forEach((circle) => {
          floatingElements.forEach((element) => {
            let distance = p.dist(circle.x, circle.y, element.x, element.y);
            if (distance < circle.radius + element.radius) {
              // Collision response
              let angle = p.atan2(element.y - circle.y, element.x - circle.x);
              let targetX = circle.x + p.cos(angle) * (circle.radius + element.radius);
              let targetY = circle.y + p.sin(angle) * (circle.radius + element.radius);
              
              element.vx += (targetX - element.x) * 0.1;
              element.vy += (targetY - element.y) * 0.1;
            }
          });
        });
      };

      p.mousePressed = () => {
        // Check if clicking on a circle to trigger drop effect
        circles.forEach((circle) => {
          let distance = p.dist(p.mouseX, p.mouseY, circle.x, circle.y);
          if (distance < circle.radius && !circle.isDropping) {
            circle.isDropping = true;
            circle.dropStartY = circle.y;
            circle.vy = 0;
            circle.bounceCount = 0;
          }
        });
      };

      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
        
        // Adjust circle positions for new canvas size
        circles.forEach((circle) => {
          circle.x = p.constrain(circle.x, circle.radius, p.width - circle.radius);
          circle.y = p.constrain(circle.y, circle.radius, p.height - circle.radius);
        });
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
      className="absolute inset-0 w-full h-full z-0"
      style={{ background: 'transparent', cursor: 'grab' }}
    />
  );
}