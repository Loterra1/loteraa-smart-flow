import React from 'react';

const VisionMissionSection = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Purple Light Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-loteraa-purple/20 rounded-full blur-3xl animate-pulse animation-delay-500"></div>
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-loteraa-purple/15 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-white">
            <span className="text-white">LOTERAA'S</span>{' '}
            <span className="text-white">VISION &</span>{' '}
            <span className="text-white">MISSION</span>
          </h2>
          
          <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-3xl mx-auto">
            Loteraa's vision is to power the first global decentralized sensor network, where real-world data becomes the fuel for smart automation, DePIN incentives, and decentralized economies. We aim to be the backbone of trust between physical infrastructure and digital systems. Our mission is to create a future where anyone can deploy a sensor, contribute valuable data, and earn from it without centralized gatekeepers or data monopolies.
          </p>
        </div>
      </div>
      
    </section>
  );
};

export default VisionMissionSection;