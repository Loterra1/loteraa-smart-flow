
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CorePrinciples() {
  return (
    <section className="py-20 bg-black relative overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Image 3 - Left side */}
        <img 
          src="/lovable-uploads/d1ef467c-333e-4564-84ae-bf42c8b1f09d.png" 
          alt="" 
          className="absolute left-0 top-1/2 transform -translate-y-1/2 w-80 h-auto opacity-70 z-0 filter brightness-150 drop-shadow-[0_0_20px_rgba(113,66,246,0.6)] animate-pulse-soft"
        />
        
        {/* Image 2 - Right side */}
        <img 
          src="/lovable-uploads/41e38ae2-f165-4010-ab17-e95bb9f5150a.png" 
          alt="" 
          className="absolute right-0 top-1/3 transform -translate-y-1/3 w-96 h-auto opacity-70 z-0 filter brightness-150 drop-shadow-[0_0_25px_rgba(12,204,188,0.7)] animate-pulse-soft"
        />
        
        {/* Image 3 duplicate - Bottom (replacing Image 1) */}
        <img 
          src="/lovable-uploads/d1ef467c-333e-4564-84ae-bf42c8b1f09d.png" 
          alt="" 
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[30rem] h-auto opacity-60 z-0 filter brightness-140 drop-shadow-[0_0_30px_rgba(113,66,246,0.5)] animate-pulse-soft"
        />
        
        {/* Original Image 3 - Left side (increased size) */}
        <img 
          src="/lovable-uploads/d1ef467c-333e-4564-84ae-bf42c8b1f09d.png" 
          alt="" 
          className="absolute left-0 top-1/2 transform -translate-y-1/2 w-[22rem] h-auto opacity-70 z-0 filter brightness-150 drop-shadow-[0_0_20px_rgba(113,66,246,0.6)] animate-pulse-soft"
        />
      </div>

      <div className="container px-4 sm:px-6 lg:px-8 mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 animate-fade-in animation-delay-300">
            Core Principles
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          <Card className="bg-gradient-to-br from-purple-200/20 to-purple-300/10 backdrop-blur-md border-loteraa-gray/50 animate-jump-fade-in animation-delay-600 hover:animate-bounce-ar relative overflow-hidden">
            {/* Background Image for AI Model Training */}
            <div className="absolute inset-0 pointer-events-none">
              <img 
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/0c100085-a166-4401-ac09-ba6d2ff7225d-CZhgUWEtHStq2kCRlGcQnGKMp4yQaC.png" 
                alt="" 
                className="absolute right-0 top-0 w-32 h-auto opacity-30 z-0 filter brightness-150 drop-shadow-[0_0_20px_rgba(113,66,246,0.6)] animate-pulse-soft"
              />
            </div>
            <CardHeader className="relative z-10">
              <CardTitle className="text-xl font-bold text-white">
                AI Model Training via On-Chain Data
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <p className="text-white/80 leading-relaxed">
                AI projects can train their models using decentralized, verified data from Loteraa's IoT network. 
                Researchers upload sensor feeds like weather, motion, CO2 levels validated by smart contracts and 
                rewarded through token incentives. Models are trained using data or real-time feeds, creating a 
                trustless AI pipeline. This encourages both data creators and AI builders to contribute to and 
                monetize within the Loteraa ecosystem.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-purple-200/20 to-purple-300/10 backdrop-blur-md border-loteraa-gray/50 animate-jump-fade-in animation-delay-800 hover:animate-bounce-ar relative overflow-hidden">
            {/* Background Image for Digital IoT Data Layer */}
            <div className="absolute inset-0 pointer-events-none">
              <img 
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/c1248f3c-d96d-4840-b7db-c157ff6c782c-k0Sx1tEFHN1NI2XFJ8wPeTYNi6s7H3.png" 
                alt="" 
                className="absolute right-0 bottom-0 w-32 h-auto opacity-30 z-0 filter brightness-150 drop-shadow-[0_0_20px_rgba(113,66,246,0.6)] animate-pulse-soft"
              />
            </div>
            <CardHeader className="relative z-10">
              <CardTitle className="text-xl font-bold text-white">
                Digital IoT Data Layer
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <p className="text-white/80 leading-relaxed">
                Beyond physical devices, Loteraa supports digital IoT streams such as APIs, browser plugins, 
                or digital sensor emulators. Developers can build dApps that simulate weather conditions, 
                traffic behaviors, or market sentiment. This digital-first IoT layer helps developers test 
                real-time logic before hardware deployment and creates a sandbox for AI models, automation 
                flows, or token-reward experiments.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-200/20 to-purple-300/10 backdrop-blur-md border-loteraa-gray/50 animate-jump-fade-in animation-delay-1000 hover:animate-bounce-ar relative overflow-hidden">
            {/* Background Image for Reward Mechanism */}
            <div className="absolute inset-0 pointer-events-none">
              <img 
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/349d3bcd-55e7-4f02-bcc5-b340af78f4f9-YQNTGShpeMR6KGNJAa1xLCo2D8hTp5.png" 
                alt="" 
                className="absolute left-0 top-1/2 transform -translate-y-1/2 w-24 h-auto opacity-30 z-0 filter brightness-150 drop-shadow-[0_0_20px_rgba(113,66,246,0.6)] animate-pulse-soft"
              />
            </div>
            <CardHeader className="relative z-10">
              <CardTitle className="text-xl font-bold text-white">
                Reward Mechanism
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <p className="text-white/80 leading-relaxed">
                Loteraa's core reward loop centers on Data-to-Earn. Users earn $LOT for contributing quality data, 
                running sensor nodes, validating uploads, or building dApps. Smart contracts verify contributions 
                and automate payouts.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-200/20 to-purple-300/10 backdrop-blur-md border-loteraa-gray/50 animate-jump-fade-in animation-delay-1200 hover:animate-bounce-ar relative overflow-hidden">
            {/* Background Image for Physical IoT dApps */}
            <div className="absolute inset-0 pointer-events-none">
              <img 
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/89d36f9c-cd23-4f0f-9d66-28e5810c6f51-gCnZaGKH6MYrFaKOznJt1N8klVyJJe.png" 
                alt="" 
                className="absolute right-0 bottom-0 w-28 h-auto opacity-30 z-0 filter brightness-150 drop-shadow-[0_0_20px_rgba(113,66,246,0.6)] animate-pulse-soft"
              />
            </div>
            <CardHeader className="relative z-10">
              <CardTitle className="text-xl font-bold text-white">
                Physical IoT dApps
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
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
