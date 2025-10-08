import { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import AIModelTrainingAnimation from './animations/AIModelTrainingAnimation';
import RealUsesImpactAnimation from './animations/RealUsesImpactAnimation';
import CoreInfrastructureAnimation from './animations/CoreInfrastructureAnimation';
import AIDevelopmentSection from './AIDevelopment';

export default function UseCasesSection() {
   const sectionRef = useRef<HTMLElement>(null);

   return (
      <section ref={sectionRef} className="py-16 md:py-20 bg-black">
         <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-16 text-center text-white uppercase">
               Use Cases
            </h2>

            {/* Two New Cards */}
            <div className="max-w-6xl mx-auto mb-16">
               {/* Card 1 */}
               <Card className="bg-black border border-gray-800 mb-0">
                  <CardContent className="p-8">
                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        {/* Animation on left */}
                        <div className="relative h-64 lg:h-80">
                           <RealUsesImpactAnimation />
                        </div>
                        {/* Content on right */}
                        <div>
                           <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 uppercase">
                              Real uses and impact
                           </h3>
                           <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                              Loteraa connects real-world data to blockchain,
                              enabling AI model training, decentralized finance
                              triggers, IoT automation, and DePIN economies. It
                              powers fintech, telecom, logistics, and smart
                              device networks by turning real-time sensor data
                              into tokenized assets, unlocking new data-driven
                              apps and rewarding users for data contribution and
                              utility.
                           </p>
                        </div>
                     </div>
                  </CardContent>
               </Card>

               {/* Card 2 - Directly below Card 1 with no spacing */}
               <Card className="bg-black border border-gray-800 border-t-0">
                  <CardContent className="p-8">
                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        {/* Animation on left */}
                        <div className="relative h-64 lg:h-80">
                           <CoreInfrastructureAnimation />
                        </div>
                        {/* Content on right */}
                        <div>
                           <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 uppercase">
                              Loteraa as a Core Infrastructure
                           </h3>
                           <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                              Loteraa is the foundational layer power,
                              DePIN-powered sensor networks translating
                              real-world signals into on-chain logic that smart
                              contracts can understand and execute. loteraa
                              handles data ingestion, sensor registration,
                              secure transmission, oracle integration, and
                              programmable event triggers.
                           </p>
                        </div>
                     </div>
                  </CardContent>
               </Card>
            </div>
            <AIDevelopmentSection />
         </div>
      </section>
   );
}

// import { useEffect, useRef, useState } from 'react';
// import { Card, CardContent } from '@/components/ui/card';
// import AIModelTrainingAnimation from './animations/AIModelTrainingAnimation';
// import RealUsesImpactAnimation from './animations/RealUsesImpactAnimation';
// import CoreInfrastructureAnimation from './animations/CoreInfrastructureAnimation';

// // Define types for clarity
// interface AnimatedUseCase {
//    title: string;
//    description: string;
//    children: {
//       subtitle: string;
//       description: string;
//    }[];
// }

// interface StaticUseCase {
//    title: string;
//    description: string;
//    animation: JSX.Element; // Used for the older card style
// }

// // --- NEW COMPONENT FOR THE CENTRAL VIDEO BACKGROUND ---
// const CentralVideoBackground = () => {
//    const videoSource = '/animation.mp4';
//    // Note: Removed 'hidden lg:block' here to ensure visibility during testing.
//    // You can add it back if you only want the video on large screens.
//    return (
//       <div className="absolute inset-0 flex items-center justify-center opacity-30 z-0 pointer-events-none overflow-hidden">
//          <video
//             className="w-full h-full object-cover min-w-full min-h-full" // Added min-w/h for better coverage
//             autoPlay
//             loop
//             muted
//             playsInline
//          >
//             <source src={videoSource} type="video/mp4" />
//             Your browser does not support the video tag.
//          </video>
//       </div>
//    );
// };
// // --------------------------------------------------------

// export default function UseCasesSection() {
//    // State now tracks visibility for the *animated* use cases
//    const [visibleItems, setVisibleItems] = useState<boolean[]>([]);
//    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

//    // 1. DATA FOR THE STATIC CARDS (The old style, using the initial useCase data)
//    const staticUseCases: StaticUseCase[] = [
//       {
//          title: 'Real uses and impact',
//          description:
//             'Loteraa connects real-world data to blockchain, enabling AI model training, decentralized finance triggers, IoT automation, and DePIN economies. It powers fintech, telecom, logistics, and smart device networks by turning real-time sensor data into tokenized assets, unlocking new data-driven apps and rewarding users for data contribution and utility.',
//          animation: <RealUsesImpactAnimation />,
//       },
//       {
//          title: 'Loteraa as a Core Infrastructure',
//          description:
//             'Loteraa is the foundational layer power, DePIN-powered sensor networks translating real-world signals into on-chain logic that smart contracts can understand and execute. loteraa handles data ingestion, sensor registration, secure transmission, oracle integration, and programmable event triggers.',
//          animation: <CoreInfrastructureAnimation />,
//       },
//    ];

//    // 2. DATA FOR THE NEW ALTERNATING ANIMATED CARDS
//    const animatedUseCases: AnimatedUseCase[] = [
//       {
//          title: 'AI Development & Model Training',
//          description:
//             'Loteraa supplies real-world, verified IoT data to train and refine AI/ML models on-chain, while enabling AI devs to monetize models, automate logic, and verify outputs via tokenized smart contract feedback loops.',
//          children: [
//             {
//                subtitle: 'Parallel Data Infrastructure',
//                description:
//                   'Process massive datasets and IoT streams simultaneously through high-speed, scalable parallel pipelines that power real-time blockchain automation.',
//             },
//             {
//                subtitle: 'Node Data Shard Infrastructure',
//                description:
//                   'Process massive datasets and IoT streams simultaneously through high-speed, scalable parallel pipelines that power real-time blockchain automation.',
//             },
//             {
//                subtitle: 'On-Chain Data Labeling Infrastructure',
//                description:
//                   'Label, verify, and tokenize real-world data directly on-chain to ensure accuracy, traceability, and interoperability for AI and DePIN applications.',
//             },
//          ],
//       },
//       {
//          title: 'Decentralized Finance & Smart Contracts',
//          description:
//             'Leverage Loteraa’s verified real-world data feeds to trigger automated smart contract execution, build complex DeFi products, and enable tokenized Real World Asset (RWA) settlements with guaranteed data fidelity.',
//          children: [
//             {
//                subtitle: 'On-Chain Data Oracles',
//                description:
//                   'Provide reliable, tamper-proof, real-time data to decentralized applications for financial settlements and state changes.',
//             },
//             {
//                subtitle: 'Automated Event Triggers',
//                description:
//                   'Enable smart contracts to automatically execute based on verifiable external events, such as market conditions or sensor readings.',
//             },
//          ],
//       },
//       // Add a third item to test alternation (will slide from LEFT)
//       {
//          title: 'IoT & Machine Automation',
//          description:
//             'Power machine-to-machine economies and autonomous systems. Loteraa provides verified, real-time data streams allowing smart contracts to manage device payments, maintenance, and supply chain logistics without human intervention.',
//          children: [
//             {
//                subtitle: 'Machine-to-Machine Payments',
//                description:
//                   'Enable automated micro-transactions between IoT devices based on verified usage data.',
//             },
//             {
//                subtitle: 'Secure Data Transmission',
//                description:
//                   'Cryptographically secure channels for sensor data ensuring integrity and ownership for DePIN applications.',
//             },
//          ],
//       },
//    ];

//    // Initialize visibleItems array based on the length of the animated data
//    useEffect(() => {
//       setVisibleItems(new Array(animatedUseCases.length).fill(false));
//    }, [animatedUseCases.length]);

//    // Intersection Observer Logic remains the same, but now observing the animated cards
//    useEffect(() => {
//       const observer = new IntersectionObserver(
//          (entries) => {
//             entries.forEach((entry) => {
//                const index = itemRefs.current.findIndex(
//                   (ref) => ref === entry.target
//                );
//                if (index !== -1) {
//                   setVisibleItems((prev) => {
//                      const newItems = [...prev];
//                      newItems[index] = entry.isIntersecting;
//                      return newItems;
//                   });
//                }
//             });
//          },
//          { threshold: 0.2 }
//       );

//       itemRefs.current.forEach((ref) => {
//          if (ref) observer.observe(ref);
//       });

//       return () => observer.disconnect();
//    }, [animatedUseCases.length]);

//    return (
//       <section className="py-16 md:py-20 bg-black relative">
//          <div className="container px-4 sm:px-6 lg:px-8 mx-auto relative z-10">
//             <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-16 text-center text-white uppercase">
//                Use Cases
//             </h2>

//             {/* --- STATIC CARDS SECTION (Populated from staticUseCases) --- */}
//             <div className="max-w-6xl mx-auto mb-16 relative z-20">
//                {staticUseCases.map((useCase, index) => (
//                   <Card
//                      key={index}
//                      className={`bg-black border border-gray-800 ${
//                         index === 0 ? 'mb-0' : 'border-t-0'
//                      }`}
//                   >
//                      <CardContent className="p-8">
//                         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
//                            {/* Animation on left */}
//                            <div className="relative h-64 lg:h-80">
//                               {useCase.animation}
//                            </div>
//                            {/* Content on right */}
//                            <div>
//                               <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 uppercase">
//                                  {useCase.title}
//                               </h3>
//                               <p className="text-gray-300 text-base md:text-lg leading-relaxed">
//                                  {useCase.description}
//                               </p>
//                            </div>
//                         </div>
//                      </CardContent>
//                   </Card>
//                ))}
//             </div>

//             {/* --- CENTRAL VIDEO BACKGROUND --- */}
//             <CentralVideoBackground />

//             {/* --- ALTERNATING ANIMATED CONTENT SECTION (Populated from animatedUseCases) --- */}
//             <div className="max-w-7xl mx-auto relative z-10">
//                {animatedUseCases.map((useCase, index) => {
//                   const isLeft = index % 2 === 0; // Even index (0, 2, ...) is on the left
//                   const isVisible = visibleItems[index];

//                   return (
//                      <div
//                         key={index}
//                         ref={(el) => (itemRefs.current[index] = el)}
//                         // Flex alignment pushes the card to the left or right side
//                         className={`py-20 lg:py-40 flex justify-${
//                            isLeft ? 'start' : 'end'
//                         }`}
//                      >
//                         <div
//                            className={`p-6 lg:p-10 w-full max-w-xl bg-black border border-gray-800 shadow-2xl transition-all duration-1000 ease-out ${
//                               // Transition/Animation classes
//                               isVisible
//                                  ? 'opacity-100 translate-x-0'
//                                  : isLeft
//                                  ? 'opacity-0 -translate-x-full' // Slide from left
//                                  : 'opacity-0 translate-x-full' // Slide from right
//                            } ${
//                               // Border styles for visual effect
//                               isLeft
//                                  ? 'lg:border-r-0 lg:rounded-r-none'
//                                  : 'lg:border-l-0 lg:rounded-l-none'
//                            }
//                            ${isLeft ? 'mr-auto' : 'ml-auto'}`}
//                         >
//                            <h3 className="text-2xl md:text-4xl text-white mb-6 uppercase font-bold">
//                               {useCase.title}
//                            </h3>
//                            <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-8">
//                               {useCase.description}
//                            </p>
//                            <div className="space-y-6 mt-6">
//                               {useCase.children.map((child, childIndex) => (
//                                  <div
//                                     key={childIndex}
//                                     className="p-3 border-l-2 border-primary"
//                                  >
//                                     <h4 className="text-lg md:text-xl text-white mb-1 uppercase font-semibold">
//                                        {child.subtitle}
//                                     </h4>
//                                     <p className="text-gray-400 text-sm md:text-base leading-relaxed">
//                                        {child.description}
//                                     </p>
//                                  </div>
//                               ))}
//                            </div>
//                         </div>
//                      </div>
//                   );
//                })}
//             </div>
//          </div>
//       </section>
//    );
