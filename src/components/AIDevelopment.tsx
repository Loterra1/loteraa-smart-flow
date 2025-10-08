import React, { useEffect, useRef, useState } from 'react';

// The CSS class .bg-ai-training is no longer needed for the video background.

export default function AIDevelopmentSection() {
   // State tracks if the component has scrolled into view
   const [isVisible, setIsVisible] = useState(false);
   const sectionRef = useRef<HTMLDivElement | null>(null);

   // Hardcoded data remains the same
   const hardcodedData = {
      title: 'AI Development & Model Training',
      description:
         'Loteraa supplies real-world, verified IoT data to train and refine AI/ML models on-chain, while enabling AI devs to monetize models, automate logic, and verify outputs via tokenized smart contract feedback loops.',
      contentBlocks: [
         // LEFT CONTENT BLOCK
         {
            position: 'left',
            children: [
               {
                  subtitle: 'Parallel Data Infrastructure ',
                  description:
                     'Process massive datasets and IoT streams simultaneously through high-speed, scalable parallel pipelines that power real-time blockchain automation.',
               },
               {
                  subtitle: 'Node Data Shard Infrastructure ',
                  description:
                     'Process massive datasets and IoT streams simultaneously through high-speed, scalable parallel pipelines that power real-time blockchain automation.',
               },
            ],
         },
         // RIGHT CONTENT BLOCK
         {
            position: 'right',
            children: [
               {
                  subtitle: 'On-Chain Data Labeling Infrastructure ',
                  description:
                     'Label, verify, and tokenize real-world data directly on-chain to ensure accuracy, traceability, and interoperability for AI and DePIN applications.',
               },
               {
                  subtitle: 'On-Chain IoT & Machine Training Development  ',
                  description:
                     'Train IoT devices and machine models using verified on-chain data, enabling autonomous systems and machine-to-machine economies.',
               },
            ],
         },
      ],
   };

   // 🚀 Implementation of "Run Once on Scroll" Logic
   useEffect(() => {
      const currentRef = sectionRef.current;
      let observer: IntersectionObserver;

      if (currentRef) {
         observer = new IntersectionObserver(
            (entries) => {
               entries.forEach((entry) => {
                  if (entry.isIntersecting) {
                     // 1. Set visibility to true (triggers animation)
                     setIsVisible(true);
                     // 2. 🔑 Stop observing the element so the animation only runs once
                     observer.unobserve(currentRef);
                  }
               });
            },
            {
               // Trigger when 30% of the item is visible
               threshold: 0.3,
            }
         );
         observer.observe(currentRef);
      }

      // Cleanup function ensures the observer is stopped when the component unmounts
      return () => {
         if (observer) {
            observer.disconnect();
         }
      };
   }, []);

   // 🎨 Animation Class Logic
   const getContentClasses = (position: 'left' | 'right', delay: string) => `
        relative z-20 p-6 md:p-10
        transform transition-all duration-1000 ease-out ${delay}
        ${
           position === 'left'
              ? isVisible
                 ? 'translate-x-0 opacity-100' // VISIBLE: Slide from left to middle
                 : '-translate-x-full opacity-0' // HIDDEN: Start off-screen left
              : isVisible
              ? 'translate-x-0 opacity-100' // VISIBLE: Slide from right to middle
              : 'translate-x-full opacity-0' // HIDDEN: Start off-screen right
        }
    `;

   return (
      <div
         ref={sectionRef}
         className="relative w-full h-[1400px] sm:h-[800px] overflow-hidden bg-black"
      >
         {/* 1. Video Background Element (Full Width) */}
         <video
            autoPlay // Start playing immediately
            loop // Loop continuously
            muted // Essential for autoplay
            playsInline // For iOS compatibility
            className={`
                    absolute inset-0 w-full h-full object-cover 
                    opacity-50 
                `}
         >
            <source src="/animation.mp4" type="video/mp4" />
            Your browser does not support the video tag.
         </video>

         {/* Optional: Add a dark overlay for better text readability and styling */}
         <div className="absolute inset-0 bg-black opacity-30 z-0"></div>

         {/* 2. Content Overlay (Centered and structured for 2 columns) */}
         <div className="absolute inset-0 flex flex-col justify-center items-center z-10">
            <div className="max-w-6xl mx-auto w-full p-4 sm:p-6 lg:p-8">
               {/* Main Title Section */}
               <div
                  className={`text-center mb-12 relative z-20
                            transform transition-all duration-1000 ease-out 
                            ${
                               isVisible
                                  ? 'translate-y-0 opacity-100'
                                  : '-translate-y-10 opacity-0'
                            }
                        `}
               >
                  <h2 className="text-3xl md:text-5xl text-white mb-4 uppercase">
                     {hardcodedData.title}
                  </h2>
                  <p className="text-gray-300 max-w-4xl mx-auto text-base md:text-lg leading-relaxed">
                     {hardcodedData.description}
                  </p>
               </div>

               {/* Left and Right Content Columns */}
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                  {/* LEFT Content Block - Slides from the LEFT */}
                  <div className={getContentClasses('left', 'delay-300')}>
                     <div className="space-y-8">
                        {hardcodedData.contentBlocks[0].children.map(
                           (child, childIndex) => (
                              <div
                                 key={`left-${childIndex}`}
                                 className="p-3 border-l-4 border-white backdrop-blur-sm bg-black/50 rounded-lg"
                              >
                                 <h3 className="text-xl md:text-2xl text-white mb-2 uppercase">
                                    {child.subtitle}
                                 </h3>
                                 <p className="text-gray-300 text-base leading-relaxed">
                                    {child.description}
                                 </p>
                              </div>
                           )
                        )}
                     </div>
                  </div>

                  {/* RIGHT Content Block - Slides from the RIGHT */}
                  <div className={getContentClasses('right', 'delay-500')}>
                     <div className="space-y-8">
                        {hardcodedData.contentBlocks[1].children.map(
                           (child, childIndex) => (
                              <div
                                 key={`right-${childIndex}`}
                                 className="p-3 border-r-4 border-white text-right backdrop-blur-sm bg-black/50 rounded-lg"
                              >
                                 <h3 className="text-xl md:text-2xl text-white mb-2 uppercase">
                                    {child.subtitle}
                                 </h3>
                                 <p className="text-gray-300 text-base leading-relaxed">
                                    {child.description}
                                 </p>
                              </div>
                           )
                        )}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
