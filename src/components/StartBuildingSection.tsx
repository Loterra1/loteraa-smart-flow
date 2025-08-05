
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export default function StartBuildingSection() {
  const handleLearnMore = () => {
    window.location.href = "/developer-docs";
  };

  return (
    <section className="py-16 md:py-20 bg-black">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Side - Start Building Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white uppercase mb-6">
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

          {/* Right Side - Cards */}
          <div className="flex gap-0">
            {/* Center Card */}
            <Card className="bg-black border border-gray-800 flex-1 min-h-[400px]">
              <CardContent className="p-8 h-full flex items-center">
                <p className="text-gray-300 text-base leading-relaxed">
                  Loteraa offers a robust set of APIs and software development kits (SDKs) that allow developers to quickly integrate IoT data into decentralized apps. With built-in security, compatibility layers, documentation, and pre-configured modules, it removes technical complexity empowering developers to build IoT-Web3 applications that scale across devices and blockchains.
                </p>
              </CardContent>
            </Card>

            {/* Right Card - Code Example */}
            <Card className="bg-black border border-gray-800 flex-1 min-h-[400px]">
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
        </div>
      </div>
    </section>
  );
}
