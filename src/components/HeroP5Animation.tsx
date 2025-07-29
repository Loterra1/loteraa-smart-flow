import { useEffect, useRef } from 'react';
import p5 from 'p5';

interface Building {
  x: number;
  y: number;
  width: number;
  height: number;
  activity: number;
  connections: number[];
  pulseIntensity: number;
  data: number;
}

interface TrafficDot {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  speed: number;
  size: number;
  color: p5.Color;
  pathIndex: number;
}

interface Road {
  from: number;
  to: number;
  points: Array<{ x: number; y: number }>;
}

export default function HeroP5Animation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const p5Instance = useRef<p5 | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const sketch = (p: p5) => {
      let buildings: Building[] = [];
      let roads: Road[] = [];
      let trafficDots: TrafficDot[] = [];
      let zoom = 1;
      let panX = 0;
      let panY = 0;
      let isDragging = false;
      let lastMouseX = 0;
      let lastMouseY = 0;
      const numBuildings = 12;
      const numTrafficDots = 25;

      p.setup = () => {
        const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        canvas.parent(containerRef.current!);
        
        // Initialize buildings (smart city nodes)
        for (let i = 0; i < numBuildings; i++) {
          buildings.push({
            x: p.random(100, p.width - 100),
            y: p.random(100, p.height - 100),
            width: p.random(40, 80),
            height: p.random(60, 150),
            activity: p.random(0.5, 1),
            connections: [],
            pulseIntensity: p.random(0.8, 1.2),
            data: p.random(10, 100)
          });
        }

        // Create connections between buildings (roads)
        for (let i = 0; i < buildings.length; i++) {
          for (let j = i + 1; j < buildings.length; j++) {
            const distance = p.dist(buildings[i].x, buildings[i].y, buildings[j].x, buildings[j].y);
            if (distance < 200 && p.random() > 0.6) {
              buildings[i].connections.push(j);
              roads.push({
                from: i,
                to: j,
                points: generateRoadPoints(buildings[i], buildings[j])
              });
            }
          }
        }

        // Initialize traffic dots
        for (let i = 0; i < numTrafficDots; i++) {
          if (roads.length > 0) {
            const roadIndex = Math.floor(p.random(roads.length));
            const road = roads[roadIndex];
            const startPoint = road.points[0];
            
            trafficDots.push({
              x: startPoint.x,
              y: startPoint.y,
              targetX: startPoint.x,
              targetY: startPoint.y,
              speed: p.random(0.5, 2),
              size: p.random(3, 6),
              color: p.color(255, 255, 255, 200),
              pathIndex: 0
            });
          }
        }
      };

      function generateRoadPoints(building1: Building, building2: Building) {
        const points = [];
        const steps = 10;
        
        for (let i = 0; i <= steps; i++) {
          const t = i / steps;
          const x = p.lerp(building1.x, building2.x, t) + p.random(-20, 20);
          const y = p.lerp(building1.y, building2.y, t) + p.random(-20, 20);
          points.push({ x, y });
        }
        
        return points;
      }

      p.draw = () => {
        p.background(0, 0, 0, 80);
        
        // Apply zoom and pan transformations
        p.push();
        p.translate(panX, panY);
        p.scale(zoom);

        // Update building data activity
        buildings.forEach(building => {
          building.activity = p.lerp(building.activity, p.random(0.3, 1), 0.02);
          building.data += p.random(-2, 3);
          building.data = p.constrain(building.data, 0, 100);
        });

        // Draw roads (edges)
        roads.forEach(road => {
          const building1 = buildings[road.from];
          const building2 = buildings[road.to];
          
          p.stroke(255, 255, 255, 60);
          p.strokeWeight(2);
          p.noFill();
          
          p.beginShape();
          road.points.forEach(point => {
            p.vertex(point.x, point.y);
          });
          p.endShape();
          
          // Draw road glow
          p.stroke(255, 255, 255, 20);
          p.strokeWeight(6);
          p.beginShape();
          road.points.forEach(point => {
            p.vertex(point.x, point.y);
          });
          p.endShape();
        });

        // Update and draw traffic dots
        trafficDots.forEach((dot, index) => {
          if (roads.length > 0) {
            const roadIndex = index % roads.length;
            const road = roads[roadIndex];
            
            if (road && road.points.length > 0) {
              // Move along the road path
              dot.pathIndex += dot.speed * 0.02;
              
              if (dot.pathIndex >= road.points.length - 1) {
                dot.pathIndex = 0;
                // Switch to a random road
                const newRoadIndex = Math.floor(p.random(roads.length));
                const newRoad = roads[newRoadIndex];
                if (newRoad && newRoad.points.length > 0) {
                  dot.x = newRoad.points[0].x;
                  dot.y = newRoad.points[0].y;
                }
              } else {
                const currentIndex = Math.floor(dot.pathIndex);
                const nextIndex = Math.min(currentIndex + 1, road.points.length - 1);
                const t = dot.pathIndex - currentIndex;
                
                dot.x = p.lerp(road.points[currentIndex].x, road.points[nextIndex].x, t);
                dot.y = p.lerp(road.points[currentIndex].y, road.points[nextIndex].y, t);
              }
            }
          }
          
          // Draw traffic dot with glow
          p.push();
          p.translate(dot.x, dot.y);
          
          // Glow effect
          for (let i = 0; i < 3; i++) {
            p.fill(255, 255, 255, 40 - i * 10);
            p.noStroke();
            p.ellipse(0, 0, dot.size + i * 4);
          }
          
          // Main dot
          p.fill(255, 255, 255, 200);
          p.noStroke();
          p.ellipse(0, 0, dot.size);
          
          p.pop();
        });

        // Draw buildings (nodes) with data activity pulsing
        buildings.forEach((building, index) => {
          p.push();
          p.translate(building.x, building.y);
          
          // Mouse interaction - highlight on hover
          const mouseDistX = (p.mouseX - panX) / zoom - building.x;
          const mouseDistY = (p.mouseY - panY) / zoom - building.y;
          const isHovered = Math.abs(mouseDistX) < building.width/2 && Math.abs(mouseDistY) < building.height/2;
          
          // Building pulse based on data activity
          const pulse = p.sin(p.frameCount * 0.1 + index) * building.activity * 0.3 + 1;
          
          // Building glow (data activity indicator)
          const glowIntensity = building.activity * 60 + (isHovered ? 40 : 0);
          for (let i = 0; i < 4; i++) {
            p.fill(255, 255, 255, glowIntensity - i * 15);
            p.noStroke();
            p.rect(-building.width/2 - i*3, -building.height, building.width + i*6, building.height);
          }
          
          // Main building structure
          p.fill(255, 255, 255, isHovered ? 180 : 120);
          p.stroke(255, 255, 255, 200);
          p.strokeWeight(1);
          p.rect(-building.width/2, -building.height, building.width, building.height);
          
          // Building windows (data visualization)
          const windowRows = Math.floor(building.height / 15);
          const windowCols = Math.floor(building.width / 12);
          
          for (let row = 0; row < windowRows; row++) {
            for (let col = 0; col < windowCols; col++) {
              if (p.random() > 0.3) {
                const windowActivity = building.activity * p.random(0.5, 1);
                const alpha = windowActivity * 255;
                p.fill(255, 255, 255, alpha);
                p.noStroke();
                
                const winX = -building.width/2 + col * 12 + 3;
                const winY = -building.height + row * 15 + 3;
                p.rect(winX, winY, 6, 8);
              }
            }
          }
          
          // Data activity indicator on top
          const barHeight = (building.data / 100) * 20;
          p.fill(255, 255, 255, 150);
          p.noStroke();
          p.rect(-building.width/4, -building.height - barHeight - 5, building.width/2, barHeight);
          
          // Data pulse ring
          if (building.activity > 0.8) {
            p.noFill();
            p.stroke(255, 255, 255, 100 * building.activity);
            p.strokeWeight(2);
            const ringSize = pulse * 30;
            p.ellipse(0, -building.height/2, ringSize);
          }
          
          p.pop();
        });

        // Draw connection lines between buildings
        buildings.forEach((building, i) => {
          building.connections.forEach(connectionIndex => {
            const connectedBuilding = buildings[connectionIndex];
            if (connectedBuilding) {
              // Animated data flow lines
              p.stroke(255, 255, 255, 40 + Math.sin(p.frameCount * 0.05 + i) * 20);
              p.strokeWeight(1);
              
              // Draw animated dots along connection
              const numDots = 5;
              for (let j = 0; j < numDots; j++) {
                const t = (p.frameCount * 0.01 + j * 0.2) % 1;
                const x = p.lerp(building.x, connectedBuilding.x, t);
                const y = p.lerp(building.y, connectedBuilding.y, t);
                
                p.fill(255, 255, 255, 100);
                p.noStroke();
                p.ellipse(x, y, 3);
              }
            }
          });
        });

        p.pop();
      };

      // Mouse interaction for zoom and pan
      p.mousePressed = () => {
        isDragging = true;
        lastMouseX = p.mouseX;
        lastMouseY = p.mouseY;
      };

      p.mouseDragged = () => {
        if (isDragging) {
          panX += p.mouseX - lastMouseX;
          panY += p.mouseY - lastMouseY;
          lastMouseX = p.mouseX;
          lastMouseY = p.mouseY;
        }
      };

      p.mouseReleased = () => {
        isDragging = false;
      };

      p.mouseWheel = (event: any) => {
        const zoomFactor = event.delta > 0 ? 0.9 : 1.1;
        zoom *= zoomFactor;
        zoom = p.constrain(zoom, 0.5, 3);
        
        // Adjust pan to zoom towards mouse position
        const mouseWorldX = (p.mouseX - panX) / zoom;
        const mouseWorldY = (p.mouseY - panY) / zoom;
        panX = p.mouseX - mouseWorldX * zoom;
        panY = p.mouseY - mouseWorldY * zoom;
        
        return false;
      };

      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
      };
    };

    p5Instance.current = new p5(sketch);

    return () => {
      if (p5Instance.current) {
        p5Instance.current.remove();
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 w-full h-full z-0"
      style={{ background: 'transparent', cursor: 'grab' }}
    />
  );
}