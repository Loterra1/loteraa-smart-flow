
export default function FeaturesShowcase() {
  return (
    <section className="py-12 md:py-20 bg-black">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-8 md:mb-12 text-center text-white uppercase">
          Features Showcase
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">IoT Integration</h3>
            <p className="text-gray-300">Connect any IoT device to blockchain networks seamlessly.</p>
          </div>
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Smart Contracts</h3>
            <p className="text-gray-300">Deploy and manage smart contracts with real-world data.</p>
          </div>
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Data Analytics</h3>
            <p className="text-gray-300">Advanced analytics for your connected devices and data.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
