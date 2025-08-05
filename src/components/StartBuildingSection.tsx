
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import GlobeMapAnimation from "./animations/GlobeMapAnimation";
import AnimatedCircleThreeJS from "./animations/AnimatedCircleThreeJS";
import GenerativeArtAnimation from "./animations/GenerativeArtAnimation";

export default function StartBuildingSection() {
  const handleLearnMore = () => {
    window.location.href = "/developer-docs";
  };

  return (
    <section className="py-16 md:py-20 bg-black">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Start Building Content */}
          <div className="space-y-8 flex flex-col justify-center">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white uppercase mb-6">
                Start Building
              </h2>
              <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-8">
                Build blockchain dapps with native tools and dedicated primitives.
              </p>
              <Button 
                onClick={handleLearnMore}
                className="bg-white hover:bg-white/90 text-black px-8 py-6 text-lg"
              >
                Learn More
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Right Side - Code Example Card */}
          <Card className="bg-black border border-gray-800 min-h-[400px]">
            <CardContent className="p-8 h-full">
              <div className="bg-gray-900 rounded-lg p-6 font-mono text-sm text-white h-full overflow-auto">
                <pre className="whitespace-pre-wrap">
{`<script src="loteraa-sdk.js"></script>
<script>
  const sdk = new LoteraaSDK({
    apiKey: 'demo-key',
    baseUrl: 'http://localhost:4000' // or your hosted API
  });
async function submitUserData() {
    const result = await sdk.submitData('user123', {
      location: 'Lagos',
      temperature: 29.3,
    });
    console.log('Submitted:', result);
    const rewards = await sdk.getRewards('user123');
    console.log('Total Rewards:', rewards);
  }
  submitUserData();
</script>`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Globe Network Animation with Image 2 */}
        <div className="mt-16 flex justify-center">
          <div className="relative w-full max-w-4xl h-96">
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 rounded-lg"
              style={{ backgroundImage: "url('/lovable-uploads/dc8abd05-3b12-4965-82b7-e02602df01fa.png')" }}
            />
            <div className="absolute inset-0">
              <GlobeMapAnimation />
            </div>
          </div>
        </div>

        {/* Empowering Web3 Section */}
        <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white uppercase mb-6">
                Empowering Web3 With Real World Datas And Automation Network
              </h2>
              <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
                Loteraa's vision is to power the first global decentralized sensor network, where real-world data becomes the fuel for smart automation, DePIN incentives, and decentralized economies. We aim to be the backbone of trust between physical infrastructure and digital systems. Our mission is to create a future where anyone can deploy a sensor, contribute valuable data, and earn from it without centralized gatekeepers or data monopolies.
              </p>
            </div>
          </div>

          {/* Right Side - Animated Image 1 with Three.js */}
          <div className="relative h-96">
            <AnimatedCircleThreeJS />
          </div>
        </div>

        {/* Made for Mass Adoption Section */}
        <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Made for Mass Adoption with Image */}
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white uppercase mb-8">
              Made for Mass Adoption
            </h2>
            <div className="relative h-96 w-full">
              <GenerativeArtAnimation />
            </div>
          </div>

          {/* Right Side - Three Cards */}
          <div className="grid grid-cols-2 gap-4">
            {/* Card 1 */}
            <Card className="bg-black border border-gray-800 p-6">
              <CardContent className="p-0">
                <h3 className="text-lg font-bold text-white uppercase mb-4">
                  Real-World Utility, Not Hype
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  From data-driven automations to sensor-powered rewards, Loteraa delivers immediate and understandable value to industries, researchers, and individuals. It's not about speculation — it's about solving real problems with on-chain logic.
                </p>
              </CardContent>
            </Card>

            {/* Card 2 */}
            <Card className="bg-black border border-gray-800 p-6">
              <CardContent className="p-0">
                <h3 className="text-lg font-bold text-white uppercase mb-4">
                  Tokenomics Built for Participation
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Users earn $LOT by contributing data, staking, or building on the platform — not just holding tokens. This model brings everyone into the economy: developers, businesses, researchers, and everyday users.
                </p>
              </CardContent>
            </Card>

            {/* Card 3 - Spans full width below the first two */}
            <Card className="bg-black border border-gray-800 p-6 col-span-2">
              <CardContent className="p-0">
                <h3 className="text-lg font-bold text-white uppercase mb-4">
                  Data-First Design for the Real World
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Loteraa is built around real-time sensor data, making it the first blockchain where data isn't just stored — it's monetized, automated, and rewarded. From supply chain to healthcare to smart cities, this approach transforms everyday data into economic activity, unlocking mass adoption beyond crypto-native users.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="mt-20 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white uppercase mb-8 leading-tight">
            Connect the physical and digital worlds through our revolutionary IoT-blockchain infrastructure.
          </h2>
          <Button asChild size="lg" className="bg-white hover:bg-white/90 text-black px-8 py-6 text-lg">
            <Link to="/signup">
              Sign Up
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
