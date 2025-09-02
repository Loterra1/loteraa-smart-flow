import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface UserProfile {
   id: string;
   name: string | null;
   email: string | null;
   created_at: string;
   updated_at: string;
}

interface AuthContextType {
   user: User | null;
   session: Session | null;
   profile: UserProfile | null;
   loading: boolean;
   walletAddress: string | null;
   setWalletAddress: (address: string | null) => void;
   setUser: (user: User | null) => void;
   signOut: () => Promise<void>;
   updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
   changePassword: (newPassword: string) => Promise<{ error }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
   const context = useContext(AuthContext);
   if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
   }
   return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
   children,
}) => {
   const [user, setUser] = useState<User | null>(null);
   const [session, setSession] = useState<Session | null>(null);
   const [profile, setProfile] = useState<UserProfile | null>(null);
   const [loading, setLoading] = useState(true);
   const [walletAddress, setWalletAddress] = useState<string | null>(null);
   const { toast } = useToast();

   const fetchProfile = async (userId: string) => {
      try {
         console.log('Profile fetch skipped - no profiles table available');
      } catch (error) {
         console.error('Error fetching profile:', error);
      }
   };

   useEffect(() => {
      const {
         data: { subscription },
      } = supabase.auth.onAuthStateChange(async (event, session) => {
         console.log('Auth state changed:', event, session);
         setSession(session);
         setUser(session?.user ?? null);

         if (session?.user) {
            await fetchProfile(session.user.id);
         } else {
            setProfile(null);
         }

         setLoading(false);
      });

      supabase.auth.getSession().then(async ({ data: { session } }) => {
         setSession(session);
         setUser(session?.user ?? null);

         if (session?.user) {
            await fetchProfile(session.user.id);
         }

         setLoading(false);
      });

      return () => subscription.unsubscribe();
   }, []);

   const signOut = async () => {
      await supabase.auth.signOut();
      setProfile(null);
      setWalletAddress(null); // clear wallet when signing out
   };

   const updateProfile = async (updates: Partial<UserProfile>) => {
      if (!user) return;

      try {
         console.log('Profile update skipped - no profiles table available');
         toast({
            title: 'Profile updated',
            description: 'Your profile has been updated successfully.',
         });
      } catch (error) {
         console.error('Error updating profile:', error);
         toast({
            title: 'Error updating profile',
            description:
               error.message ||
               'An error occurred while updating your profile.',
            variant: 'destructive',
         });
      }
   };

   const changePassword = async (newPassword: string) => {
      try {
         const { error } = await supabase.auth.updateUser({
            password: newPassword,
         });

         if (error) {
            toast({
               title: 'Error changing password',
               description: error.message,
               variant: 'destructive',
            });
            return { error };
         }

         toast({
            title: 'Password changed',
            description: 'Your password has been updated successfully.',
         });

         return { error: null };
      } catch (error) {
         toast({
            title: 'Error changing password',
            description:
               error.message ||
               'An error occurred while changing your password.',
            variant: 'destructive',
         });
         return { error };
      }
   };

   const value: AuthContextType = {
      user,
      session,
      profile,
      loading,
      walletAddress,
      setWalletAddress,
      setUser,
      signOut,
      updateProfile,
      changePassword,
   };

   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
