
import React from 'react';
import DashboardNavbar from '@/components/DashboardNavbar';
import ProfileContent from '@/components/profile/ProfileContent';

export default function ProfilePage() {
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
