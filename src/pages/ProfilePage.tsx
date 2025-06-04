
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardNavbar from '@/components/DashboardNavbar';
import ProfileContent from '@/components/profile/ProfileContent';
import { useAuth } from '@/contexts/AuthContext';

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/signup');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-loteraa-black to-loteraa-gray/90">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to signup
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-loteraa-black to-loteraa-gray/90">
      <DashboardNavbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-6">Profile</h1>
        <ProfileContent />
      </div>
    </div>
  );
}
