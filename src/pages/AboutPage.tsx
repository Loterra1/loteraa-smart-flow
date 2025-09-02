import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import NavigationHeader from '@/components/NavigationHeader';
import Footer from '@/components/Footer';
import AboutHeroAnimation from '@/components/animations/AboutHeroAnimation';
import RadialBurstAnimation from '@/components/animations/RadialBurstAnimation';
import {
   Target,
   Zap,
   Shield,
   Globe,
   Users,
   Lightbulb,
   ArrowRight,
   Cpu,
   Network,
   Database,
   Lock,
   Rocket,
   Heart,
} from 'lucide-react';

export default function AboutPage() {
   const [visibleSections, setVisibleSections] = useState<
      Record<string, boolean>
   >({});
   const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

   useEffect(() => {
      const observer = new IntersectionObserver(
         (entries) => {
            entries.forEach((entry) => {
               if (entry.isIntersecting) {
                  const sectionId = entry.target.getAttribute('data-section');
                  if (sectionId) {
                     setVisibleSections((prev) => ({
                        ...prev,
                        [sectionId]: true,
                     }));
                  }
               }
            });
         },
         { threshold: 0.1, rootMargin: '0px 0px -10% 0px' }
      );

      Object.values(sectionRefs.current).forEach((ref) => {
         if (ref) observer.observe(ref);
      });

      return () => observer.disconnect();
   }, []);

   const setSectionRef = (sectionId: string) => (el: HTMLElement | null) => {
      sectionRefs.current[sectionId] = el;
   };

   const goals = [
      {
         icon: <Target className="h-6 w-6 sm:h-8 sm:w-8 text-white" />,
         title: 'Democratize IoT Data',
         description:
            'Make IoT data accessible and valuable for everyone through blockchain technology.',
      },
      {
         icon: <Zap className="h-6 w-6 sm:h-8 sm:w-8 text-white" />,
         title: 'Enable Automation',
         description:
            'Connect real-world devices to smart contracts for seamless automation.',
      },
      {
         icon: <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-white" />,
         title: 'Ensure Security',
         description:
            'Provide unbreakable security and data integrity through blockchain encryption.',
      },
      {
         icon: <Globe className="h-6 w-6 sm:h-8 sm:w-8 text-white" />,
         title: 'Global Infrastructure',
         description:
            'Build a worldwide network of connected IoT devices and smart contracts.',
      },
   ];

   const values = [
      {
         icon: <Lightbulb className="h-5 w-5 sm:h-6 sm:w-6 text-white" />,
         title: 'Innovation',
         description:
            "We constantly push the boundaries of what's possible with IoT and blockchain.",
      },
      {
         icon: <Users className="h-5 w-5 sm:h-6 sm:w-6 text-white" />,
         title: 'Community',
         description:
            'We believe in the power of decentralized communities to drive change.',
      },
      {
         icon: <Lock className="h-5 w-5 sm:h-6 sm:w-6 text-white" />,
         title: 'Security',
         description:
            'Security and privacy are at the core of everything we build.',
      },
      {
         icon: <Heart className="h-5 w-5 sm:h-6 sm:w-6 text-white" />,
         title: 'Transparency',
         description:
            'We operate with complete transparency and open-source principles.',
      },
   ];

   return (
      <div className="min-h-screen bg-black">
         <AboutHeroAnimation />
         <NavigationHeader />

         {/* Hero Section - Fully Responsive */}
         <section className="pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pb-20 relative overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
               <div className="text-center max-w-7xl mx-auto">
                  {/* Responsive Image with Centered Text and P5.js Animation Overlay */}
                  <div className="relative mx-auto mb-8 sm:mb-12 w-full max-w-[320px] h-[320px] sm:max-w-[400px] sm:h-[400px] md:max-w-[500px] md:h-[500px] lg:max-w-[700px] lg:h-[700px] xl:max-w-[900px] xl:h-[900px] 2xl:max-w-[1000px] 2xl:h-[1000px]">
                     {/* Background Image - Responsive */}
                     <img
                        src="/lovable-uploads/8643e5bb-b534-4077-ac53-edb38eb13163.png"
                        alt="IoT to Blockchain Connection"
                        className="w-full h-full object-contain absolute inset-0 z-10"
                     />

                     {/* P5.js Animation Overlay */}
                     <div className="absolute inset-0 z-20 opacity-40 sm:opacity-50 md:opacity-60">
                        <RadialBurstAnimation />
                     </div>

                     {/* Centered Text Overlay - Fully Responsive */}
                     <div className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center px-2 sm:px-4">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-7xl 2xl:text-8xl 3xl:text-9xl font-bold mb-4 sm:mb-6 md:mb-8 text-white drop-shadow-2xl leading-tight">
                           <span className="text-white block sm:inline">
                              Connecting IoT
                           </span>
                           <span className="hidden sm:inline"> </span>
                           <br className="sm:hidden" />
                           <span className="text-white block sm:inline">
                              to Blockchain
                           </span>
                        </h1>

                        <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl 3xl:text-4xl text-white/90 max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-4xl mx-auto leading-relaxed drop-shadow-lg font-medium px-2">
                           Loteraa is building the future of IoT-blockchain
                           infrastructure, enabling seamless integration between
                           real-world devices and decentralized smart contracts.
                        </p>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* Mission Section - Enhanced Responsive */}
         <section
            ref={setSectionRef('mission')}
            data-section="mission"
            className="py-12 sm:py-16 md:py-20 relative"
         >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
               <div className="bg-black rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12 border border-gray-400/20">
                  <div className="text-center mb-8 sm:mb-12">
                     <h2
                        className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 transition-all duration-1000 ease-out ${
                           visibleSections.mission
                              ? 'opacity-100 translate-y-0'
                              : 'opacity-0 translate-y-8'
                        }`}
                     >
                        <span className="text-white">Our Mission</span>
                     </h2>
                     <p
                        className={`text-base sm:text-lg md:text-xl text-white/80 max-w-xs sm:max-w-2xl md:max-w-3xl mx-auto leading-relaxed transition-all duration-1000 ease-out delay-300 ${
                           visibleSections.mission
                              ? 'opacity-100 translate-y-0'
                              : 'opacity-0 translate-y-8'
                        }`}
                     >
                        To create a decentralized ecosystem where IoT devices
                        can securely interact with blockchain networks, enabling
                        new forms of automation, data monetization, and
                        machine-to-machine transactions that benefit everyone.
                     </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                     {goals.map((goal, index) => (
                        <Card
                           key={index}
                           className={`bg-gray-500/10 backdrop-blur-md border-gray-400/20 hover:border-loteraa-purple/50 transition-all duration-700 ease-out group ${
                              visibleSections.mission
                                 ? 'opacity-100 translate-y-0'
                                 : 'opacity-0 translate-y-8'
                           }`}
                           style={{ transitionDelay: `${600 + index * 150}ms` }}
                        >
                           <CardHeader className="text-center pb-3 sm:pb-4">
                              <div className="mx-auto mb-3 sm:mb-4 p-2 sm:p-3 bg-loteraa-purple/20 rounded-lg w-fit group-hover:bg-loteraa-purple/30 transition-colors">
                                 {goal.icon}
                              </div>
                              <CardTitle className="text-white text-base sm:text-lg group-hover:text-loteraa-purple transition-colors">
                                 {goal.title}
                              </CardTitle>
                           </CardHeader>
                           <CardContent className="pt-0">
                              <p className="text-white/70 text-center text-xs sm:text-sm">
                                 {goal.description}
                              </p>
                           </CardContent>
                        </Card>
                     ))}
                  </div>
               </div>
            </div>
         </section>

         {/* Technology Section - Enhanced Responsive */}
         <section
            ref={setSectionRef('technology')}
            data-section="technology"
            className="py-12 sm:py-16 md:py-20 relative"
         >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
               <div className="text-center mb-12 sm:mb-16">
                  <h2
                     className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 transition-all duration-1000 ease-out ${
                        visibleSections.technology
                           ? 'opacity-100 translate-y-0'
                           : 'opacity-0 translate-y-8'
                     }`}
                  >
                     <span className="text-white">Our Technology</span>
                  </h2>
                  <p
                     className={`text-base sm:text-lg md:text-xl text-white/70 max-w-xs sm:max-w-lg md:max-w-2xl mx-auto transition-all duration-1000 ease-out delay-300 ${
                        visibleSections.technology
                           ? 'opacity-100 translate-y-0'
                           : 'opacity-0 translate-y-8'
                     }`}
                  >
                     Built on cutting-edge blockchain technology with a focus on
                     scalability and security
                  </p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                  <Card
                     className={`bg-gray-900/50 backdrop-blur-md border-gray-400/20 transition-all duration-700 ease-out ${
                        visibleSections.technology
                           ? 'opacity-100 translate-y-0'
                           : 'opacity-0 translate-y-8'
                     }`}
                     style={{ transitionDelay: '600ms' }}
                  >
                     <CardHeader className="pb-3 sm:pb-4">
                        <div className="p-3 sm:p-4 bg-loteraa-purple/20 rounded-lg w-fit mb-3 sm:mb-4">
                           <Network className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                        </div>
                        <CardTitle className="text-white text-lg sm:text-xl">
                           Decentralized Network
                        </CardTitle>
                     </CardHeader>
                     <CardContent className="pt-0">
                        <p className="text-white/70 text-sm sm:text-base">
                           Our blockchain network ensures no single point of
                           failure while maintaining high throughput for IoT
                           device interactions.
                        </p>
                     </CardContent>
                  </Card>

                  <Card
                     className={`bg-gray-900/50 backdrop-blur-md border-gray-400/20 transition-all duration-700 ease-out ${
                        visibleSections.technology
                           ? 'opacity-100 translate-y-0'
                           : 'opacity-0 translate-y-8'
                     }`}
                     style={{ transitionDelay: '750ms' }}
                  >
                     <CardHeader className="pb-3 sm:pb-4">
                        <div className="p-3 sm:p-4 bg-loteraa-blue/20 rounded-lg w-fit mb-3 sm:mb-4">
                           <Shield className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                        </div>
                        <CardTitle className="text-white text-lg sm:text-xl">
                           Quantum-Resistant Security
                        </CardTitle>
                     </CardHeader>
                     <CardContent className="pt-0">
                        <p className="text-white/70 text-sm sm:text-base">
                           Advanced cryptographic protocols protect your IoT
                           data against current and future security threats.
                        </p>
                     </CardContent>
                  </Card>

                  <Card
                     className={`bg-gray-900/50 backdrop-blur-md border-gray-400/20 transition-all duration-700 ease-out ${
                        visibleSections.technology
                           ? 'opacity-100 translate-y-0'
                           : 'opacity-0 translate-y-8'
                     }`}
                     style={{ transitionDelay: '900ms' }}
                  >
                     <CardHeader className="pb-3 sm:pb-4">
                        <div className="p-3 sm:p-4 bg-loteraa-teal/20 rounded-lg w-fit mb-3 sm:mb-4">
                           <Rocket className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                        </div>
                        <CardTitle className="text-white text-lg sm:text-xl">
                           Scalable Infrastructure
                        </CardTitle>
                     </CardHeader>
                     <CardContent className="pt-0">
                        <p className="text-white/70 text-sm sm:text-base">
                           Built to handle millions of IoT devices with
                           lightning-fast transaction processing and minimal
                           energy consumption.
                        </p>
                     </CardContent>
                  </Card>
               </div>
            </div>
         </section>

         {/* Values Section - Enhanced Responsive */}
         <section
            ref={setSectionRef('values')}
            data-section="values"
            className="py-12 sm:py-16 md:py-20 bg-black relative"
         >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
               <div className="bg-gray-500/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12 border border-gray-400/20">
                  <div className="text-center mb-8 sm:mb-12">
                     <h3
                        className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 transition-all duration-1000 ease-out ${
                           visibleSections.values
                              ? 'opacity-100 translate-y-0'
                              : 'opacity-0 translate-y-8'
                        }`}
                     >
                        <span className="text-white">Our Values</span>
                     </h3>
                     <p
                        className={`text-white/70 text-base sm:text-lg md:text-xl transition-all duration-1000 ease-out delay-300 ${
                           visibleSections.values
                              ? 'opacity-100 translate-y-0'
                              : 'opacity-0 translate-y-8'
                        }`}
                     >
                        The principles that guide everything we do
                     </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                     {values.map((value, index) => (
                        <div key={index} className="text-center group">
                           <div
                              className={`bg-gray-500/10 backdrop-blur-md rounded-lg p-4 sm:p-6 border border-gray-400/20 hover:border-loteraa-teal/50 transition-all duration-700 ease-out ${
                                 visibleSections.values
                                    ? 'opacity-100 translate-y-0'
                                    : 'opacity-0 translate-y-8'
                              }`}
                              style={{
                                 transitionDelay: `${600 + index * 150}ms`,
                              }}
                           >
                              <div className="mx-auto mb-3 sm:mb-4 p-2 sm:p-3 bg-loteraa-teal/20 rounded-lg w-fit group-hover:bg-loteraa-teal/30 transition-colors">
                                 {value.icon}
                              </div>
                              <h4 className="text-base sm:text-lg font-semibold text-white mb-2 group-hover:text-loteraa-teal transition-colors">
                                 {value.title}
                              </h4>
                              <p className="text-white/70 text-xs sm:text-sm">
                                 {value.description}
                              </p>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </section>

         {/* CTA Section - Enhanced Responsive */}
         <section
            ref={setSectionRef('cta')}
            data-section="cta"
            className="py-12 sm:py-16 md:py-20 relative"
         >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
               <h3
                  className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 transition-all duration-1000 ease-out ${
                     visibleSections.cta
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-8'
                  }`}
               >
                  <span className="text-white">Join the Revolution</span>
               </h3>
               <p
                  className={`text-base sm:text-lg md:text-xl text-white/70 mb-6 sm:mb-8 max-w-xs sm:max-w-lg md:max-w-2xl mx-auto transition-all duration-1000 ease-out delay-300 ${
                     visibleSections.cta
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-8'
                  }`}
               >
                  Be part of the future where IoT and blockchain converge to
                  create endless possibilities
               </p>
               <div
                  className={`transition-all duration-1000 ease-out delay-600 ${
                     visibleSections.cta
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-8'
                  }`}
               >
                  <Button
                     size="lg"
                     className="bg-black hover:bg-black/90 text-white px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg"
                  >
                     Get Started Today{' '}
                     <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                  </Button>
               </div>
            </div>
         </section>

         <Footer />
      </div>
   );
}
