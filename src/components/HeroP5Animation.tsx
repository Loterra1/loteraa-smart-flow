import { useEffect, useRef } from 'react';
import p5 from 'p5';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!containerRef.current) return;

    const sketch = (p: p5) => {
      let circles3D: Circle3D[] = [];
      let polarWaveOffset = 0;
      
      // Faster physics properties
      let gravity = 0.3;
      let bounce = 0.7;
      let friction = 0.98;

      p.setup = () => {
        const canvas = p.createCanvas(
          containerRef.current!.offsetWidth, 
          containerRef.current!.offsetHeight, 
          p.WEBGL
        );
        canvas.parent(containerRef.current!);
        canvas.style('position', 'absolute');
        canvas.style('top', '0');
        canvas.style('left', '0');
        canvas.style('width', '100%');
        canvas.style('height', '100%');
        canvas.style('z-index', '1');
        canvas.style('background', '#000000');
        
        // Keep minimal circles for performance
        const circleCount = isMobile ? 1 : 2;
        
        // Create optimized 3D rolling circles with faster speeds
        circles3D = [];
        for (let i = 0; i < circleCount; i++) {
          circles3D.push({
            x: i === 0 ? -p.width/4 : 0,
            y: 0,
            z: i === 0 ? 0 : -50,
            vx: 5, // Increased speed
            vy: 0,
            vz: 0,
            radius: isMobile ? 60 : (i === 0 ? 70 : 85),
            rotation: { x: 0, y: 0, z: 0 },
            rotationSpeed: { 
              x: i === 0 ? 0.025 : -0.02, // Faster rotation
              y: i === 0 ? 0.015 : 0.025, 
              z: i === 0 ? 0.02 : -0.015 
            },
            color: p.color(255, 255, 255, 180),
            hoverRadius: isMobile ? 60 : (i === 0 ? 70 : 85),
            targetRadius: isMobile ? 60 : (i === 0 ? 70 : 85),
            bounceCount: 0,
            direction: 1
          });
        }
      };

      p.draw = () => {
        // Force solid black background
        p.background(0, 0, 0);
        p.clear();
        p.background(0, 0, 0);
        
        // Faster camera movement
        const cameraRadius = isMobile ? 400 : 600;
        const cameraSpeed = 0.0008; // Increased speed
        p.camera(
          p.cos(p.millis() * cameraSpeed) * cameraRadius, 
          -150, 
          p.sin(p.millis() * cameraSpeed) * cameraRadius,
          0, 0, 0,
          0, 1, 0
        );
        
        // Faster polar wave animation
        p.push();
        p.rotateY(polarWaveOffset * 0.5); // Increased rotation speed
        
        const ringCount = isMobile ? 3 : 5; // Reduced rings for performance
        for (let ring = 0; ring < ringCount; ring++) {
          let radius = 80 + ring * 50;
          let height = p.sin(polarWaveOffset + ring * 0.6) * 20;
          
          p.stroke(255, 255, 255, 120 - ring * 20);
          p.strokeWeight(isMobile ? 1 : 1.5);
          p.noFill();
          
          p.beginShape();
          const angleStep = isMobile ? 0.2 : 0.15; // Larger steps for performance
          for (let angle = 0; angle < p.TWO_PI + angleStep; angle += angleStep) {
            let x = p.cos(angle) * radius;
            let z = p.sin(angle) * radius;
            let y = height + p.sin(angle * 4 + polarWaveOffset * 2) * 15; // Faster wave
            p.vertex(x, y, z);
          }
          p.endShape();
        }
        p.pop();
        
        polarWaveOffset += 0.025; // Faster wave animation

        // Update and draw optimized 3D rolling circles with faster movement
        circles3D.forEach((circle, index) => {
          // Faster bouncing pattern
          circle.x += circle.vx * circle.direction;
          
          const boundary = p.width / 4;
          if (circle.x > boundary || circle.x < -boundary) {
            circle.direction *= -1;
          }
          
          // Faster rotation
          circle.rotation.x += circle.rotationSpeed.x;
          circle.rotation.y += circle.rotationSpeed.y;
          circle.rotation.z += circle.rotationSpeed.z;
          
          // Draw optimized 3D sphere
          p.push();
          p.translate(circle.x, circle.y, circle.z);
          p.rotateX(circle.rotation.x);
          p.rotateY(circle.rotation.y);
          p.rotateZ(circle.rotation.z);
          
          // Minimal glow layers for performance
          const glowLayers = isMobile ? 1 : 2;
          for (let i = glowLayers; i >= 1; i--) {
            p.fill(255, 255, 255, 120 / i);
            p.noStroke();
            p.sphere(circle.radius * (1 + i * 0.1));
          }
          
          // Main sphere
          p.fill(255, 255, 255, 250);
          p.stroke(255, 255, 255, 200);
          p.strokeWeight(isMobile ? 1 : 2);
          p.sphere(circle.radius);
          
          p.pop();
        });
      };

      p.mousePressed = () => {
        // Stronger impulse for more responsive interaction
        circles3D.forEach((circle) => {
          circle.vx += p.random(-2, 2);
          circle.vy += p.random(-3, -1);
          circle.vz += p.random(-1, 1);
        });
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

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 w-full h-full z-1"
      style={{ backgroundColor: '#000000' }}
    />
  );
}
