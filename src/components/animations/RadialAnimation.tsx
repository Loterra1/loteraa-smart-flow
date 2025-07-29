import { useEffect, useRef } from "react";
import p5 from 'p5';

export default function RadialAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const p5Instance = useRef<p5 | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const sketch = (p: p5) => {
      let time = 0;
      let mouseInfluence = 0;
      let lines: Array<{angle: number, length: number, weight: number}> = [];

      p.setup = () => {
        const canvas = p.createCanvas(300, 280);
        canvas.parent(containerRef.current!);
        
        // Initialize radial lines
        for (let i = 0; i < 120; i++) {
          lines.push({
            angle: (i / 120) * p.TWO_PI,
            length: p.random(80, 120),
            weight: p.random(1, 3)
          });
        }
      };

      p.draw = () => {
        p.background(0, 0);
        p.clear();
        
        p.translate(p.width / 2, p.height / 2);
        
        time += 0.02;
        mouseInfluence *= 0.95;
        
        // Central black circle
        p.fill(0);
        p.noStroke();
        p.circle(0, 0, 60 + mouseInfluence * 20);
        
        // Radial lines
        lines.forEach((line, index) => {
          p.push();
          
          let dynamicAngle = line.angle + time * 0.5 + mouseInfluence * 0.1;
          let dynamicLength = line.length + p.sin(time * 2 + index * 0.1) * 10 + mouseInfluence * 30;
          
          p.rotate(dynamicAngle);
          
          p.stroke(255, 255, 255, 200);
          p.strokeWeight(line.weight);
          
          // Draw branching lines
          p.line(30, 0, dynamicLength, 0);
          
          // Add smaller branches
          if (index % 3 === 0) {
            p.push();
            p.translate(dynamicLength * 0.7, 0);
            p.rotate(p.sin(time * 3 + index) * 0.3);
            p.line(0, 0, 20, 0);
            p.pop();
          }
          
          p.pop();
        });
      };

      p.mouseMoved = () => {
        if (p.mouseX > 0 && p.mouseX < p.width && p.mouseY > 0 && p.mouseY < p.height) {
          let distance = p.dist(p.mouseX, p.mouseY, p.width/2, p.height/2);
          mouseInfluence = p.map(distance, 0, p.width/2, 2, 0);
        }
      };

      p.mousePressed = () => {
        if (p.mouseX > 0 && p.mouseX < p.width && p.mouseY > 0 && p.mouseY < p.height) {
          mouseInfluence = 3;
          // Randomize some line properties
          lines.forEach(line => {
            if (p.random() < 0.3) {
              line.length = p.random(80, 140);
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