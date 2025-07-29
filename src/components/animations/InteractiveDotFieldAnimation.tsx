
import { useEffect, useRef } from 'react';
import p5 from 'p5';

export default function InteractiveDotFieldAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const p5Instance = useRef<p5 | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const sketch = (p: p5) => {
      let dots: any[] = [];
      let mousePos = { x: 0, y: 0 };
      let time = 0;

      p.setup = () => {
        const canvas = p.createCanvas(containerRef.current!.offsetWidth, containerRef.current!.offsetHeight);
        canvas.parent(containerRef.current!);
        
        // Create dot field similar to the uploaded image
        const spacing = 25;
        for (let x = 0; x < p.width; x += spacing) {
          for (let y = 0; y < p.height; y += spacing) {
            dots.push({
              originalX: x,
              originalY: y,
              x: x,
              y: y,
              size: p.random(1, 3),
              alpha: p.random(0.3, 0.8),
              offset: p.random(0, p.TWO_PI)
            });
          }
        }
      };

      p.draw = () => {
        p.background(0, 0, 0, 20);
        time += 0.01;
        
        // Update mouse position
        if (p.mouseX >= 0 && p.mouseX <= p.width && p.mouseY >= 0 && p.mouseY <= p.height) {
          mousePos.x = p.mouseX;
          mousePos.y = p.mouseY;
        }
        
        // Draw and animate dots
        dots.forEach((dot, index) => {
          // Calculate distance from mouse
          const distFromMouse = p.dist(dot.originalX, dot.originalY, mousePos.x, mousePos.y);
          const maxDist = 150;
          
          // Interactive displacement based on mouse proximity
          if (distFromMouse < maxDist) {
            const force = p.map(distFromMouse, 0, maxDist, 20, 0);
            const angle = p.atan2(dot.originalY - mousePos.y, dot.originalX - mousePos.x);
            dot.x = dot.originalX + p.cos(angle) * force;
            dot.y = dot.originalY + p.sin(angle) * force;
          } else {
            // Return to original position
            dot.x = p.lerp(dot.x, dot.originalX, 0.05);
            dot.y = p.lerp(dot.y, dot.originalY, 0.05);
          }
          
          // Add subtle wave animation
          const wave = p.sin(time + dot.offset) * 2;
          dot.x += wave;
          dot.y += p.cos(time + dot.offset) * 2;
          
          // Draw dot with varying opacity based on interaction
          const interactionAlpha = distFromMouse < maxDist ? 
            p.map(distFromMouse, 0, maxDist, 1, dot.alpha) : dot.alpha;
          
          p.fill(255, 255, 255, interactionAlpha * 255);
          p.noStroke();
          
          const currentSize = dot.size + (distFromMouse < maxDist ? 
            p.map(distFromMouse, 0, maxDist, 2, 0) : 0);
          
          p.circle(dot.x, dot.y, currentSize);
          
          // Draw connections to nearby dots
          dots.slice(index + 1).forEach(otherDot => {
            const distance = p.dist(dot.x, dot.y, otherDot.x, otherDot.y);
            if (distance < 50) {
              const lineAlpha = p.map(distance, 0, 50, 0.3, 0.05);
              p.stroke(255, 255, 255, lineAlpha * 255);
              p.strokeWeight(0.5);
              p.line(dot.x, dot.y, otherDot.x, otherDot.y);
            }
          });
        });
        
        // Add subtle grid lines for structure
        p.stroke(255, 255, 255, 20);
        p.strokeWeight(0.3);
        for (let x = 0; x < p.width; x += 50) {
          p.line(x, 0, x, p.height);
        }
        for (let y = 0; y < p.height; y += 50) {
          p.line(0, y, p.width, y);
        }
      };

      p.windowResized = () => {
        if (containerRef.current) {
          p.resizeCanvas(containerRef.current.offsetWidth, containerRef.current.offsetHeight);
          
          // Recreate dots with new dimensions
          dots = [];
          const spacing = 25;
          for (let x = 0; x < p.width; x += spacing) {
            for (let y = 0; y < p.height; y += spacing) {
              dots.push({
                originalX: x,
                originalY: y,
                x: x,
                y: y,
                size: p.random(1, 3),
                alpha: p.random(0.3, 0.8),
                offset: p.random(0, p.TWO_PI)
              });
            }
          }
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
