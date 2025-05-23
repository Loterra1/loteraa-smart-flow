
import { useState } from "react";
import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StakingPanel from "@/components/staking/StakingPanel";
import SwapPanel from "@/components/staking/SwapPanel";
import BridgePanel from "@/components/staking/BridgePanel";
import StakingStats from "@/components/staking/StakingStats";

const StakePage = () => {
  const [activeTab, setActiveTab] = useState("stake");

  return (
    <div className="min-h-screen flex flex-col">
      <NavigationHeader />
      <main className="flex-grow pt-24 pb-16 bg-gradient-to-br from-loteraa-black to-loteraa-gray/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-4 gradient-text">
              LOTERAA Finance
            </h1>
            <p className="text-lg text-white/70 text-center mb-12 max-w-3xl mx-auto">
              Stake, swap and bridge your tokens to earn rewards and participate
              in the Loteraa ecosystem.
            </p>

            <StakingStats />

            <div className="mt-10 bg-loteraa-gray/10 backdrop-blur-md border border-loteraa-gray/20 rounded-xl shadow-lg overflow-hidden">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3 p-0 h-auto">
                  <TabsTrigger
                    value="stake"
                    className="py-4 rounded-none data-[state=active]:bg-loteraa-purple/20"
                  >
                    Stake
                  </TabsTrigger>
                  <TabsTrigger
                    value="swap"
                    className="py-4 rounded-none data-[state=active]:bg-loteraa-purple/20"
                  >
                    Swap
                  </TabsTrigger>
                  <TabsTrigger
                    value="bridge"
                    className="py-4 rounded-none data-[state=active]:bg-loteraa-purple/20"
                  >
                    Bridge
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="stake" className="p-6">
                  <StakingPanel />
                </TabsContent>

                <TabsContent value="swap" className="p-6">
                  <SwapPanel />
                </TabsContent>

                <TabsContent value="bridge" className="p-6">
                  <BridgePanel />
                </TabsContent>
              </Tabs>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default StakePage;
