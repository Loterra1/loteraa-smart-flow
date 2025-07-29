
import React from 'react';
import GlobeMapAnimation from './animations/GlobeMapAnimation';

const VisionMissionSection = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-white">
            <span className="text-white">LOTERAA'S</span>{' '}
            <span className="text-white">VISION &</span>{' '}
            <span className="text-white">MISSION</span>
          </h2>
          
          <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-3xl mx-auto mb-16">
            Loteraa's vision is to power the first global decentralized sensor network, where real-world data becomes the fuel for smart automation, DePIN incentives, and decentralized economies. We aim to be the backbone of trust between physical infrastructure and digital systems. Our mission is to create a future where anyone can deploy a sensor, contribute valuable data, and earn from it without centralized gatekeepers or data monopolies.
          </p>
          
          {/* Future Built, Real World Ready Section */}
          <div className="mb-16">
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-white">
              <span className="text-white">FUTURE BUILT,</span>{' '}
              <span className="text-white">REAL WORLD READY</span>
            </h3>
            
            {/* Interactive Globe Animation - positioned in the middle */}
            <div className="relative h-96 mb-8 bg-transparent rounded-2xl overflow-hidden">
              <GlobeMapAnimation />
            </div>
            
            <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl mx-auto">
              Connect the physical and digital worlds through our revolutionary IoT-blockchain infrastructure.
            </p>
          </div>
        </div>
      </div>
      
    </section>
  );
};

export default VisionMissionSection;
