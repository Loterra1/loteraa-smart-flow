
import React from 'react';

export default function HeroImageAnimation() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="relative w-full h-full animate-float">
        <div className="absolute inset-0 animate-pulse-soft">
          <img 
            src="/lovable-uploads/9b4d24b9-a5d2-453f-a718-60fd0eed2a6b.png"
            alt="IoT Blockchain Connection"
            className="w-full h-full object-contain max-w-full max-h-full brightness-125 contrast-110 transition-all duration-1000 ease-in-out hover:scale-105"
            style={{ 
              filter: 'brightness(1.3) contrast(1.1)',
              animation: 'float 6s ease-in-out infinite, pulse-soft 4s ease-in-out infinite'
            }}
          />
        </div>
        
        {/* Subtle glow effect that pulses */}
        <div 
          className="absolute inset-0 opacity-20 animate-pulse-soft"
          style={{
            background: 'radial-gradient(circle at center, rgba(113, 66, 246, 0.3), transparent 70%)',
            animation: 'pulse-soft 5s ease-in-out infinite reverse'
          }}
        />
        
        {/* Secondary floating effect */}
        <div 
          className="absolute inset-2 opacity-10"
          style={{
            background: 'radial-gradient(circle at center, rgba(12, 204, 188, 0.2), transparent 60%)',
            animation: 'float 8s ease-in-out infinite reverse'
          }}
        />
      </div>
    </div>
  );
}
