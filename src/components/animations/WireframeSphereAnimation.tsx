import { useEffect, useRef } from "react";
import p5 from 'p5';

export default function WireframeSphereAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const p5Instance = useRef<p5 | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const sketch = (p: p5) => {
      let time = 0;
      let mouseInfluence = 0;
      let spheres: Array<{x: number, y: number, z: number, rotation: p5.Vector, scale: number}> = [];

      p.setup = () => {
        const canvas = p.createCanvas(800, 600, p.WEBGL);
        canvas.parent(containerRef.current!);
        
        // Initialize three spheres like in the image
        spheres = [
          {x: 0, y: -100, z: 0, rotation: p.createVector(0, 0, 0), scale: 1.2},
          {x: 0, y: 50, z: 0, rotation: p.createVector(0, 0, 0), scale: 1.0},
          {x: 0, y: 180, z: 0, rotation: p.createVector(0, 0, 0), scale: 0.8}
        ];
      };

      p.draw = () => {
        p.background(0, 0);
        p.clear();
        
        // Lighting
        p.ambientLight(60);
        p.directionalLight(255, 255, 255, 0.5, 0.5, -1);
        
        time += 0.01;
        mouseInfluence *= 0.95;
        
        // Draw wireframe spheres
        spheres.forEach((sphere, index) => {
          p.push();
          p.translate(sphere.x, sphere.y, sphere.z);
          
          // Individual rotation
          sphere.rotation.x += 0.005 + mouseInfluence * 0.02;
          sphere.rotation.y += 0.008 + mouseInfluence * 0.03;
          sphere.rotation.z += 0.003;
          
          p.rotateX(sphere.rotation.x);
          p.rotateY(sphere.rotation.y);
          p.rotateZ(sphere.rotation.z);
          
          p.scale(sphere.scale);
          
          // Wireframe style
          p.stroke(255, 255, 255, 180);
          p.strokeWeight(0.8);
          p.noFill();
          
          // Create wireframe sphere with grid pattern
          let detail = 20;
          let radius = 80;
          
          // Draw latitude lines
          for (let lat = 0; lat < detail; lat++) {
            p.beginShape();
            for (let lon = 0; lon <= detail; lon++) {
              let phi = p.map(lat, 0, detail - 1, 0, p.PI);
              let theta = p.map(lon, 0, detail, 0, p.TWO_PI);
              
              let x = radius * p.sin(phi) * p.cos(theta);
              let y = radius * p.cos(phi);
              let z = radius * p.sin(phi) * p.sin(theta);
              
              // Add wave distortion
              let wave = p.sin(time * 2 + lat * 0.3 + lon * 0.2) * 5 * mouseInfluence;
              x += wave;
              y += wave;
              z += wave;
              
              p.vertex(x, y, z);
            }
            p.endShape();
          }
          
          // Draw longitude lines
          for (let lon = 0; lon < detail; lon++) {
            p.beginShape();
            for (let lat = 0; lat <= detail; lat++) {
              let phi = p.map(lat, 0, detail, 0, p.PI);
              let theta = p.map(lon, 0, detail - 1, 0, p.TWO_PI);
              
              let x = radius * p.sin(phi) * p.cos(theta);
              let y = radius * p.cos(phi);
              let z = radius * p.sin(phi) * p.sin(theta);
              
              // Add wave distortion
              let wave = p.sin(time * 2 + lat * 0.2 + lon * 0.3) * 5 * mouseInfluence;
              x += wave;
              y += wave;
              z += wave;
              
              p.vertex(x, y, z);
            }
            p.endShape();
          }
          
          p.pop();
        });
        
        // Add floating particles
        for (let i = 0; i < 30; i++) {
          let angle = time + i * 0.3;
          let radius = 200 + p.sin(time + i) * 50;
          
          let x = p.cos(angle) * radius;
          let y = p.sin(angle * 0.7) * 100;
          let z = p.sin(angle) * radius;
          
          p.push();
          p.translate(x, y, z);
          p.fill(255, 255, 255, 100);
          p.noStroke();
          p.sphere(2, 6, 6);
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
          mouseInfluence = 3;
          // Add random rotation to spheres
          spheres.forEach(sphere => {
            sphere.rotation.add(p.random(-0.5, 0.5), p.random(-0.5, 0.5), p.random(-0.5, 0.5));
          });
        }
      };

      p.windowResized = () => {
        p.resizeCanvas(800, 600);
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