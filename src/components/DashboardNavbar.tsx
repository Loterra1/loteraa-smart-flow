
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Bell, Menu, X, User, LogOut } from "lucide-react";

export default function DashboardNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/devices", label: "Devices" },
    { path: "/automation", label: "Automation" },
    { path: "/smart-contracts", label: "Smart Contracts" },
    { path: "/earnings", label: "Earnings" },
    { path: "/notifications", label: "Notifications" },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-loteraa-black/95 backdrop-blur-md border-b border-loteraa-gray/20">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold gradient-text">LOTERAA</span>
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link 
                key={item.path}
                to={item.path} 
                className={`text-sm font-medium transition-colors ${
                  isActive(item.path) 
                    ? "text-loteraa-purple" 
                    : "text-white/80 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-white/80 hover:text-white hover:bg-loteraa-gray/20">
              <Bell className="h-5 w-5" />
            </Button>
            <div className="relative">
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-white/80 hover:text-white hover:bg-loteraa-gray/20"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                <User className="h-5 w-5" />
              </Button>
              
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 py-2 bg-loteraa-gray/90 backdrop-blur-lg rounded-md shadow-xl z-50">
                  <Link to="/profile" className="block px-4 py-2 text-sm text-white hover:bg-loteraa-purple/20">
                    Profile Settings
                  </Link>
                  <Link to="/" className="flex items-center px-4 py-2 text-sm text-white hover:bg-loteraa-purple/20">
                    <LogOut className="h-4 w-4 mr-2" /> Sign Out
                  </Link>
                </div>
              )}
            </div>
          </div>
          
          <div className="md:hidden flex items-center">
            <Button 
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)} 
              className="text-white hover:bg-loteraa-gray/20"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-loteraa-gray/90 backdrop-blur-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(item.path)
                    ? "text-loteraa-purple bg-loteraa-purple/10"
                    : "text-white hover:bg-loteraa-purple/20"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 pb-2 border-t border-loteraa-gray/30">
              <Link 
                to="/profile" 
                className="flex items-center px-3 py-2 rounded-md text-base font-medium text-white hover:bg-loteraa-purple/20"
                onClick={() => setIsOpen(false)}
              >
                <User className="h-5 w-5 mr-2" />
                Profile
              </Link>
              <Link 
                to="/" 
                className="flex items-center px-3 py-2 rounded-md text-base font-medium text-white hover:bg-loteraa-purple/20"
                onClick={() => setIsOpen(false)}
              >
                <LogOut className="h-5 w-5 mr-2" />
                Sign Out
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
