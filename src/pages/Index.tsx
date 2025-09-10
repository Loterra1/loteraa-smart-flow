import { useEffect } from 'react';

import api from '@/utils/api';

import NavigationHeader from '@/components/NavigationHeader';
import HeroSection from '@/components/HeroSection';
import CorePrinciples from '@/components/CorePrinciples';
import UseCasesSection from '@/components/UseCasesSection';
import StartBuildingSection from '@/components/StartBuildingSection';
import Footer from '@/components/Footer';

import { useAuth } from '@/contexts/AuthContext';

export default function Index() {
   const { setWalletAddress, user } = useAuth();

   useEffect(() => {
      const getUserWallet = async () => {
         try {
            if (!user?.id) return;

            const response = await api.get(
               `/onchain/retrieve-wallet?userId=${user.id}`
            );

            if (response.data.success) {
               const address = response.data.data.address;
               setWalletAddress(address); // updates global AuthContext state
               console.log('Wallet from backend:', address);
            }
         } catch (error) {
            console.error('Error fetching wallet:', error);
         }
      };

      getUserWallet();
   }, [user?.id, setWalletAddress]);
   return (
      <div className="min-h-screen bg-black">
         <NavigationHeader />
         <HeroSection />
         <CorePrinciples />
         <UseCasesSection />
         <StartBuildingSection />
         <Footer />
      </div>
   );
}
