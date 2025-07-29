import { useEffect, useRef } from "react";
import p5 from 'p5';

export default function SpiralAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const p5Instance = useRef<p5 | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const sketch = (p: p5) => {
      let time = 0;
      let mouseInfluence = 0;
      let spiralPoints: Array<{x: number, y: number, size: number}> = [];

      p.setup = () => {
        const canvas = p.createCanvas(300, 280);
        canvas.parent(containerRef.current!);
        
        // Initialize spiral points
        for (let i = 0; i < 200; i++) {
          let angle = i * 0.3;
          let radius = i * 0.8;
          spiralPoints.push({
            x: p.cos(angle) * radius,
            y: p.sin(angle) * radius,
            size: p.random(1, 4)
          });
        }
      };

      p.draw = () => {
        p.background(0, 0);
        p.clear();
        
        p.translate(p.width / 2, p.height / 2);
        
        time += 0.03;
        mouseInfluence *= 0.92;
        
        // Rotate the entire spiral
        p.rotate(time * 0.5 + mouseInfluence * 0.2);
        
        // Draw spiral with flowing effect
        p.stroke(255, 255, 255, 180);
        p.strokeWeight(2);
        p.noFill();
        
        // Main spiral path
        p.beginShape();
        for (let i = 0; i < spiralPoints.length - 1; i++) {
          let point = spiralPoints[i];
          let wave = p.sin(time * 2 + i * 0.1) * (5 + mouseInfluence * 10);
          
          let x = point.x + wave;
          let y = point.y + wave * 0.5;
          
          if (i === 0) {
            p.vertex(x, y);
          } else {
            p.curveVertex(x, y);
          }
        }
        p.endShape();
        
        // Draw flowing particles along spiral
        spiralPoints.forEach((point, index) => {
          if (index % 5 === 0) {
            p.push();
            
            let wave = p.sin(time * 3 + index * 0.15) * (8 + mouseInfluence * 15);
            let x = point.x + wave;
            let y = point.y + wave * 0.3;
            
            p.translate(x, y);
            
            p.fill(255, 255, 255, 150);
            p.noStroke();
            
            let size = point.size + p.sin(time * 4 + index * 0.2) * 2 + mouseInfluence;
            p.circle(0, 0, size);
            
            p.pop();
          }
        });
        
        // Inner vortex effect
        p.fill(0);
        p.noStroke();
        p.circle(0, 0, 30 + mouseInfluence * 10);
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
          mouseInfluence = 4;
          // Add some randomness to spiral points
          spiralPoints.forEach(point => {
            if (p.random() < 0.2) {
              point.size = p.random(1, 6);
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