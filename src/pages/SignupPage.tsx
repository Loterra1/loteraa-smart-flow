
import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";
import SignupForm from "@/components/SignupForm";

const SignupPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavigationHeader />
      <main className="flex-grow flex items-center justify-center relative py-24">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-[-1]">
          <div className="blob animate-blob-rotate bg-loteraa-purple/20 w-[600px] h-[600px] left-[-300px] top-[10%]"></div>
          <div className="blob animate-blob-rotate bg-loteraa-blue/10 w-[500px] h-[500px] right-[-200px] bottom-[20%]"></div>
          <div className="mesh-grid"></div>
        </div>
        
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
          <SignupForm />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SignupPage;
