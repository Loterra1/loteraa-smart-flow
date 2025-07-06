
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
        
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <Card className="bg-loteraa-gray/20 backdrop-blur-md border-loteraa-gray/30 animate-fade-in animation-delay-200">
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
          
          <Card className="bg-loteraa-gray/20 backdrop-blur-md border-loteraa-gray/30 animate-fade-in animation-delay-400">
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
        </div>
      </div>
    </section>
  );
}
