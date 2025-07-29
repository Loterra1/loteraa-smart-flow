import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import p5 from 'p5';

interface FeatureCard {
  title: string;
  description: string;
}

export default function FeatureCards() {
  const [visibleCards, setVisibleCards] = useState<boolean[]>([false, false, false]);
  const sectionRef = useRef<HTMLElement>(null);
  const p5Instances = useRef<(p5 | null)[]>([null, null, null]);
  const containerRefs = useRef<(HTMLDivElement | null)[]>([null, null, null]);

  const features: FeatureCard[] = [
    {
      title: "Real-Time Data Feed",
      description: "Loteraa enables continuous, secure, and low-latency streaming of sensor and real world datas from physical environments such as GPS, or usage metrics directly to its blockchain network. This real-time pipeline ensures high-frequency data flows are verifiable, timestamped, and immutable, enabling on-chain actions to reflect dynamic, real-world conditions with unprecedented precision and speed."
    },
    {
      title: "Web3 Connected Contracts",
      description: "Loteraa smart contracts respond autonomously to live sensor inputs—enabling logic-based automation across DeFi, logistics, energy, and AI sectors. Data triggers from IoT devices execute cross-chain operations such as payments, alerts, insurance payouts, or asset transfers, establishing an intelligent link between off-chain activities and on-chain decision-making without intermediaries."
    },
    {
      title: "Tokenized Rewards",
      description: "Every participant whether data provider, validator, or consumer is incentivized through $LOT token rewards. Verified data uploads, accurate validations, and meaningful interactions trigger automated, on-chain compensation."
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate cards in sequence
            setTimeout(() => setVisibleCards(prev => [true, ...prev.slice(1)]), 300);
            setTimeout(() => setVisibleCards(prev => [prev[0], true, ...prev.slice(2)]), 600);
            setTimeout(() => setVisibleCards(prev => [...prev.slice(0, 2), true]), 900);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Initialize P5.js animations for each card
    features.forEach((_, index) => {
      if (containerRefs.current[index] && !p5Instances.current[index]) {
        const sketch = (p: p5) => {
          let particles: Array<{
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;
            alpha: number;
          }> = [];
          let isHovered = false;

          p.setup = () => {
            const canvas = p.createCanvas(400, 300);
            canvas.parent(containerRefs.current[index]!);
            canvas.style('position', 'absolute');
            canvas.style('top', '0');
            canvas.style('left', '0');
            canvas.style('pointer-events', 'none');
            canvas.style('z-index', '1');

            // Initialize particles
            for (let i = 0; i < 20; i++) {
              particles.push({
                x: p.random(p.width),
                y: p.random(p.height),
                vx: p.random(-1, 1),
                vy: p.random(-1, 1),
                size: p.random(2, 6),
                alpha: p.random(50, 150)
              });
            }
          };

          p.draw = () => {
            p.clear();
            
            // Update and draw particles
            particles.forEach(particle => {
              particle.x += particle.vx;
              particle.y += particle.vy;

              // Bounce off edges
              if (particle.x <= 0 || particle.x >= p.width) particle.vx *= -1;
              if (particle.y <= 0 || particle.y >= p.height) particle.vy *= -1;

              // Draw particle
              p.fill(147, 51, 234, isHovered ? particle.alpha * 1.5 : particle.alpha * 0.3);
              p.noStroke();
              p.circle(particle.x, particle.y, particle.size);
            });

            // Draw connecting lines on hover
            if (isHovered) {
              p.stroke(147, 51, 234, 30);
              p.strokeWeight(1);
              for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                  let dist = p.dist(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
                  if (dist < 100) {
                    p.line(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
                  }
                }
              }
            }
          };

          // Add hover detection
          const cardElement = containerRefs.current[index];
          if (cardElement) {
            cardElement.addEventListener('mouseenter', () => {
              isHovered = true;
            });
            cardElement.addEventListener('mouseleave', () => {
              isHovered = false;
            });
          }

          p.windowResized = () => {
            p.resizeCanvas(400, 300);
          };
        };

        p5Instances.current[index] = new p5(sketch);
      }
    });

    return () => {
      // Cleanup P5.js instances
      p5Instances.current.forEach(instance => {
        if (instance) {
          instance.remove();
        }
      });
      p5Instances.current = [null, null, null];
    };
  }, [features]);

  return (
    <section ref={sectionRef} className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={el => containerRefs.current[index] = el}
              className={`relative transition-all duration-1000 ${
                visibleCards[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <Card className="h-full bg-white/10 backdrop-blur-sm border border-white/20 transition-all duration-300 ease-in-out hover:scale-105 hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-500/20 hover:border-purple-300/40 group overflow-hidden relative">
                <CardContent className="p-6 relative z-10">
                  <div className="text-center mb-4">
                    <div className="text-lg font-bold text-purple-400 mb-2">LOTERAA</div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-purple-200 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-white/80 leading-relaxed group-hover:text-white transition-colors duration-300">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}