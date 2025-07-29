
import { useEffect, useRef } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

export default function GrainyNoiseAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isMobile = useIsMobile();

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
      time += isMobile ? 0.01 : 0.015;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Optimized noise generation - lower resolution on mobile
      const pixelSize = isMobile ? 4 : 2;
      const width = Math.ceil(canvas.width / pixelSize);
      const height = Math.ceil(canvas.height / pixelSize);
      
      const imageData = ctx.createImageData(width, height);
      const data = imageData.data;
      
      for (let i = 0; i < data.length; i += 4) {
        // Generate optimized noise values
        const x = (i / 4) % width;
        const y = Math.floor((i / 4) / width);
        
        // Simplified noise calculation
        const noise1 = Math.sin(x * 0.03 + time) * Math.cos(y * 0.03 + time);
        const noise2 = Math.random() * 0.6;
        
        const combined = (noise1 + noise2) * 0.6;
        
        // Pure black texture
        const intensity = Math.floor(Math.abs(combined) * 80);
        const blackIntensity = Math.min(intensity, 25);
        
        // Set pixel color (pure black variations only)
        data[i] = blackIntensity;     // Red
        data[i + 1] = blackIntensity; // Green  
        data[i + 2] = blackIntensity; // Blue
        data[i + 3] = Math.floor(blackIntensity * 0.5); // Alpha
      }
      
      // Scale up the low-res noise
      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d')!;
      tempCanvas.width = width;
      tempCanvas.height = height;
      tempCtx.putImageData(imageData, 0, 0);
      
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(tempCanvas, 0, 0, canvas.width, canvas.height);
      
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', setCanvasDimensions);
    };
  }, [isMobile]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ background: 'transparent' }}
    />
  );
}
