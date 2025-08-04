
export default function CorePrinciples() {
  return (
    <section className="py-16 md:py-20 bg-black">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12 text-center text-white uppercase">
          Core Development Principles
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 max-w-6xl mx-auto">
          {/* Card 1 - Decentralized Verification */}
          <div className="bg-black border border-gray-800 p-6 md:p-8 h-auto min-h-[500px] flex flex-col">
            <div className="mb-6">
              <img 
                src="/lovable-uploads/70c0b3c4-dfb2-47a6-8fe5-684b32e91409.png" 
                alt="Decentralized Verification" 
                className="w-full h-32 md:h-40 object-contain"
              />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-4 uppercase">
              Decentralized Verification
            </h3>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              Multi node consensus ensures data authenticity and prevents tampering through cryptographic proofs. Loteraa enables continuous, secure and low latency streaming of sensor data from physical environments such as GPS or usage metrics directly to its blockchain network.
            </p>
          </div>

          {/* Card 2 - Web3 Connected Contracts */}
          <div className="bg-black border-l-0 md:border-l border-r-0 md:border-r border-t-0 md:border-t border-b-0 md:border-b border-gray-800 p-6 md:p-8 h-auto min-h-[500px] flex flex-col">
            <div className="mb-6">
              <img 
                src="/lovable-uploads/1afc8000-8c67-4cbc-83b7-f287e45c650a.png" 
                alt="Web3 Connected Contracts" 
                className="w-full h-32 md:h-40 object-contain"
              />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-4 uppercase">
              Web3 Connected Contracts
            </h3>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              Loteraa smart contracts respond autonomously to live sensor inputs enabling logic based automation across DeFi, logistics, energy, data and AI sectors. Data triggers from IoT devices execute cross chain payments, alerts or asset transfers establishing an intelligent link between off chain activities and on chain decision making without intermediaries.
            </p>
          </div>

          {/* Card 3 - Advanced Analytics Platform */}
          <div className="bg-black border border-gray-800 p-6 md:p-8 h-auto min-h-[500px] flex flex-col">
            <div className="mb-6">
              <img 
                src="/lovable-uploads/0651cda4-5c7a-4273-abee-63fba484c8e5.png" 
                alt="Advanced Analytics Platform" 
                className="w-full h-32 md:h-40 object-contain"
              />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-4 uppercase">
              Advanced Analytics Platform
            </h3>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              Built in tools for data visualization, statistical analysis, and machine learning model development. Access live sensor data from thousands of IoT devices worldwide for real time analysis and research applications.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
