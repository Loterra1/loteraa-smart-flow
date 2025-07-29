
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
      time += 0.02;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create pure black grainy noise texture
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;
      
      for (let i = 0; i < data.length; i += 4) {
        // Generate noise values
        const x = (i / 4) % canvas.width;
        const y = Math.floor((i / 4) / canvas.width);
        
        // Create animated noise with pure black colors
        const noise1 = Math.sin(x * 0.02 + time) * Math.cos(y * 0.02 + time);
        const noise2 = Math.sin(x * 0.04 + time * 2) * Math.cos(y * 0.04 + time * 2);
        const noise3 = Math.random() * 0.8; // Increased random noise
        
        const combined = (noise1 + noise2 + noise3) * 0.8;
        
        // Create pure black texture - no greys or whites
        const intensity = Math.floor(Math.abs(combined) * 100); // Reduced intensity for darker effect
        const blackIntensity = Math.min(intensity, 30); // Cap at very low values to keep it black
        
        // Set pixel color (pure black variations only)
        data[i] = blackIntensity;     // Red
        data[i + 1] = blackIntensity; // Green  
        data[i + 2] = blackIntensity; // Blue
        data[i + 3] = Math.floor(blackIntensity * 0.6); // Alpha (visible but dark)
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
