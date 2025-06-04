
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useAuth } from '@/contexts/AuthContext';

export default function ProfileSettings() {
  const { user, profile, updateProfile, changePassword } = useAuth();
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  useEffect(() => {
    if (profile) {
      setDisplayName(profile.name || '');
      setEmail(profile.email || '');
    } else if (user) {
      setDisplayName(user.user_metadata?.name || '');
      setEmail(user.email || '');
    }
  }, [profile, user]);
  
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'displayName') {
      setDisplayName(value);
    } else if (name === 'email') {
      setEmail(value);
    }
  };
  
  const saveProfileSettings = async () => {
    setIsUpdatingProfile(true);
    try {
      await updateProfile({
        name: displayName,
        email: email,
      });
    } finally {
      setIsUpdatingProfile(false);
    }
  };
  
  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      return;
    }

    if (newPassword.length < 6) {
      return;
    }

    setIsChangingPassword(true);
    try {
      const { error } = await changePassword(newPassword);
      if (!error) {
        setIsPasswordDialogOpen(false);
        setNewPassword('');
        setConfirmPassword('');
      }
    } finally {
      setIsChangingPassword(false);
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="displayName">Display Name</Label>
        <Input
          id="displayName"
          name="displayName"
          value={displayName}
          onChange={handleProfileChange}
          className="bg-loteraa-gray/20 border-loteraa-gray/40 text-white"
          placeholder="Enter your display name"
        />
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                variant="link" 
                className="text-loteraa-purple p-0 h-auto"
              >
                Change Password
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-loteraa-gray border-loteraa-gray/40">
              <DialogHeader>
                <DialogTitle className="text-white">Change Password</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="newPassword" className="text-white">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="bg-loteraa-gray/20 border-loteraa-gray/40 text-white"
                    placeholder="Enter new password"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-white">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="bg-loteraa-gray/20 border-loteraa-gray/40 text-white"
                    placeholder="Confirm new password"
                  />
                </div>
                <div className="flex gap-2">
                  <Button 
                    onClick={handleChangePassword}
                    disabled={isChangingPassword || newPassword !== confirmPassword || newPassword.length < 6}
                    className="bg-loteraa-purple hover:bg-loteraa-purple/90"
                  >
                    {isChangingPassword ? "Changing..." : "Change Password"}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsPasswordDialogOpen(false)}
                    className="border-loteraa-gray/40 text-white"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <Input
          id="password"
          name="password"
          type="password"
          value="************"
          readOnly
          className="bg-loteraa-gray/20 border-loteraa-gray/40 text-white"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">Recovery Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={handleProfileChange}
          className="bg-loteraa-gray/20 border-loteraa-gray/40 text-white"
          placeholder="Enter your email"
        />
      </div>
      
      <Button 
        className="bg-loteraa-purple hover:bg-loteraa-purple/90 w-full md:w-auto mt-2"
        onClick={saveProfileSettings}
        disabled={isUpdatingProfile}
      >
        {isUpdatingProfile ? "Saving..." : "Save Settings"}
      </Button>
    </div>
  );
}
