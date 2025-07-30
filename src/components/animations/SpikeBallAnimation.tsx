
import { useEffect, useRef } from 'react';
import p5 from 'p5';
import { useIsMobile } from '@/hooks/use-mobile';

export default function SpikeBallAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const p5Instance = useRef<p5 | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!containerRef.current) return;

    const sketch = (p: p5) => {
      let time = 0;
      let spikes: any[] = [];

      p.setup = () => {
        const canvas = p.createCanvas(
          containerRef.current!.offsetWidth, 
          containerRef.current!.offsetHeight
        );
        canvas.parent(containerRef.current!);
        
        // Create spikes around a circle
        const numSpikes = isMobile ? 80 : 120;
        const radius = isMobile ? 60 : 80;
        
        for (let i = 0; i < numSpikes; i++) {
          const angle = (i / numSpikes) * p.TWO_PI;
          const spikeLength = p.random(20, 60);
          const baseRadius = radius;
          
          spikes.push({
            angle: angle,
            baseRadius: baseRadius,
            spikeLength: spikeLength,
            originalLength: spikeLength,
            phase: p.random(0, p.TWO_PI),
            speed: p.random(0.01, 0.03)
          });
        }
      };

      p.draw = () => {
        p.background(0, 0, 0, 0);
        time += 0.02;
        
        const centerX = p.width / 2;
        const centerY = p.height / 2;
        
        p.stroke(255, 255, 255, 200);
        p.strokeWeight(1);
        p.noFill();
        
        // Draw the central core
        p.push();
        p.translate(centerX, centerY);
        
        // Pulsing core
        const coreSize = 20 + p.sin(time * 2) * 5;
        p.fill(255, 255, 255, 100);
        p.noStroke();
        p.circle(0, 0, coreSize);
        p.noFill();
        p.stroke(255, 255, 255, 150);
        p.circle(0, 0, coreSize + 10);
        
        // Draw animated spikes
        spikes.forEach((spike, index) => {
          // Animate spike length
          const lengthMultiplier = 0.8 + 0.4 * p.sin(time * spike.speed + spike.phase);
          const currentLength = spike.originalLength * lengthMultiplier;
          
          // Calculate positions
          const baseX = p.cos(spike.angle) * spike.baseRadius;
          const baseY = p.sin(spike.angle) * spike.baseRadius;
          const tipX = p.cos(spike.angle) * (spike.baseRadius + currentLength);
          const tipY = p.sin(spike.angle) * (spike.baseRadius + currentLength);
          
          // Color variation
          const alpha = 150 + 50 * p.sin(time + index * 0.1);
          p.stroke(255, 255, 255, alpha);
          p.strokeWeight(p.map(currentLength, 0, 60, 0.5, 2));
          
          // Draw spike line
          p.line(baseX, baseY, tipX, tipY);
          
          // Add small dots at spike tips for extra detail
          if (!isMobile) {
            p.push();
            p.translate(tipX, tipY);
            p.fill(255, 255, 255, alpha);
            p.noStroke();
            p.circle(0, 0, 2);
            p.pop();
          }
        });
        
        // Add rotating outer ring
        p.push();
        p.rotate(time * 0.5);
        p.stroke(255, 255, 255, 80);
        p.strokeWeight(1);
        p.noFill();
        const outerRadius = 100 + p.sin(time) * 10;
        p.circle(0, 0, outerRadius * 2);
        
        // Add small markers on the outer ring
        for (let i = 0; i < 12; i++) {
          const angle = (i / 12) * p.TWO_PI;
          const x = p.cos(angle) * outerRadius;
          const y = p.sin(angle) * outerRadius;
          p.point(x, y);
        }
        p.pop();
        
        // Add inner rotating elements
        p.push();
        p.rotate(-time * 0.3);
        p.stroke(255, 255, 255, 60);
        p.strokeWeight(0.5);
        for (let i = 0; i < 6; i++) {
          const angle = (i / 6) * p.TWO_PI;
          const innerRadius = 30;
          const x = p.cos(angle) * innerRadius;
          const y = p.sin(angle) * innerRadius;
          p.line(0, 0, x, y);
        }
        p.pop();
        
        p.pop();
        
        // Add floating particles around the spike ball
        p.fill(255, 255, 255, 100);
        p.noStroke();
        
        for (let i = 0; i < (isMobile ? 15 : 25); i++) {
          const particleAngle = time + i * 0.3;
          const particleRadius = 150 + p.sin(time + i) * 30;
          const particleX = centerX + p.cos(particleAngle) * particleRadius;
          const particleY = centerY + p.sin(particleAngle * 0.7) * particleRadius;
          
          const size = 2 + p.sin(time * 2 + i) * 1;
          p.circle(particleX, particleY, size);
        }
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

  return <div ref={containerRef} className="w-full h-full" />;
}
