
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Mail, KeyRound, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export default function SignupForm() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
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
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: "https://loteraa.xyz/",
          data: {
            name: formData.name,
          }
        }
      });

      if (error) {
        toast({
          title: "Error creating account",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      if (data.user && !data.session) {
        toast({
          title: "Check your email!",
          description: "We've sent you a confirmation link to complete your signup.",
        });
      } else if (data.session) {
        toast({
          title: "Account created successfully!",
          description: "Welcome to Loteraa platform.",
        });
        navigate("/dashboard");
      }
      
      setFormData({
        name: "",
        email: "",
        password: "",
      });
      
    } catch (error: any) {
      toast({
        title: "Error creating account",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        toast({
          title: "Login failed",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      if (data.session) {
        toast({
          title: "Login successful!",
          description: "Welcome back to Loteraa platform.",
        });
        navigate("/dashboard");
      }
      
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message || "Invalid email or password.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleConnectWallet = () => {
    setIsLoading(true);
    
    // Simulate connection process for now
    setTimeout(() => {
      setIsLoading(false);
      
      // Navigate to dashboard
      navigate("/dashboard");
      
      // Show toast notification
      toast({
        title: "Wallet Connected Successfully",
        description: "Welcome to Loteraa platform.",
      });
    }, 1500);
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-loteraa-gray/20 backdrop-blur-md border-loteraa-gray/30">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">
          {isLoginMode ? "Login to your account" : "Create an account"}
        </CardTitle>
        <CardDescription className="text-center">
          {isLoginMode ? "Enter your credentials to login" : "Choose your preferred signup method"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoginMode ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="login-email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="login-email"
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
              <Label htmlFor="login-password">Password</Label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="login-password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  className="pl-10"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <Button type="submit" className="w-full bg-loteraa-purple hover:bg-loteraa-purple/90" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
        ) : (
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
                  onClick={handleConnectWallet} 
                  className="w-full bg-loteraa-blue hover:bg-loteraa-blue/90" 
                  disabled={isLoading}
                >
                  {isLoading ? "Connecting..." : "Connect Wallet"}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="text-center w-full">
          <Button 
            type="button" 
            variant="link" 
            onClick={() => setIsLoginMode(!isLoginMode)} 
            className="text-loteraa-blue hover:text-loteraa-blue/90"
          >
            {isLoginMode ? "Don't have an account? Sign up" : "Already have an account? Login"}
          </Button>
        </div>
        <div className="text-center text-sm text-white/70 mt-2">
          By continuing, you agree to Loteraa's{" "}
          <a href="#" className="underline hover:text-white">Terms of Service</a> and{" "}
          <a href="#" className="underline hover:text-white">Privacy Policy</a>.
        </div>
      </CardFooter>
    </Card>
  );
}
