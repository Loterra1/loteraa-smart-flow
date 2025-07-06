
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

export default function NavigationHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-loteraa-black/80 backdrop-blur-md border-b border-loteraa-gray/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold gradient-text">LOTERAA</span>
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/about" className="text-sm font-medium text-white/80 hover:text-white transition-colors">About</Link>
            <Link to="/stake" className="text-sm font-medium text-white/80 hover:text-white transition-colors">Stake</Link>
            <Link to="/data-feed" className="text-sm font-medium text-white/80 hover:text-white transition-colors">Real-time Data Feed</Link>
            <Link to="/ambassador" className="text-sm font-medium text-white/80 hover:text-white transition-colors">Ambassador</Link>
          </nav>
          
          <div className="hidden md:flex items-center">
            <Button asChild className="bg-loteraa-purple hover:bg-loteraa-purple/90 text-white">
              <Link to="/signup">Sign Up</Link>
            </Button>
          </div>
          
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white focus:outline-none"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-loteraa-gray/90 backdrop-blur-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/about" className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-loteraa-purple/20">About</Link>
            <Link to="/stake" className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-loteraa-purple/20">Stake</Link>
            <Link to="/data-feed" className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-loteraa-purple/20">Real-time Data Feed</Link>
            <Link to="/ambassador" className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-loteraa-purple/20">Ambassador</Link>
            <div className="pt-4 pb-2">
              <Button asChild className="w-full bg-loteraa-purple hover:bg-loteraa-purple/90 text-white">
                <Link to="/signup">Sign Up</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
