import { useEffect, useRef } from "react";
import p5 from 'p5';

export default function GlobeAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const p5Instance = useRef<p5 | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const sketch = (p: p5) => {
      let time = 0;
      let mouseInfluence = 0;
      let globe: Array<{lat: number, lon: number, x: number, y: number, z: number}> = [];
      let countries: Array<{lat: number, lon: number, name: string, pulse: number}> = [];
      let connections: Array<{from: number, to: number, progress: number}> = [];

      p.setup = () => {
        const canvas = p.createCanvas(800, 600, p.WEBGL);
        canvas.parent(containerRef.current!);
        
        // Generate globe points
        for (let lat = -90; lat <= 90; lat += 10) {
          for (let lon = -180; lon <= 180; lon += 15) {
            let phi = p.radians(lat);
            let theta = p.radians(lon);
            let radius = 150;
            
            let x = radius * p.cos(phi) * p.cos(theta);
            let y = radius * p.sin(phi);
            let z = radius * p.cos(phi) * p.sin(theta);
            
            globe.push({lat, lon, x, y, z});
          }
        }
        
        // Major cities/countries coordinates
        const cityData = [
          {lat: 40.7128, lon: -74.0060, name: "New York"},      // North America
          {lat: 51.5074, lon: -0.1278, name: "London"},        // Europe
          {lat: 35.6762, lon: 139.6503, name: "Tokyo"},        // Asia
          {lat: -33.8688, lon: 151.2093, name: "Sydney"},      // Australia
          {lat: -1.2921, lon: 36.8219, name: "Nairobi"},       // Africa
          {lat: -22.9068, lon: -43.1729, name: "Rio"},         // South America
          {lat: 55.7558, lon: 37.6176, name: "Moscow"},        // Russia
          {lat: 28.6139, lon: 77.2090, name: "Delhi"},         // India
          {lat: 1.3521, lon: 103.8198, name: "Singapore"},     // Southeast Asia
        ];
        
        countries = cityData.map(city => ({
          ...city,
          pulse: p.random(0, p.TWO_PI)
        }));
        
        // Create random connections between countries
        for (let i = 0; i < 12; i++) {
          connections.push({
            from: Math.floor(p.random(countries.length)),
            to: Math.floor(p.random(countries.length)),
            progress: p.random(0, 1)
          });
        }
      };

      p.draw = () => {
        p.background(0, 0);
        p.clear();
        
        // Lighting
        p.ambientLight(60);
        p.directionalLight(255, 255, 255, 0.5, 0.5, -1);
        
        time += 0.01;
        mouseInfluence *= 0.95;
        
        // Rotate globe
        p.rotateY(time * 0.3);
        p.rotateX(p.sin(time * 0.2) * 0.1);
        
        // Draw globe wireframe
        p.stroke(100, 150, 255, 100);
        p.strokeWeight(0.5);
        p.noFill();
        
        globe.forEach(point => {
          p.push();
          p.translate(point.x, point.y, point.z);
          p.sphere(1, 4, 4);
          p.pop();
        });
        
        // Draw latitude lines
        for (let lat = -90; lat <= 90; lat += 30) {
          p.beginShape();
          p.noFill();
          p.stroke(100, 150, 255, 80);
          for (let lon = -180; lon <= 180; lon += 5) {
            let phi = p.radians(lat);
            let theta = p.radians(lon);
            let radius = 150;
            
            let x = radius * p.cos(phi) * p.cos(theta);
            let y = radius * p.sin(phi);
            let z = radius * p.cos(phi) * p.sin(theta);
            
            p.vertex(x, y, z);
          }
          p.endShape();
        }
        
        // Draw longitude lines
        for (let lon = -180; lon <= 180; lon += 30) {
          p.beginShape();
          p.noFill();
          p.stroke(100, 150, 255, 80);
          for (let lat = -90; lat <= 90; lat += 5) {
            let phi = p.radians(lat);
            let theta = p.radians(lon);
            let radius = 150;
            
            let x = radius * p.cos(phi) * p.cos(theta);
            let y = radius * p.sin(phi);
            let z = radius * p.cos(phi) * p.sin(theta);
            
            p.vertex(x, y, z);
          }
          p.endShape();
        }
        
        // Draw animated countries
        countries.forEach((country, index) => {
          let phi = p.radians(country.lat);
          let theta = p.radians(country.lon);
          let radius = 150;
          
          let x = radius * p.cos(phi) * p.cos(theta);
          let y = radius * p.sin(phi);
          let z = radius * p.cos(phi) * p.sin(theta);
          
          p.push();
          p.translate(x, y, z);
          
          // Pulsing effect
          country.pulse += 0.05;
          let pulseSize = 3 + p.sin(country.pulse) * 2 + mouseInfluence;
          let pulseAlpha = 150 + p.sin(country.pulse) * 100;
          
          // Country pin
          p.fill(255, 100, 100, pulseAlpha);
          p.noStroke();
          p.sphere(pulseSize, 8, 8);
          
          // Glow effect
          p.fill(255, 150, 150, 50);
          p.sphere(pulseSize * 2, 8, 8);
          
          p.pop();
        });
        
        // Draw connections between countries
        connections.forEach(connection => {
          let fromCountry = countries[connection.from];
          let toCountry = countries[connection.to];
          
          if (!fromCountry || !toCountry) return;
          
          let fromPhi = p.radians(fromCountry.lat);
          let fromTheta = p.radians(fromCountry.lon);
          let toPhi = p.radians(toCountry.lat);
          let toTheta = p.radians(toCountry.lon);
          let radius = 150;
          
          let fromX = radius * p.cos(fromPhi) * p.cos(fromTheta);
          let fromY = radius * p.sin(fromPhi);
          let fromZ = radius * p.cos(fromPhi) * p.sin(fromTheta);
          
          let toX = radius * p.cos(toPhi) * p.cos(toTheta);
          let toY = radius * p.sin(toPhi);
          let toZ = radius * p.cos(toPhi) * p.sin(toTheta);
          
          // Animate connection progress
          connection.progress += 0.005;
          if (connection.progress > 1.2) connection.progress = 0;
          
          // Draw connection line with animation
          p.beginShape();
          p.noFill();
          p.stroke(100, 255, 200, 150);
          p.strokeWeight(1);
          
          for (let t = 0; t <= connection.progress && t <= 1; t += 0.05) {
            // Create curved path between points
            let x = p.lerp(fromX, toX, t);
            let y = p.lerp(fromY, toY, t);
            let z = p.lerp(fromZ, toZ, t);
            
            // Add curve by extending outward
            let curve = p.sin(t * p.PI) * 30;
            let midX = (fromX + toX) / 2;
            let midY = (fromY + toY) / 2;
            let midZ = (fromZ + toZ) / 2;
            let length = p.sqrt(midX * midX + midY * midY + midZ * midZ);
            
            x += (midX / length) * curve;
            y += (midY / length) * curve;
            z += (midZ / length) * curve;
            
            p.vertex(x, y, z);
          }
          p.endShape();
          
          // Draw moving pulse along connection
          if (connection.progress <= 1) {
            let pulseX = p.lerp(fromX, toX, connection.progress);
            let pulseY = p.lerp(fromY, toY, connection.progress);
            let pulseZ = p.lerp(fromZ, toZ, connection.progress);
            
            let curve = p.sin(connection.progress * p.PI) * 30;
            let midX = (fromX + toX) / 2;
            let midY = (fromY + toY) / 2;
            let midZ = (fromZ + toZ) / 2;
            let length = p.sqrt(midX * midX + midY * midY + midZ * midZ);
            
            pulseX += (midX / length) * curve;
            pulseY += (midY / length) * curve;
            pulseZ += (midZ / length) * curve;
            
            p.push();
            p.translate(pulseX, pulseY, pulseZ);
            p.fill(255, 255, 100, 200);
            p.noStroke();
            p.sphere(2, 6, 6);
            p.pop();
          }
        });
        
        // Add floating data particles
        for (let i = 0; i < 50; i++) {
          let angle = time + i * 0.2;
          let radius = 180 + p.sin(time + i) * 20;
          
          let x = p.cos(angle) * radius;
          let y = p.sin(angle + time) * 10;
          let z = p.sin(angle) * radius;
          
          p.push();
          p.translate(x, y, z);
          p.fill(255, 255, 255, 100);
          p.noStroke();
          p.sphere(1, 4, 4);
          p.pop();
        }
      };

      p.mouseMoved = () => {
        if (p.mouseX > 0 && p.mouseX < p.width && p.mouseY > 0 && p.mouseY < p.height) {
          let centerX = p.width / 2;
          let centerY = p.height / 2;
          let distance = p.dist(p.mouseX, p.mouseY, centerX, centerY);
          mouseInfluence = p.map(distance, 0, p.width/2, 3, 0);
        }
      };

      p.mousePressed = () => {
        if (p.mouseX > 0 && p.mouseX < p.width && p.mouseY > 0 && p.mouseY < p.height) {
          mouseInfluence = 5;
          // Add new random connection
          connections.push({
            from: Math.floor(p.random(countries.length)),
            to: Math.floor(p.random(countries.length)),
            progress: 0
          });
          
          // Remove old connections if too many
          if (connections.length > 20) {
            connections.splice(0, 5);
          }
        }
      };

      p.windowResized = () => {
        p.resizeCanvas(800, 600);
      };
    };

    p5Instance.current = new p5(sketch);

    return () => {
      if (p5Instance.current) {
        p5Instance.current.remove();
      }
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full" />;
}