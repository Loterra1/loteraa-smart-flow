
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import NavigationHeader from "@/components/NavigationHeader";
import Footer from "@/components/Footer";
import { ArrowLeft, Plus, ExternalLink, Network, Coins, Building, Smartphone, Globe, Database } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const ecosystemProjects = [
  {
    id: 1,
    name: "Polygon",
    category: "Infrastructure",
    description: "A decentralized Ethereum scaling platform that enables developers to build scalable user-friendly dApps.",
    website: "https://polygon.technology",
    logo: "🔷"
  },
  {
    id: 2,
    name: "IoT Sensors Network",
    category: "DePIN",
    description: "Decentralized network of IoT sensors providing real-time environmental data to smart contracts.",
    website: "#",
    logo: "📡"
  },
  {
    id: 3,
    name: "Smart Agriculture Platform",
    category: "Real World",
    description: "IoT-enabled farming solutions that optimize crop yields through blockchain-verified data.",
    website: "#",
    logo: "🌱"
  },
  {
    id: 4,
    name: "Loteraa DEX",
    category: "DeFi",
    description: "Decentralized exchange for trading IoT data tokens and device connectivity credits.",
    website: "#",
    logo: "💱"
  },
  {
    id: 5,
    name: "Device Registry DApp",
    category: "DApps",
    description: "Decentralized application for registering and managing IoT devices on the blockchain.",
    website: "#",
    logo: "📱"
  },
  {
    id: 6,
    name: "Data Oracle Network",
    category: "Data",
    description: "Secure oracle network providing verified IoT data feeds to smart contracts.",
    website: "#",
    logo: "🔮"
  }
];

const categories = [
  { value: "depin", label: "DePIN", icon: Network },
  { value: "defi", label: "DeFi", icon: Coins },
  { value: "infrastructure", label: "Infrastructure", icon: Building },
  { value: "dapps", label: "DApps", icon: Smartphone },
  { value: "real-world", label: "Real World", icon: Globe },
  { value: "data", label: "Data", icon: Database }
];

export default function EcosystemPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    website: "",
    picture: ""
  });
  const { toast } = useToast();

  const filteredProjects = selectedCategory === "all" 
    ? ecosystemProjects 
    : ecosystemProjects.filter(project => 
        project.category.toLowerCase().replace(" ", "-") === selectedCategory
      );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Project Submitted!",
      description: "Your project has been submitted for review. We'll get back to you soon.",
    });
    setFormData({ name: "", category: "", description: "", website: "", picture: "" });
    setIsSubmitDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-loteraa-black via-loteraa-darkPurple to-loteraa-black">
      <NavigationHeader />
      
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/" className="inline-flex items-center text-loteraa-purple hover:text-loteraa-blue transition-colors mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">Loteraa Ecosystem</span>
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Discover innovative projects built on Loteraa blockchain, connecting IoT devices to decentralized applications and smart contracts.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row justify-between items-center mb-8 gap-4">
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === "all" ? "default" : "outline"}
                onClick={() => setSelectedCategory("all")}
                className="mb-2"
              >
                All Categories
              </Button>
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <Button
                    key={category.value}
                    variant={selectedCategory === category.value ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category.value)}
                    className="mb-2"
                  >
                    <IconComponent className="h-4 w-4 mr-2" />
                    {category.label}
                  </Button>
                );
              })}
            </div>
            
            <Dialog open={isSubmitDialogOpen} onOpenChange={setIsSubmitDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-loteraa-purple hover:bg-loteraa-blue">
                  <Plus className="h-4 w-4 mr-2" />
                  Submit Project
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-loteraa-gray/95 backdrop-blur-sm border-loteraa-gray/30 text-white">
                <DialogHeader>
                  <DialogTitle className="gradient-text">Submit Your Project</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="project-name">Project Name</Label>
                    <Input
                      id="project-name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="bg-loteraa-gray/50 border-loteraa-gray/50 text-white"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                      <SelectTrigger className="bg-loteraa-gray/50 border-loteraa-gray/50 text-white">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent className="bg-loteraa-gray border-loteraa-gray/50">
                        {categories.map((category) => (
                          <SelectItem key={category.value} value={category.value} className="text-white hover:bg-loteraa-gray/50">
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="description">Short Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      className="bg-loteraa-gray/50 border-loteraa-gray/50 text-white"
                      placeholder="Describe your project in a few sentences..."
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="website">Website URL</Label>
                    <Input
                      id="website"
                      type="url"
                      value={formData.website}
                      onChange={(e) => setFormData({...formData, website: e.target.value})}
                      className="bg-loteraa-gray/50 border-loteraa-gray/50 text-white"
                      placeholder="https://your-project.com"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="picture">Logo/Picture URL</Label>
                    <Input
                      id="picture"
                      type="url"
                      value={formData.picture}
                      onChange={(e) => setFormData({...formData, picture: e.target.value})}
                      className="bg-loteraa-gray/50 border-loteraa-gray/50 text-white"
                      placeholder="https://your-logo-url.com/logo.png"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-loteraa-purple hover:bg-loteraa-blue">
                    Submit Project
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="bg-loteraa-gray/20 backdrop-blur-sm border-loteraa-gray/30 hover:bg-loteraa-gray/30 transition-colors">
                <CardHeader>
                  <CardTitle className="text-white flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">{project.logo}</span>
                      <div>
                        <h3 className="text-lg">{project.name}</h3>
                        <span className="text-xs text-loteraa-teal font-medium">{project.category}</span>
                      </div>
                    </div>
                    <a 
                      href={project.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-loteraa-purple hover:text-loteraa-blue transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80 text-sm leading-relaxed">
                    {project.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-white/60 text-lg">No projects found in this category.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
