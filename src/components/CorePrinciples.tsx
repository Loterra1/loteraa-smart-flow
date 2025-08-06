
import DecentralizedVerificationAnimation from "./animations/DecentralizedVerificationAnimation";
import Web3ContractsAnimation from "./animations/Web3ContractsAnimation";
import AdvancedAnalyticsAnimation from "./animations/AdvancedAnalyticsAnimation";

export default function CorePrinciples() {
  return (
    <section className="py-16 md:py-20 bg-black">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12 text-center text-white uppercase">
          Core Development Principles
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 max-w-7xl mx-auto gap-0">
          {/* Card 1 - Decentralized Verification */}
          <div className="bg-black border border-gray-800 p-8 md:p-12 h-auto min-h-[700px] flex flex-col">
            <div className="mb-8 h-64 md:h-80">
              <DecentralizedVerificationAnimation />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 uppercase">
              Decentralized Verification
            </h3>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed">
              Multi node consensus ensures data authenticity and prevents tampering through cryptographic proofs. Loteraa enables continuous, secure and low latency streaming of sensor data from physical environments such as GPS or usage metrics directly to its blockchain network.
            </p>
          </div>

          {/* Card 2 - Web3 Connected Contracts */}
          <div className="bg-black border-l-0 md:border-l border-r-0 md:border-r border-t-0 md:border-t border-b-0 md:border-b border-gray-800 p-8 md:p-12 h-auto min-h-[700px] flex flex-col">
            <div className="mb-8 h-64 md:h-80">
              <Web3ContractsAnimation />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 uppercase">
              Web3 Connected Contracts
            </h3>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed">
              Loteraa smart contracts respond autonomously to live sensor inputs enabling logic based automation across DeFi, logistics, energy, data and AI sectors. Data triggers from IoT devices execute cross chain payments, alerts or asset transfers establishing an intelligent link between off chain activities and on chain decision making without intermediaries.
            </p>
          </div>

          {/* Card 3 - Advanced Analytics Platform */}
          <div className="bg-black border border-gray-800 p-8 md:p-12 h-auto min-h-[700px] flex flex-col">
            <div className="mb-8 h-64 md:h-80">
              <AdvancedAnalyticsAnimation />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 uppercase">
              Advanced Analytics Platform
            </h3>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed">
              Built in tools for data visualization, statistical analysis, and machine learning model development. Access live sensor data from thousands of IoT devices worldwide for real time analysis and research applications.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
