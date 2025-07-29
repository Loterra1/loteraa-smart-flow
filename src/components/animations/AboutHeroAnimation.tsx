import { useEffect, useRef } from 'react';
import p5 from 'p5';

export default function AboutHeroAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const p5Instance = useRef<p5 | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const sketch = (p: p5) => {
      let nodes: any[] = [];
      let connections: any[] = [];
      let time = 0;

      p.setup = () => {
        const canvas = p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
        canvas.parent(containerRef.current!);
        canvas.style('position', 'fixed');
        canvas.style('top', '0');
        canvas.style('left', '0');
        canvas.style('z-index', '-1');
        
        // Create network nodes
        for (let i = 0; i < 80; i++) {
          nodes.push({
            x: p.random(-p.width/2, p.width/2),
            y: p.random(-p.height/2, p.height/2),
            z: p.random(-400, 400),
            vx: p.random(-0.5, 0.5),
            vy: p.random(-0.5, 0.5),
            vz: p.random(-0.5, 0.5),
            size: p.random(2, 6),
            alpha: p.random(0.3, 1)
          });
        }
        
        // Create connections between nearby nodes
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const dist = p.dist(nodes[i].x, nodes[i].y, nodes[i].z, nodes[j].x, nodes[j].y, nodes[j].z);
            if (dist < 150 && p.random() > 0.7) {
              connections.push({
                from: i,
                to: j,
                strength: p.map(dist, 0, 150, 1, 0.1)
              });
            }
          }
        }
      };

      p.draw = () => {
        p.background(0, 0, 0, 15);
        time += 0.01;
        
        // Subtle lighting
        p.ambientLight(60, 60, 80);
        p.directionalLight(150, 150, 200, -1, 0.5, -1);
        
        // Camera movement
        const camX = p.sin(time * 0.1) * 200;
        const camY = p.cos(time * 0.07) * 100;
        p.camera(camX, camY, 300, 0, 0, 0, 0, 1, 0);
        
        // Update and draw nodes
        nodes.forEach((node, i) => {
          // Gentle movement
          node.x += node.vx;
          node.y += node.vy;
          node.z += node.vz;
          
          // Boundary wrapping
          if (node.x > p.width/2) node.x = -p.width/2;
          if (node.x < -p.width/2) node.x = p.width/2;
          if (node.y > p.height/2) node.y = -p.height/2;
          if (node.y < -p.height/2) node.y = p.height/2;
          if (node.z > 400) node.z = -400;
          if (node.z < -400) node.z = 400;
          
          // Draw node
          p.push();
          p.translate(node.x, node.y, node.z);
          p.fill(255, 255, 255, node.alpha * 255 * (0.5 + p.sin(time + i) * 0.5));
          p.noStroke();
          p.sphere(node.size);
          p.pop();
        });
        
        // Draw connections
        p.stroke(255, 255, 255, 30);
        p.strokeWeight(0.5);
        connections.forEach(conn => {
          const nodeA = nodes[conn.from];
          const nodeB = nodes[conn.to];
          
          const dist = p.dist(nodeA.x, nodeA.y, nodeA.z, nodeB.x, nodeB.y, nodeB.z);
          if (dist < 200) {
            const alpha = p.map(dist, 0, 200, 80, 10) * conn.strength;
            p.stroke(255, 255, 255, alpha);
            p.line(nodeA.x, nodeA.y, nodeA.z, nodeB.x, nodeB.y, nodeB.z);
          }
        });
        
        // Central focal points
        for (let i = 0; i < 3; i++) {
          p.push();
          p.translate(
            p.sin(time + i * 2) * 300,
            p.cos(time * 0.7 + i * 2) * 200,
            p.sin(time * 0.5 + i) * 100
          );
          
          p.stroke(255, 255, 255, 40 + p.sin(time * 2 + i) * 20);
          p.strokeWeight(1);
          p.noFill();
          
          // Rotating wireframe sphere
          p.rotateY(time + i);
          p.rotateX(time * 0.7 + i);
          
          const radius = 30 + p.sin(time * 3 + i) * 10;
          
          // Draw wireframe sphere
          for (let lat = 0; lat < p.PI; lat += p.PI/8) {
            p.beginShape();
            for (let lon = 0; lon <= p.TWO_PI; lon += p.PI/8) {
              const x = radius * p.sin(lat) * p.cos(lon);
              const y = radius * p.cos(lat);
              const z = radius * p.sin(lat) * p.sin(lon);
              p.vertex(x, y, z);
            }
            p.endShape(p.CLOSE);
          }
          
          p.pop();
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