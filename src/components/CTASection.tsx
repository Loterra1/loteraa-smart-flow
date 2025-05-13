
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function CTASection() {
  return (
    <section className="py-20">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="rounded-2xl gradient-bg overflow-hidden">
          <div className="p-8 md:p-12 relative">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                Ready to transform your IoT infrastructure?
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Book a demo with our team to discover how Loteraa can power your next-generation IoT-blockchain integration.
              </p>
              <Button asChild size="lg" className="bg-white hover:bg-white/90 text-loteraa-purple px-8 py-6 text-lg">
                <a href="#">Book Enterprise Demo</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
