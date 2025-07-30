
import { useEffect, useRef } from 'react';
import p5 from 'p5';
import { useIsMobile } from '@/hooks/use-mobile';

export default function RadialBurstAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const p5Instance = useRef<p5 | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!containerRef.current) return;

    const sketch = (p: p5) => {
      let particles: any[] = [];
      let connectionLines: any[] = [];
      let centerNodes: any[] = [];
      let time = 0;
      let dataFlowParticles: any[] = [];

      p.setup = () => {
        const canvas = p.createCanvas(containerRef.current!.offsetWidth, containerRef.current!.offsetHeight);
        canvas.parent(containerRef.current!);
        
        const centerX = p.width / 2;
        const centerY = p.height / 2;
        
        // Create central network nodes
        const centerNodesCount = isMobile ? 8 : 12;
        for (let i = 0; i < centerNodesCount; i++) {
          const angle = (i / centerNodesCount) * p.TWO_PI;
          const radius = isMobile ? 25 : 35;
          centerNodes.push({
            x: centerX + p.cos(angle) * radius,
            y: centerY + p.sin(angle) * radius,
            originalX: centerX + p.cos(angle) * radius,
            originalY: centerY + p.sin(angle) * radius,
            size: p.random(3, 6),
            angle: angle,
            radius: radius,
            pulse: p.random(0, p.TWO_PI),
            color: [255, 255, 255]
          });
        }
        
        // Create radial burst particles
        const ringCount = isMobile ? 4 : 6;
        for (let ring = 0; ring < ringCount; ring++) {
          const particlesInRing = isMobile ? 12 : 16;
          for (let i = 0; i < particlesInRing; i++) {
            const angle = (i / particlesInRing) * p.TWO_PI;
            const distance = 60 + ring * (isMobile ? 30 : 40);
            
            particles.push({
              x: centerX + p.cos(angle) * distance,
              y: centerY + p.sin(angle) * distance,
              angle: angle,
              distance: distance,
              size: p.random(1, 3),
              alpha: p.map(distance, 60, 300, 0.9, 0.2),
              speed: p.random(0.005, 0.015),
              offset: p.random(0, p.TWO_PI),
              ring: ring
            });
          }
        }
        
        // Create connection lines between center nodes
        for (let i = 0; i < centerNodes.length; i++) {
          for (let j = i + 1; j < centerNodes.length; j++) {
            const dist = p.dist(centerNodes[i].x, centerNodes[i].y, centerNodes[j].x, centerNodes[j].y);
            if (dist < 80) {
              connectionLines.push({
                from: i,
                to: j,
                strength: p.map(dist, 0, 80, 1, 0.3),
                pulse: p.random(0, p.TWO_PI)
              });
            }
          }
        }
        
        // Create data flow particles
        const dataFlowCount = isMobile ? 15 : 25;
        for (let i = 0; i < dataFlowCount; i++) {
          dataFlowParticles.push({
            x: p.random(0, p.width),
            y: p.random(0, p.height),
            targetX: centerX,
            targetY: centerY,
            speed: p.random(0.8, 2.0),
            size: p.random(1, 2),
            alpha: p.random(0.3, 0.8),
            trail: []
          });
        }
      };

      p.draw = () => {
        p.background(0, 0, 0, 30);
        time += 0.02;
        
        const centerX = p.width / 2;
        const centerY = p.height / 2;
        
        // Draw connection lines with pulsing effect
        connectionLines.forEach(line => {
          const nodeA = centerNodes[line.from];
          const nodeB = centerNodes[line.to];
          
          const pulse = p.sin(time * 2 + line.pulse) * 0.5 + 0.5;
          const alpha = (line.strength * 80 + pulse * 40) * 0.8;
          
          p.stroke(100, 200, 255, alpha);
          p.strokeWeight(1 + pulse);
          p.line(nodeA.x, nodeA.y, nodeB.x, nodeB.y);
        });
        
        // Update and draw center nodes with IoT device visualization
        centerNodes.forEach((node, i) => {
          const breathe = p.sin(time * 1.5 + node.pulse) * 3;
          node.x = node.originalX + breathe;
          node.y = node.originalY + breathe;
          
          const pulse = p.sin(time * 2 + node.pulse) * 0.3 + 0.7;
          
          // Outer glow
          p.fill(100, 200, 255, 30 * pulse);
          p.noStroke();
          p.circle(node.x, node.y, node.size * 3);
          
          // Main node
          p.fill(255, 255, 255, 200 + pulse * 55);
          p.circle(node.x, node.y, node.size + pulse);
          
          // Data transmission visualization
          if (i % 3 === 0) {
            p.stroke(100, 200, 255, 150);
            p.strokeWeight(0.5);
            p.noFill();
            const ripple = (time * 3 + i) % (p.PI * 2);
            p.circle(node.x, node.y, p.sin(ripple) * 20);
          }
        });
        
        // Draw radial particles with wave motion
        particles.forEach((particle, i) => {
          const wave = p.sin(time + particle.offset) * 8;
          const ringPulse = p.sin(time * 0.5 + particle.ring) * 5;
          
          const x = centerX + p.cos(particle.angle) * (particle.distance + wave + ringPulse);
          const y = centerY + p.sin(particle.angle) * (particle.distance + wave + ringPulse);
          
          const alpha = particle.alpha * (0.6 + p.sin(time * 2 + i) * 0.4);
          
          // Blockchain node visualization
          p.fill(150, 220, 255, alpha * 200);
          p.noStroke();
          p.circle(x, y, particle.size);
          
          // Connection indicator
          if (i % 4 === 0) {
            p.stroke(100, 200, 255, alpha * 100);
            p.strokeWeight(0.5);
            p.line(centerX, centerY, x, y);
          }
        });
        
        // Draw data flow particles
        dataFlowParticles.forEach(particle => {
          // Move towards center
          const dx = particle.targetX - particle.x;
          const dy = particle.targetY - particle.y;
          const dist = p.sqrt(dx * dx + dy * dy);
          
          if (dist > 5) {
            particle.x += (dx / dist) * particle.speed;
            particle.y += (dy / dist) * particle.speed;
          } else {
            // Reset particle to edge
            const angle = p.random(0, p.TWO_PI);
            const radius = p.max(p.width, p.height) * 0.6;
            particle.x = centerX + p.cos(angle) * radius;
            particle.y = centerY + p.sin(angle) * radius;
          }
          
          // Add to trail
          particle.trail.push({ x: particle.x, y: particle.y });
          if (particle.trail.length > 8) {
            particle.trail.shift();
          }
          
          // Draw trail
          for (let i = 0; i < particle.trail.length - 1; i++) {
            const alpha = (i / particle.trail.length) * particle.alpha * 100;
            p.stroke(200, 255, 200, alpha);
            p.strokeWeight(1);
            p.line(
              particle.trail[i].x, particle.trail[i].y,
              particle.trail[i + 1].x, particle.trail[i + 1].y
            );
          }
          
          // Draw particle
          p.fill(200, 255, 200, particle.alpha * 255);
          p.noStroke();
          p.circle(particle.x, particle.y, particle.size);
        });
        
        // Central blockchain core visualization
        p.push();
        p.translate(centerX, centerY);
        
        // Rotating hexagon (blockchain symbol)
        p.stroke(255, 255, 255, 100 + p.sin(time * 2) * 50);
        p.strokeWeight(2);
        p.noFill();
        p.rotate(time * 0.5);
        
        p.beginShape();
        for (let i = 0; i < 6; i++) {
          const angle = (i / 6) * p.TWO_PI;
          const radius = 15 + p.sin(time * 3) * 3;
          p.vertex(p.cos(angle) * radius, p.sin(angle) * radius);
        }
        p.endShape(p.CLOSE);
        
        p.pop();
        
        // Global pulse effect
        const globalPulse = p.sin(time * 0.8) * 0.15 + 0.85;
        p.tint(255, globalPulse * 255);
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
