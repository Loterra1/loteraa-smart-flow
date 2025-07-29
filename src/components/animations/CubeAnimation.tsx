import { useEffect, useRef } from "react";
import p5 from 'p5';

export default function CubeAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const p5Instance = useRef<p5 | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const sketch = (p: p5) => {
      let rotation = 0;
      let mouseInfluence = 0;
      let cubes: Array<{x: number, y: number, z: number, rotation: p5.Vector}> = [];

      p.setup = () => {
        const canvas = p.createCanvas(300, 280, p.WEBGL);
        canvas.parent(containerRef.current!);
        
        // Initialize cube grid
        for (let x = -1; x <= 1; x++) {
          for (let y = -1; y <= 1; y++) {
            for (let z = -1; z <= 1; z++) {
              cubes.push({
                x: x * 60,
                y: y * 60,
                z: z * 60,
                rotation: p.createVector(0, 0, 0)
              });
            }
          }
        }
      };

      p.draw = () => {
        p.background(0, 0);
        p.clear();
        
        // Lighting
        p.ambientLight(60);
        p.pointLight(255, 255, 255, 0, 0, 200);
        
        // Camera rotation
        rotation += 0.005 + mouseInfluence * 0.02;
        mouseInfluence *= 0.95; // Decay mouse influence
        
        p.rotateY(rotation);
        p.rotateX(rotation * 0.3);
        
        // Draw cubes
        cubes.forEach((cube, index) => {
          p.push();
          p.translate(cube.x, cube.y, cube.z);
          
          // Individual cube rotation based on mouse
          cube.rotation.x += mouseInfluence * 0.1;
          cube.rotation.y += mouseInfluence * 0.15;
          p.rotateX(cube.rotation.x);
          p.rotateY(cube.rotation.y);
          
          p.stroke(255, 255, 255, 180);
          p.strokeWeight(1);
          p.noFill();
          
          // Wireframe effect
          p.box(30);
          p.pop();
        });
      };

      p.mouseMoved = () => {
        if (p.mouseX > 0 && p.mouseX < p.width && p.mouseY > 0 && p.mouseY < p.height) {
          mouseInfluence = p.map(p.mouseX, 0, p.width, -1, 1);
        }
      };

      p.mousePressed = () => {
        if (p.mouseX > 0 && p.mouseX < p.width && p.mouseY > 0 && p.mouseY < p.height) {
          mouseInfluence = 2;
          // Add random rotation to cubes
          cubes.forEach(cube => {
            cube.rotation.add(p.random(-0.5, 0.5), p.random(-0.5, 0.5), p.random(-0.5, 0.5));
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