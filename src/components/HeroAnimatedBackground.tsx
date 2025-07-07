
import { useEffect, useRef } from 'react';

interface DigitalNode {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  opacity: number;
  pulsePhase: number;
  connections: DigitalNode[];
}

export default function HeroAnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodes = useRef<DigitalNode[]>([]);
  const mousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const heroSection = canvas.parentElement;
      if (heroSection) {
        canvas.width = heroSection.offsetWidth;
        canvas.height = heroSection.offsetHeight;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mousePosition.current.x = e.clientX - rect.left;
      mousePosition.current.y = e.clientY - rect.top;
    };

    // Only lavender purple and aqua marine colors
    const colors = [
      '#7142F6', // Lavender purple
      '#0CCCBC', // Aqua marine
    ];
    
    const initNodes = () => {
      nodes.current = [];
      const nodeCount = Math.floor((canvas.width * canvas.height) / 8000);
      
      for (let i = 0; i < nodeCount; i++) {
        const node: DigitalNode = {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 1,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: Math.random() * 0.6 + 0.3,
          pulsePhase: Math.random() * Math.PI * 2,
          connections: []
        };
        nodes.current.push(node);
      }

      // Create connections between nearby nodes
      nodes.current.forEach(node => {
        nodes.current.forEach(otherNode => {
          if (node !== otherNode) {
            const dx = node.x - otherNode.x;
            const dy = node.y - otherNode.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 150 && node.connections.length < 3) {
              node.connections.push(otherNode);
            }
          }
        });
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw subtle grid pattern with lavender purple
      ctx.beginPath();
      const gridSize = 60;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
      }
      ctx.strokeStyle = 'rgba(113, 66, 246, 0.03)';
      ctx.lineWidth = 0.5;
      ctx.stroke();

      nodes.current.forEach((node, i) => {
        // Update position
        node.x += node.speedX;
        node.y += node.speedY;
        
        // Boundary wrapping
        if (node.x < 0) node.x = canvas.width;
        if (node.x > canvas.width) node.x = 0;
        if (node.y < 0) node.y = canvas.height;
        if (node.y > canvas.height) node.y = 0;
        
        // Update pulse
        node.pulsePhase += 0.015;
        const pulseFactor = Math.sin(node.pulsePhase) * 0.4 + 0.8;
        
        // Mouse interaction - subtle repulsion
        const dx = node.x - mousePosition.current.x;
        const dy = node.y - mousePosition.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 120) {
          const angle = Math.atan2(dy, dx);
          const force = (120 - distance) / 120 * 0.5;
          node.x += Math.cos(angle) * force;
          node.y += Math.sin(angle) * force;
        }
        
        // Draw connections first (behind nodes)
        node.connections.forEach(otherNode => {
          const connDx = node.x - otherNode.x;
          const connDy = node.y - otherNode.y;
          const connDistance = Math.sqrt(connDx * connDx + connDy * connDy);
          
          if (connDistance < 180) {
            const alpha = (1 - connDistance / 180) * 0.4;
            
            // Main connection line
            ctx.save();
            ctx.globalAlpha = alpha * node.opacity;
            ctx.beginPath();
            ctx.strokeStyle = node.color;
            ctx.lineWidth = 1;
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(otherNode.x, otherNode.y);
            ctx.stroke();
            
            // Data packets moving along connections
            const time = Date.now() * 0.001;
            const packetProgress = (Math.sin(time + i * 0.5) + 1) / 2;
            const packetX = node.x + (otherNode.x - node.x) * packetProgress;
            const packetY = node.y + (otherNode.y - node.y) * packetProgress;
            
            ctx.beginPath();
            ctx.arc(packetX, packetY, 1.5, 0, Math.PI * 2);
            ctx.fillStyle = node.color;
            ctx.fill();
            
            ctx.restore();
          }
        });
        
        // Draw node with glow effect
        ctx.save();
        ctx.globalAlpha = node.opacity * pulseFactor;
        
        // Outer glow
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.size * 6);
        gradient.addColorStop(0, node.color);
        gradient.addColorStop(0.3, node.color + '40');
        gradient.addColorStop(1, 'transparent');
        
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size * 6, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Inner core
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size * pulseFactor, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();
        
        // Digital ring effect
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size * 3, 0, Math.PI * 2);
        ctx.strokeStyle = node.color + '20';
        ctx.lineWidth = 1;
        ctx.stroke();
        
        ctx.restore();
      });
      
      // Add scanning lines effect with aqua marine
      const time = Date.now() * 0.0005;
      for (let i = 0; i < 2; i++) {
        const y = Math.sin(time + i * Math.PI) * canvas.height * 0.3 + canvas.height * 0.5;
        ctx.save();
        ctx.globalAlpha = 0.1;
        const scanGradient = ctx.createLinearGradient(0, y - 2, 0, y + 2);
        scanGradient.addColorStop(0, 'transparent');
        scanGradient.addColorStop(0.5, '#0CCCBC');
        scanGradient.addColorStop(1, 'transparent');
        ctx.fillStyle = scanGradient;
        ctx.fillRect(0, y - 2, canvas.width, 4);
        ctx.restore();
      }
      
      requestAnimationFrame(animate);
    };

    const resizeObserver = new ResizeObserver(resizeCanvas);
    const heroSection = canvas.parentElement;
    if (heroSection) {
      resizeObserver.observe(heroSection);
    }
    
    canvas.addEventListener('mousemove', handleMouseMove);
    
    resizeCanvas();
    initNodes();
    animate();
    
    return () => {
      resizeObserver.disconnect();
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}
