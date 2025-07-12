import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { 
  Activity, 
  Thermometer, 
  Droplets, 
  Wind, 
  Zap, 
  TrendingUp, 
  MapPin, 
  Globe, 
  BarChart3,
  LineChart,
  Wifi,
  Database,
  ArrowRight,
  Shield,
  Cpu,
  Clock
} from "lucide-react";

export default function DataFeedPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    setIsInView(true);
    
    // Data stream animation
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
    
    // Define DataPoint class for streaming data visualization
    class DataPoint {
      x: number;
      y: number;
      targetY: number;
      size: number;
      speed: number;
      color: string;
      value: number;
      type: string;
      alpha: number;
      pulsePhase: number;
      
      constructor(x: number, y: number, type: string) {
        this.x = x;
        this.y = y;
        this.targetY = y;
        this.size = 2 + Math.random() * 4;
        this.speed = 0.5 + Math.random() * 2;
        this.type = type;
        this.value = Math.floor(Math.random() * 100);
        this.alpha = 0.5 + Math.random() * 0.5;
        this.pulsePhase = Math.random() * Math.PI * 2;
        
        // Different colors for different data types
        const colors = {
          temperature: '#ff5e62',
          humidity: '#3182F4',
          pressure: '#7142F6',
          light: '#ffeb3b',
          motion: '#0CCCBC',
          default: '#ffffff'
        };
        
        this.color = colors[type as keyof typeof colors] || colors.default;
      }
      
      update() {
        // Stream data from left to right
        this.x += this.speed;
        
        // Simulate fluctuating data
        if (Math.random() > 0.95) {
          this.targetY = this.y + (Math.random() - 0.5) * 50;
        }
        
        // Smooth transition to target y
        this.y += (this.targetY - this.y) * 0.03;
        
        // Pulse effect
        this.pulsePhase += 0.05;
        if (this.pulsePhase > Math.PI * 2) this.pulsePhase = 0;
      }
      
      draw(ctx: CanvasRenderingContext2D) {
        const pulseFactor = 0.2 * Math.sin(this.pulsePhase) + 1;
        const currentSize = this.size * pulseFactor;
        
        // Draw data point
        ctx.beginPath();
        ctx.arc(this.x, this.y, currentSize, 0, Math.PI * 2);
        ctx.fillStyle = `${this.color}${Math.floor(this.alpha * 255).toString(16).padStart(2, '0')}`;
        ctx.fill();
        
        // Draw connecting lines for nearby points
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x - this.speed * 20, this.y);
        ctx.strokeStyle = `${this.color}40`;
        ctx.lineWidth = 1;
        ctx.stroke();
        
        // Draw value label
        ctx.fillStyle = `${this.color}cc`;
        ctx.font = '9px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`${this.value}`, this.x, this.y - 10);
      }
    }
    
    // Generate data streams
    const dataStreams: DataPoint[] = [];
    const dataTypes = ['temperature', 'humidity', 'pressure', 'light', 'motion'];
    
    for (let i = 0; i < 50; i++) {
      const type = dataTypes[Math.floor(Math.random() * dataTypes.length)];
      const x = Math.random() * canvas.width;
      const y = 100 + Math.random() * (canvas.height - 200);
      dataStreams.push(new DataPoint(x, y, type));
    }
    
    // Animation loop
    let animationFrameId: number;
    
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw grid
      ctx.beginPath();
      for (let i = 0; i < canvas.width; i += 50) {
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
      }
      for (let i = 0; i < canvas.height; i += 50) {
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
      }
      ctx.strokeStyle = 'rgba(113, 66, 246, 0.1)';
      ctx.stroke();
      
      // Update and draw data points
      dataStreams.forEach(point => {
        point.update();
        point.draw(ctx);
        
        // Recycle points that go offscreen
        if (point.x > canvas.width) {
          point.x = 0;
          point.y = 100 + Math.random() * (canvas.height - 200);
          point.targetY = point.y;
        }
      });
      
      // Draw AR holographic elements
      ctx.fillStyle = 'rgba(12, 204, 188, 0.03)';
      for (let i = 0; i < 5; i++) {
        const y = (canvas.height / 5) * i + (Math.sin(Date.now() * 0.001) * 10);
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
    <div className="min-h-screen bg-black">
      <NavigationHeader />
      
      <main className="flex-grow pt-28 pb-20 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <section className="relative mb-24">
            <div className="max-w-5xl mx-auto text-center">
              <span className={`inline-block px-4 py-2 rounded-full bg-loteraa-purple/20 backdrop-blur-md border border-loteraa-purple/20 text-white/90 text-sm font-medium mb-4 transition-all duration-700 ${isInView ? 'opacity-100 transform-none' : 'opacity-0 translate-y-4'}`}>
                Secure & Real-Time
              </span>
              <h1 className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-6 transition-all duration-700 delay-100 ${isInView ? 'opacity-100 transform-none' : 'opacity-0 translate-y-4'}`}>
                <span className="gradient-text">Real-time IoT Data Feed</span>
              </h1>
              <p className={`text-xl text-white/80 max-w-3xl mx-auto mb-8 transition-all duration-700 delay-200 ${isInView ? 'opacity-100 transform-none' : 'opacity-0 translate-y-4'}`}>
                Loteraa provides secure, low-latency data streaming from IoT devices directly to blockchain networks, 
                enabling developers to build powerful and trustless applications.
              </p>
              <div className={`flex flex-col sm:flex-row justify-center gap-4 transition-all duration-700 delay-300 ${isInView ? 'opacity-100 transform-none' : 'opacity-0 translate-y-4'}`}>
                <Button 
                  size="lg" 
                  className="bg-loteraa-purple hover:bg-loteraa-purple/90 text-white px-8 py-6 text-lg"
                >
                  Get Access <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="bg-transparent border-loteraa-purple text-white hover:bg-loteraa-purple/20 px-8 py-6 text-lg"
                >
                  Explore Data Types
                </Button>
              </div>
            </div>
            
            {/* 3D Data Visualization */}
            <div className={`mt-16 max-w-4xl mx-auto transition-all duration-1000 delay-400 ${isInView ? 'opacity-100 transform-none' : 'opacity-0 translate-y-8'}`}>
              <div className="bg-loteraa-gray/20 backdrop-blur-md border border-loteraa-gray/30 rounded-xl p-6 overflow-hidden h-80 md:h-96 relative">
                <div className="absolute inset-0 mesh-bg">
                  <div className="absolute inset-0 mesh-grid"></div>
                </div>
                
                {/* Map Visualization */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-full max-w-3xl mx-auto relative">
                    <div className="w-full h-full rounded-lg overflow-hidden">
                      {/* World map with data points */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Globe className="w-40 h-40 md:w-64 md:h-64 text-white/30" />
                      </div>
                      
                      {/* Data points */}
                      {[...Array(20)].map((_, i) => {
                        const size = 4 + Math.random() * 8;
                        const delay = i * 0.2;
                        return (
                          <div 
                            key={i}
                            className="absolute rounded-full animate-pulse"
                            style={{
                              backgroundColor: `${['#7142F6', '#3182F4', '#0CCCBC', '#ff5e62'][Math.floor(Math.random() * 4)]}`,
                              left: `${10 + Math.random() * 80}%`,
                              top: `${10 + Math.random() * 80}%`,
                              animationDelay: `${delay}s`,
                              opacity: 0.7,
                              width: `${size}px`,
                              height: `${size}px`
                            }}
                          />
                        );
                      })}
                      
                      {/* Data streams */}
                      {[...Array(15)].map((_, i) => {
                        const startX = 10 + Math.random() * 80;
                        const startY = 10 + Math.random() * 80;
                        const endX = 10 + Math.random() * 80;
                        const endY = 10 + Math.random() * 80;
                        return (
                          <div 
                            key={`stream-${i}`}
                            className="absolute h-0.5 animate-pulse"
                            style={{
                              backgroundColor: `${['#7142F6', '#3182F4', '#0CCCBC', '#ff5e62'][Math.floor(Math.random() * 4)]}40`,
                              left: `${startX}%`,
                              top: `${startY}%`,
                              width: `${Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2))}%`,
                              transform: `rotate(${Math.atan2(endY - startY, endX - startX) * 180 / Math.PI}deg)`,
                              transformOrigin: 'left',
                              animationDelay: `${i * 0.3}s`,
                              opacity: 0.5
                            }}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>
                
                {/* Data metrics */}
                <div className="absolute bottom-4 left-0 w-full">
                  <div className="flex justify-between gap-2 px-4 text-sm text-white/80">
                    <div className="flex items-center gap-1">
                      <Wifi size={14} className="text-loteraa-purple" />
                      <span>Active Sensors: 5,324</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Database size={14} className="text-loteraa-blue" />
                      <span>Data Points: 1.2M/day</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={14} className="text-loteraa-teal" />
                      <span>Latency: 0.5s</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Features Section */}
          <section className="mb-24">
            <div className="max-w-5xl mx-auto">
              <h2 className={`text-3xl md:text-4xl font-bold mb-12 text-center transition-all duration-700 ${isInView ? 'opacity-100 transform-none' : 'opacity-0 translate-y-4'}`}>
                <span className="gradient-text">Why Choose Loteraa Data Feeds</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: "Secure Data Transfer",
                    description: "End-to-end encryption ensures your IoT data remains protected from device to blockchain.",
                    icon: Shield,
                    color: "text-loteraa-purple",
                    delay: 100
                  },
                  {
                    title: "Low Latency",
                    description: "Advanced infrastructure delivers data in milliseconds, enabling real-time applications and automation.",
                    icon: Zap,
                    color: "text-loteraa-blue",
                    delay: 200
                  },
                  {
                    title: "Verified Sources",
                    description: "All data sources are verified and cryptographically signed to ensure authenticity.",
                    icon: Activity,
                    color: "text-loteraa-teal",
                    delay: 300
                  },
                  {
                    title: "Blockchain Storage",
                    description: "Immutable storage on Loteraa blockchain ensures data integrity and historical access.",
                    icon: Database,
                    color: "text-[#ff5e62]",
                    delay: 400
                  },
                  {
                    title: "Global Coverage",
                    description: "Access IoT data from devices around the world with our extensive sensor network.",
                    icon: Globe,
                    color: "text-loteraa-purple",
                    delay: 500
                  },
                  {
                    title: "Advanced Analytics",
                    description: "Built-in analytics tools to visualize and gain insights from streaming data.",
                    icon: BarChart3,
                    color: "text-loteraa-blue",
                    delay: 600
                  }
                ].map((feature, index) => (
                  <Card 
                    key={index} 
                    className={`bg-loteraa-gray/20 backdrop-blur-md border border-loteraa-gray/30 hover:border-loteraa-purple/50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg transition-all duration-700 delay-${feature.delay} ${isInView ? 'opacity-100 transform-none' : 'opacity-0 translate-y-4'}`}
                  >
                    <CardHeader>
                      <feature.icon className={`h-10 w-10 mb-3 ${feature.color}`} />
                      <CardTitle className="text-white/90">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-white/70">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
          
          {/* Data Types Section */}
          <section className="mb-24">
            <div className="max-w-5xl mx-auto">
              <h2 className={`text-3xl md:text-4xl font-bold mb-4 text-center transition-all duration-700 ${isInView ? 'opacity-100 transform-none' : 'opacity-0 translate-y-4'}`}>
                <span className="gradient-text">Available Data Types</span>
              </h2>
              <p className={`text-xl text-white/80 max-w-3xl mx-auto mb-12 text-center transition-all duration-700 delay-100 ${isInView ? 'opacity-100 transform-none' : 'opacity-0 translate-y-4'}`}>
                Access a wide variety of IoT sensor data to power your dApps
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={`bg-loteraa-gray/20 backdrop-blur-md border border-loteraa-gray/30 rounded-xl p-6 transition-all duration-700 delay-200 ${isInView ? 'opacity-100 transform-none' : 'opacity-0 translate-y-4'}`}>
                  <h3 className="text-2xl font-semibold mb-4 gradient-text">Environmental Data</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-loteraa-purple mt-2 flex-shrink-0"></div>
                      <div>
                        <span className="block font-medium text-white/90">Temperature & Humidity</span>
                        <span className="text-sm text-white/70">Precise readings from weather stations, indoor sensors, and industrial equipment</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-loteraa-blue mt-2 flex-shrink-0"></div>
                      <div>
                        <span className="block font-medium text-white/90">Air Quality</span>
                        <span className="text-sm text-white/70">CO2, particulate matter, VOCs, and other air quality metrics</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-loteraa-teal mt-2 flex-shrink-0"></div>
                      <div>
                        <span className="block font-medium text-white/90">Water Quality</span>
                        <span className="text-sm text-white/70">pH levels, turbidity, dissolved oxygen, and contaminant detection</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#ff5e62] mt-2 flex-shrink-0"></div>
                      <div>
                        <span className="block font-medium text-white/90">Soil Conditions</span>
                        <span className="text-sm text-white/70">Moisture levels, nutrient content, and pH for agricultural applications</span>
                      </div>
                    </li>
                  </ul>
                </div>
                
                <div className={`bg-loteraa-gray/20 backdrop-blur-md border border-loteraa-gray/30 rounded-xl p-6 transition-all duration-700 delay-300 ${isInView ? 'opacity-100 transform-none' : 'opacity-0 translate-y-4'}`}>
                  <h3 className="text-2xl font-semibold mb-4 gradient-text">Industrial & Infrastructure</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-loteraa-purple mt-2 flex-shrink-0"></div>
                      <div>
                        <span className="block font-medium text-white/90">Energy Consumption</span>
                        <span className="text-sm text-white/70">Real-time power usage from smart meters and grid sensors</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-loteraa-blue mt-2 flex-shrink-0"></div>
                      <div>
                        <span className="block font-medium text-white/90">Machine Status</span>
                        <span className="text-sm text-white/70">Operational data, vibration analysis, and predictive maintenance metrics</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-loteraa-teal mt-2 flex-shrink-0"></div>
                      <div>
                        <span className="block font-medium text-white/90">Supply Chain</span>
                        <span className="text-sm text-white/70">Location tracking, temperature logging, and condition monitoring for goods</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#ff5e62] mt-2 flex-shrink-0"></div>
                      <div>
                        <span className="block font-medium text-white/90">Infrastructure Monitoring</span>
                        <span className="text-sm text-white/70">Bridge stress, building vibration, and structural integrity data</span>
                      </div>
                    </li>
                  </ul>
                </div>
                
                <div className={`bg-loteraa-gray/20 backdrop-blur-md border border-loteraa-gray/30 rounded-xl p-6 transition-all duration-700 delay-400 ${isInView ? 'opacity-100 transform-none' : 'opacity-0 translate-y-4'}`}>
                  <h3 className="text-2xl font-semibold mb-4 gradient-text">Urban & Mobility</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-loteraa-purple mt-2 flex-shrink-0"></div>
                      <div>
                        <span className="block font-medium text-white/90">Traffic Patterns</span>
                        <span className="text-sm text-white/70">Vehicle counts, speeds, and congestion metrics from urban sensors</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-loteraa-blue mt-2 flex-shrink-0"></div>
                      <div>
                        <span className="block font-medium text-white/90">Parking Availability</span>
                        <span className="text-sm text-white/70">Real-time parking space occupancy in cities and facilities</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-loteraa-teal mt-2 flex-shrink-0"></div>
                      <div>
                        <span className="block font-medium text-white/90">Public Transport</span>
                        <span className="text-sm text-white/70">Bus and train locations, passenger counts, and schedule adherence</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#ff5e62] mt-2 flex-shrink-0"></div>
                      <div>
                        <span className="block font-medium text-white/90">Noise & Light Levels</span>
                        <span className="text-sm text-white/70">Urban environmental quality metrics for smart city applications</span>
                      </div>
                    </li>
                  </ul>
                </div>
                
                <div className={`bg-loteraa-gray/20 backdrop-blur-md border border-loteraa-gray/30 rounded-xl p-6 transition-all duration-700 delay-500 ${isInView ? 'opacity-100 transform-none' : 'opacity-0 translate-y-4'}`}>
                  <h3 className="text-2xl font-semibold mb-4 gradient-text">Specialized Data</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-loteraa-purple mt-2 flex-shrink-0"></div>
                      <div>
                        <span className="block font-medium text-white/90">Weather Prediction</span>
                        <span className="text-sm text-white/70">Advanced meteorological data for weather-dependent applications</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-loteraa-blue mt-2 flex-shrink-0"></div>
                      <div>
                        <span className="block font-medium text-white/90">Health & Wellness</span>
                        <span className="text-sm text-white/70">Anonymized aggregate data from wearable devices and health monitors</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-loteraa-teal mt-2 flex-shrink-0"></div>
                      <div>
                        <span className="block font-medium text-white/90">Agricultural Yield</span>
                        <span className="text-sm text-white/70">Crop growth metrics, irrigation data, and harvest predictions</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#ff5e62] mt-2 flex-shrink-0"></div>
                      <div>
                        <span className="block font-medium text-white/90">Custom Data Feeds</span>
                        <span className="text-sm text-white/70">Tailored data streams for specific industry or application needs</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
          
          {/* How It Works */}
          <section className="mb-24">
            <div className="max-w-5xl mx-auto">
              <h2 className={`text-3xl md:text-4xl font-bold mb-12 text-center transition-all duration-700 ${isInView ? 'opacity-100 transform-none' : 'opacity-0 translate-y-4'}`}>
                <span className="gradient-text">How Loteraa Data Feed Works</span>
              </h2>
              
              <div className="space-y-12">
                <div className={`flex flex-col md:flex-row items-start gap-8 transition-all duration-700 delay-100 ${isInView ? 'opacity-100 transform-none' : 'opacity-0 translate-y-4'}`}>
                  <div className="w-16 h-16 rounded-full bg-loteraa-purple/20 backdrop-blur-sm border border-loteraa-purple/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-bold gradient-text">1</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2 text-white/90">Data Collection</h3>
                    <p className="text-white/70 mb-4">
                      IoT devices equipped with Loteraa's secure hardware modules collect data from their environment. 
                      Each reading is timestamped and cryptographically signed at the source to ensure authenticity.
                    </p>
                    <div className="bg-loteraa-gray/20 backdrop-blur-sm rounded-lg p-4 border border-loteraa-gray/30">
                      <div className="flex items-center gap-2">
                        <Cpu className="h-5 w-5 text-loteraa-purple" />
                        <span className="text-sm text-white/80">Device ID: LT-S4582</span>
                      </div>
                      <div className="mt-2 font-mono text-xs text-white/60 bg-loteraa-black/50 p-2 rounded">
                        {`{
  "sensor_id": "LT-S4582",
  "type": "temperature",
  "value": 23.4,
  "unit": "celsius",
  "timestamp": "2025-05-23T09:41:32Z",
  "location": { "lat": 37.7749, "lng": -122.4194 },
  "signature": "0xae72b...fa91"
}`}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className={`flex flex-col md:flex-row items-start gap-8 transition-all duration-700 delay-200 ${isInView ? 'opacity-100 transform-none' : 'opacity-0 translate-y-4'}`}>
                  <div className="w-16 h-16 rounded-full bg-loteraa-blue/20 backdrop-blur-sm border border-loteraa-blue/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-bold gradient-text">2</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2 text-white/90">Secure Transmission</h3>
                    <p className="text-white/70 mb-4">
                      Data is transmitted through Loteraa's decentralized network using end-to-end encryption. 
                      Our proprietary protocol ensures minimal latency while maintaining security.
                    </p>
                    <div className="relative h-20 bg-loteraa-gray/20 backdrop-blur-sm rounded-lg p-4 border border-loteraa-gray/30 overflow-hidden">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-4 h-4 rounded-full bg-loteraa-purple absolute left-4"></div>
                        <div className="h-0.5 bg-gradient-to-r from-loteraa-purple to-loteraa-blue absolute left-8 right-8 animate-pulse"></div>
                        <div className="w-4 h-4 rounded-full bg-loteraa-blue absolute right-4"></div>
                        
                        {/* Data packets animation */}
                        <div className="w-2 h-2 rounded-full bg-white absolute left-8" style={{ animation: 'moveRight 2s linear infinite' }}></div>
                        <div className="w-2 h-2 rounded-full bg-white absolute left-8" style={{ animation: 'moveRight 2s linear infinite 0.7s' }}></div>
                        <div className="w-2 h-2 rounded-full bg-white absolute left-8" style={{ animation: 'moveRight 2s linear infinite 1.4s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className={`flex flex-col md:flex-row items-start gap-8 transition-all duration-700 delay-300 ${isInView ? 'opacity-100 transform-none' : 'opacity-0 translate-y-4'}`}>
                  <div className="w-16 h-16 rounded-full bg-loteraa-teal/20 backdrop-blur-sm border border-loteraa-teal/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-bold gradient-text">3</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2 text-white/90">Blockchain Integration</h3>
                    <p className="text-white/70 mb-4">
                      Data is verified by Loteraa's validator network and permanently stored on the blockchain. 
                      Smart contracts can be triggered automatically based on incoming data, enabling trustless automation.
                    </p>
                    <div className="bg-loteraa-gray/20 backdrop-blur-sm rounded-lg p-4 border border-loteraa-gray/30">
                      <div className="flex items-center gap-2 mb-2">
                        <Database className="h-5 w-5 text-loteraa-teal" />
                        <span className="text-sm text-white/80">Blockchain Storage</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="bg-loteraa-black/50 p-2 rounded">
                          <div className="text-[10px] text-white/60 mb-1">Block #4582931</div>
                          <div className="w-full h-1 bg-loteraa-purple/50 rounded"></div>
                        </div>
                        <div className="bg-loteraa-black/50 p-2 rounded">
                          <div className="text-[10px] text-white/60 mb-1">Block #4582932</div>
                          <div className="w-full h-1 bg-loteraa-blue/50 rounded"></div>
                        </div>
                        <div className="bg-loteraa-black/50 p-2 rounded">
                          <div className="text-[10px] text-white/60 mb-1">Block #4582933</div>
                          <div className="w-full h-1 bg-loteraa-teal/50 rounded"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className={`flex flex-col md:flex-row items-start gap-8 transition-all duration-700 delay-400 ${isInView ? 'opacity-100 transform-none' : 'opacity-0 translate-y-4'}`}>
                  <div className="w-16 h-16 rounded-full bg-[#ff5e62]/20 backdrop-blur-sm border border-[#ff5e62]/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-bold gradient-text">4</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2 text-white/90">Developer Access</h3>
                    <p className="text-white/70 mb-4">
                      Developers can access verified data streams through Loteraa's API or directly from the blockchain. 
                      Build dApps that interact with real-world data while maintaining decentralized principles.
                    </p>
                    <div className="bg-loteraa-gray/20 backdrop-blur-sm rounded-lg p-4 border border-loteraa-gray/30">
                      <div className="font-mono text-xs text-white/70 bg-loteraa-black/50 p-2 rounded">
                        {`// Access real-time temperature data
