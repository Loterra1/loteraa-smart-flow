import { useEffect, useRef } from "react";
import p5 from 'p5';

export default function WireframeAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const p5Instance = useRef<p5 | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const sketch = (p: p5) => {
      let time = 0;
      let mouseInfluence = 0;
      let spheres: Array<{x: number, y: number, z: number, size: number, rotationX: number, rotationY: number}> = [];

      p.setup = () => {
        const canvas = p.createCanvas(300, 280, p.WEBGL);
        canvas.parent(containerRef.current!);
        
        // Initialize stacked spheres
        for (let i = 0; i < 3; i++) {
          spheres.push({
            x: 0,
            y: i * 60 - 60,
            z: 0,
            size: 80 - i * 15,
            rotationX: 0,
            rotationY: 0
          });
        }
      };

      p.draw = () => {
        p.background(0, 0);
        p.clear();
        
        // Lighting
        p.ambientLight(100);
        p.directionalLight(255, 255, 255, 0, 0.5, -1);
        
        time += 0.02;
        mouseInfluence *= 0.95;
        
        // Draw stacked wireframe spheres
        spheres.forEach((sphere, index) => {
          p.push();
          
          // Position sphere
          p.translate(sphere.x, sphere.y, sphere.z);
          
          // Rotation with time and mouse influence
          sphere.rotationX += 0.005 + mouseInfluence * 0.02;
          sphere.rotationY += 0.008 + mouseInfluence * 0.015;
          
          p.rotateX(sphere.rotationX + p.sin(time + index) * 0.2);
          p.rotateY(sphere.rotationY + p.cos(time + index * 0.5) * 0.3);
          
          // Wireframe style
          p.stroke(255, 255, 255, 200 - index * 30);
          p.strokeWeight(1 + mouseInfluence * 0.5);
          p.noFill();
          
          // Draw sphere with grid pattern
          const detail = 12 + Math.floor(mouseInfluence * 8);
          
          // Horizontal lines
          for (let lat = 0; lat <= detail; lat++) {
            p.beginShape();
            for (let lon = 0; lon <= detail * 2; lon++) {
              let phi = p.map(lat, 0, detail, 0, p.PI);
              let theta = p.map(lon, 0, detail * 2, 0, p.TWO_PI);
              
              let x = sphere.size * p.sin(phi) * p.cos(theta);
              let y = sphere.size * p.cos(phi);
              let z = sphere.size * p.sin(phi) * p.sin(theta);
              
              // Add wave distortion
              let wave = p.sin(time * 2 + lat * 0.3 + lon * 0.2) * (2 + mouseInfluence * 5);
              x += wave;
              z += wave;
              
              p.vertex(x, y, z);
            }
            p.endShape();
          }
          
          // Vertical lines
          for (let lon = 0; lon <= detail * 2; lon++) {
            p.beginShape();
            for (let lat = 0; lat <= detail; lat++) {
              let phi = p.map(lat, 0, detail, 0, p.PI);
              let theta = p.map(lon, 0, detail * 2, 0, p.TWO_PI);
              
              let x = sphere.size * p.sin(phi) * p.cos(theta);
              let y = sphere.size * p.cos(phi);
              let z = sphere.size * p.sin(phi) * p.sin(theta);
              
              // Add wave distortion
              let wave = p.sin(time * 2 + lat * 0.3 + lon * 0.2) * (2 + mouseInfluence * 5);
              x += wave;
              z += wave;
              
              p.vertex(x, y, z);
            }
            p.endShape();
          }
          
          p.pop();
        });
        
        // Add floating wireframe particles
        for (let i = 0; i < 20; i++) {
          p.push();
          
          let angle = time * 0.5 + i * 0.3;
          let radius = 100 + p.sin(time + i) * 30;
          
          let x = p.cos(angle) * radius;
          let y = p.sin(angle + time) * 20;
          let z = p.sin(angle) * radius;
          
          p.translate(x, y, z);
          
          p.stroke(255, 255, 255, 100);
          p.strokeWeight(1);
          p.noFill();
          
          let size = 3 + p.sin(time * 2 + i) * 2 + mouseInfluence * 2;
          p.sphere(size, 6, 6);
          
          p.pop();
        }
      };

      p.mouseMoved = () => {
        if (p.mouseX > 0 && p.mouseX < p.width && p.mouseY > 0 && p.mouseY < p.height) {
          let centerX = p.width / 2;
          let centerY = p.height / 2;
          let distance = p.dist(p.mouseX, p.mouseY, centerX, centerY);
          mouseInfluence = p.map(distance, 0, p.width/2, 2, 0);
        }
      };

      p.mousePressed = () => {
        if (p.mouseX > 0 && p.mouseX < p.width && p.mouseY > 0 && p.mouseY < p.height) {
          mouseInfluence = 4;
          // Randomize sphere rotations
          spheres.forEach(sphere => {
            if (p.random() < 0.5) {
              sphere.rotationX += p.random(-0.5, 0.5);
              sphere.rotationY += p.random(-0.5, 0.5);
            }
          });
        }
      };

      p.windowResized = () => {
        p.resizeCanvas(300, 280);
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