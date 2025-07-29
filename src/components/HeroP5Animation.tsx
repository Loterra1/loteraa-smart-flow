import { useEffect, useRef } from 'react';
import p5 from 'p5';

interface Circle3D {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  radius: number;
  rotation: { x: number; y: number; z: number };
  rotationSpeed: { x: number; y: number; z: number };
  color: p5.Color;
  hoverRadius: number;
  targetRadius: number;
  bounceCount: number;
  direction: number;
}

export default function HeroP5Animation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const p5Instance = useRef<p5 | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const sketch = (p: p5) => {
      let circles3D: Circle3D[] = [];
      let polarWaveOffset = 0;
      let cam: any;
      
      // Physics properties
      let gravity = 0.2;
      let bounce = 0.7;
      let friction = 0.98;

      p.setup = () => {
        const canvas = p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
        canvas.parent(containerRef.current!);
        
        // Create 2 big 3D rolling circles with specific bouncing pattern
        circles3D = [
          {
            x: -p.windowWidth/3, // Start from left side
            y: 0,
            z: 0,
            vx: 4, // Moving towards center then right
            vy: 0,
            vz: 0,
            radius: 80,
            rotation: { x: 0, y: 0, z: 0 },
            rotationSpeed: { x: 0.02, y: 0.01, z: 0.015 },
            color: p.color(255, 255, 255, 150),
            hoverRadius: 80,
            targetRadius: 80,
            bounceCount: 0,
            direction: 1 // 1 for moving right, -1 for moving left
          },
          {
            x: 0, // Start from center
            y: 0,
            z: -100,
            vx: 4, // Moving towards right
            vy: 0,
            vz: 0,
            radius: 100,
            rotation: { x: 0, y: 0, z: 0 },
            rotationSpeed: { x: -0.015, y: 0.02, z: -0.01 },
            color: p.color(200, 200, 255, 180),
            hoverRadius: 100,
            targetRadius: 100,
            bounceCount: 0,
            direction: 1 // 1 for moving right, -1 for moving left
          }
        ];
      };

      p.draw = () => {
        p.background(0, 30);
        
        // Set up 3D camera
        p.camera(
          p.cos(p.millis() * 0.0005) * 800, 
          -200, 
          p.sin(p.millis() * 0.0005) * 800,
          0, 0, 0,
          0, 1, 0
        );
        
        // Draw 3D polar sine wave - circular oscillating rings
        p.push();
        p.rotateY(polarWaveOffset * 0.5);
        
        for (let ring = 0; ring < 8; ring++) {
          let radius = 100 + ring * 60;
          let height = p.sin(polarWaveOffset + ring * 0.8) * 30;
          
          p.stroke(255, 255, 255, 150 - ring * 15);
          p.strokeWeight(2);
          p.noFill();
          
          p.beginShape();
          for (let angle = 0; angle < p.TWO_PI + 0.1; angle += 0.1) {
            let x = p.cos(angle) * radius;
            let z = p.sin(angle) * radius;
            let y = height + p.sin(angle * 6 + polarWaveOffset * 2) * 20;
            p.vertex(x, y, z);
          }
          p.endShape();
          
          // Add glowing effect
          p.stroke(255, 255, 255, 50 - ring * 5);
          p.strokeWeight(4);
          p.beginShape();
          for (let angle = 0; angle < p.TWO_PI + 0.1; angle += 0.2) {
            let x = p.cos(angle) * radius;
            let z = p.sin(angle) * radius;
            let y = height + p.sin(angle * 6 + polarWaveOffset * 2) * 20;
            p.vertex(x, y, z);
          }
          p.endShape();
        }
        p.pop();
        
        polarWaveOffset += 0.02;

        // Update and draw 3D rolling circles with specific bouncing pattern
        circles3D.forEach((circle, index) => {
          // Specific bouncing pattern
          circle.x += circle.vx * circle.direction;
          
          // Define boundaries based on window width
          let leftBoundary = -p.windowWidth/3;
          let centerPosition = 0;
          let rightBoundary = p.windowWidth/3;
          
          // First circle: starts from left, goes to center, then to right, then back
          if (index === 0) {
            if (circle.bounceCount === 0) {
              // Moving from left to center
              if (circle.x >= centerPosition) {
                circle.direction = 1; // Continue to right
                circle.bounceCount = 1;
              }
            } else if (circle.bounceCount === 1) {
              // Moving from center to right
              if (circle.x >= rightBoundary) {
                circle.direction = -1; // Bounce back to left
                circle.bounceCount = 2;
              }
            } else if (circle.bounceCount === 2) {
              // Moving back from right to left
              if (circle.x <= leftBoundary) {
                circle.direction = 1; // Stop or continue pattern
                circle.bounceCount = 3;
              }
            }
          }
          
          // Second circle: starts from center, goes to right, then to left
          if (index === 1) {
            if (circle.bounceCount === 0) {
              // Moving from center to right
              if (circle.x >= rightBoundary) {
                circle.direction = -1; // Bounce back to left
                circle.bounceCount = 1;
              }
            } else if (circle.bounceCount === 1) {
              // Moving from right to left
              if (circle.x <= leftBoundary) {
                circle.direction = 1; // Bounce back to right
                circle.bounceCount = 2;
              }
            }
          }
          
          // Reset position if goes too far
          if (circle.x < -p.windowWidth/2) circle.x = -p.windowWidth/2;
          if (circle.x > p.windowWidth/2) circle.x = p.windowWidth/2;
          
          // Update rotation based on movement
          circle.rotation.x += circle.rotationSpeed.x + circle.vy * 0.01;
          circle.rotation.y += circle.rotationSpeed.y + circle.vx * 0.01;
          circle.rotation.z += circle.rotationSpeed.z + circle.vz * 0.01;
          
          // Draw 3D sphere
          p.push();
          p.translate(circle.x, circle.y, circle.z);
          p.rotateX(circle.rotation.x);
          p.rotateY(circle.rotation.y);
          p.rotateZ(circle.rotation.z);
          
          // Outer glow - extremely bright and visible
          for (let i = 3; i >= 1; i--) {
            p.fill(255, 255, 255, 150 / i);
            p.noStroke();
            p.sphere(circle.radius * (1 + i * 0.2));
          }
          
          // Main sphere - extremely visible and bright
          p.fill(255, 255, 255, 255);
          p.stroke(255, 255, 255, 255);
          p.strokeWeight(3);
          p.sphere(circle.radius);
          
          // Add bright wireframe pattern
          p.stroke(255, 255, 255, 200);
          p.strokeWeight(1.5);
          p.noFill();
          for (let i = 0; i < 6; i++) {
            p.push();
            p.rotateY((i / 6) * p.TWO_PI);
            p.circle(0, 0, circle.radius * 1.5);
            p.pop();
          }
          
          p.pop();
        });

      };

      p.mousePressed = () => {
        // Add impulse to circles when clicked
        circles3D.forEach((circle) => {
          circle.vx += p.random(-2, 2);
          circle.vy += p.random(-3, -1);
          circle.vz += p.random(-1, 1);
        });
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
      className="absolute inset-0 w-full h-full z-1"
      style={{ background: 'transparent', cursor: 'grab' }}
    />
  );
}