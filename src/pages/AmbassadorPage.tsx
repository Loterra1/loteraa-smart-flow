
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";
import { ArrowRight, Award, Globe, Users, Zap, BadgeCheck } from "lucide-react";
import { Link } from "react-router-dom";

const AmbassadorPage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showApplyForm, setShowApplyForm] = useState(false);

  // AR background animation effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);

    // Nodes for network visualization
    class Node {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      connections: Node[];
      pulsePhase: number;

      constructor(x: number, y: number, size: number) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.color = `rgba(${12 + Math.random() * 50}, ${204 + Math.random() * 50}, ${188 + Math.random() * 50}, ${0.5 + Math.random() * 0.5})`;
        this.connections = [];
        this.pulsePhase = Math.random() * Math.PI * 2;
      }

      update(width: number, height: number) {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x < 0 || this.x > width) this.speedX *= -1;
        if (this.y < 0 || this.y > height) this.speedY *= -1;

        this.pulsePhase += 0.02;
        if (this.pulsePhase > Math.PI * 2) this.pulsePhase = 0;
      }

      draw(ctx: CanvasRenderingContext2D, time: number) {
        const pulseFactor = 0.2 * Math.sin(this.pulsePhase) + 1;
        const currentSize = this.size * pulseFactor;
        
        // Draw glow
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, currentSize * 2);
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, currentSize * 2, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Draw node
        ctx.beginPath();
        ctx.arc(this.x, this.y, currentSize, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        
        // Draw connections
        this.connections.forEach(node => {
          const dist = Math.hypot(this.x - node.x, this.y - node.y);
          if (dist < 200) {
            const alpha = 1 - dist / 200;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(node.x, node.y);
            ctx.strokeStyle = `rgba(113, 66, 246, ${alpha * 0.5})`;
            ctx.lineWidth = 1 * alpha;
            ctx.stroke();
            
            // Draw data packets moving along connections
            const packetPosition = (time % 2000) / 2000;
            const packetX = this.x + (node.x - this.x) * packetPosition;
            const packetY = this.y + (node.y - this.y) * packetPosition;
            
            ctx.beginPath();
            ctx.arc(packetX, packetY, 2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(12, 204, 188, ${alpha})`;
            ctx.fill();
          }
        });
      }
    }

    // Create nodes
    const nodes: Node[] = [];
    const nodeCount = Math.floor(window.innerWidth * window.innerHeight / 20000);
    
    for (let i = 0; i < nodeCount; i++) {
      nodes.push(new Node(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        2 + Math.random() * 3
      ));
    }
    
    // Create spatial map effect by connecting nearby nodes
    nodes.forEach(node => {
      nodes.forEach(otherNode => {
        if (node !== otherNode) {
          const dist = Math.hypot(node.x - otherNode.x, node.y - otherNode.y);
          if (dist < 200) {
            node.connections.push(otherNode);
          }
        }
      });
    });

    // Animation loop
    let animationFrameId: number;
    let startTime = Date.now();

    const render = () => {
      const time = Date.now() - startTime;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw grid for spatial map effect
      ctx.beginPath();
      const gridSize = 50;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
      }
      ctx.strokeStyle = 'rgba(113, 66, 246, 0.1)';
      ctx.stroke();
      
      // Update and draw nodes
      nodes.forEach(node => {
        node.update(canvas.width, canvas.height);
        node.draw(ctx, time);
      });
      
      // Create AR holographic effect
      ctx.fillStyle = 'rgba(12, 204, 188, 0.03)';
      for (let i = 0; i < 3; i++) {
        const y = (canvas.height / 3) * i + (Math.sin(time * 0.001) * 20);
        ctx.fillRect(0, y, canvas.width, 1);
      }
      
      animationFrameId = window.requestAnimationFrame(render);
    };
    
    render();
    
    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', setCanvasDimensions);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-gray-900">
      
      <NavigationHeader />
      
      <main className="flex-grow pt-28 pb-20 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="max-w-5xl mx-auto mb-16">
            <div className="text-center">
              <span className="inline-block px-4 py-2 rounded-full bg-loteraa-purple/20 backdrop-blur-md border border-loteraa-purple/20 text-white/90 text-sm font-medium mb-4">
                Join Our Global Community
              </span>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
                Loteraa Ambassador Program
              </h1>
              <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
                Connect IoT innovation with blockchain technology. Build communities, earn rewards, 
                and shape the future of decentralized sensor networks.
              </p>
              <Button 
                onClick={() => setShowApplyForm(true)}
                size="lg" 
                className="bg-loteraa-purple hover:bg-loteraa-purple/90 text-white px-8"
              >
                Apply Now <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            
            {/* 3D Globe visualization placeholder */}
            <div className="mt-16 relative h-80 md:h-96 rounded-xl overflow-hidden backdrop-blur-md border border-loteraa-gray/30 animate-float">
              <div className="absolute inset-0 mesh-bg">
                <div className="absolute inset-0 mesh-grid"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-40 h-40 md:w-56 md:h-56 rounded-full bg-gradient-to-r from-loteraa-purple via-loteraa-blue to-loteraa-teal animate-move-background bg-[length:400%_400%] relative">
                  <div className="absolute inset-0 rounded-full border-2 border-loteraa-purple/50 animate-pulse"></div>
                  <div className="absolute inset-2 rounded-full border border-loteraa-blue/30"></div>
                  <div className="absolute inset-4 rounded-full border border-loteraa-teal/20"></div>
                  
                  {/* Connection points */}
                  {[...Array(8)].map((_, i) => {
                    const angle = (i / 8) * Math.PI * 2;
                    const x = Math.cos(angle) * 100;
                    const y = Math.sin(angle) * 100;
                    return (
                      <div 
                        key={i}
                        className="absolute w-2 h-2 bg-white rounded-full animate-pulse"
                        style={{
                          left: `calc(50% + ${x}%)`,
                          top: `calc(50% + ${y}%)`,
                          animationDelay: `${i * 0.2}s`
                        }}
                      />
                    );
                  })}
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Globe className="w-16 h-16 text-white/90" />
                  </div>
                </div>
              </div>
              <div className="absolute bottom-4 left-0 w-full text-center text-sm text-white/60">
                Loteraa's Global Ambassador Network
              </div>
            </div>
          </div>
          
          {/* Program Benefits */}
          <div className="max-w-5xl mx-auto mb-20">
            <h2 className="text-3xl font-bold mb-12 text-center">
              <span className="gradient-text">Ambassador Benefits</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-loteraa-gray/20 backdrop-blur-md border border-loteraa-gray/30 shadow-lg">
                <CardHeader>
                  <Award className="h-10 w-10 mb-3 text-loteraa-purple" />
                  <CardTitle className="text-white/90">Weekly Rewards</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/70">
                    Earn Loteraa native tokens weekly for building and growing your community. Rewards are based on engagement and growth metrics.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-loteraa-gray/20 backdrop-blur-md border border-loteraa-gray/30 shadow-lg">
                <CardHeader>
                  <Users className="h-10 w-10 mb-3 text-loteraa-blue" />
                  <CardTitle className="text-white/90">Community Leadership</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/70">
                    Lead your own community focused on IoT technology and Loteraa blockchain integration. Receive delegation of native tokens to support community initiatives.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-loteraa-gray/20 backdrop-blur-md border border-loteraa-gray/30 shadow-lg">
                <CardHeader>
                  <Zap className="h-10 w-10 mb-3 text-loteraa-teal" />
                  <CardTitle className="text-white/90">Early Access</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/70">
                    Get exclusive early access to new features, tools, and educational resources. Be the first to test new IoT implementations and blockchain integrations.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* How It Works */}
          <div className="max-w-5xl mx-auto mb-20">
            <h2 className="text-3xl font-bold mb-12 text-center">
              <span className="gradient-text">How It Works</span>
            </h2>
            
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-loteraa-purple/20 backdrop-blur-md border border-loteraa-purple/30 flex-shrink-0">
                  <span className="text-2xl font-bold gradient-text">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-white/90">Apply to the Program</h3>
                  <p className="text-white/70">
                    Submit your application detailing your experience with blockchain technology, IoT, and community building. Tell us why you're passionate about Loteraa's vision.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-loteraa-blue/20 backdrop-blur-md border border-loteraa-blue/30 flex-shrink-0">
                  <span className="text-2xl font-bold gradient-text">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-white/90">Complete Training</h3>
                  <p className="text-white/70">
                    Once selected, you'll receive comprehensive training on SensorChain technology, how IoT devices integrate with Loteraa blockchain, and effective community building strategies.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-loteraa-teal/20 backdrop-blur-md border border-loteraa-teal/30 flex-shrink-0">
                  <span className="text-2xl font-bold gradient-text">3</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-white/90">Build Your Community</h3>
                  <p className="text-white/70">
                    Start building your community focused on IoT technology and Loteraa blockchain. Organize events, workshops, and discussions to engage developers and enthusiasts.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-loteraa-purple/20 backdrop-blur-md border border-loteraa-purple/30 flex-shrink-0">
                  <span className="text-2xl font-bold gradient-text">4</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-white/90">Earn Rewards</h3>
                  <p className="text-white/70">
                    Receive weekly rewards in Loteraa native tokens based on your community's engagement, growth, and contributions to the ecosystem. Ambassadors with exceptional performance receive bonus token delegations.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Technology Focus */}
          <div className="max-w-5xl mx-auto mb-20 bg-loteraa-gray/20 backdrop-blur-md border border-loteraa-gray/30 rounded-xl p-8">
            <h2 className="text-3xl font-bold mb-6 text-center">
              <span className="gradient-text">SensorChain Technology</span>
            </h2>
            
            <p className="text-white/80 text-lg mb-8 text-center">
              Loteraa's SensorChain is revolutionizing how IoT devices interact with blockchain technology
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex gap-3">
                  <BadgeCheck className="h-6 w-6 text-loteraa-teal flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-white/90">Trustless Data Verification</h4>
                    <p className="text-white/70">Sensor data is cryptographically verified and stored on-chain, ensuring integrity and immutability.</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <BadgeCheck className="h-6 w-6 text-loteraa-teal flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-white/90">Machine-to-Machine Payments</h4>
                    <p className="text-white/70">IoT devices can autonomously transact with each other using smart contracts and Loteraa tokens.</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <BadgeCheck className="h-6 w-6 text-loteraa-teal flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-white/90">Automated Triggers</h4>
                    <p className="text-white/70">Sensor readings can automatically trigger smart contract executions for real-world applications.</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex gap-3">
                  <BadgeCheck className="h-6 w-6 text-loteraa-teal flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-white/90">Data Monetization</h4>
                    <p className="text-white/70">Sensor owners can monetize their data through the Loteraa marketplace, creating new revenue streams.</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <BadgeCheck className="h-6 w-6 text-loteraa-teal flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-white/90">Cross-Chain Compatibility</h4>
                    <p className="text-white/70">Loteraa bridges with major blockchains including Polygon for maximum interoperability.</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <BadgeCheck className="h-6 w-6 text-loteraa-teal flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-white/90">Low Latency Validation</h4>
                    <p className="text-white/70">Our proprietary consensus mechanism ensures fast validation of sensor data with minimal energy consumption.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Call to Action */}
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-r from-loteraa-purple/30 via-loteraa-blue/30 to-loteraa-teal/30 backdrop-blur-md rounded-xl p-8 border border-loteraa-purple/20">
              <h2 className="text-3xl font-bold mb-6">
                <span className="gradient-text">Ready to Join the Revolution?</span>
              </h2>
              <p className="text-white/80 text-lg mb-8">
                Become a Loteraa Ambassador today and help us build the future of IoT-Blockchain integration. Connect innovators, developers, and communities to create a decentralized sensor network ecosystem.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => setShowApplyForm(true)}
                  size="lg" 
                  className="bg-loteraa-purple hover:bg-loteraa-purple/90 text-white px-8"
                >
                  Apply Now <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button asChild variant="outline" size="lg" className="bg-transparent border-loteraa-purple/50 text-white hover:bg-loteraa-purple/20">
                  <Link to="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AmbassadorPage;
