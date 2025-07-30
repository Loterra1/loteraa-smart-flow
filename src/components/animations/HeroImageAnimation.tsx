
import React from 'react';

export default function HeroImageAnimation() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <img 
        src="/lovable-uploads/9b4d24b9-a5d2-453f-a718-60fd0eed2a6b.png"
        alt="IoT Blockchain Connection"
        className="w-full h-full object-contain max-w-full max-h-full brightness-125 contrast-110"
        style={{ filter: 'brightness(1.3) contrast(1.1)' }}
      />
    </div>
  );
}
