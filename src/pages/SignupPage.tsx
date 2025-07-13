
import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";
import SignupForm from "@/components/SignupForm";

const SignupPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavigationHeader />
      <main className="flex-grow flex items-center justify-center relative py-24 bg-black">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
          <SignupForm />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SignupPage;
