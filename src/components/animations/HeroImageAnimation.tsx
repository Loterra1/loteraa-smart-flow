import { useEffect, useRef } from 'react';
import p5 from 'p5';
import { useIsMobile } from '@/hooks/use-mobile';

export default function HeroImageAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const p5Instance = useRef<p5 | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!containerRef.current) return;

    const sketch = (p: p5) => {
      let img: p5.Image | null = null;
      let time = 0;
      let particles: any[] = [];
      let flowField: any[] = [];
      let imageLoaded = false;

      p.preload = () => {
        try {
          img = p.loadImage('/lovable-uploads/9b4d24b9-a5d2-453f-a718-60fd0eed2a6b.png', 
            () => {
              console.log('Image loaded successfully');
              imageLoaded = true;
            },
            (err) => {
              console.error('Failed to load image:', err);
              imageLoaded = false;
            }
          );
        } catch (error) {
          console.error('Error in preload:', error);
          imageLoaded = false;
        }
      };

      p.setup = () => {
        try {
          if (!containerRef.current) return;
          
          const canvas = p.createCanvas(
            containerRef.current.offsetWidth,
            containerRef.current.offsetHeight
          );
          canvas.parent(containerRef.current);
          
          // Initialize flow field particles for organic animation
          const particleCount = isMobile ? 30 : 50;
          for (let i = 0; i < particleCount; i++) {
            particles.push({
              x: p.random(p.width),
              y: p.random(p.height),
              vx: p.random(-1, 1),
              vy: p.random(-1, 1),
              size: p.random(2, 8),
              alpha: p.random(30, 100),
              phase: p.random(p.TWO_PI)
            });
          }

          // Create flow field
          const cols = Math.floor(p.width / 20) || 1;
          const rows = Math.floor(p.height / 20) || 1;
          
          flowField = [];
          for (let y = 0; y < rows; y++) {
            flowField[y] = [];
            for (let x = 0; x < cols; x++) {
              const angle = p.noise(x * 0.1, y * 0.1) * p.TWO_PI * 2;
              flowField[y][x] = p.createVector(p.cos(angle), p.sin(angle));
            }
          }
        } catch (error) {
          console.error('Error in setup:', error);
        }
      };

      p.draw = () => {
        try {
          p.background(0, 0, 0, 0);
          time += 0.02;
          
          // Calculate center position and size
          const centerX = p.width / 2;
          const centerY = p.height / 2;
          const maxSize = isMobile ? 280 : 400;
          
          // Only draw image if it's loaded
          if (imageLoaded && img) {
            // Animate image with subtle transformations
            p.push();
            p.translate(centerX, centerY);
            
            // Subtle floating animation
            const floatY = p.sin(time * 0.8) * 8;
            const floatX = p.cos(time * 0.6) * 5;
            p.translate(floatX, floatY);
            
            // Gentle rotation
            p.rotate(p.sin(time * 0.3) * 0.05);
            
            // Pulsing scale
            const pulseScale = 1 + p.sin(time * 1.2) * 0.03;
            p.scale(pulseScale);
            
            // Draw the main image with subtle glow effect
            p.tint(255, 255, 255, 200);
            
            // Calculate aspect ratio to maintain proportions
            const imgAspect = img.width / img.height;
            let drawWidth, drawHeight;
            
            if (imgAspect > 1) {
              drawWidth = maxSize;
              drawHeight = maxSize / imgAspect;
            } else {
              drawHeight = maxSize;
              drawWidth = maxSize * imgAspect;
            }
            
            p.image(img, -drawWidth/2, -drawHeight/2, drawWidth, drawHeight);
            
            // Add glowing outline effect
            p.noFill();
            p.stroke(255, 255, 255, 60 + p.sin(time * 2) * 30);
            p.strokeWeight(2);
            p.rect(-drawWidth/2 - 5, -drawHeight/2 - 5, drawWidth + 10, drawHeight + 10, 8);
            
            p.pop();
          }
          
          // Animate flowing particles around the image
          particles.forEach((particle, index) => {
            try {
              // Update particle position with flow field influence
              const col = Math.floor(particle.x / 20);
              const row = Math.floor(particle.y / 20);
              
              if (flowField[row] && flowField[row][col]) {
                const force = flowField[row][col];
                particle.vx += force.x * 0.01;
                particle.vy += force.y * 0.01;
              }
              
              // Add attraction to center
              const distToCenter = p.dist(particle.x, particle.y, centerX, centerY);
              if (distToCenter > 100) {
                const attractionForce = 0.0001;
                particle.vx += (centerX - particle.x) * attractionForce;
                particle.vy += (centerY - particle.y) * attractionForce;
              }
              
              // Apply velocity with damping
              particle.x += particle.vx;
              particle.y += particle.vy;
              particle.vx *= 0.99;
              particle.vy *= 0.99;
              
              // Boundary wrapping
              if (particle.x < 0) particle.x = p.width;
              if (particle.x > p.width) particle.x = 0;
              if (particle.y < 0) particle.y = p.height;
              if (particle.y > p.height) particle.y = 0;
              
              // Draw particle with animated properties
              const alpha = particle.alpha + p.sin(time * 2 + particle.phase) * 20;
              const size = particle.size + p.sin(time + index) * 2;
              
              p.fill(255, 255, 255, Math.max(10, alpha));
              p.noStroke();
              p.circle(particle.x, particle.y, size);
              
              // Draw connecting lines to nearby particles
              particles.forEach((otherParticle, otherIndex) => {
                if (index !== otherIndex) {
                  const distance = p.dist(particle.x, particle.y, otherParticle.x, otherParticle.y);
                  if (distance < 80) {
                    const lineAlpha = p.map(distance, 0, 80, 40, 0);
                    p.stroke(255, 255, 255, lineAlpha);
                    p.strokeWeight(0.5);
                    p.line(particle.x, particle.y, otherParticle.x, otherParticle.y);
                  }
                }
              });
            } catch (error) {
              console.error('Error updating particle:', error);
            }
          });
          
          // Update flow field dynamically
          if (p.frameCount % 60 === 0) {
            try {
              const cols = Math.floor(p.width / 20) || 1;
              const rows = Math.floor(p.height / 20) || 1;
              
              for (let y = 0; y < rows; y++) {
                if (!flowField[y]) flowField[y] = [];
                for (let x = 0; x < cols; x++) {
                  const angle = p.noise(x * 0.1, y * 0.1, time * 0.5) * p.TWO_PI * 2;
                  flowField[y][x] = p.createVector(p.cos(angle), p.sin(angle));
                }
              }
            } catch (error) {
              console.error('Error updating flow field:', error);
            }
          }
          
          // Add subtle radial gradient overlay
          if (imageLoaded) {
            p.push();
            p.translate(centerX, centerY);
            for (let r = maxSize; r > 0; r -= 10) {
              const alpha = p.map(r, 0, maxSize, 20, 0);
              p.fill(255, 255, 255, alpha);
              p.noStroke();
              p.circle(0, 0, r);
            }
            p.pop();
          }
        } catch (error) {
          console.error('Error in draw loop:', error);
        }
      };

      p.windowResized = () => {
        try {
          if (containerRef.current) {
            p.resizeCanvas(containerRef.current.offsetWidth, containerRef.current.offsetHeight);
          }
        } catch (error) {
          console.error('Error in windowResized:', error);
        }
      };
    };

    try {
      p5Instance.current = new p5(sketch);
    } catch (error) {
      console.error('Error creating p5 instance:', error);
    }

    return () => {
      try {
        if (p5Instance.current) {
          p5Instance.current.remove();
        }
      } catch (error) {
        console.error('Error removing p5 instance:', error);
      }
    };
  }, [isMobile]);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 w-full h-full z-5"
      style={{ 
        backgroundColor: 'transparent',
        pointerEvents: 'none'
      }}
    />
  );
}
