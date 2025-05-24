
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";
import { ArrowLeft, Shield, FileText, Clock } from "lucide-react";
import { Link } from "react-router-dom";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-loteraa-black via-loteraa-darkPurple to-loteraa-black">
      <NavigationHeader />
      
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <Link to="/" className="inline-flex items-center text-loteraa-purple hover:text-loteraa-blue transition-colors mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">Terms & Conditions</span>
            </h1>
            <p className="text-xl text-white/70">
              Last updated: December 2024
            </p>
          </div>

          <Card className="bg-loteraa-gray/20 backdrop-blur-sm border-loteraa-gray/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <FileText className="h-6 w-6 mr-3 text-loteraa-purple" />
                Loteraa Blockchain Terms of Service
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-loteraa-teal" />
                  Acceptance of Terms
                </h3>
                <p className="text-white/80 leading-relaxed">
                  By accessing and using the Loteraa blockchain platform, you agree to be bound by these terms and conditions. 
                  Our platform connects IoT devices to smart contracts through secure blockchain technology. Users must comply 
                  with all applicable laws and regulations when using our services. These terms constitute a legally binding 
                  agreement between you and Loteraa regarding your use of our blockchain infrastructure and related services.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-loteraa-blue" />
                  Platform Usage
                </h3>
                <p className="text-white/80 leading-relaxed">
                  Users are responsible for maintaining the security of their devices and accounts. Prohibited activities include 
                  attempting to disrupt network operations, unauthorized access to others' data, or violating intellectual property 
                  rights. Loteraa reserves the right to suspend accounts that violate these terms. All transactions on the blockchain 
                  are immutable and users should exercise caution when executing smart contracts or transferring assets.
                </p>
              </div>

              <div className="border-t border-loteraa-gray/30 pt-6">
                <p className="text-white/60 text-sm">
                  For questions about these terms, please contact our legal team at legal@loteraa.com
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
