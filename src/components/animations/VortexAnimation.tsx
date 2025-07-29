import { useEffect, useRef } from "react";
import p5 from 'p5';

export default function VortexAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const p5Instance = useRef<p5 | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const sketch = (p: p5) => {
      let time = 0;
      let mouseInfluence = 0;
      let particles: Array<{angle: number, radius: number, speed: number, size: number}> = [];

      p.setup = () => {
        const canvas = p.createCanvas(300, 280);
        canvas.parent(containerRef.current!);
        
        // Initialize vortex particles
        for (let i = 0; i < 300; i++) {
          particles.push({
            angle: p.random(0, p.TWO_PI),
            radius: p.random(10, 120),
            speed: p.random(0.01, 0.05),
            size: p.random(1, 3)
          });
        }
      };

      p.draw = () => {
        p.background(0, 0);
        p.clear();
        
        p.translate(p.width / 2, p.height / 2);
        
        time += 0.02;
        mouseInfluence *= 0.93;
        
        // Draw vortex spiral lines
        p.stroke(255, 255, 255, 120);
        p.strokeWeight(2);
        p.noFill();
        
        // Multiple spiral arms
        for (let arm = 0; arm < 8; arm++) {
          p.beginShape();
          p.noFill();
          
          for (let r = 5; r < 120; r += 3) {
            let angle = time * 0.8 + (r * 0.08) + (arm * p.TWO_PI / 8) + mouseInfluence * 0.3;
            let spiralX = p.cos(angle) * r;
            let spiralY = p.sin(angle) * r;
            
            // Add some wave distortion
            let wave = p.sin(time * 3 + r * 0.1) * (3 + mouseInfluence * 8);
            spiralX += wave;
            spiralY += wave * 0.5;
            
            p.curveVertex(spiralX, spiralY);
          }
          p.endShape();
        }
        
        // Draw flowing particles
        particles.forEach((particle, index) => {
          p.push();
          
          // Update particle
          particle.angle += particle.speed + mouseInfluence * 0.02;
          let spiralRadius = particle.radius + p.sin(time * 2 + index * 0.1) * 15;
          
          let x = p.cos(particle.angle) * spiralRadius;
          let y = p.sin(particle.angle) * spiralRadius;
          
          // Add vortex distortion
          let vortexStrength = p.map(spiralRadius, 0, 120, 2, 0.2);
          x += p.sin(time * 4 + particle.angle * 3) * vortexStrength * (5 + mouseInfluence * 10);
          y += p.cos(time * 4 + particle.angle * 3) * vortexStrength * (5 + mouseInfluence * 10);
          
          p.translate(x, y);
          
          // Particle appearance
          let alpha = p.map(spiralRadius, 10, 120, 255, 50);
          p.fill(255, 255, 255, alpha);
          p.noStroke();
          
          let size = particle.size + p.sin(time * 3 + index * 0.2) * 1 + mouseInfluence;
          p.circle(0, 0, size);
          
          p.pop();
        });
        
        // Central vortex core
        p.fill(0);
        p.noStroke();
        let coreSize = 25 + p.sin(time * 2) * 5 + mouseInfluence * 15;
        p.circle(0, 0, coreSize);
        
        // Inner ring
        p.stroke(255, 255, 255, 180);
        p.strokeWeight(2);
        p.noFill();
        p.circle(0, 0, coreSize + 10);
      };

      p.mouseMoved = () => {
        if (p.mouseX > 0 && p.mouseX < p.width && p.mouseY > 0 && p.mouseY < p.height) {
          let centerX = p.width / 2;
          let centerY = p.height / 2;
          let distance = p.dist(p.mouseX, p.mouseY, centerX, centerY);
          mouseInfluence = p.map(distance, 0, p.width/2, 3, 0);
        }
      };

      p.mousePressed = () => {
        if (p.mouseX > 0 && p.mouseX < p.width && p.mouseY > 0 && p.mouseY < p.height) {
          mouseInfluence = 5;
          // Randomize particle properties
          particles.forEach(particle => {
            if (p.random() < 0.3) {
              particle.speed = p.random(0.01, 0.08);
              particle.size = p.random(1, 4);
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