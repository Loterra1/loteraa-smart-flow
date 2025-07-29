import { useEffect, useRef } from 'react';
import p5 from 'p5';

export default function DataFeedHeroAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const p5Instance = useRef<p5 | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const sketch = (p: p5) => {
      let dataNodes: any[] = [];
      let connections: any[] = [];
      let time = 0;

      p.setup = () => {
        const canvas = p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
        canvas.parent(containerRef.current!);
        canvas.style('position', 'fixed');
        canvas.style('top', '0');
        canvas.style('left', '0');
        canvas.style('z-index', '-1');
        
        // Create data nodes
        for (let i = 0; i < 60; i++) {
          dataNodes.push({
            x: p.random(-p.width/2, p.width/2),
            y: p.random(-p.height/2, p.height/2),
            z: p.random(-300, 300),
            vx: p.random(-0.3, 0.3),
            vy: p.random(-0.3, 0.3),
            vz: p.random(-0.3, 0.3),
            size: p.random(2, 6),
            dataType: p.random(['sensor', 'blockchain', 'stream', 'node']),
            pulse: p.random(0, p.TWO_PI),
            intensity: p.random(0.5, 1)
          });
        }
        
        // Create connections
        for (let i = 0; i < dataNodes.length; i++) {
          for (let j = i + 1; j < dataNodes.length; j++) {
            const dist = p.dist(dataNodes[i].x, dataNodes[i].y, dataNodes[i].z, dataNodes[j].x, dataNodes[j].y, dataNodes[j].z);
            if (dist < 120 && p.random() > 0.8) {
              connections.push({
                from: i,
                to: j,
                strength: p.map(dist, 0, 120, 1, 0.2),
                dataFlow: 0
              });
            }
          }
        }
      };

      p.draw = () => {
        p.background(0, 0, 0, 20);
        time += 0.01;
        
        // Lighting
        p.ambientLight(40, 40, 60);
        p.directionalLight(120, 120, 160, -1, 0.5, -1);
        
        // Camera movement
        const camX = p.sin(time * 0.1) * 150;
        const camY = p.cos(time * 0.07) * 80;
        p.camera(camX, camY, 400, 0, 0, 0, 0, 1, 0);
        
        // Update and draw data nodes
        dataNodes.forEach((node, i) => {
          // Update position
          node.x += node.vx;
          node.y += node.vy;
          node.z += node.vz;
          
          // Boundary wrapping
          if (node.x > p.width/2) node.x = -p.width/2;
          if (node.x < -p.width/2) node.x = p.width/2;
          if (node.y > p.height/2) node.y = -p.height/2;
          if (node.y < -p.height/2) node.y = p.height/2;
          if (node.z > 300) node.z = -300;
          if (node.z < -300) node.z = 300;
          
          // Update pulse
          node.pulse += 0.05;
          
          // Draw node
          p.push();
          p.translate(node.x, node.y, node.z);
          
          // Color based on data type
          const colors = {
            sensor: [12, 204, 188],
            blockchain: [113, 66, 246],
            stream: [49, 130, 244],
            node: [255, 255, 255]
          };
          
          const color = colors[node.dataType as keyof typeof colors] || [255, 255, 255];
          const pulseFactor = 1 + p.sin(node.pulse) * 0.3;
          
          p.fill(color[0], color[1], color[2], 120 + p.sin(node.pulse) * 60);
          p.noStroke();
          p.sphere(node.size * pulseFactor);
          
          // Draw data visualization around node
          if (node.dataType === 'sensor') {
            p.stroke(color[0], color[1], color[2], 80);
            p.strokeWeight(1);
            p.noFill();
            
            p.rotateY(time + i);
            p.rotateX(time * 0.7);
            
            // Draw data rings
            for (let ring = 0; ring < 3; ring++) {
              const radius = 15 + ring * 8 + p.sin(time * 2 + ring) * 3;
              p.beginShape();
              for (let angle = 0; angle < p.TWO_PI; angle += p.PI/8) {
                const x = radius * p.cos(angle);
                const y = radius * p.sin(angle);
                p.vertex(x, y, 0);
              }
              p.endShape(p.CLOSE);
            }
          }
          
          p.pop();
        });
        
        // Draw connections with data flow
        connections.forEach(conn => {
          const nodeA = dataNodes[conn.from];
          const nodeB = dataNodes[conn.to];
          
          const dist = p.dist(nodeA.x, nodeA.y, nodeA.z, nodeB.x, nodeB.y, nodeB.z);
          
          if (dist < 150) {
            // Update data flow
            conn.dataFlow += 0.02;
            if (conn.dataFlow > 1) conn.dataFlow = 0;
            
            // Draw connection line
            const alpha = p.map(dist, 0, 150, 100, 20) * conn.strength;
            p.stroke(255, 255, 255, alpha);
            p.strokeWeight(0.5);
            p.line(nodeA.x, nodeA.y, nodeA.z, nodeB.x, nodeB.y, nodeB.z);
            
            // Draw data flow particle
            const flowX = p.lerp(nodeA.x, nodeB.x, conn.dataFlow);
            const flowY = p.lerp(nodeA.y, nodeB.y, conn.dataFlow);
            const flowZ = p.lerp(nodeA.z, nodeB.z, conn.dataFlow);
            
            p.push();
            p.translate(flowX, flowY, flowZ);
            p.fill(12, 204, 188, 200);
            p.noStroke();
            p.sphere(2);
            p.pop();
          }
        });
        
        // Draw central data hub
        p.push();
        p.translate(0, 0, 0);
        p.rotateY(time);
        p.rotateX(time * 0.5);
        
        p.stroke(255, 255, 255, 60);
        p.strokeWeight(1);
        p.noFill();
        
        // Draw hub structure
        for (let i = 0; i < 6; i++) {
          p.push();
          p.rotateY(i * p.PI/3);
          p.beginShape();
          for (let j = 0; j < 8; j++) {
            const angle = j * p.PI/4;
            const radius = 40 + p.sin(time * 3 + j) * 10;
            const x = radius * p.cos(angle);
            const y = radius * p.sin(angle);
            p.vertex(x, y, 0);
          }
          p.endShape(p.CLOSE);
          p.pop();
        }
        
        p.pop();
        
        // Draw data streams
        for (let i = 0; i < 8; i++) {
          const streamX = p.sin(time + i * 0.8) * 400;
          const streamY = p.cos(time * 0.6 + i * 0.8) * 300;
          const streamZ = p.sin(time * 0.4 + i) * 200;
          
          p.push();
          p.translate(streamX, streamY, streamZ);
          p.fill(49, 130, 244, 100);
          p.noStroke();
          p.sphere(3);
          p.pop();
          
          // Connect to center
          p.stroke(49, 130, 244, 40);
          p.strokeWeight(0.5);
          p.line(streamX, streamY, streamZ, 0, 0, 0);
        }
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

  return <div ref={containerRef} className="fixed inset-0 -z-10" />;
}