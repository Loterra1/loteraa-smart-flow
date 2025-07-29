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
        
        // Create 2 big 3D rolling circles
        circles3D = [
          {
            x: -200,
            y: -50,
            z: 0,
            vx: 2,
            vy: 1,
            vz: 0.5,
            radius: 80,
            rotation: { x: 0, y: 0, z: 0 },
            rotationSpeed: { x: 0.02, y: 0.01, z: 0.015 },
            color: p.color(255, 255, 255, 150),
            hoverRadius: 80,
            targetRadius: 80,
            bounceCount: 0
          },
          {
            x: 200,
            y: 50,
            z: -100,
            vx: -1.5,
            vy: -0.8,
            vz: 0.3,
            radius: 100,
            rotation: { x: 0, y: 0, z: 0 },
            rotationSpeed: { x: -0.015, y: 0.02, z: -0.01 },
            color: p.color(200, 200, 255, 180),
            hoverRadius: 100,
            targetRadius: 100,
            bounceCount: 0
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

        // Update and draw 3D rolling circles
        circles3D.forEach((circle, index) => {
          // Physics - bouncing ball behavior
          circle.x += circle.vx;
          circle.y += circle.vy;
          circle.z += circle.vz;
          
          // Apply gravity
          circle.vy += gravity;
          
          // Bounce off boundaries
          let boundaryX = 400;
          let boundaryY = 300;
          let boundaryZ = 200;
          
          if (circle.x <= -boundaryX || circle.x >= boundaryX) {
            circle.vx *= -bounce;
            circle.x = p.constrain(circle.x, -boundaryX, boundaryX);
          }
          if (circle.y <= -boundaryY || circle.y >= boundaryY) {
            circle.vy *= -bounce;
            circle.y = p.constrain(circle.y, -boundaryY, boundaryY);
            circle.bounceCount++;
          }
          if (circle.z <= -boundaryZ || circle.z >= boundaryZ) {
            circle.vz *= -bounce;
            circle.z = p.constrain(circle.z, -boundaryZ, boundaryZ);
          }
          
          // Apply friction
          circle.vx *= friction;
          circle.vz *= friction;
          
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
          
          // Outer glow
          for (let i = 3; i >= 1; i--) {
            p.fill(p.red(circle.color), p.green(circle.color), p.blue(circle.color), 30 / i);
            p.noStroke();
            p.sphere(circle.radius * (1 + i * 0.2));
          }
          
          // Main sphere
          p.fill(circle.color);
          p.stroke(255, 100);
          p.strokeWeight(1);
          p.sphere(circle.radius);
          
          // Add wireframe pattern
          p.stroke(255, 150);
          p.strokeWeight(0.5);
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
      className="absolute inset-0 w-full h-full z-0"
      style={{ background: 'transparent', cursor: 'grab' }}
    />
  );
}