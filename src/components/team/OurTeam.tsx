import React, { useState } from 'react';
import { X, Linkedin } from 'lucide-react';
import NavigationHeader from '../NavigationHeader';
import Footer from '../Footer';

// Mock Footer and NavigationHeader components

function OurTeam() {
   const [selectedMember, setSelectedMember] = useState(null);

   const teamMembers = [
      {
         id: 1,
         name: 'Richard Adewale',
         role: 'CEO & Founder',
         image: './villian.jpg',
         linkedin:
            'https://www.linkedin.com/in/richard-adewale-84b2821ab?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
         bio: 'I’m Richard Adewale, the Founder of Loteraa, with over 4 years of experience in the blockchain space. My expertise spans product management, product design, prompt engineering, technical SEO, and blockchain architecture, enabling me to bridge both the technical and strategic aspects of building impactful solutions.I’ve served as a Product Manager, supervising the development of blockchain-based products across multiple ecosystems, including Chainlink, Avalanche, and other emerging chains. My experience also extends into product marketing, having worked with FriendnPal AI, and into media and communications as the Founder of BitBuzz Media Company and PR Manager at Gilt Edge Advertising.Beyond product strategy and marketing, I bring additional skills in cryptography, blockchain architecture, and structured systems analysis, which allow me to design and oversee secure, scalable, and community-driven platforms. At Loteraa, I’m dedicated to transforming blockchain into a tool for community empowerment, trust, and innovation.',
      },
      {
         id: 2,
         name: 'Kanu Juliet',
         role: 'Co-founder & Technical Lead',
         image: './juliet.jpg',
         linkedin: 'https://www.linkedin.com/in/juliet-kanu',
         bio: "Juliet brings a unique blend of scientific discipline and technical expertise to Loteraa, holding a B.Sc. in Biochemistry and a Diploma in Software Development. With several years of experience as a backend developer, she has designed and implemented robust systems that drive efficiency and scalability. Her leadership and technical direction have been instrumental in building Loteraa's core infrastructure, ensuring the platform's long-term innovation and growth.",
      },
      {
         id: 3,
         name: 'Sai prasath',
         role: 'Co-founder & Marketing Strategist',
         image: './sai3.jpeg',
         linkedin:
            'https://www.linkedin.com/in/sai-prasath-v-879215377?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
         bio: "I'm Saiprasath, a co-founder of Loteraa, a blockchain community platform. My journey into entrepreneurship was built on my background as a software engineer in India, where I gained valuable experience at companies like Unosis IT Solution and Flextronics Technologies. This hands-on experience in technology laid the foundation for my current work at Loteraa, where I'm dedicated to building a platform that leverages blockchain to empower communities and drive innovation.",
      },
      {
         id: 4,
         name: 'Miracle',
         role: 'Lead Developer',
         image: './miracle.jpg',
         linkedin: 'https://linkedin.com/in/miracle-dev',
         bio: 'I am Miracle Boniface,  Cto of Loteraa, driving the development of Loteraa, blockchain platform. My journey into blockchain and software development stems from a solid background as a full-stack engineer, specializing in the MERN/PERN stack, Python, and blockchain integrations. Over the years, I’ve worked on multiple projects that merge decentralized technologies with real-world applications, building systems that prioritize scalability, security, and user-centric design Before joining Loteraa, I contributed to a range of early-stage startups and experimental projects—such as BlockServe, a lightweight decentralized API service, DataForge Labs, a micro-team focused on blockchain analytics and tooling.',
      },
      {
         id: 5,
         name: 'Mojeed Kanyinsola ',
         role: 'Graphic Designer',
         image: './kiyomi.jpeg',
         linkedin:
            'https://www.linkedin.com/in/mojeed-kanyinsola-bb113330b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
         bio: 'I’m Mojeed Kanyinsola (Kiyomi), the Graphics Design Team Lead at Loteraa, where I oversee all creative design projects and ensure the brand’s visual identity communicates both innovation and trust. With a strong background in graphic design, motion graphics, and brand storytelling, I specialize in creating visuals that not only capture attention but also resonate with communities on a deeper level.Over the years, I’ve collaborated with various emerging startups and digital-first initiatives such as VisageWorks, a small creative studio focused on brand identity for Web3 projects;',
      },
      {
         id: 6,
         name: 'Nanda Kumar S ',
         role: 'Product testing and engineer',
         image: './nanda.jpeg',
         linkedin: 'https://linkedin.com/in/lisa-wang',
         bio: 'Nanda Kumar is an experienced Software Test Engineer with 4 years of expertise in designing and implementing end-to-end testing strategies. Skilled in both manual and automated testing, he has worked extensively with Selenium WebDriver, TestNG, Cucumber, JUnit, and Page Object Model frameworks.He brings strong knowledge of Agile methodologies, regularly contributing to sprint planning, reviews, and retrospectives, while ensuring testing processes align with project goals. Nanda has delivered impactful solutions across finance, e-commerce, and immigration domains, improving test efficiency, scalability, and reusability.With proficiency in tools such as Maven, JIRA, ALM, and Postman, he is adept at API automation, regression testing, and cross-browser validation. Nanda is committed to ensuring product quality, customer satisfaction, and driving efficiency through automation.',
      },
   ];

   const truncateText = (text, maxLength = 100) => {
      if (text.length <= maxLength) return text;
      return text.slice(0, maxLength) + '...';
   };

   const openModal = (member) => {
      setSelectedMember(member);
   };

   const closeModal = () => {
      setSelectedMember(null);
   };

   return (
      <>
         <div className="bg-black min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <NavigationHeader />
            <div className="max-w-7xl mx-auto">
               {/* Header Section */}
               <div className="text-center mb-16 mt-[50px]">
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                     Meet Our Team
                  </h1>
                  <div className="w-24 h-1 bg-white mx-auto mb-6"></div>
                  <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
                     We're a diverse group of passionate individuals working
                     together to create innovative solutions and deliver
                     exceptional results for our clients.
                  </p>
               </div>

               {/* Team Grid */}
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                  {teamMembers.map((member) => (
                     <div
                        key={member.id}
                        className="bg-black rounded-2xl shadow-2xl shadow-gray-900/50 hover:shadow-white/30 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group border border-gray-800 hover:border-white-500/50"
                     >
                        {/* Image Container */}
                        <div className="relative overflow-hidden">
                           <img
                              src={member.image}
                              alt={member.name}
                              className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                           />
                           <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                           <div className="flex items-center justify-between mb-2">
                              <h3 className="text-xl font-bold text-white">
                                 {member.name}
                              </h3>
                              <a
                                 href={member.linkedin}
                                 target="_blank"
                                 rel="noopener noreferrer"
                                 className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
                                 onClick={(e) => e.stopPropagation()}
                              >
                                 <Linkedin size={20} />
                              </a>
                           </div>
                           <p className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">
                              {member.role}
                           </p>
                           <p className="text-gray-200 text-sm leading-relaxed mb-4">
                              {truncateText(member.bio)}
                           </p>
                           <button
                              onClick={() => openModal(member)}
                              className="text-white hover:text-white text-sm font-semibold transition-colors duration-200"
                           >
                              Read More →
                           </button>
                        </div>
                     </div>
                  ))}
               </div>

               {/* Bottom CTA Section */}
               <div className="text-center mt-16 bg-black border border-gray-800 rounded-2xl shadow-2xl shadow-gray-900/50 p-8 lg:p-12">
                  <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                     Want to Join Our Team?
                  </h2>
                  <p className="text-gray-200 mb-6 max-w-2xl mx-auto">
                     We're always looking for talented individuals who share our
                     passion for innovation and excellence. Check out our open
                     positions.
                  </p>
                  <button className="bg-white text-black font-semibold py-3 px-8 rounded-lg transition-all duration-200 shadow-lg shadow-white-500/25 hover:shadow-white-500/40 border border-white hover:border-white transform hover:scale-105 hover:bg-gray-100">
                     View Open Positions
                  </button>
               </div>
            </div>
         </div>

         {/* Modal */}
         {selectedMember && (
            <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50">
               <div className="bg-gray-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
                  {/* Modal Header */}
                  <div className="flex justify-between items-center p-6 border-b border-gray-700">
                     <h2 className="text-2xl font-bold text-white">
                        Team Member Details
                     </h2>
                     <button
                        onClick={closeModal}
                        className="text-gray-400 hover:text-white transition-colors duration-200"
                     >
                        <X size={24} />
                     </button>
                  </div>

                  {/* Modal Content */}
                  <div className="p-6">
                     <div className="flex flex-col md:flex-row gap-6">
                        {/* Image */}
                        <div className="flex-shrink-0">
                           <img
                              src={selectedMember.image}
                              alt={selectedMember.name}
                              className="w-48 h-48 object-cover rounded-xl mx-auto md:mx-0"
                           />
                        </div>

                        {/* Details */}
                        <div className="flex-1">
                           <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-2xl font-bold text-white">
                                 {selectedMember.name}
                              </h3>
                              <a
                                 href={selectedMember.linkedin}
                                 target="_blank"
                                 rel="noopener noreferrer"
                                 className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
                              >
                                 <Linkedin size={24} />
                              </a>
                           </div>
                           <p className="text-white font-semibold mb-4 text-lg">
                              {selectedMember.role}
                           </p>
                           <p className="text-gray-200 leading-relaxed">
                              {selectedMember.bio}
                           </p>
                        </div>
                     </div>
                  </div>

                  {/* Modal Footer */}
                  <div className="flex justify-end gap-3 p-6 border-t border-gray-700">
                     <a
                        href={selectedMember.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200 flex items-center gap-2"
                     >
                        <Linkedin size={18} />
                        View LinkedIn
                     </a>
                     <button
                        onClick={closeModal}
                        className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200"
                     >
                        Close
                     </button>
                  </div>
               </div>
            </div>
         )}

         <Footer />
      </>
   );
}

export default OurTeam;
