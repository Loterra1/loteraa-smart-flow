import DecentralizedVerificationAnimation from './animations/DecentralizedVerificationAnimation';
import Web3ContractsAnimation from './animations/Web3ContractsAnimation';
import AdvancedAnalyticsAnimation from './animations/AdvancedAnalyticsAnimation';

export default function CorePrinciples() {
   return (
      <section className="py-16 md:py-20 bg-black">
         <div className="container flex flex-col md:flex-row px-4 sm:px-6 lg:px-8 mx-auto gap-[30px] ">
            <div>
               <h2 className="text-3xl md:text-4xl lg:text-5xl  mb-12 text-start text-white uppercase">
                  Core Principles
               </h2>
               <p className="text-gray-300 text-base md:text-[16px] tracking-wider leading-relaxed">
                  A new era of decentralized finance is here. The Loteraa
                  Protocol concentrates community innovation and ultra-low-fee
                  transactions into a single, 100% EVM-compatible network.
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 max-w-[978px] mx-auto gap-[15px]">
               {/* Card 1 - Decentralized Verification */}
               <div className="bg-black border border-gray-800 p-4 md:p-[20px] h-auto min-h-[550px] flex flex-col-reverse justify-center">
                  <div>
                     {/* <DecentralizedVerificationAnimation /> */}
                     <img src="/principle-image-1.jpeg" alt="principle-1" />
                  </div>

                  <p className="text-gray-300 text-[12px] md:text-[16px] tracking-wider leading-relaxed line-clamp-6">
                     Multi node consensus ensures data authenticity and prevents
                     tampering through cryptographic proofs. Loteraa enables
                     continuous, secure and low latency streaming of sensor data
                     from physical environments such as GPS or usage metrics
                     directly to its blockchain network.
                  </p>
                  <h3 className="text-[16px] md:text-[1.2rem]  text-white mb-3 uppercase">
                     Decentralized Verification
                  </h3>
               </div>

               {/* Card 2 - Web3 Connected Contracts */}
               <div className="bg-black border-l-0 md:border-l border-r-0 md:border-r border-t-0 md:border-t border-b-0 md:border-b border-gray-800 p-4 md:p-[20px] h-auto min-h-[550px] flex flex-col-reverse justify-center">
                  <div>
                     <img src="/principle-image-3.jpeg" alt="principle-1" />
                  </div>

                  <p className="text-gray-300 text-[12px]  md:text-[16px] leading-relaxed line-clamp-6">
                     Data triggers from IoT devices execute cross chain
                     payments, alerts or asset transfers establishing an
                     intelligent link between off chain activities and on chain
                     decision making without intermediaries.
                  </p>
                  <h3 className="text-[16px] md:text-[1.2rem]  text-white mb-3 uppercase">
                     Web3 Connected Contracts
                  </h3>
               </div>

               {/* Card 3 - Advanced Analytics Platform */}
               <div className="bg-black border border-gray-800 p-4 md:p-[20px] h-auto min-h-[550px] flex flex-col-reverse overflow-hidden justify-center">
                  <div className="h-64">
                     <img src="/principle-image4.jpeg" alt="principle-1" />
                  </div>

                  <p className="text-gray-300 text-[12px] md:text-[16px] leading-relaxed line-clamp-6 ">
                     Built in tools for data visualization, statistical
                     analysis, and machine learning model development. Access
                     live sensor data from thousands of IoT devices worldwide
                     for real time analysis and research applications.
                  </p>
                  <h3 className="text-[16px] md:text-[1.2rem]  text-white mb-3 uppercase">
                     Advanced Analytics Platform
                  </h3>
               </div>
            </div>
         </div>
      </section>
   );
}
