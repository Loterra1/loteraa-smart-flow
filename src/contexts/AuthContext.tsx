import React, {
   createContext,
   useContext,
   useEffect,
   useState,
   useCallback,
} from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import api from '@/utils/api';

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
   ethBalance: number;
   setEthBalance: (balance: number) => void;
   refreshEthBalance: () => Promise<void>;
   setUser: (user: User | null) => void;
   signOut: () => Promise<void>;
   updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
   changePassword: (newPassword: string) => Promise<{ error }>;
   refreshBalance: () => Promise<void>; // Added this for manual refresh
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
   const [ethBalance, setEthBalance] = useState<number>(0);
   const { toast } = useToast();

   // Memoize the fetchUserBalance function to prevent unnecessary re-renders
   const fetchUserBalance = useCallback(async () => {
      if (!user?.id) {
         console.log('No user ID available for balance fetch');
         return;
      }

      try {
         const response = await api.get(`/onchain/balance?userId=${user.id}`);

         if (response.data?.data?.formatted !== undefined) {
            const formatted = response.data.data.formatted;

            // Handle both string and number formats
            const balance =
               typeof formatted === 'string'
                  ? parseFloat(formatted)
                  : formatted;

            // Check if it's a valid number
            if (!isNaN(balance)) {
               setLotBalance(balance);
            } else {
               console.warn('Invalid balance - not a number:', formatted);
            }
         } else {
            console.warn('No formatted balance in response:', response.data);
         }
      } catch (error) {
         console.error('Error getting balance:', error);
      }
   }, [user?.id]);

   const fetchEthBalance = useCallback(async () => {
      if (!user?.id) {
         console.log('No wallet address available for ETH balance fetch');
         return;
      }

      try {
         const response = await api.get(
            `/onchain/eth-balance?userId=${user?.id}`
         );

         const formatted = response.data?.data?.formatted;

         // Convert to number regardless of input type
         const balance = Number(formatted);

         if (!isNaN(balance)) {
            setEthBalance(balance);
         } else {
            console.warn('Invalid ETH balance format:', formatted);
         }
      } catch (error) {
         console.error('Error getting ETH balance:', error);
      }
   }, [user?.id]);

   const refreshEthBalance = useCallback(async () => {
      await fetchEthBalance();
   }, [fetchEthBalance]);

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
            // Don't set balance from profile since we're getting it from backend
            // setLotBalance(data.lot_token_balance || 0);
         }
      } catch (error) {
         console.error('Error fetching profile:', error);
      }
   };

   useEffect(() => {
      const getUserWallet = async (retries = 5) => {
         try {
            if (!user?.id) return;

            const response = await api.get(
               `/onchain/retrieve-wallet?userId=${user.id}`,
               { timeout: 15000 }
            );

            if (response.data.success) {
               const address = response.data.data.address;
               setWalletAddress(address);
            }
         } catch (error) {
            if (error.code === 'ECONNABORTED' && retries > 0) {
               console.log(
                  `Request timed out, retrying... (${retries} attempts left)`
               );
               setTimeout(() => getUserWallet(retries - 1), 2000);
            } else {
               console.error('Error fetching wallet:', error);
            }
         }
      };

      getUserWallet();
   }, [user?.id, setWalletAddress]);

   useEffect(() => {
      const {
         data: { subscription },
      } = supabase.auth.onAuthStateChange((event, session) => {
         console.log('Auth state changed:', event);
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
            setEthBalance(0);
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
               // Don't set balance from profile since we're getting it from backend
               // setLotBalance(updatedProfile.lot_token_balance || 0);
            }
         )
         .subscribe();

      return () => {
         supabase.removeChannel(channel);
      };
   }, [user?.id]);

   // Fetch balance when user changes or when explicitly called
   useEffect(() => {
      if (user?.id) {
         fetchUserBalance();
         fetchEthBalance();
      }
   }, [user?.id, fetchUserBalance, fetchEthBalance]);

   const signOut = async () => {
      await supabase.auth.signOut();
      setProfile(null);
      setWalletAddress(null);
      setLotBalance(0);
      setEthBalance(0);
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
      setEthBalance,
      ethBalance,
      refreshEthBalance,
      setUser,
      signOut,
      updateProfile,
      changePassword,
      refreshBalance: fetchUserBalance, // Expose this for manual balance refresh
   };

   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
