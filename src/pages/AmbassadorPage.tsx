
import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";

const AmbassadorPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavigationHeader />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-8 gradient-text">Ambassador Program</h1>
            <p className="text-lg text-white/70 text-center mb-12">
              Join the Loteraa Ambassador Program and help us build the future of IoT-Blockchain integration.
            </p>
            
            {/* Ambassador program content would go here */}
            <div className="bg-loteraa-gray/20 rounded-xl p-6 backdrop-blur-md border border-loteraa-gray/20 mb-8">
              <h2 className="text-2xl font-semibold mb-4">Coming Soon</h2>
              <p className="text-white/70">
                Our Ambassador Program is currently under development. Check back soon for more information on how to get involved!
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AmbassadorPage;
