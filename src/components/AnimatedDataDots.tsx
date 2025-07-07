
import { useEffect, useRef } from 'react';

interface DataDot {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  opacity: number;
  pulsePhase: number;
}

export default function AnimatedDataDots() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dots = useRef<DataDot[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // IoT/Blockchain themed colors
    const colors = [
      '#7142F6', // Purple
      '#3182F4', // Blue  
      '#0CCCBC', // Teal
      '#ffffff'  // White
    ];
    
    const initDots = () => {
      dots.current = [];
      const dotCount = Math.floor((window.innerWidth * window.innerHeight) / 12000);
      
      for (let i = 0; i < dotCount; i++) {
        dots.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 0.8,
          speedY: (Math.random() - 0.5) * 0.8,
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: Math.random() * 0.8 + 0.2,
          pulsePhase: Math.random() * Math.PI * 2
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      dots.current.forEach((dot, i) => {
        // Update position
        dot.x += dot.speedX;
        dot.y += dot.speedY;
        
        // Boundary wrapping
        if (dot.x < 0) dot.x = canvas.width;
        if (dot.x > canvas.width) dot.x = 0;
        if (dot.y < 0) dot.y = canvas.height;
        if (dot.y > canvas.height) dot.y = 0;
        
        // Update pulse
        dot.pulsePhase += 0.02;
        const pulseFactor = Math.sin(dot.pulsePhase) * 0.3 + 0.7;
        
        // Draw dot with glow effect
        ctx.save();
        ctx.globalAlpha = dot.opacity * pulseFactor;
        
        // Glow effect
        const gradient = ctx.createRadialGradient(dot.x, dot.y, 0, dot.x, dot.y, dot.size * 3);
        gradient.addColorStop(0, dot.color);
        gradient.addColorStop(1, 'transparent');
        
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Main dot
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size * pulseFactor, 0, Math.PI * 2);
        ctx.fillStyle = dot.color;
        ctx.fill();
        
        ctx.restore();
        
        // Draw connecting lines between nearby dots
        dots.current.forEach((otherDot, j) => {
          if (i === j) return;
          
          const dx = dot.x - otherDot.x;
          const dy = dot.y - otherDot.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 120) {
            ctx.save();
            ctx.globalAlpha = (1 - distance / 120) * 0.3;
            ctx.beginPath();
            ctx.strokeStyle = dot.color;
            ctx.lineWidth = 0.5;
            ctx.moveTo(dot.x, dot.y);
            ctx.lineTo(otherDot.x, otherDot.y);
            ctx.stroke();
            ctx.restore();
          }
        });
      });
      
      requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resizeCanvas);
    
    resizeCanvas();
    initDots();
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex: -5 }}
    />
  );
}