const dataFeed = await loteraa.connect(apiKey);
const tempStream = dataFeed.subscribe({
  type: "temperature",
  region: "north-america",
  minConfidence: 0.95
});

tempStream.on("data", (reading) => {
  console.log(\`New reading: \${reading.value}\${reading.unit}\`);
  
  // Trigger smart contract if temperature exceeds threshold
  if (reading.value > 30) {
    myContract.methods.triggerCooling(reading.location);
  }
});`}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Call to Action */}
          <section className="mb-16">
            <div className="max-w-4xl mx-auto">
              <div className={`bg-gradient-to-r from-loteraa-purple/30 via-loteraa-blue/30 to-loteraa-teal/30 backdrop-blur-md rounded-xl p-8 border border-loteraa-purple/20 text-center transition-all duration-700 ${isInView ? 'opacity-100 transform-none' : 'opacity-0 translate-y-4'}`}>
                <h2 className="text-3xl font-bold mb-4">
                  <span className="gradient-text">Ready to Build with Real-world Data?</span>
                </h2>
                <p className="text-white/80 text-lg mb-8">
                  Get started with Loteraa's secure, low-latency IoT data feeds and build the next generation of blockchain applications.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg" 
                    className="bg-loteraa-purple hover:bg-loteraa-purple/90 text-white px-8"
                  >
                    Apply for Developer Access <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button asChild variant="outline" size="lg" className="bg-transparent border-loteraa-purple/50 text-white hover:bg-loteraa-purple/20">
                    <Link to="/contact">Contact Sales</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
