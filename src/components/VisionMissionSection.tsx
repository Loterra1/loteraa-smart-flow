import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const VisionMissionSection = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-12 text-white">
            <span className="text-loteraa-purple">LOTERAA'S</span>{' '}
            <span className="text-white">VISION &</span>{' '}
            <span className="text-loteraa-purple">MISSION</span>
          </h2>
          
          {/* Glass Card */}
          <Card className="bg-gray-500/10 backdrop-blur-md border-gray-400/20 relative overflow-hidden max-w-5xl mx-auto">
            <CardContent className="relative z-10 p-8 md:p-12">
              <p className="text-lg md:text-xl text-white leading-relaxed">
                Loteraa's vision is to power the first global decentralized sensor network, where real-world data becomes the fuel for smart automation, DePIN incentives, and decentralized economies. We aim to be the backbone of trust between physical infrastructure and digital systems. Our mission is to create a future where anyone can deploy a sensor, contribute valuable data, and earn from it without centralized gatekeepers or data monopolies.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      
    </section>
  );
};

export default VisionMissionSection;