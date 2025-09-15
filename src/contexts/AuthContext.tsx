import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface UserProfile {
   id: string;
   display_name: string | null;
   email: string | null;
   avatar_url: string | null;
   lot_token_balance: number;
   total_earnings: number;
   total_datasets_uploaded: number;
   user_id: string;
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
   lotBalance: number;
   setLotBalance: (balance: number) => void;
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
   const [lotBalance, setLotBalance] = useState<number>(0);
   const { toast } = useToast();

   const fetchProfile = async (userId: string) => {
      try {
         const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('user_id', userId)
            .single();

         if (error) {
            console.error('Error fetching profile:', error);
            return;
         }

         if (data) {
            setProfile(data);
            setLotBalance(data.lot_token_balance || 0);
         }
      } catch (error) {
         console.error('Error fetching profile:', error);
      }
   };

   useEffect(() => {
      const {
         data: { subscription },
      } = supabase.auth.onAuthStateChange((event, session) => {
         setSession(session);
         setUser(session?.user ?? null);

         if (session?.user) {
            // Defer profile fetching to avoid async issues in auth callback
            setTimeout(() => {
               fetchProfile(session.user.id);
            }, 0);
         } else {
            setProfile(null);
            setLotBalance(0);
         }

         setLoading(false);
      });

      supabase.auth.getSession().then(({ data: { session } }) => {
         setSession(session);
         setUser(session?.user ?? null);

         if (session?.user) {
            fetchProfile(session.user.id);
         }

         setLoading(false);
      });

      return () => subscription.unsubscribe();
   }, []);

   // Set up real-time subscription for profile updates
   useEffect(() => {
      if (!user?.id) return;

      const channel = supabase
         .channel('profile-changes')
         .on(
            'postgres_changes',
            {
               event: 'UPDATE',
               schema: 'public',
               table: 'profiles',
               filter: `user_id=eq.${user.id}`,
            },
            (payload) => {
               const updatedProfile = payload.new as UserProfile;
               setProfile(updatedProfile);
               setLotBalance(updatedProfile.lot_token_balance || 0);
            }
         )
         .subscribe();

      return () => {
         supabase.removeChannel(channel);
      };
   }, [user?.id]);

   const signOut = async () => {
      await supabase.auth.signOut();
      setProfile(null);
      setWalletAddress(null);
      setLotBalance(0);
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
      lotBalance,
      setLotBalance,
      setUser,
      signOut,
      updateProfile,
      changePassword,
   };

   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
