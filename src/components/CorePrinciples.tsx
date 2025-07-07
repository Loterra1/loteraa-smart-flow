
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CorePrinciples() {
  return (
    <section className="py-20 bg-gradient-to-b from-loteraa-black/50 to-loteraa-gray/20">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 animate-fade-in">
            Core Principles
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          <Card className="bg-loteraa-gray/40 backdrop-blur-md border-loteraa-gray/50 animate-fade-in animation-delay-200">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-white">
                AI Model Training via On-Chain Data
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white/80 leading-relaxed">
                AI projects can train their models using decentralized, verified data from Loteraa's IoT network. 
                Researchers upload sensor feeds like weather, motion, CO2 levels validated by smart contracts and 
                rewarded through token incentives. Models are trained using data or real-time feeds, creating a 
                trustless AI pipeline. This encourages both data creators and AI builders to contribute to and 
                monetize within the Loteraa ecosystem.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-loteraa-gray/40 backdrop-blur-md border-loteraa-gray/50 animate-fade-in animation-delay-400">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-white">
                Digital IoT Data Layer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white/80 leading-relaxed">
                Beyond physical devices, Loteraa supports digital IoT streams such as APIs, browser plugins, 
                or digital sensor emulators. Developers can build dApps that simulate weather conditions, 
                traffic behaviors, or market sentiment. This digital-first IoT layer helps developers test 
                real-time logic before hardware deployment and creates a sandbox for AI models, automation 
                flows, or token-reward experiments.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-loteraa-gray/40 backdrop-blur-md border-loteraa-gray/50 animate-fade-in animation-delay-600">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-white">
                Reward Mechanism
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white/80 leading-relaxed">
                Loteraa's core reward loop centers on Data-to-Earn. Users earn $LOT for contributing quality data, 
                running sensor nodes, validating uploads, or building dApps. Smart contracts verify contributions 
                and automate payouts.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-loteraa-gray/40 backdrop-blur-md border-loteraa-gray/50 animate-fade-in animation-delay-800">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-white">
                Physical IoT dApps
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white/80 leading-relaxed">
                Loteraa is built to power physical decentralized applications. Whether it's environmental sensors 
                in smart farms, GPS trackers on logistics fleets, or biometric gates in smart cities Loteraa 
                provides the infrastructure to build real-world dApps with on-chain verification, automation, 
                and token rewards. These dApps use smart contracts to reward node uptime, detect anomalies, 
                and automate responses creating an end-to-end programmable physical world.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
