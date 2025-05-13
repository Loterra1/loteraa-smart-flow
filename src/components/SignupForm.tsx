
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Mail, KeyRound, User } from "lucide-react";

export default function SignupForm() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    walletAddress: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Account created successfully!",
        description: "Welcome to Loteraa platform.",
      });
      
      setFormData({
        name: "",
        email: "",
        password: "",
        walletAddress: ""
      });
      
      // Redirect to dashboard
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Error creating account",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleWalletConnect = async () => {
    setIsLoading(true);
    
    try {
      // Simulate wallet connection
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setFormData({
        ...formData,
        walletAddress: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F"
      });
      
      toast({
        title: "Wallet connected!",
        description: "Your wallet has been successfully connected.",
      });
      
      // Redirect to dashboard after wallet connection
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Error connecting wallet",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-loteraa-gray/20 backdrop-blur-md border-loteraa-gray/30">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
        <CardDescription className="text-center">
          Choose your preferred signup method
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="email" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="wallet">Web3 Wallet</TabsTrigger>
          </TabsList>
          
          <TabsContent value="email">
            <form onSubmit={handleEmailSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    className="pl-10"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                    className="pl-10"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Create a password"
                    className="pl-10"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              <Button type="submit" className="w-full bg-loteraa-purple hover:bg-loteraa-purple/90" disabled={isLoading}>
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="wallet">
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground text-center">
                  Connect your wallet to continue. We support MetaMask, WalletConnect, and more.
                </p>
              </div>
              
              <Button 
                onClick={handleWalletConnect} 
                className="w-full bg-loteraa-blue hover:bg-loteraa-blue/90" 
                disabled={isLoading || formData.walletAddress !== ""}
              >
                {isLoading ? "Connecting..." : formData.walletAddress ? "Wallet Connected" : "Connect Wallet"}
              </Button>
              
              {formData.walletAddress && (
                <div className="mt-4 p-3 rounded-md bg-loteraa-blue/10 border border-loteraa-blue/20">
                  <p className="text-xs text-loteraa-blue mb-1">Connected Wallet:</p>
                  <p className="text-sm font-mono break-all">{formData.walletAddress}</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="text-center text-sm text-white/70 mt-2">
          By continuing, you agree to Loteraa's{" "}
          <a href="#" className="underline hover:text-white">Terms of Service</a> and{" "}
          <a href="#" className="underline hover:text-white">Privacy Policy</a>.
        </div>
      </CardFooter>
    </Card>
  );
}
