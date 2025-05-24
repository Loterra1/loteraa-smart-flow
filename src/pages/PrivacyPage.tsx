
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";
import { ArrowLeft, Lock, Eye, Database, UserCheck } from "lucide-react";
import { Link } from "react-router-dom";

export default function PrivacyPage() {
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
              <span className="gradient-text">Privacy Policy</span>
            </h1>
            <p className="text-xl text-white/70">
              Your privacy and data security are our top priorities
            </p>
          </div>

          <Card className="bg-loteraa-gray/20 backdrop-blur-sm border-loteraa-gray/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Lock className="h-6 w-6 mr-3 text-loteraa-purple" />
                Loteraa Privacy Protection
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <Database className="h-5 w-5 mr-2 text-loteraa-teal" />
                  Data Collection & Protection
                </h3>
                <p className="text-white/80 leading-relaxed">
                  Loteraa collects only essential data necessary for platform operation and IoT device connectivity. All personal 
                  information is encrypted using advanced cryptographic protocols. We implement zero-knowledge proofs to ensure 
                  user privacy while maintaining blockchain integrity. Your IoT device data remains under your control, and we 
                  never share personal information with third parties without explicit consent.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <Eye className="h-5 w-5 mr-2 text-loteraa-blue" />
                  Transparency & Control
                </h3>
                <p className="text-white/80 leading-relaxed">
                  Users have complete visibility and control over their data on the Loteraa blockchain. Our decentralized 
                  architecture ensures no single entity can access your private information. You can request data deletion, 
                  export your information, or modify privacy settings at any time. All data processing activities are logged 
                  on the blockchain for complete transparency and auditability.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <UserCheck className="h-5 w-5 mr-2 text-loteraa-purple" />
                  User Rights & Compliance
                </h3>
                <p className="text-white/80 leading-relaxed">
                  We comply with international privacy regulations including GDPR and CCPA. Users have the right to access, 
                  correct, or delete their personal data. Our privacy-by-design approach ensures minimal data collection and 
                  maximum protection. Regular security audits and penetration testing maintain the highest standards of data 
                  protection across our blockchain infrastructure.
                </p>
              </div>

              <div className="border-t border-loteraa-gray/30 pt-6">
                <p className="text-white/60 text-sm">
                  For privacy-related inquiries, contact us at privacy@loteraa.com
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
