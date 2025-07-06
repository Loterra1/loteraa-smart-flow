
import { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  connections: Node[];
  pulsePhase: number;
}

export default function AdvancedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodes = useRef<Node[]>([]);
  const mousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);

    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current.x = e.clientX;
      mousePosition.current.y = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Node class for network visualization
    class NetworkNode implements Node {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      connections: Node[];
      pulsePhase: number;

      constructor(x: number, y: number, size: number) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.color = `rgba(${12 + Math.random() * 50}, ${204 + Math.random() * 50}, ${188 + Math.random() * 50}, ${0.5 + Math.random() * 0.5})`;
        this.connections = [];
        this.pulsePhase = Math.random() * Math.PI * 2;
      }

      update(width: number, height: number) {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x < 0 || this.x > width) this.speedX *= -1;
        if (this.y < 0 || this.y > height) this.speedY *= -1;

        this.pulsePhase += 0.02;
        if (this.pulsePhase > Math.PI * 2) this.pulsePhase = 0;

        // Respond to mouse interaction
        const dx = this.x - mousePosition.current.x;
        const dy = this.y - mousePosition.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 100) {
          const angle = Math.atan2(dy, dx);
          this.x += Math.cos(angle) * 0.3;
          this.y += Math.sin(angle) * 0.3;
        }
      }

      draw(ctx: CanvasRenderingContext2D, time: number) {
        const pulseFactor = 0.2 * Math.sin(this.pulsePhase) + 1;
        const currentSize = this.size * pulseFactor;
        
        // Draw glow effect
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, currentSize * 2);
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, currentSize * 2, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Draw main node
        ctx.beginPath();
        ctx.arc(this.x, this.y, currentSize, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        
        // Draw connections with data packets
        this.connections.forEach(node => {
          const dist = Math.hypot(this.x - node.x, this.y - node.y);
          if (dist < 200) {
            const alpha = 1 - dist / 200;
            
            // Connection line
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(node.x, node.y);
            ctx.strokeStyle = `rgba(113, 66, 246, ${alpha * 0.5})`;
            ctx.lineWidth = 1 * alpha;
            ctx.stroke();
            
            // Animated data packets
            const packetPosition = (time % 2000) / 2000;
            const packetX = this.x + (node.x - this.x) * packetPosition;
            const packetY = this.y + (node.y - this.y) * packetPosition;
            
            ctx.beginPath();
            ctx.arc(packetX, packetY, 2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(12, 204, 188, ${alpha})`;
            ctx.fill();
          }
        });
      }
    }

    // Create nodes
    const nodeCount = Math.floor(window.innerWidth * window.innerHeight / 20000);
    nodes.current = [];
    
    for (let i = 0; i < nodeCount; i++) {
      nodes.current.push(new NetworkNode(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        2 + Math.random() * 3
      ));
    }
    
    // Create connections between nearby nodes
    nodes.current.forEach(node => {
      nodes.current.forEach(otherNode => {
        if (node !== otherNode) {
          const dist = Math.hypot(node.x - otherNode.x, node.y - otherNode.y);
          if (dist < 200) {
            node.connections.push(otherNode);
          }
        }
      });
    });

    // Animation loop
    let animationFrameId: number;
    let startTime = Date.now();

    const render = () => {
      const time = Date.now() - startTime;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw subtle grid for tech aesthetic
      ctx.beginPath();
      const gridSize = 50;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
      }
      ctx.strokeStyle = 'rgba(113, 66, 246, 0.05)';
      ctx.stroke();
      
      // Update and draw nodes
      nodes.current.forEach(node => {
        node.update(canvas.width, canvas.height);
        node.draw(ctx, time);
      });
      
      // Add holographic scan lines effect
      ctx.fillStyle = 'rgba(12, 204, 188, 0.02)';
      for (let i = 0; i < 3; i++) {
        const y = (canvas.height / 3) * i + (Math.sin(time * 0.001) * 20);
        ctx.fillRect(0, y, canvas.width, 1);
      }
      
      animationFrameId = window.requestAnimationFrame(render);
    };
    
    render();
    
    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', setCanvasDimensions);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex: -10, opacity: 0.8 }}
    />
  );
}
