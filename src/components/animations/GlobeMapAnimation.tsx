import { useEffect, useRef } from 'react';
import p5 from 'p5';

export default function GlobeMapAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const p5Instance = useRef<p5 | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const sketch = (p: p5) => {
      let globe: any;
      let countries: any[] = [];
      let time = 0;

      p.setup = () => {
        const canvas = p.createCanvas(containerRef.current!.offsetWidth, containerRef.current!.offsetHeight, p.WEBGL);
        canvas.parent(containerRef.current!);
        
        // Initialize globe
        globe = {
          radius: 120,
          rotationY: 0,
          rotationX: 0
        };
        
        // Create countries/data points
        for (let i = 0; i < 25; i++) {
          const phi = p.random(0, p.PI);
          const theta = p.random(0, p.TWO_PI);
          
          countries.push({
            phi: phi,
            theta: theta,
            x: globe.radius * p.sin(phi) * p.cos(theta),
            y: globe.radius * p.cos(phi),
            z: globe.radius * p.sin(phi) * p.sin(theta),
            pulse: p.random(0, p.TWO_PI),
            size: p.random(3, 8),
            intensity: p.random(0.5, 1),
            dataType: p.random(['temp', 'humidity', 'pressure', 'motion', 'light'])
          });
        }
      };

      p.draw = () => {
        p.background(0, 0, 0, 0);
        time += 0.01;
        
        // Lighting
        p.ambientLight(30, 30, 40);
        p.directionalLight(100, 100, 120, -1, 0.5, -1);
        
        // Auto-rotate globe
        globe.rotationY += 0.005;
        
        // Mouse interaction
        if (p.mouseX > 0 && p.mouseX < p.width && p.mouseY > 0 && p.mouseY < p.height) {
          globe.rotationX = p.map(p.mouseY, 0, p.height, -0.5, 0.5);
          globe.rotationY += p.map(p.mouseX, 0, p.width, -0.01, 0.01);
        }
        
        p.push();
        p.rotateY(globe.rotationY);
        p.rotateX(globe.rotationX);
        
        // Draw wireframe globe
        p.stroke(255, 255, 255, 60);
        p.strokeWeight(0.5);
        p.noFill();
        
        // Latitude lines
        for (let lat = -p.PI/2; lat <= p.PI/2; lat += p.PI/8) {
          p.beginShape();
          for (let lon = 0; lon <= p.TWO_PI; lon += p.PI/16) {
            const x = globe.radius * p.cos(lat) * p.cos(lon);
            const y = globe.radius * p.sin(lat);
            const z = globe.radius * p.cos(lat) * p.sin(lon);
            p.vertex(x, y, z);
          }
          p.endShape(p.CLOSE);
        }
        
        // Longitude lines
        for (let lon = 0; lon < p.TWO_PI; lon += p.PI/8) {
          p.beginShape();
          for (let lat = -p.PI/2; lat <= p.PI/2; lat += p.PI/16) {
            const x = globe.radius * p.cos(lat) * p.cos(lon);
            const y = globe.radius * p.sin(lat);
            const z = globe.radius * p.cos(lat) * p.sin(lon);
            p.vertex(x, y, z);
          }
          p.endShape();
        }
        
        // Draw countries/data points
        countries.forEach((country, index) => {
          country.pulse += 0.05;
          
          // Update position based on rotation
          const rotatedX = country.x * p.cos(globe.rotationY) - country.z * p.sin(globe.rotationY);
          const rotatedZ = country.x * p.sin(globe.rotationY) + country.z * p.cos(globe.rotationY);
          
          // Only draw if on visible side
          if (rotatedZ > -globe.radius * 0.2) {
            p.push();
            p.translate(rotatedX, country.y, rotatedZ);
            
            // Pulse effect
            const pulseFactor = 1 + p.sin(country.pulse) * 0.3;
            const currentSize = country.size * pulseFactor;
            
            // Color based on data type
            const colors = {
              temp: [255, 94, 98],
              humidity: [49, 130, 244],
              pressure: [113, 66, 246],
              motion: [12, 204, 188],
              light: [255, 235, 59]
            };
            
            const color = colors[country.dataType as keyof typeof colors] || [255, 255, 255];
            
            // Draw pin
            p.stroke(color[0], color[1], color[2], 200);
            p.strokeWeight(2);
            p.line(0, 0, 0, 0, -15, 0);
            
            // Draw country dot
            p.fill(color[0], color[1], color[2], 150 + p.sin(country.pulse) * 50);
            p.noStroke();
            p.sphere(currentSize);
            
            // Draw data visualization above pin
            p.stroke(color[0], color[1], color[2], 100);
            p.strokeWeight(1);
            p.noFill();
            
            p.push();
            p.translate(0, -25, 0);
            p.rotateY(time + index);
            
            // Draw small data visualization
            p.beginShape();
            for (let i = 0; i < 8; i++) {
              const angle = (i / 8) * p.TWO_PI;
              const r = 8 + p.sin(time * 3 + index + i) * 3;
              p.vertex(r * p.cos(angle), 0, r * p.sin(angle));
            }
            p.endShape(p.CLOSE);
            
            p.pop();
            p.pop();
          }
        });
        
        p.pop();
        
        // Draw connecting data streams
        p.stroke(255, 255, 255, 30);
        p.strokeWeight(0.5);
        
        for (let i = 0; i < countries.length - 1; i++) {
          for (let j = i + 1; j < countries.length; j++) {
            if (p.random() > 0.98) {
              const country1 = countries[i];
              const country2 = countries[j];
              
              const x1 = country1.x * p.cos(globe.rotationY) - country1.z * p.sin(globe.rotationY);
              const z1 = country1.x * p.sin(globe.rotationY) + country1.z * p.cos(globe.rotationY);
              
              const x2 = country2.x * p.cos(globe.rotationY) - country2.z * p.sin(globe.rotationY);
              const z2 = country2.x * p.sin(globe.rotationY) + country2.z * p.cos(globe.rotationY);
              
              if (z1 > -globe.radius * 0.2 && z2 > -globe.radius * 0.2) {
                p.line(x1, country1.y, z1, x2, country2.y, z2);
              }
            }
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
  }, []);

  return <div ref={containerRef} className="w-full h-full" />;
}