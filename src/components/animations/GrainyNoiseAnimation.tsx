
import { useEffect, useRef } from 'react';

export default function GrainyNoiseAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);

    // Animation variables
    let animationFrameId: number;
    let time = 0;

    const render = () => {
      time += 0.01;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create grainy noise texture
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;
      
      for (let i = 0; i < data.length; i += 4) {
        // Generate noise values
        const x = (i / 4) % canvas.width;
        const y = Math.floor((i / 4) / canvas.width);
        
        // Create animated noise
        const noise1 = Math.sin(x * 0.01 + time) * Math.cos(y * 0.01 + time);
        const noise2 = Math.sin(x * 0.02 + time * 1.5) * Math.cos(y * 0.02 + time * 1.5);
        const noise3 = Math.random() * 0.3;
        
        const combined = (noise1 + noise2 + noise3) * 0.3;
        const intensity = Math.floor(Math.abs(combined) * 255);
        
        // Set pixel color (grayscale with very low opacity)
        data[i] = intensity;     // Red
        data[i + 1] = intensity; // Green  
        data[i + 2] = intensity; // Blue
        data[i + 3] = Math.floor(intensity * 0.1); // Alpha (very transparent)
      }
      
      ctx.putImageData(imageData, 0, 0);
      
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', setCanvasDimensions);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ background: 'transparent' }}
    />
  );
}
