import { useEffect, useRef } from 'react';
import p5 from 'p5';

interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  size: number;
  color: p5.Color;
  life: number;
  maxLife: number;
}

interface PhysicsObject {
  x: number;
  y: number;
  z: number;
  rotationX: number;
  rotationY: number;
  rotationZ: number;
  scale: number;
  targetScale: number;
  velocity: { x: number; y: number; z: number };
  rotationSpeed: { x: number; y: number; z: number };
}

export default function AIModelAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const p5Instance = useRef<p5 | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const sketch = (p: p5) => {
      let particles: Particle[] = [];
      let physicsObjects: PhysicsObject[] = [];
      let mouseForce = { x: 0, y: 0 };
      let time = 0;
      
      p.setup = () => {
        const rect = containerRef.current!.getBoundingClientRect();
        const canvas = p.createCanvas(rect.width, rect.height, p.WEBGL);
        canvas.parent(containerRef.current!);
        
        // Force canvas to cover entire container with black background
        canvas.style('position', 'absolute');
        canvas.style('top', '0px');
        canvas.style('left', '0px');
        canvas.style('width', '100%');
        canvas.style('height', '100%');
        canvas.style('display', 'block');
        canvas.style('background-color', '#000000 !important');
        canvas.style('background', '#000000 !important');
        canvas.style('z-index', '10');
        
        // Initialize physics objects for the image layers
        for (let i = 0; i < 3; i++) {
          physicsObjects.push({
            x: 0,
            y: i * 50 - 50,
            z: i * -100,
            rotationX: 0,
            rotationY: 0,
            rotationZ: 0,
            scale: 1,
            targetScale: 1,
            velocity: { x: 0, y: 0, z: 0 },
            rotationSpeed: { 
              x: p.random(-0.01, 0.01), 
              y: p.random(-0.02, 0.02), 
              z: p.random(-0.005, 0.005) 
            }
          });
        }
        
        // Initialize particles for effects
        for (let i = 0; i < 50; i++) {
          particles.push(createParticle());
        }
      };
      
      const createParticle = (): Particle => {
        const life = p.random(60, 120);
        return {
          x: p.random(-200, 200),
          y: p.random(-200, 200),
          z: p.random(-200, 200),
          vx: p.random(-1, 1),
          vy: p.random(-1, 1),
          vz: p.random(-1, 1),
          size: p.random(2, 8),
          color: p.color(255, 255, 255, p.random(100, 255)),
          life: life,
          maxLife: life
        };
      };

      p.draw = () => {
        // CRITICAL: Multiple layers of black background to prevent any white showing
        p.background(0, 0, 0);
        p.clear();
        p.background(0, 0, 0);
        
        // Force black background fill covering entire canvas area
        p.push();
        p.resetMatrix();
        p.fill(0, 0, 0, 255);
        p.noStroke();
        p.rectMode(p.CORNER);
        p.rect(-p.width, -p.height, p.width * 3, p.height * 3);
        p.pop();
        
        // Additional black background coverage
        p.push();
        p.fill(0, 0, 0, 255);
        p.noStroke();
        p.translate(0, 0, -1000);
        p.rectMode(p.CENTER);
        p.rect(0, 0, p.width * 2, p.height * 2);
        p.pop();
        
        p.lights();
        
        time += 0.02;
        
        // Camera rotation - adjusted for mobile
        const cameraDistance = p.width < 768 ? 300 : 400;
        p.camera(
          p.cos(time * 0.3) * cameraDistance,
          -100,
          p.sin(time * 0.3) * cameraDistance,
          0, 0, 0,
          0, 1, 0
        );
        
        // Update mouse force
        if (p.mouseX && p.mouseY) {
          mouseForce.x = (p.mouseX - p.width/2) * 0.001;
          mouseForce.y = (p.mouseY - p.height/2) * 0.001;
        }
        
        // Update and draw physics objects (image layers)
        physicsObjects.forEach((obj, index) => {
          // Apply physics
          obj.velocity.x += mouseForce.x;
          obj.velocity.y += mouseForce.y;
          obj.velocity.x *= 0.95; // Damping
          obj.velocity.y *= 0.95;
          
          obj.x += obj.velocity.x;
          obj.y += obj.velocity.y;
          
          // Update rotations
          obj.rotationX += obj.rotationSpeed.x;
          obj.rotationY += obj.rotationSpeed.y;
          obj.rotationZ += obj.rotationSpeed.z;
          
          // Hover effect
          let distance = p.dist(p.mouseX - p.width/2, p.mouseY - p.height/2, obj.x, obj.y);
          obj.targetScale = distance < 100 ? 1.2 : 1;
          obj.scale = p.lerp(obj.scale, obj.targetScale, 0.1);
          
          // Draw layered shape representing the image concept
          p.push();
          p.translate(obj.x, obj.y, obj.z);
          p.rotateX(obj.rotationX);
          p.rotateY(obj.rotationY);
          p.rotateZ(obj.rotationZ);
          p.scale(obj.scale);
          
          // Draw geometric representation of the image
          p.fill(255, 255, 255, 150 - index * 30);
          p.stroke(255, 200);
          p.strokeWeight(1);
          
          // Create diamond/rhombus shape like in the image - scaled for mobile
          const size = p.width < 768 ? 40 : 60;
          p.beginShape(p.TRIANGLES);
          // Top diamond
          p.vertex(-size, -size, 0);
          p.vertex(size, -size, 0);
          p.vertex(0, 0, 20);
          
          // Bottom diamond
          p.vertex(-size, size, 0);
          p.vertex(size, size, 0);
          p.vertex(0, 0, -20);
          
          // Side diamonds
          p.vertex(-size, -size, 0);
          p.vertex(-size, size, 0);
          p.vertex(0, 0, 20);
          
          p.vertex(size, -size, 0);
          p.vertex(size, size, 0);
          p.vertex(0, 0, -20);
          p.endShape();
          
          // Add glowing sphere in center - scaled for mobile
          p.fill(255, 255, 255, 200);
          p.noStroke();
          const sphereSize = p.width < 768 ? 20 : 30;
          p.sphere(sphereSize + p.sin(time + index) * 5);
          
          p.pop();
        });
        
        // Update and draw particles
        particles.forEach((particle, index) => {
          particle.x += particle.vx;
          particle.y += particle.vy;
          particle.z += particle.vz;
          particle.life--;
          
          // Apply gravity and mouse attraction
          let mouseDistance = p.dist(p.mouseX - p.width/2, p.mouseY - p.height/2, particle.x, particle.y);
          if (mouseDistance < 150) {
            let force = (150 - mouseDistance) * 0.001;
            particle.vx += (p.mouseX - p.width/2 - particle.x) * force;
            particle.vy += (p.mouseY - p.height/2 - particle.y) * force;
          }
          
          // Draw particle
          p.push();
          p.translate(particle.x, particle.y, particle.z);
          p.fill(255, 255, 255, (particle.life / particle.maxLife) * 255);
          p.noStroke();
          p.sphere(particle.size);
          p.pop();
          
          // Reset particle if dead
          if (particle.life <= 0) {
            particles[index] = createParticle();
          }
        });
        
        // Draw connecting lines between objects
        p.stroke(255, 100);
        p.strokeWeight(1);
        for (let i = 0; i < physicsObjects.length - 1; i++) {
          let obj1 = physicsObjects[i];
          let obj2 = physicsObjects[i + 1];
          p.line(obj1.x, obj1.y, obj1.z, obj2.x, obj2.y, obj2.z);
        }
      };
      
      p.mousePressed = () => {
        // Add explosion effect when clicked
        for (let i = 0; i < 20; i++) {
          particles.push(createParticle());
        }
        
        // Apply impulse to physics objects
        physicsObjects.forEach(obj => {
          obj.velocity.x += p.random(-5, 5);
          obj.velocity.y += p.random(-5, 5);
          obj.rotationSpeed.x += p.random(-0.1, 0.1);
          obj.rotationSpeed.y += p.random(-0.1, 0.1);
        });
      };
      
      p.windowResized = () => {
        if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          p.resizeCanvas(rect.width, rect.height);
          // Force black background on resize
          p.background(0, 0, 0);
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
    <div 
      ref={containerRef} 
      className="absolute inset-0 w-full h-full"
      style={{ 
        backgroundColor: '#000000 !important',
        background: '#000000 !important',
        minHeight: '100%',
        minWidth: '100%',
        overflow: 'hidden',
        zIndex: 2
      }}
    />
  );
}
