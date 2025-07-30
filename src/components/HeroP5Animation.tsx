import { useEffect, useRef } from 'react';
import p5 from 'p5';
import { useIsMobile } from '@/hooks/use-mobile';

interface GlobePoint {
  x: number;
  y: number;
  z: number;
  lat: number;
  lng: number;
  radius: number;
}

interface DataPoint {
  x: number;
  y: number;
  z: number;
  lat: number;
  lng: number;
  label: string;
  value: number;
  pulse: number;
  type: 'sensor' | 'device' | 'data' | 'network';
  color: { r: number; g: number; b: number; };
}

interface Connection {
  from: DataPoint;
  to: DataPoint;
  progress: number;
  particles: Array<{ progress: number; speed: number; }>;
}

export default function HeroP5Animation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const p5Instance = useRef<p5 | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!containerRef.current) return;

    const sketch = (p: p5) => {
      let globePoints: GlobePoint[] = [];
      let dataPoints: DataPoint[] = [];
      let connections: Connection[] = [];
      let globeRadius = 200;
      let rotationY = 0;
      let transitionOffset = 0;

      p.setup = () => {
        const canvas = p.createCanvas(
          containerRef.current!.offsetWidth, 
          containerRef.current!.offsetHeight, 
          p.WEBGL
        );
        canvas.parent(containerRef.current!);
        canvas.style('position', 'absolute');
        canvas.style('top', '0');
        canvas.style('left', '0');
        canvas.style('width', '100%');
        canvas.style('height', '100%');
        canvas.style('z-index', '2');
        canvas.style('background-color', '#000000');
        canvas.style('background', '#000000');
        
        globeRadius = isMobile ? 150 : 200;
        
        // Generate globe wireframe points
        const detail = isMobile ? 15 : 20;
        globePoints = [];
        for (let lat = -90; lat <= 90; lat += detail) {
          for (let lng = -180; lng <= 180; lng += detail) {
            const phi = (90 - lat) * (p.PI / 180);
            const theta = (lng + 180) * (p.PI / 180);
            
            const x = globeRadius * p.sin(phi) * p.cos(theta);
            const y = globeRadius * p.cos(phi);
            const z = globeRadius * p.sin(phi) * p.sin(theta);
            
            globePoints.push({ x, y, z, lat, lng, radius: globeRadius });
          }
        }
        
        // Create data points with labels
        const locations = [
          { lat: 40.7128, lng: -74.0060, label: "NYC IoT Hub", type: "network" },
          { lat: 51.5074, lng: -0.1278, label: "London Data", type: "data" },
          { lat: 35.6762, lng: 139.6503, label: "Tokyo Sensors", type: "sensor" },
          { lat: -33.8688, lng: 151.2093, label: "Sydney Devices", type: "device" },
          { lat: 37.7749, lng: -122.4194, label: "SF Network", type: "network" },
          { lat: 55.7558, lng: 37.6176, label: "Moscow Data", type: "data" },
          { lat: -23.5505, lng: -46.6333, label: "São Paulo IoT", type: "sensor" },
          { lat: 19.0760, lng: 72.8777, label: "Mumbai Hub", type: "device" }
        ];
        
        dataPoints = locations.map(loc => {
          const phi = (90 - loc.lat) * (p.PI / 180);
          const theta = (loc.lng + 180) * (p.PI / 180);
          
          const x = (globeRadius + 10) * p.sin(phi) * p.cos(theta);
          const y = (globeRadius + 10) * p.cos(phi);
          const z = (globeRadius + 10) * p.sin(phi) * p.sin(theta);
          
          const colors = {
            sensor: { r: 0, g: 255, b: 100 },
            device: { r: 255, g: 100, b: 0 },
            data: { r: 100, g: 150, b: 255 },
            network: { r: 255, g: 0, b: 150 }
          };
          
          return {
            x, y, z, lat: loc.lat, lng: loc.lng,
            label: loc.label,
            value: p.random(50, 100),
            pulse: p.random(p.TWO_PI),
            type: loc.type as 'sensor' | 'device' | 'data' | 'network',
            color: colors[loc.type as keyof typeof colors]
          };
        });
        
        // Create connections between nearby points
        connections = [];
        for (let i = 0; i < dataPoints.length; i++) {
          for (let j = i + 1; j < dataPoints.length; j++) {
            if (p.random() < 0.3) { // 30% chance of connection
              connections.push({
                from: dataPoints[i],
                to: dataPoints[j],
                progress: 0,
                particles: Array.from({ length: 3 }, () => ({
                  progress: p.random(),
                  speed: p.random(0.005, 0.02)
                }))
              });
            }
          }
        }
      };

      p.draw = () => {
        // Ensure solid black background
        p.background(0, 0, 0, 255);
        p.fill(0, 0, 0, 255);
        p.rect(-p.width/2, -p.height/2, p.width, p.height);
        
        // Smooth camera orbit with transition effects
        const cameraDistance = isMobile ? 450 : 600;
        const cameraSpeed = 0.0005;
        const cameraY = -50 + p.sin(transitionOffset * 0.3) * 30;
        
        p.camera(
          p.cos(p.millis() * cameraSpeed) * cameraDistance,
          cameraY,
          p.sin(p.millis() * cameraSpeed) * cameraDistance,
          0, 0, 0,
          0, 1, 0
        );
        
        // Lighting
        p.ambientLight(50, 50, 50);
        p.directionalLight(255, 255, 255, -1, 1, -1);
        
        // Globe rotation with smooth transitions
        rotationY += 0.003;
        transitionOffset += 0.02;
        
        p.push();
        p.rotateY(rotationY);
        
        // Draw globe wireframe with latitude/longitude lines
        p.stroke(255, 255, 255, 60);
        p.strokeWeight(0.5);
        p.noFill();
        
        // Latitude lines
        for (let lat = -90; lat <= 90; lat += 30) {
          p.beginShape();
          for (let lng = -180; lng <= 180; lng += 10) {
            const phi = (90 - lat) * (p.PI / 180);
            const theta = (lng + 180) * (p.PI / 180);
            const x = globeRadius * p.sin(phi) * p.cos(theta);
            const y = globeRadius * p.cos(phi);
            const z = globeRadius * p.sin(phi) * p.sin(theta);
            p.vertex(x, y, z);
          }
          p.endShape();
        }
        
        // Longitude lines
        for (let lng = -180; lng <= 180; lng += 30) {
          p.beginShape();
          for (let lat = -90; lat <= 90; lat += 10) {
            const phi = (90 - lat) * (p.PI / 180);
            const theta = (lng + 180) * (p.PI / 180);
            const x = globeRadius * p.sin(phi) * p.cos(theta);
            const y = globeRadius * p.cos(phi);
            const z = globeRadius * p.sin(phi) * p.sin(theta);
            p.vertex(x, y, z);
          }
          p.endShape();
        }
        
        // Draw data connections with animated particles
        connections.forEach(conn => {
          p.stroke(255, 255, 255, 100);
          p.strokeWeight(1);
          p.line(conn.from.x, conn.from.y, conn.from.z, 
                 conn.to.x, conn.to.y, conn.to.z);
          
          // Animate particles along connections
          conn.particles.forEach(particle => {
            particle.progress += particle.speed;
            if (particle.progress > 1) particle.progress = 0;
            
            const x = p.lerp(conn.from.x, conn.to.x, particle.progress);
            const y = p.lerp(conn.from.y, conn.to.y, particle.progress);
            const z = p.lerp(conn.from.z, conn.to.z, particle.progress);
            
            p.push();
            p.translate(x, y, z);
            p.fill(255, 255, 255, 200);
            p.noStroke();
            p.sphere(2);
            p.pop();
          });
        });
        
        // Draw pulsing data points with labels
        dataPoints.forEach(point => {
          point.pulse += 0.1;
          const pulseSize = 1 + p.sin(point.pulse) * 0.3;
          
          p.push();
          p.translate(point.x, point.y, point.z);
          
          // Glow effect
          p.fill(point.color.r, point.color.g, point.color.b, 100);
          p.noStroke();
          p.sphere(8 * pulseSize);
          
          // Core point
          p.fill(point.color.r, point.color.g, point.color.b, 255);
          p.sphere(4 * pulseSize);
          
          // Data value indicator
          p.stroke(255, 255, 255, 150);
          p.strokeWeight(1);
          p.line(0, 0, 0, 0, -20 - point.value * 0.3, 0);
          
          p.pop();
        });
        
        p.pop();
        
        // Add subtle background particles for depth
        for (let i = 0; i < (isMobile ? 30 : 50); i++) {
          const x = p.random(-p.width, p.width);
          const y = p.random(-p.height, p.height);
          const z = p.random(-500, 500);
          const alpha = p.map(z, -500, 500, 10, 100);
          
          p.push();
          p.translate(x, y, z);
          p.fill(255, 255, 255, alpha);
          p.noStroke();
          p.sphere(1);
          p.pop();
        }
      };

      p.mousePressed = () => {
        // Add new connection between random data points
        if (dataPoints.length > 1) {
          const from = dataPoints[Math.floor(p.random(dataPoints.length))];
          const to = dataPoints[Math.floor(p.random(dataPoints.length))];
          
          if (from !== to && connections.length < 15) {
            connections.push({
              from,
              to,
              progress: 0,
              particles: Array.from({ length: 2 }, () => ({
                progress: p.random(),
                speed: p.random(0.01, 0.03)
              }))
            });
          }
        }
      };

      p.windowResized = () => {
        if (containerRef.current) {
          p.resizeCanvas(containerRef.current.offsetWidth, containerRef.current.offsetHeight);
        }
      };
    };

    p5Instance.current = new p5(sketch);

    return () => {
      if (p5Instance.current) {
        p5Instance.current.remove();
      }
    };
  }, [isMobile]);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 w-full h-full z-2"
      style={{ 
        backgroundColor: '#000000',
        background: '#000000'
      }}
    />
  );
}
