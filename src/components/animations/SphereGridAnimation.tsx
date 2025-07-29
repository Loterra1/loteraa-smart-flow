import { useEffect, useRef } from 'react';
import p5 from 'p5';

export default function SphereGridAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const p5Instance = useRef<p5 | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const sketch = (p: p5) => {
      let spheres: any[] = [];
      let mouseInfluence = 0;
      let time = 0;

      p.setup = () => {
        const canvas = p.createCanvas(containerRef.current!.offsetWidth, containerRef.current!.offsetHeight, p.WEBGL);
        canvas.parent(containerRef.current!);
        
        // Initialize multiple spheres
        for (let i = 0; i < 3; i++) {
          spheres.push({
            x: p.random(-200, 200),
            y: p.random(-150, 150),
            z: p.random(-200, 200),
            rotX: 0,
            rotY: 0,
            rotZ: 0,
            scale: p.random(0.6, 1.2),
            speed: p.random(0.005, 0.02),
            gridSize: p.random(15, 25)
          });
        }
      };

      p.draw = () => {
        p.background(0, 0, 0, 0);
        time += 0.01;
        
        // Ambient lighting
        p.ambientLight(80, 80, 100);
        p.directionalLight(255, 255, 255, -1, 0.5, -1);
        
        // Mouse influence calculation
        const mouseDistance = p.dist(p.mouseX, p.mouseY, p.width/2, p.height/2);
        mouseInfluence = p.map(mouseDistance, 0, p.width/2, 1, 0.3);
        
        spheres.forEach((sphere, index) => {
          p.push();
          
          // Position
          p.translate(sphere.x, sphere.y, sphere.z);
          
          // Rotation with time and mouse influence
          sphere.rotX += sphere.speed * mouseInfluence;
          sphere.rotY += sphere.speed * 0.7 * mouseInfluence;
          sphere.rotZ += sphere.speed * 0.5;
          
          p.rotateX(sphere.rotX + time * 0.5);
          p.rotateY(sphere.rotY + time * 0.3);
          p.rotateZ(sphere.rotZ);
          
          // Scale with slight pulsing
          const pulseFactor = 1 + p.sin(time * 2 + index) * 0.1;
          p.scale(sphere.scale * pulseFactor * mouseInfluence);
          
          // Draw wireframe sphere
          p.stroke(255, 255, 255, 120 + p.sin(time + index) * 30);
          p.strokeWeight(0.8);
          p.noFill();
          
          // Create grid-like sphere
          const gridSize = sphere.gridSize;
          const radius = 80;
          
          // Horizontal circles
          for (let lat = -p.PI/2; lat <= p.PI/2; lat += p.PI/gridSize) {
            p.beginShape();
            for (let lon = 0; lon <= p.TWO_PI; lon += p.PI/gridSize) {
              const x = radius * p.cos(lat) * p.cos(lon);
              const y = radius * p.sin(lat);
              const z = radius * p.cos(lat) * p.sin(lon);
              
              // Add wave distortion
              const wave = p.sin(time * 2 + x * 0.02 + y * 0.02) * 5 * mouseInfluence;
              p.vertex(x + wave, y, z);
            }
            p.endShape(p.CLOSE);
          }
          
          // Vertical circles
          for (let lon = 0; lon < p.TWO_PI; lon += p.PI/gridSize) {
            p.beginShape();
            for (let lat = -p.PI/2; lat <= p.PI/2; lat += p.PI/gridSize) {
              const x = radius * p.cos(lat) * p.cos(lon);
              const y = radius * p.sin(lat);
              const z = radius * p.cos(lat) * p.sin(lon);
              
              // Add wave distortion
              const wave = p.sin(time * 2 + x * 0.02 + z * 0.02) * 5 * mouseInfluence;
              p.vertex(x, y + wave, z);
            }
            p.endShape();
          }
          
          p.pop();
        });
        
        // Floating particles
        p.stroke(255, 255, 255, 60);
        p.strokeWeight(2);
        for (let i = 0; i < 20; i++) {
          const particleX = p.sin(time + i) * 300 + p.cos(time * 0.5 + i * 2) * 100;
          const particleY = p.cos(time * 0.7 + i) * 200 + p.sin(time * 0.3 + i * 3) * 50;
          const particleZ = p.sin(time * 0.8 + i * 2) * 150;
          
          p.push();
          p.translate(particleX, particleY, particleZ);
          p.point(0, 0, 0);
          p.pop();
        }
      };

      p.mouseMoved = () => {
        // Add interactive rotation based on mouse movement
        spheres.forEach(sphere => {
          sphere.rotY += (p.mouseX - p.pmouseX) * 0.001;
          sphere.rotX += (p.mouseY - p.pmouseY) * 0.001;
        });
      };

      p.mousePressed = () => {
        // Add burst effect on click
        spheres.forEach(sphere => {
          sphere.rotX += p.random(-0.5, 0.5);
          sphere.rotY += p.random(-0.5, 0.5);
          sphere.rotZ += p.random(-0.5, 0.5);
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
  }, []);

  return <div ref={containerRef} className="w-full h-full" />;
}