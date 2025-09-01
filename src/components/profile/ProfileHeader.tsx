import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Link, Upload, Wallet, Copy, Check } from 'lucide-react';
import Modal from '@/utils/Modal';
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import EnhancedWalletModal from '../staking/WalletModal';

export default function ProfileHeader() {
   const { user, profile, walletAddress, setWalletAddress } = useAuth();
   const [userRole, setUserRole] = useState('Researcher');
   const [avatarUrl, setAvatarUrl] = useState('');
   const [showWalletModal, setShowWalletModal] = useState(false);
   const [copiedAddress, setCopiedAddress] = useState(false);

   const walletConnected = !!walletAddress;
   const fileInputRef = useRef<HTMLInputElement>(null);

   const connectWallet = () => {
      setShowWalletModal(true);
   };

   const disconnectWallet = () => {
      setWalletAddress(null);
      toast({
         title: 'Wallet Disconnected',
         description: 'Your wallet has been disconnected.',
      });
   };

   const copyAddress = async () => {
      if (walletAddress) {
         await navigator.clipboard.writeText(walletAddress);
         setCopiedAddress(true);
         setTimeout(() => setCopiedAddress(false), 2000);
         toast({
            title: 'Address Copied',
            description: 'Wallet address copied to clipboard.',
         });
      }
   };

   const handleRoleChange = (value: string) => {
      setUserRole(value);
      toast({
         title: 'Role Updated',
         description: `Your role has been updated to ${value}.`,
      });
   };

   const triggerFileInput = () => {
      if (fileInputRef.current) fileInputRef.current.click();
   };

   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
         const imageUrl = URL.createObjectURL(file);
         setAvatarUrl(imageUrl);
         toast({
            title: 'Profile Picture Updated',
            description: 'Your profile picture has been updated successfully.',
         });
      }
   };

   const displayName = profile?.name || user?.email?.split('@')[0] || 'User';
   const initials = displayName
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();

   return (
      <div className="p-6 flex flex-col md:flex-row gap-6 items-center md:items-start border-b border-loteraa-gray/20">
         {/* Avatar */}
         <div className="flex-shrink-0 relative group">
            <Avatar className="h-24 w-24 border-2 border-loteraa-purple">
               <AvatarImage src={avatarUrl || ''} alt={displayName} />
               <AvatarFallback className="bg-loteraa-purple/30 text-white text-xl">
                  {initials}
               </AvatarFallback>
            </Avatar>

            <div
               onClick={triggerFileInput}
               className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            >
               <Upload className="h-6 w-6 text-white" />
            </div>

            <input
               type="file"
               ref={fileInputRef}
               className="hidden"
               accept="image/*"
               onChange={handleFileChange}
            />
         </div>

         {/* User Info */}
         <div className="flex flex-col items-center md:items-start">
            <h2 className="text-xl font-semibold text-white">{displayName}</h2>
            <p className="text-white/60 text-sm">{user?.email}</p>

            {/* Role Selector */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2 mt-2">
               <span className="text-white/70">Role:</span>
               <Select value={userRole} onValueChange={handleRoleChange}>
                  <SelectTrigger className="w-[180px] bg-loteraa-black/40 border-loteraa-purple/70 text-white">
                     <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent className="bg-loteraa-gray border-loteraa-purple/70 text-white">
                     <SelectItem value="Researcher">Researcher</SelectItem>
                     <SelectItem value="Developer">Developer</SelectItem>
                     <SelectItem value="Both">Both</SelectItem>
                  </SelectContent>
               </Select>
            </div>

            {/* Wallet Section */}
            {!walletConnected ? (
               <Button
                  variant="outline"
                  className="w-full mt-6 bg-black  hover:bg-black/90 text-white"
                  onClick={connectWallet}
               >
                  <Wallet className="mr-2 h-4 w-4" /> Connect Wallet
               </Button>
            ) : (
               <div className="mt-6 space-y-4">
                  <div className="bg-black text-white p-4 rounded-lg">
                     <div className="flex items-center gap-2 justify-between mb-2">
                        <span className="text-sm font-medium">
                           Connected Wallet
                        </span>
                        <Button
                           onClick={disconnectWallet}
                           variant="secondary"
                           className="text-red-500 hover:text-red-700 text-sm "
                        >
                           Disconnect
                        </Button>
                     </div>
                     <div className="flex items-center gap-2">
                        <span className="font-mono text-sm bg-black text-white px-2 py-1 rounded">
                           {walletAddress.slice(0, 8)}...
                           {walletAddress.slice(-6)}
                        </span>
                        <button
                           onClick={copyAddress}
                           className="p-1 hover:bg-gray-200 rounded"
                           title="Copy address"
                        >
                           {copiedAddress ? (
                              <Check className="w-4 h-4 text-green-500" />
                           ) : (
                              <Copy className="w-4 h-4 text-gray-500" />
                           )}
                        </button>
                     </div>
                  </div>
               </div>
            )}
         </div>

         {/* Wallet Modal */}
         <Modal
            open={showWalletModal}
            onClose={() => setShowWalletModal(false)}
         >
            <EnhancedWalletModal onClose={() => setShowWalletModal(false)} />
         </Modal>
      </div>
   );
}
